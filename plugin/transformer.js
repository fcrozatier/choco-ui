import { createPrinter, createSourceFile, EmitHint, factory, isArrayLiteralExpression, isCallExpression, isIdentifier, isObjectLiteralExpression, isPropertyAssignment, isShorthandPropertyAssignment, isStringLiteral, ModuleKind, ScriptKind, ScriptTarget, SyntaxKind, visitEachChild, visitNode, } from "typescript";
var visitor = function (node) {
    var _a, _b;
    if (isCallExpression(node) &&
        isIdentifier(node.expression) &&
        node.expression.getText() === "bind") {
        var _c = node.arguments, object = _c[0], array = _c[1];
        if (!object || !isObjectLiteralExpression(object)) {
            throw new Error("auto-sync: bind's first argument must be an object literal");
        }
        if (array && !isArrayLiteralExpression(array)) {
            throw new Error("auto-sync: bind's second argument must be an array literal");
        }
        if (array && ((_a = array.elements) === null || _a === void 0 ? void 0 : _a.some(function (el) { return !isStringLiteral(el); }))) {
            throw new Error("auto-sync: bind's second argument must be an array of string literals");
        }
        var keys = (_b = array === null || array === void 0 ? void 0 : array.elements.map(function (e) { return e.text; })) !== null && _b !== void 0 ? _b : [];
        var properties = [];
        for (var _i = 0, _d = object.properties; _i < _d.length; _i++) {
            var property = _d[_i];
            var setter = property.name && keys.includes(property.name.getText());
            var name_1 = void 0;
            var initializer = void 0;
            var stringLiteral = false;
            if (isShorthandPropertyAssignment(property)) {
                name_1 = property.name.getText();
                initializer = property.name;
            }
            else if (isPropertyAssignment(property)) {
                if (isStringLiteral(property.name)) {
                    name_1 = property.name.text;
                    initializer = property.initializer;
                    stringLiteral = true;
                }
                else if (isIdentifier(property.name)) {
                    name_1 = property.name.getText();
                    initializer = property.initializer;
                }
            }
            else {
                // Leave accessors, spreads and methods as is
                properties.push(property);
                continue;
            }
            properties.push(createGetter({ name: name_1, initializer: initializer, stringLiteral: stringLiteral }));
            if (setter) {
                properties.push(createSetter({ name: name_1, initializer: initializer }));
            }
        }
        return createObjectLiteralExpression(properties);
    }
    return visitEachChild(node, visitor, undefined);
};
var printer = createPrinter();
export var expand = function (_a) {
    var filename = _a.filename, content = _a.content;
    var source = createSourceFile(filename, content, {
        languageVersion: ScriptTarget.ESNext,
        impliedNodeFormat: ModuleKind.ESNext,
    }, 
    /** setParentNodes */ true, ScriptKind.TS);
    var transformed = visitNode(source, visitor);
    if (!transformed)
        throw new Error("auto-sync: something went wrong when transforming module ".concat(filename));
    return printer.printNode(EmitHint.Unspecified, transformed, source);
};
var createGetter = function (_a) {
    var name = _a.name, initializer = _a.initializer, stringLiteral = _a.stringLiteral;
    return factory.createGetAccessorDeclaration(undefined, stringLiteral
        ? factory.createStringLiteral(name)
        : factory.createIdentifier(name), [], undefined, factory.createBlock([factory.createReturnStatement(initializer)], false));
};
var createSetter = function (_a) {
    var name = _a.name, initializer = _a.initializer;
    // Prevent shadowing
    var local = ["v", "_v", "__v"].find(function (v) { return !new Set([name, initializer]).has(v); });
    var localIdentifier = factory.createIdentifier(local);
    return factory.createSetAccessorDeclaration(undefined, factory.createIdentifier(name), [
        factory.createParameterDeclaration(undefined, undefined, localIdentifier, undefined, undefined, undefined),
    ], factory.createBlock([
        factory.createExpressionStatement(factory.createBinaryExpression(initializer, factory.createToken(SyntaxKind.EqualsToken), localIdentifier)),
    ], false));
};
var createObjectLiteralExpression = function (properties) {
    return factory.createObjectLiteralExpression(properties);
};
