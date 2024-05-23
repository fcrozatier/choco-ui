import type { Action } from "svelte/action";

type LongPressOptions<T = HTMLElement> = {
	delay?: number;
	callback?: (node?: T) => void;
};

const defaults = { delay: 500 } satisfies LongPressOptions;

export const longPress = (<T extends HTMLElement>(node: T, options: LongPressOptions<T>) => {
	let timer: ReturnType<typeof setTimeout>;

	const handlePointer = () => {
		timer = setTimeout(() => options.callback?.(node), options.delay ?? defaults.delay);

		node.addEventListener("pointerup", () => {
			clearTimeout(timer);
		});
	};

	node.addEventListener("pointerdown", handlePointer);

	return {
		destroy() {
			node.removeEventListener("pointerdown", handlePointer);
		},
	};
}) satisfies Action<HTMLElement, LongPressOptions<HTMLElement>>;
