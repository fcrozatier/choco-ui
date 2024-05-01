import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import targetBlank from "svelte-target-blank";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), targetBlank({ logLevel: "warn", quietList: "/**/*.md" })],

	kit: {
		adapter: adapter(),
	},
};

export default config;
