import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import * as prettier from "prettier";
import rehypeStringify from "rehype-stringify";
import remarkGFM from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import smartyPants from "remark-smartypants";
import { unified } from "unified";
import { getFiles, processImports } from "./utils.js";

const matter = /^---(?<matter>(.|\n)*?)---/;

/**
 * Parse the frontMatter of an .md file
 * @param {string} content
 */
function frontMatter(content) {
  const match = content.match(matter);
  if (!match || !match.groups?.matter) throw new Error("Missing frontmatter");

  const meta = Object.fromEntries(
    match.groups.matter
      .split("\n")
      .filter((line) => line !== "")
      .map((line) => line.split(":").map((keyOrValue) => keyOrValue.trim())),
  );

  const metaString = `
  <script module>
    export const meta = ${JSON.stringify(meta)}
  </script>
  `;

  const head = `<svelte:head><title>${meta.title} &middot; ChocoUI</title></svelte:head>`;

  return { meta: metaString, head, code: content.replace(matter, "") };
}

/**
 * @param {string} content
 */
async function parseMarkdown(content) {
  const processor = await unified()
    .use(remarkParse)
    .use(remarkGFM)
    .use(smartyPants)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeStringify, { allowDangerousCharacters: true, allowDangerousHtml: true })
    .process(content);
  return processor.toString();
}

const api = /<API (?=.*file="(?<file>.*?)")(?=.*type="(?<type>.*?)").*\/>/;

const defaultsRegex = /const defaults = (?<defaults>{.*?})( satisfies.*)?;/s;

const apiHeader = `
|Prop|Default|Type|Description|
|----|-------|----|-----------|
`;

/**
 *
 * @param {string} md
 * @param {string} path
 */
function preprocessMarkdown(md, path) {
  const match = md.match(api);
  if (match) {
    const { type } = match.groups;

    const file = readFileSync(
      dirname(path).replace("docs", "lib").replace("components", "headless") + ".svelte.ts",
      {
        encoding: "utf-8",
      },
    );

    let types =
      /** @type {{key: string; type: string; optional: boolean; default: string; description: string }[]} */ ([]);

    // Defaults
    let defaultValues = {};
    const defaultsMatch = file.match(defaultsRegex);

    if (!defaultsMatch) throw new Error("Cannot find default values");

    defaultValues = eval("const defaults = " + defaultsMatch.groups.defaults + "; defaults");

    // Type
    const typeRegex = new RegExp(`${type} = {(?<type>.*?)};`, "s");
    const typeMatch = file.match(typeRegex);

    if (!typeMatch)
      throw new Error(
        `Couldn't find the types in ${dirname(path).replace("docs", "lib").replace("components", "headless") + ".svelte.ts"}`,
      );

    for (const item of typeMatch.groups.type.trim().split(";")) {
      if (item === "") continue;

      const lines = item
        .trim()
        .split("\n")
        .map((line) => line.trim());

      // Description
      let description = "";
      if (lines[0] === "/**") {
        description = lines
          .slice(1, -2)
          .map((line) => line.replace(/^\*\s*/, ""))
          .join("\n");
      }

      const data = lines.at(-1);
      const match = data.match(/\??:/);
      const name = data.slice(0, match.index).trim();
      const type = data.slice(match.index + match[0].length).trim();

      types.push({
        key: name,
        optional: true,
        type,
        default: defaultValues[name] ?? "",
        description,
      });
    }

    const table =
      apiHeader +
      types.reduce(
        (p, c) =>
          p +
          `|${c.key}|${JSON.stringify(c.default).replace("{", "$left-brace;").replace("}", "$right-brace;").replace('""', "-")}|${c.type?.replace("|", "&#124;")}|${c.description}|\n`,
        "",
      );

    md = md.replace(api, table);
  }
  return md;
}

const highlight = /<Highlighter file="(?<path>[^"]*)" *\/>/;
const demo = /<Demo (?<params>.*?) *\/>/;
const scriptTag = /<script (?!context=).*>/;

/**
 *
 * @param {string} html
 * @param {string} path
 */
function postprocessHTML(html, path) {
  let match;
  let svelte = html;

  while ((match = highlight.exec(svelte))) {
    const codePath = join(dirname(path), match.groups.path);
    const code = readFileSync(codePath, {
      encoding: "utf-8",
    })
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${")
      .replace(/<\/script>/g, "<\\/script>");
    const lang = codePath.split(".").at(-1);

    if (!["svelte", "ts", "js", "sh"].includes(lang))
      throw new Error("Unrecognized code snippet language");

    svelte = svelte.replace(
      highlight,
      `<Highlighter code={\`${processImports(code)}\`} lang="${lang}"></Highlighter>`,
    );
  }
  match = null;

  while ((match = demo.exec(svelte))) {
    const { file, value } = Object.fromEntries(
      match.groups.params
        .replaceAll('"', "")
        .split(" ")
        .map((p) => p.split("=")),
    );

    const importPath = join(dirname(path), file);
    const importName = file.replace("./", "").split(".")[0];
    const importString = `import ${importName} from "${importPath}";\n`;
    const scriptTagIndex = svelte.match(scriptTag).index;

    if (scriptTagIndex === undefined) throw new Error("Missing script tag");
    const index = svelte.indexOf(">", scriptTagIndex) + 1;

    const code = readFileSync(importPath, { encoding: "utf-8" })
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${")
      .replace(/<\/script>/g, "<\\/script>");
    svelte = svelte.slice(0, index) + "\n" + importString + svelte.slice(index);
    svelte = svelte.replace(
      demo,
      `<Demo code={\`\n${processImports(code)}\n\`} Component={${importName}} value="${value ?? "result"}"></Demo>`,
    );
  }

  return svelte
    .replace(/src\/docs/g, "$docs")
    .replace(/\$left-brace;/g, "&lbrace;")
    .replace(/\$right-brace;/g, "&rbrace;");
}

await rm("./docs", { recursive: true, force: true });

const files = getFiles("./src/docs");

for (const path of files.filter((file) => file.endsWith(".md"))) {
  const dest = dirname(path).replace("src", ".") + ".svelte";
  const content = readFileSync(path, { encoding: "utf-8" });

  const { meta, head, code } = frontMatter(content);

  const markdown = preprocessMarkdown(code, path);
  const html = await parseMarkdown(markdown);
  const svelte = postprocessHTML(html, path);
  const comment = `<!-- Generated from ${path} -->`;
  const text = comment + meta + head + svelte;
  const config = await prettier.resolveConfig(dest, { config: ".prettierrc", useCache: true });
  const formatted = await prettier.format(text, config);

  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, formatted, { encoding: "utf-8" });
}
