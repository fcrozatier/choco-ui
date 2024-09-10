<script lang="ts">
  import { SwitchGroup } from "$lib/headless/switch-group.svelte";
  import { cn } from "$lib/utils/styles.js";
  import { setContext } from "svelte";
  import { set, type SwitchGroupProps } from "./index.js";

  let {
    class: className = "",
    element,
    orientation = "horizontal",
    variant,
    focus,
    group = $bindable([]),
    children,
  }: SwitchGroupProps = $props();

  const switchGroup = new SwitchGroup({
    ...focus,
    exclusive: true,
    group: () => group,
    setGroup(v) {
      group = v;
    },
  });

  set(switchGroup);
  setContext("choco-variant", variant);
</script>

<fieldset
  class={cn(
    "flex items-center justify-center gap-1.5",
    { "flex-col": orientation === "vertical" },
    className,
  )}
  {...element}
>
  {@render children()}
</fieldset>
