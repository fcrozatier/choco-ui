<script lang="ts">
  import { Tabs } from "$lib/headless/tabs.svelte";
  import { setTabsContext, type TabsProps } from "./index.js";

  let {
    class: className,
    active = $bindable([]),
    orientation,
    value,
    focus,
    children,
  }: TabsProps = $props();

  const tabs = new Tabs({
    orientation,
    value,
    focus: {
      ...focus,
      active: () => active,
      setActive(v) {
        active = v;
      },
    },
  });

  setTabsContext(tabs);
</script>

<div class={className}>
  {@render children()}
</div>
