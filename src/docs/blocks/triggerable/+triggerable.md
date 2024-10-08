---
title: Triggerable
---

<script lang="ts">
	import Demo from "$components/Demo.svelte";
</script>

# Triggerable

A specialized [Toggleable](/blocks/toggleable) which also controls a target element. This control-target pattern govern things like [Tabs](/components/tabs), [Accordion](/components/accordion), [Disclosure](/components/disclosure), Popover, Carousel etc.

Both the control and target element have attributes that can be correlated and triggered on and off, and the `Triggerable` class help create headless components orchestrating this.

---

## Example: Disclosure

For a simple headless disclosure we want to toggle a button's `aria-expanded` attribute on click, and toggle the target's `hidden` property accordingly.

We can create this `Disclosure` by extending the `Triggerable` class as follows:

<Demo file="./disclosureExample.svelte" value="code" />

Notice that we used the `extendAttribute` from the [`ChocoBase`](/blocks/chocobase) class. Here it allows us to programmatically add correlated aria and attributes between the control and the target. Similarly, there is an `extendAction` method on `ChocoBase` which allows to add more behavior to any class.

We've just created our simple headless `Disclosure` in a few lines of code, thanks to the `Triggerable` building block. We could go further by generating the id automatically and allowing to bind options.

---

## API

**Constructor**

The options of the `Triggerable` class are similar to those of the [`Toggleable`](/blocks/toggleable). The class has two type constraints `Triggerable<C,T>` for the control and target HTML tags. By default `C="button"` and `T="generic"` for any generic HTMLElement.

<dl>
  <dt><code>control</code>?: <span class="font-mono">Record&lt;string, Booleanish></span></dt>
  <dd>Initial booleanish state of the control</dd>

  <dt><code>target</code>?: <span class="font-mono">Record&lt;string, Booleanish></span></dt>
  <dd>Initial booleanish state of the target</dd>

  <div class="border-l border-coral -ml-6 pl-6 relative">
  <span class="absolute top-1/2 -translate-y-1/2 text-xs bg-dark -left-2.5 rotate-180 text-nowrap"  style="writing-mode: vertical-lr; text-orientation: sideways;">
  <code class="text-coral py-1 my-1">Omit&lt;ToggleableOptions, "initial"></code>
  </span>

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
