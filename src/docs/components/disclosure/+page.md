---
title: Disclosure
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
</script>

# Disclosure

A standalone [Toggleable](/mixins/toggleable) for revealing additional information.

<Demo file="./componentDemo.svelte" value="result" />

---

## Headless component

The headless disclosure is a simple [Triggerable](/mixins/triggerable), so the `active` option is bindable.

Sets the `aria-controls` and `aria-labelled` attributes, as it adheres to the [Disclosure WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/)
