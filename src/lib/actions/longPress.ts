import type { Timeout } from "$lib/mixins/types";
import { events } from "$lib/utils/events";
import type { Action } from "svelte/action";

type LongPressOptions = {
	delay?: number;
	callback: (e: Event) => void;
};

const DEFAULT_DELAY = 1000;

/**
 * Fire a callback after a delay (default 1s)
 */
export const longPress = (<T extends HTMLElement>(node: T, options: LongPressOptions) => {
	let timer: Timeout;

	const handlePointer = () => {
		timer = setTimeout(
			() => options.callback(new Event(events.longpress)),
			options.delay ?? DEFAULT_DELAY,
		);

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
}) satisfies Action<HTMLElement, LongPressOptions>;
