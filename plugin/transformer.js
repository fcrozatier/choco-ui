import { createPrinter, createSourceFile, EmitHint, factory, isArrayLiteralExpression, isCallExpression, isIdentifier, isObjectLiteralExpression, isPropertyAssignment, isShorthandPropertyAssignment, isStringLiteral, ModuleKind, ScriptKind, ScriptTarget, SyntaxKind, visitEachChild, visitNode, } from "typescript";
const visitor = (node) => {
    if (isCallExpression(node) &&
        isIdentifier(node.expression) &&
        node.expression.getText() === "bind") {
        const [object, array] = node.arguments;
        if (!object || !isObjectLiteralExpression(object)) {
            throw new Error("auto-sync: bind's first argument must be an object literal");
        }
        if (array && !isArrayLiteralExpression(array)) {
            throw new Error("auto-sync: bind's second argument must be an array literal");
        }
        if (array && array.elements?.some((el) => !isStringLiteral(el))) {
            throw new Error("auto-sync: bind's second argument must be an array of string literals");
        }
        const keys = array?.elements.map((e) => e.text) ?? [];
        const properties = [];
        for (const property of object.properties) {
            const setter = property.name && keys.includes(property.name.getText());
            let name;
            let initializer;
            let stringLiteral = false;
            if (isShorthandPropertyAssignment(property)) {
                name = property.name.getText();
                initializer = property.name;
            }
            else if (isPropertyAssignment(property)) {
                if (isStringLiteral(property.name)) {
                    name = property.name.text;
                    initializer = property.initializer;
                    stringLiteral = true;
                }
                else if (isIdentifier(property.name)) {
                    name = property.name.getText();
                    initializer = property.initializer;
                }
            }
            else {
                // Leave accessors, spreads and methods as is
                properties.push(property);
                continue;
            }
            properties.push(createGetter({ name, initializer, stringLiteral }));
            if (setter) {
                properties.push(createSetter({ name, initializer }));
            }
        }
        return createObjectLiteralExpression(properties);
    }
    return visitEachChild(node, visitor, undefined);
};
const printer = createPrinter();
export const expand = ({ filename, content }) => {
    const source = createSourceFile(filename, content, {
        languageVersion: ScriptTarget.ESNext,
        impliedNodeFormat: ModuleKind.ESNext,
    }, 
    /** setParentNodes */ true, ScriptKind.TS);
    const transformed = visitNode(source, visitor);
    if (!transformed)
        throw new Error(`auto-sync: something went wrong when transforming module ${filename}`);
    return printer.printNode(EmitHint.Unspecified, transformed, source);
};
const createGetter = ({ name, initializer, stringLiteral, }) => {
    return factory.createGetAccessorDeclaration(undefined, stringLiteral ? factory.createStringLiteral(name) : factory.createIdentifier(name), [], undefined, factory.createBlock([factory.createReturnStatement(initializer)], false));
};
const createSetter = ({ name, initializer }) => {
    // Prevent shadowing
    const local = ["v", "_v", "__v"].find((v) => !new Set([name, initializer]).has(v));
    const localIdentifier = factory.createIdentifier(local);
    return factory.createSetAccessorDeclaration(undefined, factory.createIdentifier(name), [
        factory.createParameterDeclaration(undefined, undefined, localIdentifier, undefined, undefined, undefined),
    ], factory.createBlock([
        factory.createExpressionStatement(factory.createBinaryExpression(initializer, factory.createToken(SyntaxKind.EqualsToken), localIdentifier)),
    ], false));
};
const createObjectLiteralExpression = (properties) => {
    return factory.createObjectLiteralExpression(properties);
};
