import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import targetBlank from "svelte-target-blank";
import choco from "./preprocessor/index.js";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [choco(), vitePreprocess(), targetBlank({ logLevel: "warn", quietList: "/**/*.md" })],

	kit: {
		adapter: adapter(),
	},
};

export default config;
