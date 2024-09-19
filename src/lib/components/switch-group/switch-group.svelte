<script lang="ts">
  import { cn } from "$lib/utils/styles.js";
  import { SwitchGroup } from "chocobytes/headless/switch-group.svelte";
  import { setContext } from "svelte";
  import { set, type SwitchGroupProps } from "./index.js";

  let {
    class: className = "",
    element,
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
    { "flex-col": focus?.orientation === "vertical" },
    className,
  )}
  {...element}
>
  {@render children()}
</fieldset>
