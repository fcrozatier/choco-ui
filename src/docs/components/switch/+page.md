---
title: Switch
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
</script>

# Switch

An element which can be turned "on" or "off".

<Demo file="./switchComponent.svelte" value="result" />

---

## Headless component

The headless component is meant to be used on a button or input element when you need a "on" - "off" semantic.

For accessibility, the label of the button should not change when the state changes. Also, all descendants of a `switch` have role `presentation`. [Learn more](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/switch_role#all_descendants_are_presentational)

The `active` prop is bindable.

<Demo file="./switchHeadless.svelte" value="result" />

---

## Headless API

<API file="switch.svelte.ts" type="SwitchOptions" bindable={true} defaults={true}/>

Follows the [WAI-ARIA Switch Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/)
