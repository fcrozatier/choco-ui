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

<div class={cn("flex items-center p-6 pt-0", className)} {...restProps}>
	{@render children()}
</div>
