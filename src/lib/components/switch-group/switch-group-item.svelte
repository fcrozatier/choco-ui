<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import type { SwitchProps } from "../switch/index.js";
  import { type ToggleProps } from "../toggle/index.js";
  import Toggle from "../toggle/toggle.svelte";
  import { get } from "./index.js";

  let {
    class: className,
    variant,
    active = $bindable(false),
    children,
    ...restProps
  }: SwitchProps & { value: string; children: Snippet } = $props();

  const ctxVariant = getContext("choco-variant") as ToggleProps["variant"] | undefined;
</script>

<Toggle builder={get().createItem} variant={variant ?? ctxVariant} bind:active {...restProps}>
  {@render children?.()}
</Toggle>
