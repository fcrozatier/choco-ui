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

For a simple tooltip, we want the target to open on hover and focus, to close when pressing <kbd>ESC</kbd> and to stay open when hovering its content. This is precisely the functionality the `Hocusable` class brings in.

We only have to extend it by adding a few roles and attributes:

<Demo file="./example.svelte" value="code" />

Try focusing with the keyboard, pressing <kbd>ESC</kbd>, hovering over the tooltip etc. In only a few lines of code, the `Hocusable` building block allowed us to setup a full-featured simple tooltip.

## API

**Constructor**

A `Hocusable` is just a specialized [`Triggerable`](/mixins/toggleable), so the constructor options are the same:

<dl>
  <div class="border-l border-coral -ml-6 pl-6 relative">
  <span class="absolute top-1/2 -translate-y-1/2 text-xs bg-dark -left-2.5 rotate-180 text-nowrap"  style="writing-mode: vertical-lr; text-orientation: sideways;">
  <code class="text-coral! py-1! my-1!">TriggerableOptions</code>
  </span>

  <dt><code>control</code>?: <span class="font-mono">Record&lt;string, Booleanish></span></dt>
  <dd>Initial booleanish state of the control</dd>

  <dt><code>target</code>?: <span class="font-mono">Record&lt;string, Booleanish></span></dt>
  <dd>Initial booleanish state of the target</dd>

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
  </div>
</dl>
