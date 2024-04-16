<script lang="ts">
	import type { CreateToggleGroup } from "$lib/builders/toggle-group/toggle-group.svelte";
	import type { Orientation } from "$lib/internal/types";
	import { setContext, type Snippet } from "svelte";
	import type { HTMLFieldsetAttributes } from "svelte/elements";
	import type { ToggleProps } from "../toggle";
	import { toggleGroupVariants } from "../toggle-group";
	import { createSwitchGroup } from "$lib/builders/switch-group/switch-group.svelte";

	let {
		class: className,
		orientation = "horizontal",
		variant,
		loop,
		children,
		...rest
	}: HTMLFieldsetAttributes &
		CreateToggleGroup & {
			orientation?: Orientation;
			variant?: ToggleProps["variant"];
			children: Snippet;
		} = $props();

	const switchGroup = createSwitchGroup({ loop });

	export const selected = () => switchGroup.state.selected;

	setContext("choco-createItem", switchGroup.createItem);
	setContext("choco-variant", variant);
</script>

<fieldset class={toggleGroupVariants({ orientation, className })} use:switchGroup.action {...rest}>
	{@render children?.()}
</fieldset>
