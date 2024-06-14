import { walk as estreeWalk } from "estree-walker";
import MagicString from "magic-string";
import { parse } from "svelte/compiler";

/**
 * @param {import("svelte/compiler").Root} ast
 * @param {import(".").WalkerArgs} args
 */
function walk(ast, args) {
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
	});
};
