<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { HeadingLevel } from "./index.js";
	import type { Snippet } from "svelte";
	import { cn } from "$lib/utils/styles.js";

	let {
		class: className,
		tag = "h3",
		children,
		...restProps
	}: HTMLAttributes<HTMLHeadingElement> & {
		tag?: HeadingLevel;
		children: Snippet;
	} = $props();
</script>

<svelte:element
	this={tag}
	class={cn("text-lg font-semibold leading-none tracking-tight", className)}
	{...restProps}
>
	{@render children()}
</svelte:element>
