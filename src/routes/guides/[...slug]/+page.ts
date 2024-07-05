import { error } from "@sveltejs/kit";

const guides = import.meta.glob("/docs/guides/*.svelte");

export const load = async ({ params }) => {
  const path = "/docs/guides/" + params.slug + ".svelte";

  if (!Object.keys(guides).includes(path)) return error(404, "Not found");

  const module = (await guides[path]?.()) as any;

  return { content: module.default };
};
