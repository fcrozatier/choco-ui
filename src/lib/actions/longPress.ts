import type { Action } from "svelte/action";

type LongPressOptions<T = HTMLElement> = {
	delay?: number;
	callback: (node?: T) => void;
};

const DEFAULT_DELAY = 1000;

/**
 * Fire a callback after a delay (default 1s)
 */
export const longPress = (<T extends HTMLElement>(node: T, options: LongPressOptions<T>) => {
	let timer: ReturnType<typeof setTimeout>;

	const handlePointer = () => {
		timer = setTimeout(() => options.callback(node), options.delay ?? DEFAULT_DELAY);

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
