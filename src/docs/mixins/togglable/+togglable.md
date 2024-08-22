---
title: Togglable
---

<script lang="ts">
	import Highlighter from "$components/Highlighter.svelte";
	import Demo from "$components/Demo.svelte";
</script>

# Togglable

The `Togglable` mixin gives classes the ability to toggle a set of properties on specific events. You can think of it as a generalization of what a toggle button is.

---

## Example: Clickable

Let's implement an improved button that toggles a `data-active` attribute on when clicked, and off as soon as either the click is released or the pointer leaves the target element. We could implement such a mixin as follows:

<Highlighter file="./clickable.svelte.ts" />

`Clickable` decorates the `superclass` by applying the `Togglable` mixin, and configures it in the `constructor` by calling it's `initTogglable` function.

The `initTogglable` takes a few parameters:
- `initial` is a record of booleanish attributes that will be toggled on the element
- `active` (required) labels this initial state as either the active or inactive state. Can be bound with a getter / setter pair (see API)
- `on` corresponds the event(s) triggering the active state
- `off` corresponds the event(s) triggering the inactive state
- `toggle` corresponds the event(s) toggling the state

A `Clickable` element styled using this `data-active` attribute instead of the CSS `:active` pseudo class would then better confer the "cancelability" of a click. Try clicking these buttons and move the pointer outside the element while the pointer is down:

<Demo file="./clickable.svelte" value="result" />

---

## Relation to other mixins and components

Almost everything is a togglable, from the [toggle](/components/toggle) and switch buttons to tabs and disclosures, carousels etc. This mixin is pervasive

These mixins are specialized `Togglable`:
- `Cancellable`
- `Triggerable`
- `Hoverable`

## API

<API file="togglable.svelte.ts" type="TogglableOptions" bindable={true} defaults={true}/>