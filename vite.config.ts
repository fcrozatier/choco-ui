import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { autoSync } from "choco-ui/plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [, /**Inspect()*/ autoSync(), sveltekit(), tailwindcss(), svelteTesting()],

	test: {
		include: ["./**/*.{test,spec}.{js,ts}"],
		setupFiles: ["./scripts/vitest-setup.ts"],
		environment: "happy-dom",
	},
});
