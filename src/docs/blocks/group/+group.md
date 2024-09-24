---
title: Group
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
  import Highlighter from "$components/Highlighter.svelte";
</script>


# Group

The `Group` mixin lets you create a container of toggleables, track which ones are active, and manage keyboard focus easily. Tabs, Paginations, Disclosures, Accordion, Carousel etc. are all groups of [Toggleables](/blocks/toggleable).

---

## Example: Toggle group

Let's build a simple toggle group to see the `Group` mixin in action. A toggle group is a group of toggle buttons, so we can apply the `Group` mixin to the [`ToggleButton`](/components/toggle) class.

The `Group` mixin will internally extend the `ToggleButton` class to manage focus, track active elements etc. and store this extended class in the `Item` property.

As a convention, every group of the library defines a `createItem` function wrapping the `new this.Item(options)` instantiation. It allows to add a bit of logic if needed and pass around the `group.createItem` function to components and context in a homogeneous way.

<Highlighter file="./toggleGroupExample.ts" />

Individual items would typically be instantiated by child components calling the `group.createItem` function. What follows is a simple demo showcasing the focus options. With these particular options the end result is almost like a radio group, except we can uncheck a checked item. But you can easily build anything with other options!

Try playing around with your Arrow, Home and End keys, and check the roving tab sequence by tabbing back and forth from A to B.


<Demo file="./toggleGroupDemo.svelte" />

---

## API

**Constructor**

<dl class="before:content-['*'] border-">
  <dt><code>loop</code>?: <span class="font-mono">boolean</span></dt>
  <dd>Specifies if the keyboard focus cycles from the last item to the first</dd>
  <dd><span class="italic">Default</span>: <code>false</code></dd>

  <dt><code>roving</code>?: <span class="font-mono">boolean</span></dt>
  <dd>Enables roving focus, where only one item in the list is in the tab sequence, and arrow keys shift focus between items</dd>
  <dd><span class="italic">Default</span>: <code>false</code></dd>

  <dt><code>preventInactivation</code>?: <span class="font-mono">boolean</span></dt>
  <dd>Prevents having no active elements. Toggling off a single active item will have no effect</dd>
  <dd><span class="italic">Default</span>: <code>false</code></dd>

  <dt><code>exclusive</code>?: <span class="font-mono">boolean</span></dt>
  <dd>Specifies whether only one item can be active at a time</dd>
  <dd><span class="italic">Default</span>: <code>false</code></dd>

  <dt><code>activateOnNext</code>?: <span class="font-mono">boolean</span></dt>
  <dd>Determines whether arrows immediately activate the next or previous item, typically when the group is <code>exclusive</code></dd>
  <dd><span class="italic">Default</span>: <code>false</code></dd>

  <dt><code><strong>group</strong></code>?: <span class="font-mono">string[] | (() => string[])</span></dt>
  <dd>Lists the <code>value</code>s of active items. Can be bound</dd>
  <dd><span class="italic">Default</span>: <code>[]</code></dd>

  <dt><code><strong>setGroup</strong></code>?: <span class="font-mono">(v: string[]) => void</span></dt>
  <dd>Setter allowing to bind the <code>value</code>s of the active items</dd>

  <dt><code>orientation</code>?: <span class="font-mono">"horizontal"|"vertical"</span></dt>
  <dd>The orientation of the group. For a vertically oriented group, the Up and Down keyboard arrows will behave as the Left and Right keys, and prevent scrolling </dd>
  <dd><span class="italic">Default</span>: <code>"horizontal"</code></dd>


</dl>