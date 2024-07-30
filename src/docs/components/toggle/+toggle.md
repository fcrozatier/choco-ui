---
title: Toggle
---

<script lang="ts">
  import Highlighter from "$components/Highlighter.svelte";
  import Demo from "$components/Demo.svelte";
</script>

# Toggle

As the name suggest, toggles a value

<Demo file="./toggleComponent.svelte" />


## Headless component

For complete control, you can use the headless component.

It's meant to be used on a button element, when you need a "pressed" - "not pressed" semantics.

Note that for accessibility the label of the button should not change when the state changes.

The `active` prop is bindable.

<Demo file="./toggleHeadless.svelte" />

### API

<API file="toggle.svelte.ts" type="ToggleOptions" bindable={true} defaults={true}/>

### Accessibility

Follows the [WAI-ARIA Toggle Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)