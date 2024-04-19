<script lang="ts">
	import { cn } from "$lib/utils/styles";
	import { type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children: Snippet } = $props();
</script>

<div
	class={cn(
		"bg-muted text-muted-foreground flex h-10 items-center justify-center rounded-md p-1",
		className,
	)}
	{...restProps}
>
	{@render children()}
</div>
