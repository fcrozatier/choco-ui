<script lang="ts">
  import { Accordion } from "$lib/headless/accordion.svelte";
  import { set, type AccordionProps } from "./index.js";

  let {
    class: className,
    focus,
    active = $bindable([]),
    headingLevel,
    children,
  }: AccordionProps = $props();

  const accordion = new Accordion({
    focus: {
      ...focus,
      active: () => active,
      setActive(v) {
        active = v;
      },
    },
    headingLevel,
  });

  set(accordion);
</script>

<div class={`border-b ${className}`}>
  {@render children()}
</div>
