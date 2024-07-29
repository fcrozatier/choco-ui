import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { chocoPreprocess } from "chocobytes/preprocessor";

export default {
  preprocess: [chocoPreprocess(), vitePreprocess()],
  //... rest of your Svelte config
};
