import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import targetBlank from "svelte-target-blank";
import choco from "./preprocessor/index.js";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: [choco(), vitePreprocess(), targetBlank({ logLevel: "warn", quietList: "/**/*.md" })],

  compilerOptions: {
    warningFilter: (warning) => {
      if (warning.code === "state_referenced_locally") return false;
    },
  },

  kit: {
    adapter: adapter({
      pages: "build",
      assets: "build",
      precompress: true,
      strict: true,
    }),
    alias: {
      "$components/*": "./src/site/components/*",
      "$docs/*": "./src/docs/*",
    },
  },
};
