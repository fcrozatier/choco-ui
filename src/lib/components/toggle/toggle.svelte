<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { cn } from "$lib/utils/styles.js";
  import { ToggleButton, type ToggleOptions } from "chocobytes/headless/toggle.svelte.js";
  import { type ToggleProps } from "./index.js";

  let {
    class: className = "",
    element,
    size = "default",
    variant = "default",
    active = $bindable(false),
    value,
    children,
    builder = (options?: ToggleOptions) => new ToggleButton(options),
  }: ToggleProps = $props();

  const toggle = builder({
    active: () => active,
    setActive: (v) => {
      active = v;
    },
    value,
  });
</script>

<button
  use:choco={toggle}
  class={cn(
    // Base
    "inline-flex cursor-pointer items-center rounded-md text-sm font-medium text-slate-100 transition-colors hover:bg-slate-100 hover:text-orange-950 focus-visible:ring-2 focus-visible:ring-slate-100 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-950 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    {
      // Variants
      "border border-slate-100  ": variant === "outline",
      // Sizes
      "h-10 px-3": size === "default",
      "h-9 px-2.5": size === "sm",
      "h-11 px-5": size === "lg",
      // Active
      "border-none bg-slate-100 text-orange-950": toggle.active,
    },
    className,
  )}
  {...element}
>
  {@render children?.()}
</button>
