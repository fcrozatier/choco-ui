---
title: Getting Started
---

<script lang="ts">
  import Highlighter from "$components/Highlighter.svelte";
  import Demo from "$components/Demo.svelte";
</script>

# Getting Started

1. First install the `chocobytes` package:

<Highlighter code="install.sh" />


2. Then configure your `svelte.config.js` by adding the choco preprocessor:

<Highlighter code="preprocessor.js" />

The preprocessor expands the `use:choco` shorthand syntax. [Learn more](/guides/preprocessor)

3. Then add the Vite plugin to your `vite.config.ts`:

<Highlighter code="plugin.ts" />

The plugin gives you type safety and discoverability on cross-boundary two-way bindings. [Learn more](/guides/plugin)