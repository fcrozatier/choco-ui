---
title: Tooltip
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
</script>

# Tooltip

A small pop-up text box that appears on hover or focus to provide additional information, guidance or context without cluttering the interface.

The tooltip itself can be hovered without closing.

<Demo file="./componentDemo.svelte" value="result" />

---

## Headless component

The headless component is just a [Hocusable](/blocks/hocusable). The `active` option is bindable.

Adheres to the [WAI ARIA Tooltip pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)
