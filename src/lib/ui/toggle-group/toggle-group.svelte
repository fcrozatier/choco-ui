<script lang="ts">
	import { type ToggleGroupOptions } from "$lib/builders/toggle-group/toggle-group.svelte";
	import type { Orientation } from "$lib/internal/types";
	import { type Snippet } from "svelte";
	import type { HTMLFieldsetAttributes } from "svelte/elements";
	import type { ToggleProps } from "../toggle";
	import { setItemContext, setVariantContext, toggleGroupVariants } from ".";
	import { ToggleGroup } from "$lib/components/toggle-group.svelte";

	let {
		class: className,
		orientation = "horizontal",
		variant,
		focus,
		children,
		...rest
	}: HTMLFieldsetAttributes &
		ToggleGroupOptions & {
			orientation?: Orientation;
			variant?: ToggleProps["variant"];
			children: Snippet;
		} = $props();

	const toggleGroup = new ToggleGroup(focus);

	export const active = () => toggleGroup.active;

	setItemContext(toggleGroup.createItem);
	setVariantContext(variant);
</script>

<fieldset class={toggleGroupVariants({ orientation, className })} {...rest}>
	{@render children?.()}
</fieldset>
