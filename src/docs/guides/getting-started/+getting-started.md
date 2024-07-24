---
title: Getting Started
---

<script lang="ts">
  import Highlighter from "$components/Highlighter.svelte";
</script>

# Getting Started

1. First install the `chocobytes` package:

<Highlighter file="./install.sh" />


2. Then configure your `svelte.config.js` by adding the choco preprocessor:

<Highlighter file="./preprocessor.js" />

The preprocessor expands the `use:choco` shorthand syntax. [Learn more](/guides/preprocessor)

3. Then add the Vite plugin to your `vite.config.ts`:

<Highlighter file="./plugin.ts" />

The plugin gives you type safety and discoverability on cross-boundary two-way bindings. [Learn more](/guides/plugin)