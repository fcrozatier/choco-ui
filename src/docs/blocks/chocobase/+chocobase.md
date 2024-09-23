---
title: ChocoBase
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
  import Highlighter from "$components/Highlighter.svelte";
</script>


# ChocoBase

This is the main class most building blocks and headless classes inherits from. It sets the stage for the `choco` action by enforcing a simple contract with just attributes and actions, as well as two additional methods for extending these.

---

## Example

The constructor accepts an optional record of HTML attributes and you can restrict where the class will be used with a type parameter specifying the underlying HTML element tag.

The `ChocoBase` class defines two methods, `extendAttributes` and `extendActions` which allow to specialize the attributes and behavior of the class at any point in the future. This is useful for creating specialized building blocks or headless classes.

<Demo file="./example.svelte" value="code" />

---

## API

<dl>
  <dt>attributes: Attributes&lt;T></dt>
  <dd>A getter returning the attributes.</dd>

  <dt>action: Action&lt;HTMLElementsMap[T]></dt>
  <dd>A getter merging all defined actions into a single one.</dd>

  <dt>extendAttributes: (newAttributes: Attributes&lt;T>): void</dt>
  <dd>A method allowing to add or override attributes.</dd>

  <dt>extendActions: (...actions: Action&lt;HTMLElementsMap[T]>[]): void</dt>
  <dd>A method allowing to add new behavior with actions.</dd>
</dl>
