---
title: Tabs
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
</script>

# Tabs

An element that allows users to switch between different views within the same space, making it easy to access related information without leaving the current page.

<Demo file="./componentDemo.svelte" value="result" />

---

## Headless component

This is a [Group](/mixins/group) of [Triggerables](/mixins/triggerable) where each Tab is a control and each corresponding Panel a target.

Roving focus is enabled by default,

Satisfies the [WAI-ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
