<script lang="ts">
	import { cn } from "$lib/utils/styles.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	let {
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { children: Snippet } = $props();
</script>

<p class={cn("text-muted-foreground text-sm", className)} {...restProps}>
	{@render children()}
</p>
