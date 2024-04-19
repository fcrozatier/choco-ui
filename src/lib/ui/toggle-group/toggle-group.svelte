<script lang="ts">
	import {
		createToggleGroup,
		type CreateToggleGroup,
	} from "$lib/builders/toggle-group/toggle-group.svelte";
	import type { Orientation } from "$lib/internal/types";
	import { setContext, type Snippet } from "svelte";
	import type { HTMLFieldsetAttributes } from "svelte/elements";
	import type { ToggleProps } from "../toggle";
	import { toggleGroupVariants } from ".";

	let {
		class: className,
		orientation = "horizontal",
		variant,
		focus,
		children,
		...rest
	}: HTMLFieldsetAttributes &
		CreateToggleGroup & {
			orientation?: Orientation;
			variant?: ToggleProps["variant"];
			children: Snippet;
		} = $props();

	const toggleGroup = createToggleGroup({ focus });

	export const pressed = () => toggleGroup.state.pressed;

	setContext("choco-createItem", toggleGroup.createItem);
	setContext("choco-variant", variant);
</script>

<fieldset class={toggleGroupVariants({ orientation, className })} {...rest}>
	{@render children?.()}
</fieldset>
