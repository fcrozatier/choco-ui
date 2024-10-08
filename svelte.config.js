import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import targetBlank from "svelte-target-blank";
import { chocoPreprocess } from "./preprocessor/index.js";

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: [
    chocoPreprocess(),
    vitePreprocess({ script: true }),
    targetBlank({ logLevel: "warn", quietList: "/**/*.md" }),
  ],

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
      "chocobytes/*": "./src/lib/*",
    },

    prerender: {
      handleHttpError: "warn",
    },
  },
};
