<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Switch, type ConcreteSwitchOptions } from "$lib/headless/switch.svelte";
  import { cn } from "$lib/utils/styles.js";
  import { bind } from "chocobytes/plugin";
  import type { SwitchProps } from "./index.js";

  let {
    class: className,
    active = $bindable(false),
    children,
    builder = (options?: ConcreteSwitchOptions) => new Switch(options),
    ...restProps
  }: SwitchProps = $props();

  const toggle = builder(bind({ active }, ["active"]));
</script>

<button
  class={cn(
    "handle h-6 w-12 shrink-0 cursor-pointer appearance-none rounded-full border border-gray-500 bg-gray-500 transition-shadow",
    className,
  )}
  use:choco={toggle}
  {...restProps}
>
  {@render children?.()}
</button>

<style>
  .handle {
    --handle-offset: 1.5rem;
    --handle-offset-calculator: calc(var(--handle-offset) * -1);
    --toggle-handle-border: 0 0;

    box-shadow:
      var(--handle-offset-calculator) 0 0 2px var(--color-white) inset,
      0 0 0 2px var(--color-white) inset;

    &:checked,
    &[aria-checked="true"] {
      --handle-offset-calculator: var(--handle-offset);
      --tw-border-opacity: 1;
      --tw-bg-opacity: 1;
    }
  }
</style>
