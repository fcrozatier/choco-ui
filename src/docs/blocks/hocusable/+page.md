---
title: Hocusable
---

<script lang="ts">
	import Demo from "$components/Demo.svelte";
</script>

# Hocusable

A special kind of [Triggerable](/mixins/togglable) whose control is triggered on hover or focus. Useful for tooltips and controls of this type.

---

## Example: Tooltip

For a simple headless disclosure we want to toggle a button's `aria-expanded` attribute on click, and toggle the target's `hidden` property accordingly.

We can create this simple headless `Disclosure` by applying the `Triggerable` mixin as follows:

The `initTriggerable` method added by the mixin allows to configure both the control and target initial states. The other options are similar to the [`Togglable`](/mixins/togglable) mixin and here we only want to toggle on click.

Notice that we used the `extendAttribute` from the `ChocoBase` class. Here it allows us to programmatically add correlated attributes between the control and the target. Similarly there is an `extendAction` method on `ChocoBase` which allows to add more behavior to any class.

We've just created our simple headless `Disclosure` in a few lines of code, thanks to the `Triggerable` mixin. We could go further by generating the id automatically and allowing to bind options.