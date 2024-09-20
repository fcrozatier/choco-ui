---
title: Preprocessor
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
</script>

# Preprocessor

The Choco preprocessor expands the `use:choco` shorthand syntax, which allows you to use headless instances easily, with a great DX and type-safety.

Here's an example using the headless `ToggleButton` class: with the shorthand syntax the code is much cleaner. But both syntaxes are totally equivalent. The preprocessed shorthand is also type-safe, so eg. TypeScript would complain if `toggle` was used on a `span` element.

<Demo file="useExample.svelte" value="code" />

Under the hood the preprocessor takes advantage of the fact that all headless classes are instances of a [`ChocoBase`](/blocks/chocobase) class with a simple contract, having `attributes` to spread and an `action` to use.