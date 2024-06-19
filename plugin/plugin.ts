import {
	createPrinter,
	createSourceFile,
	EmitHint,
	factory,
	forEachChild,
	isArrayLiteralExpression,
	isCallExpression,
	isIdentifier,
	isObjectLiteralExpression,
	isPropertyAssignment,
	isShorthandPropertyAssignment,
	isStringLiteral,
	NewLineKind,
	ScriptKind,
	ScriptTarget,
	SyntaxKind,
	transform,
	visitNode,
	type Expression,
	type Node,
	type ObjectLiteralElementLike,
	type ObjectLiteralExpression,
	type Printer,
	type SourceFile,
	type StringLiteral,
	type Visitor,
} from "typescript";

const printer = createPrinter();

const ast = ({ filename, content }) => {
	return createSourceFile(
		filename,
		content,
		{ languageVersion: ScriptTarget.ESNext },
		/** setParentNodes */ true,
		ScriptKind.TS,
	);
};

export const expand = ({ filename, content }: { filename: string; content: string }) => {
	const tree = ast({ filename, content });

	const visitor: Visitor = (node: Node) => {
		if (
			isCallExpression(node) &&
			isIdentifier(node.expression) &&
			node.expression.getText() === "bind"
		) {
			const [object, array] = node.arguments;

			if (!isObjectLiteralExpression(object)) {
				throw new Error("bind's first argument must be an object literal");
			}

			if (array && !isArrayLiteralExpression(array)) {
				throw new Error("bind's second argument must be an array literal");
			}

			if (array.elements.some((el) => !isStringLiteral(el))) {
				throw new Error("bind's second argument must be an array of string literals");
			}

			const keys = (array.elements as unknown as StringLiteral[]).map((e) => e.text);

			let children: ObjectLiteralElementLike[] = [];

			for (const property of object.properties) {
				const setter = property.name && keys.includes(property.name.getText());
				let name!: string;
				let initializer!: Expression;
				let stringLiteral = false;

				if (isShorthandPropertyAssignment(property)) {
					name = property.name.getText();
					initializer = property.name;
				} else if (isPropertyAssignment(property)) {
					if (isStringLiteral(property.name)) {
						name = property.name.getText();
						initializer = property.initializer;
						stringLiteral = true;
					} else if (isIdentifier(property.name)) {
						name = property.name.getText();
						initializer = property.initializer;
					}
				} else {
					// Leave getters, spreads and methods as is
					children.push(property);
					continue;
				}

				children.push(createGetter({ name, initializer, stringLiteral }));
				if (setter) {
					children.push(createSetter({ name, initializer }));
				}
			}

			return createObjectLiteralExpression(children);
		}

		forEachChild(node, (node) => visitNode(node, visitor));

		return node;
	};

	const re = visitNode(tree, visitor);
	if (!re) throw new Error("Err");

	return printer.printNode(EmitHint.Unspecified, re, tree);
};

const createGetter = ({
	name,
	initializer,
	stringLiteral,
}: {
	name: string;
	initializer: Expression;
	stringLiteral?: boolean;
}) => {
	return factory.createGetAccessorDeclaration(
		undefined,
		stringLiteral ? factory.createStringLiteral(name) : factory.createIdentifier(name),
		[],
		undefined,
		factory.createBlock([factory.createReturnStatement(initializer)], false),
	);
};

const createSetter = ({ name, initializer }: { name: string; initializer: Expression }) => {
	// Prevent shadowing
	const local = ["v", "_v", "__v"].find((v) => !new Set([name, initializer]).has(v)) as string;
	const localIdentifier = factory.createIdentifier(local);

	return factory.createSetAccessorDeclaration(
		undefined,
		factory.createIdentifier(name),
		[
			factory.createParameterDeclaration(
				undefined,
				undefined,
				localIdentifier,
				undefined,
				undefined,
				undefined,
			),
		],
		factory.createBlock(
			[
				factory.createExpressionStatement(
					factory.createBinaryExpression(
						initializer,
						factory.createToken(SyntaxKind.EqualsToken),
						localIdentifier,
					),
				),
			],
			false,
		),
	);
};

const createObjectLiteralExpression = (properties: ObjectLiteralElementLike[]) => {
	return factory.createObjectLiteralExpression(properties);
};
