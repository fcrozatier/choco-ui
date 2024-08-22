---
title: Toggle Group
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
  import Highlighter from "$components/Highlighter.svelte";
</script>

# Toggle Group

A group of toggle buttons. The `group` binding gives you the familiar Svelte feel.

<Demo file="./toggleGroupComponent.svelte" value="result" />

---

## Headless component

The headless component is built in a few lines of code by applying the `Group` mixin to the `ToggleButton`. So all the heavy-lifting is done by the `Group` mixin, like tracking active items and managing focus

<Highlighter file="./toggle-group.svelte.ts" />

You have access to all the `Group` focus options like `loop`, `exclusive` etc. and the `group` property is bindable as demonstrated in the following demo. Use the keyboard arrows to play with the loop:

<Demo file="./toggleHeadless.svelte" value="result" />
