import * as acorn from "acorn";
import { tsPlugin } from "acorn-typescript";
import { walk as estreeWalk } from "estree-walker";
import MagicString from "magic-string";
import { parse } from "svelte/compiler";

// @ts-ignore
const tsParser = acorn.Parser.extend(tsPlugin({ allowSatisfies: true }));

/**
 * @param {import("svelte/compiler").Root} ast
 * @param {import("./preprocessor").WalkerArgs} args
 */
export function walk(ast, args) {
	// @ts-expect-error estree-walker doesn't want Svelte Ast type
	return estreeWalk(ast, args);
}

export const script = /** @satisfies {import("svelte/compiler").Preprocessor} */ (
	({ attributes, content, filename }) => {
		if (!content?.includes("bind(")) return { code: content, attributes };

		const code = new MagicString(content, { filename });
		const ast = tsParser.parse(content, {
			locations: true,
			ecmaVersion: "latest",
			sourceFile: filename,
			sourceType: "module",
		});

		// @ts-expect-error estree-walker doesn't want acorn.Program type
		estreeWalk(ast, {
			enter(node) {
				if (
					node.type === "CallExpression" &&
					node.callee.type === "Identifier" &&
					node.callee.name === "bind" &&
					node.arguments.length === 2
				) {
					const [object, array] = node.arguments;

					if (object?.type !== "ObjectExpression") {
						throw new Error("bind's first argument must be an object literal");
					}
					if (array?.type !== "ArrayExpression") {
						throw new Error("bind's second argument must be an array literal");
					}
					if (array.elements.length > 0) {
						if (
							!array.elements.every((el) => el?.type === "Literal" && typeof el.value === "string")
						) {
							throw new Error("bind's second argument must be an array of string literals");
						}
						const keys = /** @type {import("acorn").Literal[]} */ (array.elements).map(
							(e) => e.type === "Literal" && e.value,
						);

						for (const property of /** @type {import("acorn").Property[]} */ (object.properties)) {
							if (
								property.type === "Property" &&
								property.key.type === "Identifier" &&
								keys.includes(property.key.name)
							) {
								const name = property.key.name;
								if (property.shorthand && "start" in property) {
									code.update(
										property.start,
										property.end,
										`get ${name}(){return ${name}}, set ${name}(v){${name}=v}`,
									);
								} else {
									const { value } = /** @type {import("acorn").Property} */ (property);

									code.update(
										property.start,
										property.end,
										`get ${name}(){return ${code.slice(value.start, value.end)}}, set ${name}(v){${code.slice(value.start, value.end)}=v}`,
									);
								}
							}
						}
					}
				}
			},
		});

		const str = code.toString();
		return { code: str, attributes };
	}
);

export default () => {
	return /** @satisfies {import("svelte/compiler").PreprocessorGroup} */ ({
		name: "Choco preprocessor",
		script,
		markup: ({ content, filename }) => {
			if (!/use:choco=/.test(content)) return { code: content };

			const markup = new MagicString(content, { filename });
			const ast = parse(content, { filename, modern: true });

			walk(ast, {
				enter(node) {
					if (node.type === "UseDirective" && node.name === "choco" && node.expression) {
						const expression = /** @type {import("svelte/compiler").BaseNode} */ (node.expression);
						const stringExp = markup.slice(expression.start, expression.end);

						markup.update(
							node.start,
							node.end,
							`{...${stringExp}.attributes} use:${stringExp}.action`,
						);
					}
				},
			});

			return { code: markup.toString() };
		},
	});
};
