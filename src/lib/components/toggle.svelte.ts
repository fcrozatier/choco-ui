import { Togglable } from "$lib/mixins/togglable.svelte";
import { role } from "$lib/utils/roles";
import { ChocoBase } from "./base.svelte";

export type ToggleOptions = {
	/**
	 * Whether the toggle is initially pressed or not. Defaults to `false`
	 */
	pressed?: boolean;
	/**
	 * Whether the toggle is a press toggle or a switch toggle. Defaults to `press`
	 */
	kind?: "press" | "switch";
	value?: string;
};

const defaults = { pressed: false, kind: "press", value: "" } satisfies Required<ToggleOptions>;

export class ToggleButton extends Togglable(ChocoBase<HTMLButtonElement>) {
	presssed = $derived(this.active); // alias

	constructor(options?: ToggleOptions) {
		super();
		const toggleOptions = { ...defaults, ...options };
		let initial;
		if (toggleOptions.kind === "press") {
			initial = { "aria-pressed": `${toggleOptions.pressed}` } as const;
		} else {
			initial = { "aria-checked": `${toggleOptions.pressed}` } as const;
		}

		const attributes = {
			type: "button",
			value: options?.value ?? undefined,
			role: toggleOptions.kind === "switch" ? role.switch : undefined,
		};

		this.extendAttributes(attributes);
		this.initTogglable({ initial, active: toggleOptions.pressed });
	}
}

export class SwitchInput extends Togglable(ChocoBase<HTMLInputElement>) {
	constructor(options?: Pick<ToggleOptions, "pressed">) {
		super();

		const pressed = options?.pressed ?? defaults.pressed;
		const attributes = { role: role.switch, type: "checkbox" };
		const initial = { "aria-checked": `${pressed}` } as const;

		this.extendAttributes(attributes);
		this.initTogglable({ initial });
	}
}
