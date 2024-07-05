import { ChocoBase } from "$lib/headless/base.svelte.js";
import { Togglable } from "$lib/mixins/togglable.svelte.js";

class ToggleButton extends Togglable(ChocoBase) {
	constructor(options?: { active: boolean }) {
		super();
		const active = options?.active ?? false;

		this.initTogglable({
			initial: { "aria-pressed": `${active}` },
			active,
			toggle: "click",
		});
	}
}
