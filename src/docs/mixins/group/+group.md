---
title: Group
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
  import Highlighter from "$components/Highlighter.svelte";
</script>


# Group

The `Group` mixin allows you to create a container of togglables, track which ones are active, and manage keyboard focus easily. Tabs, Paginations, Disclosures, Accordion, Carousel etc. are all groups of [Togglables](/mixins/togglable).

---

## Example: Toggle group

Let's build a toy toggle group to see the `Group` mixin in action. A toggle group is a group of toggle buttons, so we should apply the `Group` mixin to the `ToggleButton` class.

The `Group` mixin will internally extend the passed in `ToggleButton` class to manage focus, track active elements etc. and store this extended class in the `Item` property.

As a convention, each group defined by the library has a `createItem` function so we can easily instantiate items in the same way, add a bit of logic if needed and pass around the `group.createItem` function to components and context.

<Highlighter file="./toggleGroupExample.ts" />

Individual items would typically be instantiated by child components. What follows is a simple demo showcasing the focus options. With these particular options the end result is almost like a radio group, except we can uncheck a checked item. But you can easily customize them!

Try playing around with your Arrow, Home and End keys, and check the roving tab sequence by tabbing back and forth from A to B.


<Demo file="./toggleGroupDemo.svelte" />
