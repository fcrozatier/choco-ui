import * as acorn from "acorn";
import { tsPlugin } from "acorn-typescript";
import { walk } from "estree-walker";
import MagicString from "magic-string";

// @ts-ignore
const tsParser = acorn.Parser.extend(tsPlugin({ allowSatisfies: true }));

const script = /<script.*>((.|\r?\n)*)<\/script>/;

/**
 * @type {typeof import(".").expandMacro}
 */
export function expandMacro({ filename, content }) {
	/** @type {string|undefined} */
	let scriptTag;
	let source = content;

	if (/\.svelte$/.test(filename)) {
		scriptTag = content.match(script)?.[1];
		if (!scriptTag) return null;

		source = scriptTag;
	}

	let ast = tsParser.parse(source, {
		locations: true,
		ecmaVersion: "latest",
		sourceFile: filename,
		sourceType: "module",
	});

	const code = new MagicString(source, { filename });

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

	if (!scriptTag) return { code: code.toString() };

	return { code: content.replace(scriptTag, code.toString()) };
}

const svelteFile = /\.svelte(\.ts)?$/;
const callsBind = /(^|[^.\w])bind\(/;

export default () => {
	return /** @satisfies {import("vite").Plugin} */ ({
		name: "vite-plugin-svelte-bind",
		enforce: "pre",
		transform(content, id) {
			if (svelteFile.test(id) && callsBind.test(content)) {
				return expandMacro({
					filename: id,
					content,
				});
			}
		},
	});
};
