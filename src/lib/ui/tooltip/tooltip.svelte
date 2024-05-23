<script lang="ts">
	import { choco } from "$lib/actions/choco";
	import { Tooltip, type TooltipOptions } from "$lib/components/tooltip.svelte";
	import { cn } from "$lib/utils/styles";
	import { trimUndefined } from "@fcrozatier/ts-helpers";
	import { type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface TooltipProps extends HTMLAttributes<HTMLDivElement>, TooltipOptions {
		children: Snippet;
		target: Snippet;
	}

	let { class: className, isOpen, position, children, target }: TooltipProps = $props();

	const tooltip = new Tooltip(
		trimUndefined({
			isOpen,
			position,
		}),
	);
</script>

<span class="relative" use:choco={tooltip}>
	{@render children()}

	<div
		class={cn(
			"choco-tooltip bg-accent-foreground text-accent pointer-events-none absolute z-10 rounded py-1 px-2 text-center text-base opacity-0 shadow select-none",
			className,
		)}
		use:choco={tooltip.target}
	>
		{@render target()}
	</div>
</span>

<style>
	.choco-tooltip {
		--margin: 6px;

		transform: scale(0.8) translateX(var(--x, 0)) translateY(var(--y, 0));
		transition:
			opacity 200ms ease,
			transform 100ms ease;

		inline-size: max-content;
		max-inline-size: 40ch;

		&[data-position="top"] {
			bottom: calc(100% + var(--margin));
			left: 50%;
			--x: -50%;
			transform-origin: center left;
		}
		&[data-position="bottom"] {
			top: calc(100% + var(--margin));
			left: 50%;
			--x: -50%;
			transform-origin: center left;
		}
		&[data-position="left"] {
			right: calc(100% + var(--margin));
			top: 50%;
			--y: -50%;
			transform-origin: top center;
		}
		&[data-position="right"] {
			left: calc(100% + var(--margin));
			top: 50%;
			--y: -50%;
			transform-origin: top center;
		}

		&[data-open="true"] {
			opacity: 1;
			transition-delay: 300ms;
			transform: scale(1) translateX(var(--x, 0)) translateY(var(--y, 0));
		}
	}
</style>
