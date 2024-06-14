import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import choc from "create-choco/plugin";
import Inspect from "vite-plugin-inspect";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [Inspect(), choc(), sveltekit(), tailwindcss(), svelteTesting()],

	test: {
		include: ["./**/*.{test,spec}.{js,ts}"],
		setupFiles: ["./scripts/vitest-setup.ts"],
		environment: "happy-dom",
	},
});
