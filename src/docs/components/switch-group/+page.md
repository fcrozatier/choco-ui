---
title: Switch Group
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
  import Highlighter from "$components/Highlighter.svelte";
</script>

# Switch Group

A group of switches. In the following example, the group is exclusive (the default):

<Demo file="./switchGroupComponent.svelte" value="result" />

---

## Headless component

Similarly to the [toggle group](/components/toggle-group), the headless component is built in a few lines of code by applying the `Group` mixin to the `Switch` class. So all the heavy-lifting is done by the `Group` mixin, like tracking the active items and managing focus

<Highlighter file="./switch-group.svelte.ts" />

You have access to all the `Group` focus options like `loop`, `exclusive` etc. In the following demo the group behaves almost like a radio group except this one doesn't loop. You can use the keyboard arrows to play with it:

<Demo file="./switchGroupHeadless.svelte" value="result" />
