---
title: Toggleable
---

<script lang="ts">
	import Highlighter from "$components/Highlighter.svelte";
	import Demo from "$components/Demo.svelte";
</script>

# Toggleable

The `Toggleable` class is a building block for toggling a set of properties on specific events.

---

## Example: Cancellable

Let's implement an improved button that toggles a `data-active` attribute on when clicked, and off as soon as either the click is released or the pointer leaves the target element.

From a user perspective, this button would better confers the "cancellability" of a click.
We can implement this class by extending the `Toggleable` as follows:

<Highlighter file="./cancellable.svelte.ts" />

The `Toggleable` constructor takes a few parameters:

- `initial` is a record of booleanish attributes that will be toggled on the element
- `active` labels this initial state as either the active or inactive state. Can be bound with a getter / setter pair (see API)
- `on` event(s) triggering the active state
- `off` event(s) triggering the inactive state
- `toggle` event(s) toggling the state

A `Cancellable` element styled using this `data-active` attribute instead of the CSS `:active` pseudo class would then better confer the "cancelability" of a click. Try clicking these buttons and move the pointer outside the element while the pointer is down:

<Demo file="./cancellable.svelte" value="result" />

---

## Relation to other classes

Almost everything is a toggleable, from the [Toggle](/components/toggle) and [Switch](/components/switch) buttons to [Tabs](/components/tabs) and [Disclosures](/components/disclosure), carousels etc.

These classes are specialized `Toggleable`:

- `Cancellable`
- [`Triggerable`](/blocks/triggerable)
- `Hoverable`

---

## API

**Constructor**

<dl>
  <dt><code>initial</code>?: <span class="font-mono">Record&lt;string, Booleanish></span></dt>
  <dd>Record of <code>Booleanish</code> attributes to toggle</dd>
  <dd><span class="italic">Default</span>: <code>&lbrace;}</code></dd>

  <dt><code><strong>active</strong></code>: <span class="font-mono">boolean | () => boolean</span></dt>
  <dd>Boolean or getter labelling the state as active or not. Can be bound</dd>
  <dd><span class="italic">Default</span>: <code>false</code></dd>

  <dt><code><strong>setActive</strong></code>?: <span class="font-mono">(v: boolean) => void</span></dt>
  <dd>Setter allowing to bind the active state value</dd>

  <dt><code>toggle</code>?: <span class="font-mono">EventName | EventName[]</span></dt>
  <dd>Event(s) toggling the state</dd>

  <dt><code>on</code>?: <span class="font-mono">EventName | EventName[]</span></dt>
  <dd>Event(s) triggering the active state</dd>

  <dt><code>off</code>?: <span class="font-mono">EventName | EventName[]</span></dt>
  <dd>Event(s) triggering the inactive state</dd>

</dl>
