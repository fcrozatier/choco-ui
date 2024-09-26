---
title: Accordion
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
</script>

# Accordion

An interactive list of items that can be expanded or collapsed to reveal content.

<Demo file="./componentDemo.svelte" value="result" />

---

## Headless component

The headless accordion is a [Group](/mixins/group) of [Triggerables](/mixins/triggerable) where each heading is a control and each corresponding content a target.

The only additional option to is the `headingLevel` which allows you to make sure the accordion fits well in your document's heading hierarchy.

Satisfies the [WAI-ARIA Accordion Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
