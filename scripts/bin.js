#!/usr/bin/env node

import * as p from "@clack/prompts";
import fs from "node:fs";
import path from "node:path";

let cwd = process.cwd();

p.intro("Welcome to chocobytes!");

const options = await p.multiselect({
  message: "Select the choco files to copy to your project (use arrow keys/space bar)",
  required: true,
  options: [
    {
      value: "components",
      label: "Component files",
    },
    {
      value: "headless",
      label: "Headless files",
    },
  ],
});

if (p.isCancel(options)) process.exit(1);

const source = "./node_modules/chocobytes/src/lib/";

for (const value of ["components", "headless"]) {
  if (options.includes(value)) {
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
  }
}

p.outro("Your project is ready! 🚀");
