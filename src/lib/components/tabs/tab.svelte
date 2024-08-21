<script lang="ts">
  import { choco } from "$lib/choco.js";
  import type { TabOptions } from "$lib/headless/tabs.svelte";
  import { cn } from "chocobytes/utils/styles.js";
  import type { Attributes } from "chocobytes/utils/types.js";
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
    "ring-offset-background focus-visible:ring-ring aria-selected:bg-background aria-selected:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 px-3 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 aria-selected:shadow-sm",
    className,
  )}
  use:choco={tab}
  {...element}
>
  {@render children()}
</button>
