import type { Action, ActionReturn } from "svelte/action";
import { Toggler } from "../toggler/toggler.svelte";

// Regarding ARIA you can achieve the same thing with only a checkbox
// https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/pressed/#alternative-technique-using-checkbox

export type ToggleElement = HTMLButtonElement | HTMLInputElement;

export type CreateToggle = { pressed?: boolean };

const defaults = { pressed: false } satisfies CreateToggle;

/**
 * ## Toggle
 *
 * Use on button or input elements.
 *
 * Semantics: pressed, not pressed or partially pressed ("mixed" state)
 *
 * The label should not change when the state changes. Use `simpleToggle` if needed.
 */
export class PressToggle {
	private _pressed = $state(false);
	private toggler: Toggler | undefined;
	element: ToggleElement | undefined = $state();

	constructor(options?: CreateToggle) {
		this._pressed = options?.pressed ?? defaults.pressed;
	}

	public get pressed() {
		return this._pressed;
	}

	public set pressed(v: boolean) {
		if (this._pressed !== v) {
			this._pressed = v;
			this.toggler?.toggle();
		}
	}

	handleClick = () => {
		this._pressed = !this._pressed;
	};

	action = ((node) => {
		this.element = node;

		let cleanup: ActionReturn;
		if (node instanceof HTMLInputElement) {
			node.type = "checkbox";
			this.toggler = new Toggler({ checked: this.pressed }, this.handleClick);
			cleanup = this.toggler.action(node);
		} else if (node instanceof HTMLButtonElement) {
			node.type = "button";
			this.toggler = new Toggler({ "aria-pressed": `${this.pressed}` }, this.handleClick);
			cleanup = this.toggler.action(node);
		}

		return {
			destroy() {
				cleanup?.destroy?.();
			},
		};
	}) satisfies Action<ToggleElement>;
}
