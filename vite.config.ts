import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { defineConfig } from "vitest/config";
import choc from "./src/lib/plugin/plugin.js";

export default defineConfig({
	plugins: [choc(), sveltekit(), tailwindcss(), svelteTesting()],

	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
		setupFiles: ["./scripts/vitest-setup.ts"],
		environment: "happy-dom",
	},
});
