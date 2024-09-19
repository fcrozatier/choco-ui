<script lang="ts">
  import { Tabs } from "$lib/headless/tabs.svelte";
  import { setTabsContext, type TabsProps } from "./index.js";

  let {
    class: className = "",
    group = $bindable([]),
    value,
    focus,
    children,
  }: TabsProps = $props();

  const tabs = new Tabs({
    value,
    focus: {
      ...focus,
      group: () => group,
      setGroup(v) {
        group = v;
      },
    },
  });

  setTabsContext(tabs);
</script>

<div class={className}>
  {@render children()}
</div>
