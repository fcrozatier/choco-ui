<script lang="ts">
	import { cn } from "$lib/utils/styles";
	import { type Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { getTabsContext } from ".";

	let {
		class: className,
		value,
		children,
		...restProps
	}: HTMLButtonAttributes & { value: string; children: Snippet } = $props();

	const tabItem = getTabsContext().createItem({ value });
</script>

<button
	class={cn(
		"ring-offset-background focus-visible:ring-ring aria-selected:bg-background aria-selected:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 px-3 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 aria-selected:shadow-sm",
		className,
	)}
	{...tabItem.control.attributes}
	use:tabItem.control.action
	{...restProps}
>
	{@render children()}
</button>
