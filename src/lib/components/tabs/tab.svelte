<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { cn } from "$lib/utils/styles.js";
  import type { Attributes } from "$lib/utils/types.js";
  import type { TabOptions } from "chocobytes/headless/tabs.svelte.js";
  import { type Snippet } from "svelte";
  import { getTabsContext } from "./index.js";

  let {
    class: className = "",
    element,
    value,
    children,
  }: Omit<TabOptions, "active"> & {
    class?: string;
    element?: Omit<Attributes<"button">, "class" | "value">;
    children: Snippet;
  } = $props();

  const tab = getTabsContext().createItem({ value });
</script>

<button
  class={cn(
    "aria-selected:bg-dark-muted focus-visible:ring-dark-muted inline-flex items-center justify-center whitespace-nowrap rounded py-1.5 px-3 text-sm font-medium text-gray-500 ring-offset-white transition-all hover:text-gray-700 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 aria-selected:text-slate-100 aria-selected:shadow-sm",
    className,
  )}
  use:choco={tab}
  {...element}
>
  {@render children()}
</button>
