---
title: Getting Started
---

<script lang="ts">
  import Highlighter from "$components/Highlighter.svelte";
</script>

# Getting Started

1. First install the `chocobytes` package:

<Highlighter file="./install.sh" />


2. Then add the choco preprocessor to your `svelte.config.js`:

<Highlighter file="./preprocessor.js" />

The preprocessor expands the `use:choco` shorthand syntax. [Learn more](/guides/preprocessor)

3. (Optional). To copy the component files to your own project folder, run:

<Highlighter file="./copy.sh" />

The CLI will let you choose which components to copy to your project's `$lib/components` folder.
This way you own the files and can easily customize and tweak the Tailwind styles and overall implementations. Tailwind v4 is recommended for optimal results.

Also, copy-pasting examples from this documentation will just work out of the box, without adjusting the imports.
