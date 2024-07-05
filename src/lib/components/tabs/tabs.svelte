<script lang="ts">
  import { Tabs, type TabsOptions } from "$lib/headless/tabs.svelte";
  import { type Snippet } from "svelte";
  import { setTabsContext } from "./index.js";

  let {
    class: className,
    orientation,
    value,
    focus,
    children,
  }: TabsOptions & {
    class?: string;
    children: Snippet;
  } = $props();

  const tabs = new Tabs({
    orientation,
    value,
    focus,
  });

  setTabsContext(tabs);
</script>

<div class={className}>
  {@render children()}
</div>
