<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Disclosure, type DisclosureOptions } from "$lib/headless/disclosure.svelte";
  import { cn } from "$lib/utils/styles.js";
  import { bind } from "chocobytes/plugin";
  import { type Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { slide } from "svelte/transition";
  import { set } from "./index.js";

  let {
    class: className,
    active = $bindable(false),
    children,
    header,
    ...restProps
  }: HTMLButtonAttributes &
    DisclosureOptions & {
      class?: string;
      children: Snippet;
      header: Snippet;
    } = $props();

  const disclosure = new Disclosure(bind({ active }, ["active"]));

  set(disclosure);
</script>

<div class={`${className}`}>
  <button
    class={cn(
      "flex flex-1 cursor-pointer items-center justify-between gap-2 border-t py-4 px-2 font-medium",
      className,
    )}
    use:choco={disclosure}
    {...restProps}
  >
    <span
      class={`inline-flex size-2 ${disclosure.active ? "rotate-90" : ""} origin-center items-center justify-center transition-transform duration-200`}
    >
      &rsaquo;
    </span>
    {@render header()}
  </button>

  {#if disclosure.active}
    <section
      use:choco={disclosure.target}
      class="overflow-hidden text-sm transition-all"
      transition:slide={{ duration: 200 }}
    >
      <div class="pt-0 px-2 pb-4">
        {@render children()}
      </div>
    </section>
  {/if}
</div>
