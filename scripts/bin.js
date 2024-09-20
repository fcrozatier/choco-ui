#!/usr/bin/env node

import * as p from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";
import { getFiles, processImports } from "./utils.js";

let cwd = process.cwd();

p.intro("Welcome to chocobytes!");

const source = "./node_modules/chocobytes/src/lib/components";

const components = fs
  .readdirSync(source)
  .filter((name) => fs.statSync(`${source}/${name}`).isDirectory());

const choices = await p.multiselect({
  message: "Select components to copy to your project's folder (use arrow keys/space bar)",
  required: false,
  options: components.map((c) => ({ value: c })),
});

if (p.isCancel(choices)) process.exit(1);

for (const component of components) {
  if (choices.includes(component)) {
    const target = path.join(cwd, `src/lib/components/${component}`);

    if (fs.existsSync(target)) {
      if (fs.readdirSync(cwd).length > 0) {
        const force = await p.confirm({
          message: `Your 'src/lib/components/${component}' directory is not empty. Continue? (yes: override, no: skip)`,
          initialValue: false,
        });

        // bail if `force` is `false` or the user cancelled with Ctrl-C
        if (force === false) {
          continue;
        } else if (!force) {
          process.exit(1);
        }
      }
    }

    fs.cpSync(path.join(source, component), target, { recursive: true }, (err) =>
      console.error(err),
    );

    const files = getFiles(target);

    for (const path of files) {
      const file = processImports(fs.readFileSync(path, { encoding: "utf-8" }));

      fs.writeFileSync(path, file, { encoding: "utf-8" });
    }
  }
}

p.outro("Your project is ready! 🚀");
