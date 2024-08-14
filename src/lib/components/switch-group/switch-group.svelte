<script lang="ts">
  import { SwitchGroup } from "$lib/headless/switch-group.svelte";
  import { cn } from "$lib/utils/styles.js";
  import { setContext } from "svelte";
  import { set, type SwitchGroupProps } from "./index.js";

  let {
    class: className,
    orientation = "horizontal",
    variant,
    focus,
    group = $bindable([]),
    children,
    ...rest
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
  class={cn([
    "flex items-center justify-center gap-1",
    { "flex-col": orientation === "vertical" },
    className,
  ])}
  {...rest}
>
  {@render children()}
</fieldset>
