<script lang="ts">
	import { createTooltip, type CreateTooltip } from "$lib/builders/tooltip/tooltip.svelte";
	import { sync } from "$lib/utils/runes.svelte";
	import { cn } from "$lib/utils/styles";
	import { type Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface TooltipProps extends HTMLAttributes<HTMLDivElement>, CreateTooltip {
		children: Snippet;
	}

	let { class: className, open = $bindable(false), position, children }: TooltipProps = $props();

	const tooltip = createTooltip({ open, position });

	$effect(() => {
		sync(
			() => open,
			() => tooltip.state.open,
			(v) => (open = v),
			(v) => (tooltip.state.open = v),
		);
	});
</script>

<div
	class={cn(
		"choco-tooltip bg-accent-foreground text-accent pointer-events-none absolute z-10 rounded py-1 px-2 text-center text-base opacity-0 shadow select-none",
		className,
	)}
	use:tooltip.action
>
	{@render children()}
</div>

<style>
	/* create a stacking context for elements with > .choco-tooltips */
	:global(:has(> .choco-tooltip)) {
		position: relative;
	}

	.choco-tooltip {
		--margin: 6px;

		transform: scale(0.8) translateX(var(--x, 0)) translateY(var(--y, 0));
		transition:
			opacity 200ms ease,
			transform 100ms ease;

		inline-size: max-content;
		max-inline-size: 40ch;

		&:global([data-position="top"]) {
			bottom: calc(100% + var(--margin));
			left: 50%;
			--x: -50%;
			transform-origin: center left;
		}
		&:global([data-position="bottom"]) {
			top: calc(100% + var(--margin));
			left: 50%;
			--x: -50%;
			transform-origin: center left;
		}
		&:global([data-position="left"]) {
			right: calc(100% + var(--margin));
			top: 50%;
			--y: -50%;
			transform-origin: top center;
		}
		&:global([data-position="right"]) {
			left: calc(100% + var(--margin));
			top: 50%;
			--y: -50%;
			transform-origin: top center;
		}

		&:global([data-open="true"]) {
			opacity: 1;
			transition-delay: 300ms;
			transform: scale(1) translateX(var(--x, 0)) translateY(var(--y, 0));
		}
	}
</style>
