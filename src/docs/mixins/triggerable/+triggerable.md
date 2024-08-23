---
title: Triggerable
---

<script lang="ts">
	import Demo from "$components/Demo.svelte";
</script>

# Triggerable

A special kind of [Togglable](/mixins/togglable) which controls a target element. This control-target pattern govern things like Tabs, Accordion, Disclosure, Popover, Carousel etc.

Both the control and target element have attributes that are correlated and can be triggered on and off, and the Triggerable orchestrates this.

---

## Example: Disclosure

For a simple disclosure we want to toggle a button's `aria-expanded` attribute on click, and toggle the target's `hidden` property accordingly.

We can create this simple headless `Disclosure` by applying the `Triggerable` mixin as follows:

<Demo file="./disclosureExample.svelte" value="code" />

The `initTriggerable` method added by the mixin allows to configure both the control and target initial states, which are the booleanish attributes to be toggled. The other options are similar to the [`Togglable`](/mixin/togglable) and here we only want to toggle on click.

Notice that in the above example, we used the `extendAttribute` from the `ChocoBase` class. Here it allows us to programmatically add correlated attributes between the control and the target. Similarly there is an `extendAction` method on `ChocoBase` which allows to add more behavior to any class.

We've just created our reusable custom headless `Disclosure` in a few lines of code, thanks to the `Triggerable` mixin.