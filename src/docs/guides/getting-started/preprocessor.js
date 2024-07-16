import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import choco from "chocobytes/preprocessor";

export default {
  preprocess: [choco(), vitePreprocess()],
  //... rest of your Svelte config
};
