<script lang="ts">
	import type { CreateTabList } from "$lib/builders/tabs/tabs.svelte";
	import { cn } from "$lib/utils/styles";
	import { getContext, type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children: Snippet } = $props();

	const action = getContext<CreateTabList>("choco-tablist");
</script>

<div
	class={cn(
		"bg-muted text-muted-foreground flex h-10 items-center justify-center rounded-md p-1",
		className,
	)}
	use:action
	{...restProps}
>
	{@render children()}
</div>
