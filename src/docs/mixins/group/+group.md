---
title: Group
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
  import Highlighter from "$components/Highlighter.svelte";
</script>


# Group

The second most common UI thing after toggling probably is grouping related things together and tracking which ones are "active". Tabs, Paginations, Disclosures, Accordion, Carousel etc. are all groups of [Togglables](/mixins/togglable).

The `Group` mixin allows you to create such a container of togglables, track which ones are active, and manage keyboard focus easily.

---

## Toggle group example

A toggle group is a group of toggle buttons, so to create a `ToggleGroup` class we can apply the `Group` mixin to our `ToggleButton` class.

The `Group` mixin will internally extend the `ToggleButton` class to manage focus, track active elements etc. and store this extended class in its `Item` property.

As a convention, each group defined by the library has a `createItem` function so we can easily always instanciate items in the same way, add a bit of logic if needed and pass around the `group.createItem` function to components and context.

<Highlighter file="./toggleGroupExample.ts" />

Individual items would typically be instanciated by child components. What follows is a simple demo showcasing the focus options. With these particular options the end result is almost like a radio group, except we can uncheck a checked item.

Try playing around with your Arrow, Home and End keys, and check the roving tab sequence by tabbing back and forth from A to B.


<Demo file="./toggleGroupDemo.svelte" />
