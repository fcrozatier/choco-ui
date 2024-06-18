import * as acorn from "acorn";
import { tsPlugin } from "acorn-typescript";
import { walk } from "estree-walker";
import MagicString from "magic-string";

const tsParser = acorn.Parser.extend(tsPlugin({ allowSatisfies: true, dts: false }));

const script = /<script.*>((.|\r?\n)*)<\/script>/;
const svelte = /\.svelte$/;
const svelteModule = /\.svelte(\.ts)?$/;
const callsBind = /(^|[^.\w])bind\(/;

/**
 * @type {typeof import(".").expandMacro}
 */
export function expandMacro({ filename, content }) {
	/** @type {string|undefined} */
	let scriptTag;
	let source = content;

	if (svelte.test(filename)) {
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
				node.arguments.length >= 1
			) {
				const [object, array] = node.arguments;

				if (object.type !== "ObjectExpression") {
					throw new Error("bind's first argument must be an object literal");
				}
				if (array && array.type !== "ArrayExpression") {
					throw new Error("bind's second argument must be an array literal");
				}
				if (
					array?.elements?.length > 0 &&
					!array.elements.every((el) => el.type === "Literal" && typeof el.value === "string")
				) {
					throw new Error("bind's second argument must be an array of string literals");
				}
				/** @type {string[] | undefined} */
				const keys = array?.elements?.map((e) => e.type === "Literal" && e.value);

				for (const property of object.properties) {
					if (property.type !== "Property") continue;

					/** @type {string} */
					let name;

					switch (property.key.type) {
						case "Identifier":
							name = property.key.name;
							break;
						case "Literal":
							name = "'" + property.key.value + "'";
							break;
						default:
							continue;
					}

					if (keys?.includes(property.key.name)) {
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
					} else {
						if (property.shorthand) {
							code.update(property.start, property.end, `get ${name}(){return ${name}}`);
						} else {
							const { value } = property;

							code.update(
								property.start,
								property.end,
								`get ${name}(){return ${code.slice(value.start, value.end)}}`,
							);
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

export default () => {
	return /** @satisfies {import("vite").Plugin} */ ({
		name: "vite-plugin-svelte-bind",
		enforce: "pre",
		transform(content, id) {
			if (svelteModule.test(id) && callsBind.test(content)) {
				return expandMacro({
					filename: id,
					content,
				});
			}
		},
	});
};
