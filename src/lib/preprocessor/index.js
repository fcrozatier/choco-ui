import { walk as estreeWalk } from "estree-walker";
import MagicString from "magic-string";
import { parse } from "svelte/compiler";

/**
 * @param ast {import("svelte/compiler").Root}
 * @param args {import("./preprocessor").WalkerArgs}
 */
export function walk(ast, args) {
	// @ts-expect-error estree-walker doesn't want Svelte Ast type
	return estreeWalk(ast, args);
}

/** @type {() => import("svelte/compiler").PreprocessorGroup} */
export default () => {
	return {
		name: "Choco preprocessor",
		markup: ({ content, filename }) => {
			if (!/use:choco=/.test(content)) return { code: content };

			const markup = new MagicString(content, { filename });
			const ast = parse(content, { filename, modern: true });

			walk(ast, {
				enter(node) {
					if (node.type === "UseDirective" && node.name === "choco" && node.expression) {
						const expression = markup.slice(node.expression.start, node.expression.end);

						markup.update(
							node.start,
							node.end,
							`{...${expression}.attributes} use:${expression}.action`,
						);
					}
				},
			});

			return { code: markup.toString() };
		},
	};
};
