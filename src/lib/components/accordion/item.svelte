<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import type { HeaderOptions } from "$lib/headless/accordion.svelte";
  import { cn } from "$lib/utils/styles.js";
  import type { Attributes } from "$lib/utils/types.js";
  import { type Snippet } from "svelte";
  import { slide } from "svelte/transition";
  import { get } from "./index.js";

  let {
    class: className = "",
    value,
    header,
    children,
    element,
  }: Omit<HeaderOptions, "headingLevel"> & {
    class?: string;
    element?: Omit<Attributes<"button">, "value" | "class">;
    header: Snippet;
    children: Snippet;
  } = $props();

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
    {...element}
  >
    {@render header()}
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
