---
title: Cancellable
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
  import Highlighter from "$components/Highlighter.svelte";
</script>

# Cancellable

The `Cancellable` building block adds three reactive attributes —`data-hover`, `data-active`, and `data-focus-visible`— to your button and anchor elements. These attributes normalize the behavior of the `:hover`, `:active` and `:focus-visible` states, offering a more consistent user experience across browsers.

---

## The problem

Button and anchor elements behave inconsistently across browsers when it comes to CSS states.
The demo below illustrates this by showing a button and anchor styled with default CSS `:hover`, `:focus-visible`, and `:active` states.

What happens when you click one of these elements and, before releasing the click, drag your cursor outside of the element? Does the counter increment?

Give it a try, and you'll notice the first inconsistency: the counter doesn't increment, but the `:active` state remains visually active, which can be confusing.

1. **Visual vs Functional Cancellability** <br>
    The click is functionally cancelled, but the visual state remains :active.


<Demo file="./defaults.svelte" value="result" />

Other inconsistencies:

2. **Keyboard cancellability** <br>
  There is no equivalent cancellability for keyboard users. Hitting the <kbd>Escape</kbd> key while holding <kbd>Space</kbd> or <kbd>Enter</kbd> won't cancel the click
3. **Multiple events** <br>
  Holding down <kbd>Space</kbd> fires one click event on the button, while holding down <kbd>Enter</kbd> fires multiple events. However, pressing <kbd>Escape</kbd> while holding <kbd>Enter</kbd> stops the sequence of clicks. Anchors, on the other hand, don't fire multiple click events.
4. **Browser-Specific Issues** <br>
   - <span class="font-semibold">Chrome</span>: When a button is focused, pressing <kbd>Space</kbd> triggers the `:active` state, but pressing <kbd>Enter</kbd> does not.
   - <span class="font-semibold">Firefox</span>: Neither <kbd>Space</kbd> nor <kbd>Enter</kbd> triggers the `:active` state on buttons
   - <span class="font-semibold">Safari</span>: Focus doesn't work on buttons by design. This won't be fixed (see [MDN's note](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#clicking_and_focus) on Safari behavior)
5. **Anchors** <br>
   - Pressing <kbd>Enter</kbd> on an anchor does not trigger the `:active` state.
   - Pressing <kbd>Space</kbd> on an anchor does not even fire a click. This is how anchors work and is not a problem in itself, but rather something to have in mind when normalizing behaviors for the few places where you need anchors styled as buttons

---

## Solving the Problem with `Cancellable`

The `Cancellable` class normalizes these inconsistencies, providing a consistent experience across browsers.

Here's what is fixes:

1. **Unified Active State** <br>
The primary pointer button, <kbd>Space</kbd> and <kbd>Enter</kbd> all trigger the click event and set the `data-active` state
2. **Single Click Event** <br>
Only one click event is fired, regardless of whether the user holds the pointer down, <kbd>Space</kbd> or <kbd>Enter</kbd>. No more repeated firing with <kbd>Enter</kbd>
3. **Cancellability**
   - The pointer click can be cancelled by dragging outside the element or pressing <kbd>Escape</kbd> while holding the pointer down
   - Keyboard clicks can be cancelled by pressing <kbd>Escape</kbd> while holding <kbd>Space</kbd> or <kbd>Enter</kbd>
4. **Active State Restoration** <br>
 The `data-active` state turns off when the pointer is dragged outside the element and turns back on if the pointer re-enters the target area while holding the click


### Demo: Improved Behavior

Try out the improved version with these normalized states:

<Demo file="./improved.svelte" value="result" />

---

## Usage

<Highlighter file="./usage.svelte" />

---

## API

The `Cancellable` class provides a zero-config enhancement. Simply add it to your elements as in the usage example

**Instance properties**

<dl>
  <dt><code>hover</code>: <span class="font-mono">boolean</span></dt>
  <dd>Whether the element is being hovered</dd>

  <dt><code>active</code>: <span class="font-mono">boolean</span></dt>
  <dd>Whether the element is in an active state</dd>

  <dt><code>focusVisible</code>: <span class="font-mono">boolean</span></dt>
  <dd>Whether the element has visible focus</dd>
</dl>
