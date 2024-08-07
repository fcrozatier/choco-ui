<script lang="ts">
  import { SwitchGroup } from "$lib/headless/switch-group.svelte";
  import type { GroupOptions } from "$lib/mixins/group.svelte";
  import type { Orientation } from "$lib/mixins/types.js";
  import { cn } from "$lib/utils/styles.js";
  import { setContext, type Snippet } from "svelte";
  import type { HTMLFieldsetAttributes } from "svelte/elements";
  import type { ToggleProps } from "../toggle/index.js";
  import { set } from "./index.js";

  let {
    class: className,
    orientation = "horizontal",
    variant,
    focus,
    children,
    ...rest
  }: HTMLFieldsetAttributes & {
    focus?: GroupOptions;
    orientation?: Orientation;
    variant?: ToggleProps["variant"];
    children: Snippet;
  } = $props();

  const switchGroup = new SwitchGroup({ ...focus });

  export const selected = () => switchGroup.active;

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
