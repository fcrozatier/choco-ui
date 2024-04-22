import { updateElement } from "$lib/internal/helpers";
import type { Action } from "svelte/action";
import type { Booleanish } from "svelte/elements";

type TogglerOptions = Record<string, Booleanish | undefined>;

export class Toggler {
	state: TogglerOptions | undefined = $state();
	node: HTMLElement | undefined = $state();
	onToggle: (() => void) | undefined;

	constructor(initial?: TogglerOptions, onToggle?: () => void) {
		this.state = initial;
		this.onToggle = onToggle;
	}

	toggle = () => {
		for (const key in this.state) {
			const val = this.state[key];

			switch (typeof val) {
				case "boolean":
					this.state[key] = !this.state[key];
					break;
				case "string":
					this.state[key] = String(val === "false") as "true" | "false";
					break;
			}
		}

		if (this.onToggle) {
			this.onToggle();
		}
	};

	update() {
		console.log("toggler update");
		updateElement(this.node, this.state);
	}

	action = ((node) => {
		this.node = node;

		$effect(() => {
			console.log("toggler effect");
			// Initialize + keep node in sync after state change (click or programmatic)
			this.update();
		});

		const toggle = this.toggle;
		node.addEventListener("click", toggle);

		return {
			destroy() {
				node.removeEventListener("click", toggle);
			},
		};
	}) satisfies Action;
}
