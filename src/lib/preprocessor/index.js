import * as acorn from "acorn";
import { tsPlugin } from "acorn-typescript";
import { walk as estreeWalk } from "estree-walker";
import MagicString from "magic-string";
import { parse } from "svelte/compiler";

const tsParser = acorn.Parser.extend(tsPlugin({ allowSatisfies: true }));

/**
 * @param {import("svelte/compiler").Root} ast
 * @param {import("./preprocessor").WalkerArgs} args
 */
export function walk(ast, args) {
	// @ts-expect-error estree-walker doesn't want Svelte Ast type
	return estreeWalk(ast, args);
}

export default () => {
	return /** @satisfies {import("svelte/compiler").PreprocessorGroup} */ ({
		name: "Choco preprocessor",
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
		script: ({ attributes, content, filename }) => {
			if (!content?.includes("bind(")) return { code: content, attributes };

			const code = new MagicString(content, { filename });
			const ast = tsParser.parse(content, {
				locations: true,
				ecmaVersion: "latest",
				sourceFile: filename,
				sourceType: "module",
			});

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
							throw new Error("bind first argument must be an object literal");
						}
						if (array?.type !== "ArrayExpression") {
							throw new Error("bind second argument must be an array literal");
						}
						if (array.elements.length > 0) {
							if (
								!array.elements.every(
									(el) => el?.type === "Literal" && typeof el.value === "string",
								)
							) {
								throw new Error("bind second argument must be an array of string literals");
							}
							const keys = array.elements.map((e) => e?.type === "Literal" && e?.value);

							for (const property of object.properties) {
								if (
									property.type === "Property" &&
									property.key.type === "Identifier" &&
									keys.includes(property.key.name)
								) {
									const name = property.key.name;
									if (property.shorthand) {
										code.update(
											property.start,
											property.end,
											`get ${name}(){return ${name}}, set ${name}(v){${name}=v}`,
										);
									} else {
										if (property.value.type !== "Identifier") {
											throw new Error("bind properties must be identifiers");
										}
										code.update(
											property.start,
											property.end,
											`get ${name}(){return ${property.value.name}}, set ${name}(v){${property.value.name}=v}`,
										);
									}
								}
							}
						}
					}
				},
			});

			const str = code.toString();

			console.log("before", content);
			console.log("after", str);
			return { code: str, attributes };
		},
	});
};
