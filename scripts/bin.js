#!/usr/bin/env node

import * as p from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";
import { getFiles, processImports } from "./utils.js";

let cwd = process.cwd();

p.intro("Welcome to chocobytes!");

const files = await p.confirm({
  message: "You're about to copy the component files from chocobytes to your project. Continue?",
  initialValue: false,
});

if (!files || p.isCancel(files)) process.exit(1);

const source = "./node_modules/chocobytes/src/lib/";

for (const value of ["components"]) {
  const target = path.join(cwd, `src/lib/${value}`);

  if (fs.existsSync(target)) {
    if (fs.readdirSync(cwd).length > 0) {
      const force = await p.confirm({
        message: `Your 'src/lib/${value}' directory is not empty. Continue?`,
        initialValue: false,
      });

      // bail if `force` is `false` or the user cancelled with Ctrl-C
      if (force !== true) {
        process.exit(1);
      }
    }
  }

  fs.cpSync(path.join(source, value), target, { recursive: true }, (err) => console.error(err));

  const files = getFiles(target);

  for (const path of files) {
    const file = processImports(fs.readFileSync(path, { encoding: "utf-8" }));

    fs.writeFileSync(path, file, { encoding: "utf-8" });
  }
}

p.outro("Your project is ready! 🚀");
