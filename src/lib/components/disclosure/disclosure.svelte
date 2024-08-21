<script lang="ts">
  import { choco } from "$lib/choco.js";
  import { Disclosure } from "$lib/headless/disclosure.svelte";
  import { cn } from "chocobytes/utils/styles.js";
  import { slide } from "svelte/transition";
  import { type DisclosureProps } from "./index.js";

  let {
    class: className = "",
    active = $bindable(false),
    element,
    children,
    header,
  }: DisclosureProps = $props();

  const disclosure = new Disclosure({
    active: () => active,
    setActive(v) {
      active = v;
    },
  });
</script>

<div class={className}>
  <button
    class={cn(
      "flex flex-1 cursor-pointer items-center justify-between gap-2 border-t py-4 px-2 font-medium",
      className,
    )}
    use:choco={disclosure}
    {...element}
  >
    <span
      class={`inline-flex size-2 ${active ? "rotate-90" : ""} origin-center items-center justify-center transition-transform duration-200`}
    >
      &rsaquo;
    </span>
    {@render header()}
  </button>

  {#if active}
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
