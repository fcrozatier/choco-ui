<script lang="ts">
	import type { CreateTab } from "$lib/builders/tabs/tabs.svelte";
	import { cn } from "$lib/utils/styles";
	import { getContext, type Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";

	let {
		class: className,
		value,
		children,
		...restProps
	}: HTMLButtonAttributes & { value: string; children: Snippet } = $props();

	const tab = getContext<CreateTab>("choco-tab");
</script>

<button
	class={cn(
		"ring-offset-background focus-visible:ring-ring aria-selected:bg-background aria-selected:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 px-3 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 aria-selected:shadow-sm",
		className,
	)}
	use:tab={{ value }}
	{...restProps}
>
	{@render children()}
</button>
