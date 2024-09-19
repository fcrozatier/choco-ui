<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import type { StripThunks } from "$lib/utils/binding.js";
  import { cn } from "$lib/utils/styles.js";
  import { Tooltip, type TooltipOptions } from "chocobytes/headless/tooltip.svelte";
  import { type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  interface TooltipProps extends HTMLAttributes<HTMLDivElement>, StripThunks<TooltipOptions> {
    children: Snippet;
    target: Snippet;
  }

  let {
    class: className = "",
    active = $bindable(false),
    position,
    children,
    target,
  }: TooltipProps = $props();

  const tooltip = new Tooltip({
    active: () => active,
    setActive(v) {
      active = v;
    },
    position,
  });
</script>

<span class="relative select-none" use:choco={tooltip}>
  {@render children()}

  <div
    class={cn(
      "choco-tooltip pointer-events-none absolute z-10 rounded bg-gray-900 py-1 px-2 text-center text-xs text-white opacity-0 shadow",
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
