import type { ManageFocusOptions } from "$lib/actions/focus/manageFocus.svelte";
import { FocusGroup } from "./group.svelte";
import { ToggleButton, type ToggleOptions } from "./toggle.svelte";

export const ToggleGroup = class extends FocusGroup<ToggleOptions, ToggleButton> {
	constructor(options: ManageFocusOptions) {
		super({ cls: ToggleButton, focus: options });
	}
};
