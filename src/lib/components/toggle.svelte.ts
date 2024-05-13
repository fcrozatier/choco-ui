import { Togglable } from "$lib/mixins/togglable.svelte";
import { ChocoBase, type Attributes } from "./base.svelte";

export type ToggleOptions = {
	/**
	 * Whether the toggle is initially pressed or not. Defaults to `false`
	 */
	pressed?: boolean;
	value?: string;
};

const defaults = { pressed: false, value: "" } satisfies Required<ToggleOptions>;

export class ToggleButton extends Togglable<HTMLButtonElement>(ChocoBase) {
	value = $derived(this.attributes?.value); // alias

	constructor(options?: ToggleOptions) {
		super();
		const toggleOptions: Required<ToggleOptions> = { ...defaults, ...options };
		let initial = { "aria-pressed": `${toggleOptions.pressed}` } as const;

		const attributes: Attributes = {
			type: "button",
			value: options?.value ?? undefined,
		};

		this.extendAttributes(attributes);
		this.initTogglable({ initial, active: toggleOptions.pressed });
	}
}
