<script lang="ts">
  import type { StrictOmit } from "@fcrozatier/ts-helpers";
  import { choco } from "chocobytes/actions/choco.js";
  import { Cancellable } from "chocobytes/blocks/cancellable.svelte.js";
  import { cn } from "chocobytes/utils/styles.js";
  import type { Attributes } from "chocobytes/utils/types.js";
  import type { Snippet } from "svelte";

  let {
    class: className,
    href,
    element,
    shape,
    variant = "primary",
    children,
  }: (
    | { href?: undefined; element?: StrictOmit<Attributes<"button">, "class"> }
    | { href: string; element?: StrictOmit<Attributes<"a">, "class"> }
  ) & {
    class?: string;
    variant?: "primary" | "outline" | "danger";
    shape?: "circle" | "square";
    children: Snippet;
  } = $props();

  const cancellable = new Cancellable();
</script>

<!-- @component

 `--btn-size` CSS variable for sizing

 -->

<svelte:element
  this={href ? "a" : "button"}
  {href}
  class={cn(
    // Base
    "inline-flex shrink-0 cursor-default touch-none items-center justify-center font-semibold no-underline shadow-sm outline-none outline-offset-0 transition-all duration-200 ease-out select-none",
    // Cursor
    "not-[.enhanced]:hover:cursor-pointer data-[hover=true]:cursor-pointer",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-40",
    // Default sizing
    "rounded py-2 px-4",
    {
      // Variants
      // 1. Primary
      // a) base
      "bg-indigo-600 text-white": variant === "primary",
      // b) hover
      "not-[.enhanced]:hover:bg-indigo-500 data-[hover=true]:bg-indigo-500": variant === "primary",
      // c) focus-visible
      "not-[.enhanced]:focus-visible:outline-outline-offset-2 not-[.enhanced]:focus-visible:outline-2 not-[.enhanced]:focus-visible:outline-indigo-600 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-offset-2 data-[focus-visible=true]:outline-indigo-600":
        variant === "primary",
      // d) active
      "not-[.enhanced]:active:scale-95 not-[.enhanced]:active:outline-offset-0! data-[active=true]:scale-95 data-[active=true]:outline-offset-0!":
        variant === "primary",
      "bg-white text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50":
        variant === "outline",
      "bg-red-600 text-white hover:bg-red-500": variant === "danger",
      // Sizes
      // "gap-x-1.5 rounded py-1 px-2 text-xs": size === "xs",
      // "gap-x-1.5 rounded-md py-1.5 px-3 text-sm": size === "sm",
      // "gap-x-2 rounded-lg py-2 px-4 text-sm": size === "md",
      // "gap-x-2 rounded-lg py-2.5 px-5 text-sm": size === "lg",
      // "gap-x-2 rounded-xl py-3 px-6": size === "xl",
      // Shape
      "aspect-square": shape,
      "rounded-full": shape === "circle",
      // "p-1": shape && size === "xs",
      // "p-1.5": shape && size === "sm",
      // "p-2": shape && size === "md",
      // "p-2 ": shape && size === "lg",
      // "p-2.5": shape && size === "xl",
    },
    className,
  )}
  {...element}
  use:choco={cancellable}>{@render children()}</svelte:element
>

<pre>{JSON.stringify(cancellable.attributes, null, 2)}</pre>

<style>
  /* [data-hover="true"] {
    background-color: var(--color-orange-700);
  }

  [data-focus-visible="true"] {
    outline-color: var(--color-coral);
  } */

  [data-active="true"] {
    /* outline-offset: 0; */
    /* outline-color: transparent; */
    outline-style: inset;
  }
</style>
