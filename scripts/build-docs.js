import rehypeShiki from "@shikijs/rehype";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { mkdir, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import rehypeKatex from "rehype-katex";
import rehypeStringify from "rehype-stringify";
import remarkGFM from "remark-gfm";
import remarkMath from "remark-math";
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
		.use(remarkMath)
		.use(smartyPants)
		.use(remarkRehype, { allowDangerousHtml: true })
		.use(rehypeKatex, { output: "mathml" })
		.use(rehypeShiki, { theme: "poimandres" })
		.use(rehypeStringify, { allowDangerousCharacters: true, allowDangerousHtml: true })
		.process(content);
	return processor.toString();
}

/**
 * Replace characters with HTML entities.
 * @param {string} content
 */
// function escapeHtml(content) {
// 	content = content.replace(/{/g, "&#123;").replace(/}/g, "&#125;");

// 	const componentRegex = /<[A-Z].*/g;
// 	const components = content.match(componentRegex);
// 	components?.forEach((component) => {
// 		const replaced = component.replace("&#123;", "{").replace("&#125;", "}");
// 		content = content.replace(component, replaced);
// 	});

// 	return content;
// }

const isMarkdownFile = /\.md$/;
const isDocsFile = /\/docs\//;
export const md = () => {
	return /** @satisfies {import("svelte/compiler").PreprocessorGroup} */ {
		name: "MD preprocessor",
		markup: async ({ content, filename }) => {
			if (!filename || !isMarkdownFile.test(filename) || !isDocsFile.test(filename)) {
				return { code: content };
			}

			const { meta, markdown } = frontMatter(content);
			const html = await parseMarkdown(markdown);
			return { code: meta + html };
		},
	};
};

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

for (const path of files.filter((file) => file.endsWith(".md"))) {
	if (!path.endsWith("introduction.md")) continue;

	const dest = dirname(path).replace("src", ".") + ".svelte";
	const content = readFileSync(path, { encoding: "utf-8" });

	const { meta, markdown } = frontMatter(content);
	const html = await parseMarkdown(markdown);
	const comment = `<!-- Generated file from ${path} :: Do not modify -->`;

	mkdirSync(dirname(dest), { recursive: true });
	writeFileSync(dest, comment + meta + html, { encoding: "utf-8" });
}
