<script lang="ts">
  import { Accordion } from "chocobytes/headless/accordion.svelte.js";
  import { set, type AccordionProps } from "./index.js";

  let {
    class: className = "",
    focus,
    group = $bindable([]),
    headingLevel,
    children,
  }: AccordionProps = $props();

  const accordion = new Accordion({
    focus: {
      ...focus,
      group: () => group,
      setGroup(v) {
        group = v;
      },
    },
    headingLevel,
  });

  set(accordion);
</script>

<div class={`border-b ${className}`}>
  {@render children()}
</div>
