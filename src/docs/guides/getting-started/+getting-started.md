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

3. (Recommended). To copy the component, headless and mixin files to your own project folder, run:

<Highlighter file="./copy.sh" />

This way you own the files and can easily customize and tweak them or learn from them. Also copy-pasting examples from this documentation will just work, without adjusting the imports.

4. (Optional). If you want the default styles to experiment with before using your own, you need Tailwind 4