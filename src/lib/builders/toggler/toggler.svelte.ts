import { toggleValues, updateElement } from "$lib/internal/helpers";
import type { Action } from "svelte/action";
import type { Booleanish } from "svelte/elements";

type TogglerOptions = {
	control: Record<string, Booleanish>;
	target?: Record<string, Booleanish>;
	/**
	 * Whether the initial state is the active state. (Optional)
	 */
	active?: boolean;
	onToggle?: (node: HTMLElement) => void;
};

export type Toggler = ReturnType<typeof createToggler>;

export const createToggler = (options: TogglerOptions) => {
	let active = $state(
		options.active ?? Object.values(options.control).every((v) => v === "true" || v === true),
	);
	let controlState = $state(options.control);
	let targetState = $state(options.target);

	let controlElement: HTMLElement | undefined = $state();
	let targetElement: HTMLElement | undefined = $state();

	const toggle = () => {
		active = !active;

		toggleValues(controlState);
		if (targetState) {
			toggleValues(targetState);
		}

		if (options.onToggle && controlElement) {
			options.onToggle(controlElement);
		}
	};

	const on = () => {
		if (!active) {
			toggle();
		}
	};

	const off = () => {
		if (active) {
			toggle();
		}
	};

	const update = () => {
		console.log("toggler update");
		updateElement(controlElement, controlState);
		updateElement(targetElement, targetState);
	};

	$effect(() => {
		console.log("toggler effect");
		// Initialize + keep node in sync after state change (click or programmatic)
		update();
	});

	const control = ((node) => {
		controlElement = node;

		node.addEventListener("click", toggle);

		return {
			destroy() {
				node.removeEventListener("click", toggle);
			},
		};
	}) satisfies Action;

	const target = ((node) => {
		targetElement = node;
	}) satisfies Action;

	return {
		control,
		target,
		toggle,
		update,
		on,
		off,
		get controlElement() {
			return controlElement;
		},
		get targetElement() {
			return targetElement;
		},
		get active() {
			return active;
		},
	};
};
