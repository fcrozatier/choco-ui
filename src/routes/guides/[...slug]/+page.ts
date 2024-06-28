const guides = import.meta.glob(`/docs/guides/*.md`, {
	eager: true,
	query: "?raw",
	import: "default",
});

export const load = async ({ params }) => {
	for (const [path, content] of Object.entries(guides)) {
		if ("/docs/guides/" + params.slug + ".md" === path) {
			return { content };
		}
	}
};
