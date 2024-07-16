import { sveltekit } from "@sveltejs/kit/vite";
import { autoBind } from "chocobytes/plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [autoBind(), sveltekit()],
  //... rest of your Vite config
});
