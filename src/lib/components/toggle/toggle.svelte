<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleButton, type ConcreteToggleOptions } from "$lib/headless/toggle.svelte.js";
  import { cn } from "$lib/utils/styles.js";
  import { bind } from "chocobytes/plugin";
  import { type ToggleProps } from "./index.js";

  let {
    class: className,
    size = "default",
    variant = "default",
    active = $bindable(false),
    value,
    children,
    builder = (options?: ConcreteToggleOptions) => new ToggleButton(options),
    ...restProps
  }: ToggleProps = $props();

  const toggle = builder(bind({ active, value }, ["active"]));
</script>

<button
  use:choco={toggle}
  class={cn([
    "ring-offset-background hover:bg-muted hover:text-muted-foreground focus-visible:ring-ring aria-pressed:bg-accent aria-pressed:text-accent-foreground inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    {
      "bg-transparent": variant === "default",
      "border-input hover:bg-accent hover:text-accent-foreground border bg-transparent":
        variant === "outline",
      "h-10 px-3": size === "default",
      "h-9 px-2.5": size === "sm",
      "h-11 px-5": size === "lg",
    },
    className,
  ])}
  {...restProps}
>
  {@render children?.()}
</button>
