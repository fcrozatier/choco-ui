<script lang="ts">
  import { cn } from "$lib/utils/styles.js";
  import { type Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { getTabsContext } from "./index.js";

  let {
    class: className = "",
    children,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & { children: Snippet } = $props();

  const { tablist } = getTabsContext();
</script>

<div
  class={cn("flex h-10 items-center justify-center gap-2 rounded-md bg-slate-100 p-1", className)}
  {...tablist.attributes}
  {...restProps}
>
  {@render children()}
</div>
