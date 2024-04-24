<script lang="ts">
	import type { Orientation } from "$lib/internal/types";
	import { setContext, type Snippet } from "svelte";
	import type { HTMLFieldsetAttributes } from "svelte/elements";
	import type { ToggleProps } from "../toggle";
	import { toggleGroupVariants } from "../toggle-group";
	import {
		createToggleGroup,
		type ToggleGroupOptions,
	} from "$lib/builders/toggle-group/toggle-group.svelte";

	let {
		class: className,
		orientation = "horizontal",
		variant,
		focus,
		exclusive = true,
		children,
		...rest
	}: HTMLFieldsetAttributes &
		ToggleGroupOptions & {
			orientation?: Orientation;
			variant?: ToggleProps["variant"];
			children: Snippet;
		} = $props();

	const switchGroup = createToggleGroup({ focus, exclusive });

	export const selected = () => switchGroup.pressed;

	setContext("choco-createItem", switchGroup.createItem);
	setContext("choco-variant", variant);
</script>

<fieldset class={toggleGroupVariants({ orientation, className })} {...rest}>
	{@render children?.()}
</fieldset>
