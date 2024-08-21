#!/usr/bin/env node

import * as p from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";

let cwd = process.cwd();

p.intro("Welcome to chocobytes!");

const confirm = await p.confirm({
  message:
    "You're about to copy the components, headless and mixin files from chocobytes to your project. Continue?",
  initialValue: false,
});

if (!confirm || p.isCancel(confirm)) process.exit(1);

const source = "./node_modules/chocobytes/src/lib/";

for (const value of ["components", "headless", "mixins"]) {
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

  const file = fs
    .readFileSync(path.join(source, value), { encoding: "utf-8" })
    .replaceAll("$lib/utils", "chocobytes/utils");

  fs.writeFileSync(target, file, { encoding: "utf-8" });
  // fs.cpSync(path.join(source, value), target, { recursive: true }, (err) => console.error(err));
}

p.outro("Your project is ready! 🚀");
