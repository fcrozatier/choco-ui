<script lang="ts">
	import { type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { getTabsContext } from ".";
	import { choco } from "$lib/actions/choco";

	let {
		class: className,
		children,
		value,
		...rest
	}: HTMLAttributes<HTMLElement> & { value: string; children: Snippet } = $props();

	const panel = getTabsContext().items.find((i) => i.value === value)?.target;

	if (!panel) throw new Error(`Panel not found ${value}`);
</script>

<div use:choco={panel} class={className} {...rest}>
	{@render children()}
</div>
