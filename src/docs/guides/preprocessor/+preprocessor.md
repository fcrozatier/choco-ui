---
title: Preprocessor
---

<script lang="ts">
  import Demo from "$components/Demo.svelte";
</script>

# Preprocessor

The Choco preprocessor expands the `use:choco` shorthand syntax, which allows you to use headless Choco instances easily:

<Demo file="useExample.svelte" value="code" />

Under the hood it takes advantage of the fact that all classes are instances of a `ChocoBase` class with a simple contract, having attributes to spread and an action setting the behavior.