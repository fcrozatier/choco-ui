import { Togglable } from "$lib/mixins/togglable.svelte";
import { role } from "$lib/utils/roles";
import { ChocoBase, type Attributes } from "./base.svelte";

export type SwitchOptions = {
	/**
	 * Whether the toggle is initially pressed or not. Defaults to `false`
	 */
	pressed?: boolean;
	value?: string;
};

const defaults = { pressed: false, value: "" } satisfies Required<SwitchOptions>;

/**
 * ## Switch
 *
 * Semantics: on or off (switch toggle)
 *
 * The label should not change when the state changes. Use `simpleToggle` if needed.
 *
 * All descendants of a `switch` have role `presentation`
 *
 * Refs:
 *
 * [WAI-ARIA Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
 *
 * https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/Switch_role#all_descendants_are_presentational
 */
export class Switch extends Togglable<HTMLButtonElement | HTMLInputElement>(ChocoBase) {
	value = $derived(this.attributes?.value); // alias

	constructor(options?: SwitchOptions) {
		super();
		const toggleOptions: Required<SwitchOptions> = { ...defaults, ...options };
		let initial = { "aria-checked": `${toggleOptions.pressed}` } as const;

		const attributes: Attributes = {
			value: options?.value ?? undefined,
			role: role.switch,
		};

		this.extendAttributes(attributes);
		this.extendActions((node) => {
			if (node instanceof HTMLButtonElement) {
				node.type = "button";
			} else if (node instanceof HTMLInputElement) {
				node.type = "checkbox";
			}
		});
		this.initTogglable({ initial, active: toggleOptions.pressed });
	}
}
