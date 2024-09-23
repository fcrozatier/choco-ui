---
title: ChocoBase
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
  import Highlighter from "$components/Highlighter.svelte";
</script>


# ChocoBase

This is the main class most building blocks and headless classes inherits from. It sets the stage for the `choco` action by enforcing a simple contract with just attributes and actions, as well as two additional methods for extending these.

The constructor accepts an optional record of HTML attributes and a type parameter allows to constrain the class to be used on specific HTML tags.

---

## Example

The `ChocoBase` class defines two methods, `extendAttributes` and `extendActions` which allow to specialize the attributes and behavior of the class at any point in the future. This is useful for creating specialized building blocks or headless classes.

<Demo file="./example.svelte" value="code" />

---

## API

Below, `T` refers to the type the `ChocoBase<T>` class was constrained to. By default it is set to `"generic"`, which implies the available attributes are those of a generic `HTMLElement`.

<dl>
  <dt><code>attributes</code>: <span class="font-mono">Attributes&lt;T></span></dt>
  <dd>A getter returning the attributes. Used internally by the <a href="/guides/preprocessor">preprocessor</a></dd>

  <dt><code>action</code>: <span class="font-mono">Action&lt;HTMLElementsMap[T]></span></dt>
  <dd>A getter merging all defined actions into a single one. Used internally by the <a href="/guides/preprocessor">preprocessor</a></dd>

  <dt><code>extendAttributes</code>: <span class="font-mono">(newAttributes: Attributes&lt;T>): void</span></dt>
  <dd>A method allowing to add or override attributes.</dd>

  <dt><code>extendActions</code>: <span class="font-mono">(...actions: Action&lt;HTMLElementsMap[T]>[]): void</span></dt>
  <dd>A method allowing to add new behavior with actions.</dd>
</dl>
