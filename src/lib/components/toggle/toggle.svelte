<script lang="ts">
  import { choco } from "$lib/choco.js";
  import { ToggleButton, type ToggleOptions } from "$lib/headless/toggle.svelte.js";
  import { cn } from "chocobytes/utils/styles.js";
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
  class={cn([
    // Base
    "ring-offset-background hover:bg-muted hover:text-muted-foreground focus-visible:ring-ring inline-flex  cursor-pointer items-center justify-center rounded-md text-sm font-medium text-white transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    {
      // Variants
      "bg-transparent": variant === "default",
      "border-input hover:bg-accent hover:text-accent-foreground border bg-transparent":
        variant === "outline",
      // Sizes
      "h-10 px-3": size === "default",
      "h-9 px-2.5": size === "sm",
      "h-11 px-5": size === "lg",
      // Active
      "bg-accent text-accent-foreground": toggle.active,
    },
    className,
  ])}
  {...element}
>
  {@render children?.()}
</button>
