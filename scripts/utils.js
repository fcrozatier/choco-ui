import { readdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Recursively get all file paths under dir
 * @param {string} dir
 * @param {string[]} files
 * @returns
 */
export function getFiles(dir, files = []) {
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

export const processImports = (content) => {
  return content
    .replaceAll("$lib/utils", "chocobytes/utils")
    .replaceAll("$lib/actions/choco.js", "chocobytes")
    .replaceAll("$lib/actions", "chocobytes/actions")
    .replaceAll("$lib/blocks", "chocobytes/blocks")
    .replaceAll("$lib/headless", "chocobytes/headless")
    .replaceAll("$lib/index.js", "chocobytes");
};
