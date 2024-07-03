import { error } from "@sveltejs/kit";

const guides = import.meta.glob(`/docs/guides/*.md`);

export const load = async ({ params }) => {
	const path = "/docs/guides/" + params.slug + ".md";

	if (!Object.keys(guides).includes(path)) return error(404, "Not found");

	// const module = await guides[path]?.();
	const module = await import(`../../../../docs/guides/${params.slug}.md`);
	console.log("module:", module);

	return { meta: module.meta, content: module.default };
};
