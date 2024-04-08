import { key } from "$lib/utils/keyboard";
import type { Action } from "svelte/action";
import { nanoId } from "$lib/utils/nano";

export const createExpandToggle = (options?: { expanded?: boolean }) => {
	const controls = nanoId();
	let expanded: boolean = $state(options?.expanded ?? false);
	let element: HTMLElement | undefined;

	const handleClick = () => {
		expanded = !expanded;
		updateAttributes();
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === key.ENTER || e.key === key.SPACE) handleClick();
	};

	const updateAttributes = () => {
		element?.setAttribute("aria-expanded", String(expanded));
	};

	return {
		controls,

		get expanded() {
			return expanded;
		},

		set expanded(newVal) {
			expanded = newVal;
			updateAttributes();
		},

		action: ((node) => {
			element = node;
			node.setAttribute("aria-expanded", String(expanded));
			node.setAttribute("aria-controls", controls);

			node.addEventListener("click", handleClick);
			node.addEventListener("keydown", handleKeydown);

			return {
				destroy() {
					node.removeEventListener("click", handleClick);
					node.removeEventListener("keydown", handleKeydown);
				},
			};
		}) satisfies Action,
	};
};
