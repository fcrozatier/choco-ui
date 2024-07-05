<script lang="ts">
  import { cn } from "$lib/utils/styles.js";
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    class: className,
    children,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & { children: Snippet } = $props();
</script>

<div
  class={cn("bg-card text-card-foreground rounded-lg border shadow-sm", className)}
  {...restProps}
>
  {@render children()}
</div>
