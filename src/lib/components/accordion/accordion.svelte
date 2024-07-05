<script lang="ts">
  import { Accordion, type AccordionOptions } from "$lib/headless/accordion.svelte";
  import { type Snippet } from "svelte";
  import { set } from "./index.js";

  let {
    class: className,
    focus,
    headingLevel,
    children,
  }: AccordionOptions & {
    class?: string;
    children: Snippet;
  } = $props();

  const accordion = new Accordion({ focus, headingLevel });

  set(accordion);
</script>

<div class={`border-b ${className}`}>
  {@render children()}
</div>
