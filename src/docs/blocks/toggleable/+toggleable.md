---
title: Toggleable
---

<script lang="ts">
	import Highlighter from "$components/Highlighter.svelte";
	import Demo from "$components/Demo.svelte";
</script>

# Toggleable

The `Toggleable` mixin gives classes the ability to toggle a set of properties on specific events.

---

## Example: Clickable

Let's implement an improved button that toggles a `data-active` attribute on when clicked, and off as soon as either the click is released or the pointer leaves the target element. We could implement such a headless component from the `Toggleable` mixin as follows:

<Highlighter file="./clickable.svelte.ts" />

We only have to apply the `Toggleable` mixin and configures it in the `constructor` by calling it's `initTogglable` function.

The `initTogglable` takes a few parameters:
- `initial` is a record of booleanish attributes that will be toggled on the element
- `active` (required) labels this initial state as either the active or inactive state. Can be bound with a getter / setter pair (see API)
- `on` event(s) triggering the active state
- `off` event(s) triggering the inactive state
- `toggle` event(s) toggling the state

A `Clickable` element styled using this `data-active` attribute instead of the CSS `:active` pseudo class would then better confer the "cancelability" of a click. Try clicking these buttons and move the pointer outside the element while the pointer is down:

<Demo file="./clickable.svelte" value="result" />

---

## Relation to other mixins and components

Almost everything is a toggleable, from the [toggle](/components/toggle) and [switch](/components/switch) buttons to tabs and disclosures, carousels etc.

These mixins are specialized `Toggleable`:
- `Cancellable`
- `Triggerable`
- `Hoverable`

## API

<API file="toggleable.svelte.ts" type="ToggleableOptions" defaults={true}/>