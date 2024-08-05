import { walk } from "estree-walker";
import MagicString from "magic-string";
import { parse } from "svelte/compiler";

export const chocoPreprocess = () => {
  return /** @satisfies {import("svelte/compiler").PreprocessorGroup} */ ({
    name: "Choco preprocessor",
    markup: ({ content, filename }) => {
      if (!/use:choco=/.test(content)) return { code: content };

      const s = new MagicString(content, { filename });
      const ast = parse(content, { filename, modern: true });

      walk(ast, {
        enter(node) {
          if (node.type === "UseDirective" && node.name === "choco" && node.expression) {
            const expression = /** @type {import("svelte/compiler").BaseNode} */ (node.expression);
            const stringExp = s.slice(expression.start, expression.end);

            s.update(node.start, node.end, `{...${stringExp}.attributes} use:${stringExp}.action`);
          }
        },
      });

      return { code: s.toString(), map: s.generateMap() };
    },
  });
};
