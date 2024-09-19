<script lang="ts">
  import { ToggleGroup } from "$lib/headless/toggle-group.svelte";
  import { cn } from "$lib/utils/styles.js";
  import { setItemContext, setVariantContext, type ToggleGroupProps } from "./index.js";

  let {
    class: className = "",
    variant = "default",
    focus,
    group = $bindable([]),
    children,
    ...rest
  }: ToggleGroupProps = $props();

  const toggleGroup = new ToggleGroup({
    ...focus,
    group: () => group,
    setGroup(v) {
      group = v;
    },
  });

  setItemContext(toggleGroup.createItem);
  setVariantContext(variant);
</script>

<fieldset
  class={cn(
    "flex items-center justify-center gap-1",
    { "flex-col": focus?.orientation === "vertical" },
    className,
  )}
  {...rest}
>
  {@render children?.()}
</fieldset>
