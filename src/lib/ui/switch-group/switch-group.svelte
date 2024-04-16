<script lang="ts">
	import type { Orientation } from "$lib/internal/types";
	import { setContext, type Snippet } from "svelte";
	import type { HTMLFieldsetAttributes } from "svelte/elements";
	import type { ToggleProps } from "../toggle";
	import { toggleGroupVariants } from "../toggle-group";
	import {
		createSwitchGroup,
		type CreateSwitchGroup,
	} from "$lib/builders/switch-group/switch-group.svelte";

	let {
		class: className,
		orientation = "horizontal",
		variant,
		loop,
		single,
		children,
		...rest
	}: HTMLFieldsetAttributes &
		CreateSwitchGroup & {
			orientation?: Orientation;
			variant?: ToggleProps["variant"];
			children: Snippet;
		} = $props();

	const switchGroup = createSwitchGroup({ loop, single });

	export const selected = () => switchGroup.state.selected;

	setContext("choco-createItem", switchGroup.createItem);
	setContext("choco-variant", variant);
</script>

<fieldset class={toggleGroupVariants({ orientation, className })} use:switchGroup.action {...rest}>
	{@render children?.()}
</fieldset>
