<script lang="ts">
  import { getContext, type Snippet } from "svelte";
  import { type ToggleProps } from "../toggle/index.js";
  import Toggle from "../toggle/toggle.svelte";
  import { get } from "./index.js";

  let {
    class: className = "",
    variant,
    active = $bindable(false),
    children,
    value,
    element,
  }: ToggleProps & { value: string; children: Snippet } = $props();

  const ctxVariant = getContext("choco-variant") as ToggleProps["variant"] | undefined;
</script>

<Toggle
  class={className}
  builder={get().createItem}
  {value}
  variant={variant ?? ctxVariant}
  bind:active
  {element}
>
  {@render children?.()}
</Toggle>
