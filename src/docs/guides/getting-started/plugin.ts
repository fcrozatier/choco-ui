import { sveltekit } from "@sveltejs/kit/vite";
import { chocoBind } from "chocobytes/plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [chocoBind(), sveltekit()],
  //... rest of your Vite config
});
