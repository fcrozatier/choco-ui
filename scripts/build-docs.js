import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import rehypeStringify from "rehype-stringify";
import remarkGFM from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import smartyPants from "remark-smartypants";
import { unified } from "unified";

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
  <script context="module">
    export const meta = ${JSON.stringify(meta)}
  </script>
  `;

  return { meta: metaString, code: content.replace(matter, "") };
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

/**
 * Recursively get all file paths under dir
 * @param {string} dir
 * @param {string[]} files
 * @returns
 */
function getFiles(dir, files = []) {
  let items = readdirSync(dir, { withFileTypes: true });

  for (const file of items) {
    let path = join(dir, file.name);
    if (file.isDirectory()) {
      getFiles(path, files);
    } else {
      files.push(path);
    }
  }
  return files;
}

const api =
  /<API (?=.*file="(?<file>.*?)")(?=.*type="(?<type>.*?)")(?=(?:.*bindable={(?<bindable>true|false)})?)(?=(?:.*defaults={(?<defaults>true|false)})?).*\/>/;

const bindableOptions = /type BindableOptions = (?<bindable>.*);/;
const defaultsRegex = /const defaults = (?<defaults>{.*?})( satisfies.*)?;/s;
const isOptional = /\?$/;

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
    const { type, bindable, defaults } = match.groups;

    const file = readFileSync(dirname(path).replace("docs", "lib") + ".svelte.ts", {
      encoding: "utf-8",
    });

    let bindableKeys = /** @type {string[]} */ ([]);
    let defaultValues = {};
    let types =
      /** @type {{key: string; type: string; optional: boolean; default: string; description: string }[]} */ ([]);

    if (bindable === "true") {
      const bindableMatch = file.match(bindableOptions);
      if (!bindableMatch) throw new Error("Cannot find BindableOptions type");

      bindableKeys = bindableMatch.groups.bindable
        .replace(/"/g, "")
        .split("|")
        .map((item) => item.trim());
    }

    if (defaults === "true") {
      const defaultsMatch = file.match(defaultsRegex);

      if (!defaultsMatch) throw new Error("Cannot find default values");

      defaultValues = eval("const defaults = " + defaultsMatch.groups.defaults + "; defaults");
    }

    const typeRegex = new RegExp(`${type} = {(?<type>.*?)};`, "s");
    const typeMatch = file.match(typeRegex);

    if (!typeMatch) throw new Error("Couldn't find the types");

    for (const item of typeMatch.groups.type.trim().split(";")) {
      if (item === "") continue;

      const lines = item
        .trim()
        .split("\n")
        .map((line) => line.trim());

      let description = "";
      if (lines.length > 3) {
        description = lines
          .slice(1, -2)
          .map((line) => line.replace(/^\*\s*/, ""))
          .join("\n");
      }

      const [name, type] = lines
        .at(-1)
        .split(":")
        .map((i) => i.trim());
      const optional = isOptional.test(name);
      const key = optional ? name.slice(0, -1) : name;

      types.push({
        key,
        optional,
        type,
        bindable: bindableKeys.includes(key),
        default: defaultValues[key] ?? "",
        description,
      });
    }

    const table =
      apiHeader +
      types.reduce(
        (p, c) =>
          p +
          `|${c.key}|${JSON.stringify(c.default).replace("{", "$left-brace;").replace("}", "$right-brace;").replace('""', "-")}|${c.type.replace("|", "&#124;")}|${c.description}|\n`,
        "",
      );

    md = md.replace(api, table);
  }
  return md;
}

const highlight = /<Highlighter code="(?<path>[^"]*)" *\/>/;
const demo = /<Demo file="(?<file>[^"]*)" *\/>/;
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
      .replace(/\$\{/g, "\\${");

    const lang = codePath.split(".").at(-1);

    if (!["svelte", "ts"].includes(lang)) throw new Error("Unrecognized code snippet language");

    svelte = svelte.replace(
      highlight,
      `<Highlighter code={\`\n${code}\n\`} lang="${lang}"></Highlighter>`,
    );
  }
  match = null;

  while ((match = demo.exec(svelte))) {
    const importPath = join(dirname(path), match.groups.file);
    const importName = match.groups.file.split(".")[0];
    const importString = `import ${importName} from "${importPath}";\n`;
    const scriptTagIndex = svelte.match(scriptTag).index;

    if (scriptTagIndex === undefined) throw new Error("Missing script tag");
    const index = svelte.indexOf(">", scriptTagIndex) + 1;

    const code = readFileSync(importPath, {
      encoding: "utf-8",
    })
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${");

    svelte = svelte.slice(0, index) + "\n" + importString + svelte.slice(index);
    svelte = svelte.replace(demo, `<Demo code={\`\n${code}\n\`} component={${importName}}></Demo>`);
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

  const { meta, code } = frontMatter(content);

  const markdown = preprocessMarkdown(code, path);
  const html = await parseMarkdown(markdown);
  const svelte = postprocessHTML(html, path);
  const comment = `<!-- Generated file from ${path} -- do not modify -->`;

  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, comment + meta + svelte, { encoding: "utf-8" });
}
