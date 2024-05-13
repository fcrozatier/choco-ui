import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vitest/config";
import { svelteTesting } from "@testing-library/svelte/vite";

export default defineConfig({
	plugins: [sveltekit(), tailwindcss(), svelteTesting()],

	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
		setupFiles: ["./scripts/vitest-setup.ts"],
		environment: "happy-dom",
	},
});
