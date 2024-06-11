import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import type { Plugin } from "vite";
import { defineConfig } from "vitest/config";
import { script } from "./src/lib/preprocessor";

function svelteBinding() {
	return {
		name: "svelte-binding",
		transform(code, id) {
			if (!id.endsWith(".svelte.ts")) return { code };

			const { code: after } = script({
				content: code,
				filename: id,
				attributes: {},
				markup: "",
			});

			return { code: after };
		},
	} satisfies Plugin;
}

export default defineConfig({
	plugins: [svelteBinding(), sveltekit(), tailwindcss(), svelteTesting()],

	test: {
		include: ["src/**/*.{test,spec}.{js,ts}"],
		setupFiles: ["./scripts/vitest-setup.ts"],
		environment: "happy-dom",
	},
});
