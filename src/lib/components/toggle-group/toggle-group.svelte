<script lang="ts">
  import { ToggleGroup } from "$lib/headless/toggle-group.svelte";
  import type { GroupOptions } from "$lib/mixins/group.svelte";
  import type { Orientation } from "$lib/mixins/types.js";
  import { type Snippet } from "svelte";
  import type { HTMLFieldsetAttributes } from "svelte/elements";
  import type { ToggleProps } from "../toggle/index.js";
  import { setItemContext, setVariantContext, toggleGroupVariants } from "./index.js";

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

  const toggleGroup = new ToggleGroup(focus);

  export const active = () => toggleGroup.active;

  setItemContext(toggleGroup.createItem);
  setVariantContext(variant);
</script>

<fieldset class={toggleGroupVariants({ orientation, className })} {...rest}>
  {@render children?.()}
</fieldset>
