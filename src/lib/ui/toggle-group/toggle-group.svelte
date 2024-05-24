<script lang="ts">
	import type { Orientation } from "$lib/mixins/types";
	import { type Snippet } from "svelte";
	import type { HTMLFieldsetAttributes } from "svelte/elements";
	import type { ToggleProps } from "../toggle";
	import { setItemContext, setVariantContext, toggleGroupVariants } from ".";
	import { ToggleGroup } from "$lib/components/toggle-group.svelte";
	import type { GroupOptions } from "$lib/components/group.svelte";
	import { trimUndefined } from "@fcrozatier/ts-helpers";

	let {
		class: className,
		orientation = "horizontal",
		variant,
		focus,
		children,
		...rest
	}: HTMLFieldsetAttributes & { focus: GroupOptions } & {
		orientation?: Orientation;
		variant?: ToggleProps["variant"];
		children: Snippet;
	} = $props();

	const toggleGroup = new ToggleGroup(trimUndefined<GroupOptions>(focus));

	export const active = () => toggleGroup.active;

	setItemContext(toggleGroup.createItem);
	setVariantContext(variant);
</script>

<fieldset class={toggleGroupVariants({ orientation, className })} {...rest}>
	{@render children?.()}
</fieldset>
