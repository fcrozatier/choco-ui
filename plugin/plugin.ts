import {
	createPrinter,
	createSourceFile,
	EmitHint,
	factory,
	isArrayLiteralExpression,
	isCallExpression,
	isIdentifier,
	isObjectLiteralExpression,
	isPropertyAssignment,
	isShorthandPropertyAssignment,
	isStringLiteral,
	ScriptKind,
	ScriptTarget,
	SyntaxKind,
	transform,
	visitEachChild,
	visitNode,
	type Expression,
	type ObjectLiteralElementLike,
	type SourceFile,
	type StringLiteral,
	type TransformerFactory,
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

const transformer: TransformerFactory<SourceFile> = (context) => {
	return (sourceFile) => {
		const visitor = ((node) => {
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

				if (array && array?.elements.some((el) => !isStringLiteral(el))) {
					throw new Error("bind's second argument must be an array of string literals");
				}

				const keys: string[] = array?.elements.map((e) => (e as StringLiteral).text) ?? [];

				let properties: ObjectLiteralElementLike[] = [];

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

			return visitEachChild(node, visitor, context);
		}) satisfies Visitor;

		return visitNode(sourceFile, visitor);
	};
};

export const expand = ({ filename, content }: { filename: string; content: string }) => {
	const tree = ast({ filename, content });

	const transformed = transform(tree, [transformer]).transformed[0];

	return printer.printNode(EmitHint.Unspecified, transformed, tree);
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

const script = /<script.*>((.|\r?\n)*)<\/script>/;
const svelte = /\.svelte$/;

export const expandMacro = ({ filename, content }: { filename: string; content: string }) => {
	let scriptTag: string | undefined;
	let source = content;

	if (svelte.test(filename)) {
		scriptTag = content.match(script)?.[1];
		if (!scriptTag) return null;

		source = scriptTag;
	}

	const code = expand({ filename, content });

	if (!scriptTag) return { code };

	return { code: content.replace(scriptTag, code) };
};
