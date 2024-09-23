---
title: Hocusable
---

<script lang="ts">
	import Demo from "$components/Demo.svelte";
</script>

# Hocusable

A specialized [Triggerable](/mixins/toggleable) where the control is triggered on hover or focus. Useful for [Tooltips](/components/tooltip) and controls of this type.

---

## Simple Example: Tooltip

For a simple tooltip, we just have to extend from the `Hocusable` class. The underlying `Triggerable` will be active when hovered or focused.

We can add a few roles and attributes:

<Demo file="./example.svelte" value="result" />

Try focusing with the keyboard, pressing <kbd>ESC</kbd>, hovering over the tooltip etc. In only a few lines of code, the `Hocusable` allowed us to setup a full-featured simple tooltip.

## API

**Constructor**

A `Hocusable` is just a specialized [`Triggerable`](/mixins/toggleable), so the constructor options are the same:

<dl>
  <dt><code>control</code>?: <span class="font-mono">Record&lt;string, Booleanish></span></dt>
  <dd>Initial booleanish state of the control</dd>

  <dt><code>target</code>?: <span class="font-mono">Record&lt;string, Booleanish></span></dt>
  <dd>Initial booleanish state of the target</dd>

  <dt><code>active</code>: <span class="font-mono">boolean|()=>boolean</span></dt>
  <dd>Boolean or getter labelling the state as active or not</dd>
  <dd><span class="italic">Default</span>: <code>false</code></dd>

  <dt><code>setActive</code>?: <span class="font-mono">(v: boolean) => void</span></dt>
  <dd>Setter allowing to bind the active state value</dd>

  <dt><code>toggle</code>?: <span class="font-mono">EventName | EventName[]</span></dt>
  <dd>Event(s) toggling the state</dd>

  <dt><code>on</code>?: <span class="font-mono">EventName | EventName[]</span></dt>
  <dd>Event(s) triggering the active state</dd>

  <dt><code>off</code>?: <span class="font-mono">EventName | EventName[]</span></dt>
  <dd>Event(s) triggering the inactive state</dd>
</dl>
