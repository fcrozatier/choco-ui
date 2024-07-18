---
title: Togglable
---

<script lang="ts">
	import Highlighter from "$components/Highlighter.svelte";
</script>

# Togglable

The `Togglable` mixin gives classes the ability to toggle a set of properties on specific events.

---

## Example

Let's say we want to implement improved clickable elements, by toggling a `data-active` attribute on when the element is clicked, and off as soon as either the click is released or the pointer leaves the target element. We could implement such a mixin as follows:

<Highlighter file="./example.svelte.ts" />

It decorates a given `superclass` by applying the `Togglable` mixin, and configures it in the `constructor` by calling it's initializing function.

A `Clickable` element styled using this `data-active` attribute instead of the CSS `:active` pseudo class would better confer the "cancelability" of a click. Try clicking these buttons and move the pointer outside the element while the pointer is down:

---

## Relation to other mixins

These mixins are specialized `Togglable`:
- `Cancellable`
- `Triggerable`
- `Hoverable`

## Options and API

<API file="togglable.svelte.ts" type="TogglableOptions" bindable={true} defaults={true}/>