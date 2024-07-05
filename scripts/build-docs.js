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

  return { meta: metaString, markdown: content.replace(matter, "") };
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

await rm("./docs", { recursive: true, force: true });

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

const files = getFiles("./src/docs");
const highlight = /<Highlighter code="(?<path>[^"]*)" *(?:lang="(?<lang>[^"]*)")? *\/>/;

for (const path of files.filter((file) => file.endsWith(".md"))) {
  if (!path.endsWith("introduction.md")) continue;

  const dest = dirname(path).replace("src", ".") + ".svelte";
  const content = readFileSync(path, { encoding: "utf-8" });

  const { meta, markdown } = frontMatter(content);

  const html = await parseMarkdown(markdown);

  let svelte = html;
  let match;

  while ((match = highlight.exec(svelte))) {
    const code = readFileSync(join(dirname(path), match.groups.path), {
      encoding: "utf-8",
    })
      .replace(/`/g, "\\`")
      .replace(/\$\{/g, "\\${");

    svelte = svelte.replace(
      highlight,
      `<Highlighter code={\`\n${code}\n\`} lang='${match.groups?.lang ?? "svelte"}'></Highlighter>`,
    );
  }

  const comment = `<!-- Generated file from ${path} -- do not modify -->`;

  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, comment + meta + svelte, { encoding: "utf-8" });
}
