import type { Plugin } from "vite";
import { expand } from "./transformer.js";

const script = /<script.*>((.|\r?\n)*)<\/script>/;
const svelte = /\.svelte$/;
const svelteModule = /\.svelte(\.ts)?$/;
const callsBind = /(^|[^.\w])bind\(/;

export const expandMacro = ({ filename, content }: { filename: string; content: string }) => {
	let scriptTag: string | undefined;
	let source = content;

	if (svelte.test(filename)) {
		scriptTag = content.match(script)?.[1];
		if (!scriptTag) return null;

		source = scriptTag;
	}

	const code = expand({ filename, content: source });

	if (!scriptTag) return { code };

	return { code: content.replace(scriptTag, code) };
};

export const autoBind = () => {
	return {
		name: "vite-plugin-bind",
		enforce: "pre",
		transform(content, id) {
			if (svelteModule.test(id) && callsBind.test(content)) {
				return expandMacro({
					filename: id,
					content,
				});
			}
		},
	} satisfies Plugin;
};
