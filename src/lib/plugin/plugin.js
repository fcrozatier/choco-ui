import * as acorn from "acorn";
import { tsPlugin } from "acorn-typescript";
import { walk } from "estree-walker";
import MagicString from "magic-string";
import { parse } from "svelte/compiler";

// @ts-ignore
const tsParser = acorn.Parser.extend(tsPlugin({ allowSatisfies: true }));

/**
 * @typedef {Object} PluginOptions
 * @property {string} filename
 * @property {string} content
 */

/** @param {PluginOptions} options */
export function expandMacro({ filename, content }) {
	if (!content.includes("bind(")) return { code: content };

	/** @type {import('acorn').Program} */
	let ast;

	if (/\.ts$/.test(filename)) {
		ast = tsParser.parse(content, {
			locations: true,
			ecmaVersion: "latest",
			sourceFile: filename,
			sourceType: "module",
		});
	} else if (/\.svelte$/.test(filename)) {
		const instance = parse(content, { filename, modern: true }).instance;
		if (!instance) return { code: content };
		// @ts-ignore
		ast = instance.content;
	} else {
		return { code: content };
	}

	const code = new MagicString(content, { filename });

	// @ts-ignore
	walk(ast, {
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
						(/** @type {import("acorn").Literal} */ e) => e.type === "Literal" && e.value,
					);

					for (const property of /**@type {import("acorn").Property[]} */ (object.properties)) {
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
								const { value } = property;

								code.update(
									property.start,
									property.end,
									`get ${name}(){return ${code.slice(value.start, value.end)}}, set ${name}(v){${code.slice(value.start, value.end)}=v}`,
								);
							}
						}
					}
				}

				let o = /** @type {import("acorn").ObjectExpression} */ (object);
				let n = /** @type {import("acorn").CallExpression} */ (node);
				code.update(n.start, n.end, code.slice(o.start, o.end));
			}
		},
	});

	return { code: code.toString() };
}

const isSvelteOrTSModule = /\.svelte(\.ts)?$/;

export default () => {
	return /** @satisfies {import("vite").Plugin} */ ({
		name: "svelte-$bind",
		transform(content, id) {
			if (!isSvelteOrTSModule.test(id)) return { code: content };

			const { code } = expandMacro({
				filename: id,
				content,
			});

			return { code };
		},
	});
};
