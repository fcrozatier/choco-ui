import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { spawn } from "node:child_process";
import path from "node:path";
import { type Plugin } from "vite";
import { defineConfig } from "vitest/config";

const watchDocs = {
  name: "watch-and-build-docs",
  configureServer(server) {
    server.watcher.on("change", (p) => {
      const isDocsPath = !path.relative("src/docs", p).startsWith("..");
      if (isDocsPath) {
        spawn("pnpm", ["build:docs"]).on("error", (e) => {
          console.log("error in spawned process", e);
        });
      }
    });
  },
} satisfies Plugin;

export default defineConfig({
  plugins: [sveltekit(), tailwindcss(), svelteTesting(), watchDocs],

  build: {
    target: "es2022",
  },

  test: {
    include: ["./**/*.{test,spec}.{js,ts}"],
    setupFiles: ["./scripts/vitest-setup.ts"],
    environment: "happy-dom",
  },

  server: {
    fs: {
      allow: [path.resolve(".")],
    },
  },
});
