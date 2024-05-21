<script lang="ts">
	import { cn } from "$lib/utils/styles";
	import { type Snippet } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";
	import { get } from ".";
	import { choco } from "$lib/actions/choco";
	import type { HeaderOptions } from "$lib/components/accordion.svelte";
	import { slide } from "svelte/transition";

	let {
		class: className,
		value,
		trigger,
		children,
		...restProps
	}: HTMLButtonAttributes &
		Omit<HeaderOptions, "headingLevel"> & { trigger: Snippet; children: Snippet } = $props();

	const accordion = get();
	const item = accordion.createItem({ value });
</script>

<svelte:element this={`h${accordion.headingLevel}`} class="flex border-t">
	<button
		class={cn(
			"flex flex-1 cursor-pointer items-center justify-between py-4 px-2 font-medium",
			className,
		)}
		use:choco={item}
		{...restProps}
	>
		{@render trigger()}
		<span
			class={`inline-flex size-2 ${item.active ? "rotate-270" : "rotate-90"} origin-center items-center justify-center transition-transform duration-200`}
		>
			&rsaquo;
		</span>
	</button>
</svelte:element>

{#if item.active}
	<section
		use:choco={item.target}
		class="overflow-hidden text-sm transition-all"
		transition:slide={{ duration: 200 }}
	>
		<div class="pt-0 px-2 pb-4">
			{@render children()}
		</div>
	</section>
{/if}
