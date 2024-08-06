import ts from "typescript";

const visitor: ts.Visitor = (node) => {
  if (
    ts.isCallExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.getText() === "bind"
  ) {
    const [object, array] = node.arguments;

    if (!object || !ts.isObjectLiteralExpression(object)) {
      throw new Error("auto-sync: bind's first argument must be an object literal");
    }

    if (array && !ts.isArrayLiteralExpression(array)) {
      throw new Error("auto-sync: bind's second argument must be an array literal");
    }

    if (array && array.elements?.some((el) => !ts.isStringLiteral(el))) {
      throw new Error("auto-sync: bind's second argument must be an array of string literals");
    }

    const keys: string[] = array?.elements.map((e) => (e as ts.StringLiteral).text) ?? [];

    const properties: ts.ObjectLiteralElementLike[] = [];

    for (const property of object.properties) {
      const setter = property.name && keys.includes(property.name.getText());
      let name!: string;
      let initializer!: ts.Expression;
      let stringLiteral = false;

      if (ts.isShorthandPropertyAssignment(property)) {
        name = property.name.getText();
        initializer = property.name;
      } else if (ts.isPropertyAssignment(property)) {
        if (ts.isStringLiteral(property.name)) {
          name = property.name.text;
          initializer = property.initializer;
          stringLiteral = true;
        } else if (ts.isIdentifier(property.name)) {
          name = property.name.getText();
          initializer = property.initializer;
        }
      } else {
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

  return ts.visitEachChild(node, visitor, undefined);
};

const printer = ts.createPrinter();

export const expand = ({ filename, content }: { filename: string; content: string }) => {
  const source = ts.createSourceFile(
    filename,
    content,
    {
      languageVersion: ts.ScriptTarget.ESNext,
      impliedNodeFormat: ts.ModuleKind.ESNext,
    },
    /** setParentNodes */ true,
    ts.ScriptKind.TS,
  );

  const transformed = ts.visitNode(source, visitor);

  if (!transformed)
    throw new Error(`auto-sync: something went wrong when transforming module ${filename}`);

  return printer.printNode(ts.EmitHint.Unspecified, transformed, source);
};

const createGetter = ({
  name,
  initializer,
  stringLiteral,
}: {
  name: string;
  initializer: ts.Expression;
  stringLiteral?: boolean;
}) => {
  return ts.factory.createGetAccessorDeclaration(
    undefined,
    stringLiteral ? ts.factory.createStringLiteral(name) : ts.factory.createIdentifier(name),
    [],
    undefined,
    ts.factory.createBlock([ts.factory.createReturnStatement(initializer)], false),
  );
};

const createSetter = ({ name, initializer }: { name: string; initializer: ts.Expression }) => {
  // Prevent shadowing
  const local = ["v", "_v", "__v"].find((v) => !new Set([name, initializer]).has(v)) as string;
  const localIdentifier = ts.factory.createIdentifier(local);

  return ts.factory.createSetAccessorDeclaration(
    undefined,
    ts.factory.createIdentifier(name),
    [
      ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        localIdentifier,
        undefined,
        undefined,
        undefined,
      ),
    ],
    ts.factory.createBlock(
      [
        ts.factory.createExpressionStatement(
          ts.factory.createBinaryExpression(
            initializer,
            ts.factory.createToken(ts.SyntaxKind.EqualsToken),
            localIdentifier,
          ),
        ),
      ],
      false,
    ),
  );
};

const createObjectLiteralExpression = (properties: ts.ObjectLiteralElementLike[]) => {
  return ts.factory.createObjectLiteralExpression(properties);
};
