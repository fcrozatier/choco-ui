---
title: Plugin
---

<script lang="ts">
	import Highlighter from "$components/Highlighter.svelte";
	import Demo from "$components/Demo.svelte";
</script>

# Plugin

Sometimes you want reactivity to cross boundaries to keep many pieces in sync. In Svelte, the native `$bindable` rune keeps a component prop in sync between parent and child.

But what about function or classes boundaries? A solution is to pass around getters and setters as in this example, to keep the checkbox and toggle in sync:

<Demo file="./getters.svelte" />

But:

- There is no _discoverability_. Does the `ToggleButton` class accepts a reactive `active` attribute? The only way to know is to check the docs or manually test.
- There is no type safety. If the `ToggleButton` API changed and didn't accept a reactive attribute anymore, we would be passing a getter for nothing without knowing.
- It is verbose and impairs readability. With Prettier enabled, each reactive attribute will take 6 lines of boilerplate code.

## Solution

Once you've [setup](/guides/getting-started) the Choco Vite plugin, you can use the `bind` function which solves all three problems above. It is a type-safe shorthand, and takes two arguments: the attribues object, and an array of keys to keep in sync.

<Demo file="./bind.svelte" />

This way, you can easily discover bindable attributes of a headless component without leaving the code, and have type-safety along with it.

Since Svelte doesn't know about the plugin transform, the above example would therefore give you a warning message: "State referenced in its own scope will never update".

This is a false positive and you can easily remove these messages by adding the following to your `svelte.config.js`:

<Highlighter file="./svelte.config.js" />