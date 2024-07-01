import { error } from "@sveltejs/kit";
import { compile } from "mdsvex";

const guides = import.meta.glob(`/docs/guides/*.md`, {
	eager: true,
	// query: "?raw",
	as: "raw",
	import: "default",
});

export const load = async ({ params }) => {
	for (const [path, content] of Object.entries(guides)) {
		if ("/docs/guides/" + params.slug + ".md" === path) {
			const filename = path.split("/").at(-1);
			const output = await compile(content, { extension: ".md", filename });

			if (!output) return error(404, "Not found");

			return { code: output.code };
		}
	}
	return error(404, "Not found");
};
