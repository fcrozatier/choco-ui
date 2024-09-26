---
title: Cancellable
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
  import Highlighter from "$components/Highlighter.svelte";
</script>

# Cancellable

This building block adds three reactive attributes, `data-active`, `data-hover` and `data-focus-visible` to button and anchor elements. These attributes provide a more consistent experience than the defaults and let you enhance and normalize your buttons and anchors states and styles across browsers.

---

## The problem

The demo below displays a button and an anchor with distinct styles relying on the default `:hover`, `:focus-visible` and `:active` states.

What happens when you click on one of these elements and hold the click while dragging the cursor outside the element before releasing the click? Will the counter increment?

Give it a try, and you'll notice the first potential improvement in user experience:

1. **Teaching cancellability** The click is not fired but the CSS state confusingly stays `:active`

<Demo file="./defaults.svelte" value="result" />

Here are a few other inconsistencies:

2. **Keyboard cancellability** We just noticed that a mouse click is functionally cancellable, even though the visual styles do not confer this. But what about a keyboard click? Well, keyboard users are out of luck, there is no way to cancel a click for them. Try hitting the <kbd>Escape</kbd> key while holding <kbd>Space</kbd> or <kbd>Enter</kbd>
3. **Multiple events** Holding <kbd>Space</kbd> on the button fires one click event while holding <kbd>Enter</kbd> fires multiple events. Also, hitting <kbd>Escape</kbd> while holding <kbd>Enter</kbd> actually does something: it prevents firing the next click and stops the sequence of clicks. The anchor doesn't fire multiple click events.
4. **Chrome** When the button is focused, pressing <kbd>Space</kbd> triggers the `:active` state, but pressing <kbd>Enter</kbd> does not.
5. **Firefox** Neither <kbd>Space</kbd> nor <kbd>Enter</kbd> triggers the `:active` state on the button
6. **Safari** Focus doesn't work on buttons [by design](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus) (won't be fixed)
7. **Anchors** Pressing <kbd>Enter</kbd> on the anchor does not trigger the `:active` state and pressing <kbd>Space</kbd> does not even fire a click. This is how anchors work and is not a problem in itself, but rather something to have in mind when normalizing behaviors for the few places where you need anchors styled as buttons

---

## Normalizing states

All these inconsistencies are fixed by the `Cancellable` class, except for the Safari focus problem.

Here are a few test cases that work across browser and on both enhanced elements:

1. The primary pointer button, <kbd>Space</kbd> and <kbd>Enter</kbd> all trigger click and the `data-active` state
2. Holding only fires one click event, not a sequence
3. The pointer click can be cancelled by dragging outside the target area, or pressing <kbd>Escape</kbd> while holding
4. A keyboard click can be cancelled by pressing <kbd>Escape</kbd> while holding
5. Dragging the pointer back and forth outside and inside the target area triggers the active state off and on

<Demo file="./improved.svelte" value="result" />

---

## API

The `Cancellable` building block is a zero-config enhancement and to use it you just have to add an instance to your elements with `use:choco=&lbrace;cancellable}`

**Instance properties**

The instance gives you access to its three attributes:

<dl>
  <dt><code>hover</code>: <span class="font-mono">boolean</span></dt>
  <dd>Whether the element is being hovered</dd>

  <dt><code>active</code>: <span class="font-mono">boolean</span></dt>
  <dd>Whether the element is in the active state</dd>

  <dt><code>focusVisible</code>: <span class="font-mono">boolean</span></dt>
  <dd>Whether the element has focus visible</dd>
</dl>
