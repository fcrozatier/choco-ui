import { autoBind } from "#plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [/**Inspect()*/ autoBind(), sveltekit(), tailwindcss(), svelteTesting()],

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
