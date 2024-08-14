<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import type { SwitchProps } from "../switch/index.js";
  import { type ToggleProps } from "../toggle/index.js";
  import Toggle from "../toggle/toggle.svelte";
  import { get } from "./index.js";

  let {
    variant,
    active = $bindable(false),
    children,
    value,
  }: SwitchProps & { value: string; children: Snippet } = $props();

  const ctxVariant = getContext("choco-variant") as ToggleProps["variant"] | undefined;
</script>

<Toggle builder={get().createItem} {value} variant={variant ?? ctxVariant} bind:active>
  {@render children?.()}
</Toggle>
