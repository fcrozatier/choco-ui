<script lang="ts">
	import { SwitchGroup } from "$lib/components/switch-group.svelte";
	import type { GroupOptions } from "$lib/mixins/group.svelte";
	import type { Orientation } from "$lib/mixins/types";
	import { trimUndefined } from "@fcrozatier/ts-helpers";
	import { setContext, type Snippet } from "svelte";
	import type { HTMLFieldsetAttributes } from "svelte/elements";
	import { set } from ".";
	import type { ToggleProps } from "../toggle";
	import { toggleGroupVariants } from "../toggle-group";

	let {
		class: className,
		orientation = "horizontal",
		variant,
		focus,
		children,
		...rest
	}: HTMLFieldsetAttributes & { focus?: GroupOptions } & {
		orientation?: Orientation;
		variant?: ToggleProps["variant"];
		children: Snippet;
	} = $props();

	const switchGroup = new SwitchGroup(trimUndefined({ ...focus }));

	export const selected = () => switchGroup.active;

	set(switchGroup);
	setContext("choco-variant", variant);
</script>

<fieldset class={toggleGroupVariants({ orientation, className })} {...rest}>
	{@render children()}
</fieldset>
