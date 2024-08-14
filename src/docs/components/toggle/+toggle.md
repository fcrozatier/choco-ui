---
title: Toggle
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
</script>

# Toggle

A button which can be in either of two states, like "on" and "off", "pressed" and "not pressed".

<Demo file="./toggleComponent.svelte" value="result" />


## Headless component

The headless component is meant to be used on a button element when you need a "pressed" - "not pressed" semantic.

For accessibility, the label of the button should not change when the state changes.

The `active` prop is bindable.

<Demo file="./toggleHeadless.svelte" value="code" />

### API

<API file="toggle.svelte.ts" type="ToggleOptions" bindable={true} defaults={true}/>


Follows the [WAI-ARIA Toggle Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)