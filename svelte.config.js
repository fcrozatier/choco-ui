import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import choco from "create-choco/preprocessor";
import targetBlank from "svelte-target-blank";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [choco(), vitePreprocess(), targetBlank({ logLevel: "warn", quietList: "/**/*.md" })],

	kit: {
		adapter: adapter(),
	},
};

export default config;
