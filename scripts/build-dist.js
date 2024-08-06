import { chocoBind } from "#plugin";
import { readFileSync, writeFileSync } from "node:fs";
import { getFiles } from "./build-docs.js";

const files = getFiles("./dist").filter(
  (file) => file.endsWith(".svelte") || file.endsWith(".svelte.js"),
);
const { transform } = chocoBind();

for (const path of files) {
  const content = readFileSync(path, { encoding: "utf-8" });
  const code = transform(content, path)?.code;

  if (code) {
    writeFileSync(path, code, { encoding: "utf-8" });
  }
}
