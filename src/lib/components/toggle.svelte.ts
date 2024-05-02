import { Extendable } from "$lib/mixins/extendable.svelte";
import { Togglable } from "$lib/mixins/togglable.svelte";
import type { Constructor } from "$lib/mixins/types";
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
};

const defaults = { pressed: false, kind: "press" } satisfies Required<ToggleOptions>;

export class ToggleButton extends Togglable(Extendable(ChocoBase<HTMLButtonElement>)) {
	presssed = this.active; // alias

	constructor(options?: ToggleOptions) {
		const toggleOptions = { ...defaults, ...options };
		let initial;
		if (toggleOptions.kind === "press") {
			initial = { "aria-pressed": `${toggleOptions.pressed}` } as const;
		} else {
			initial = { "aria-checked": `${toggleOptions.pressed}` } as const;
		}

		const attributes = {
			type: "button",
			...(toggleOptions.kind === "switch" ? { role: role.switch } : {}),
		};

		super({ initial, attributes });
	}
}

export const TypedToggle = ToggleButton as unknown as Constructor<
	ToggleButton & InstanceType<ReturnType<typeof Togglable>>,
	Partial<ToggleOptions>
>;

export class SwitchInput extends Togglable(Extendable(ChocoBase<HTMLInputElement>)) {
	constructor(options?: Pick<ToggleOptions, "pressed">) {
		const pressed = options?.pressed ?? defaults.pressed;

		super({
			initial: { "aria-checked": `${pressed}` },
			attributes: { role: role.switch, type: "checkbox" },
		});
	}
}
