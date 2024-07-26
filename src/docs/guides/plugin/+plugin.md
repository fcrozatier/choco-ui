---
title: Plugin
---

<script lang="ts">
	import Highlighter from "$components/Highlighter.svelte";
	import Demo from "$components/Demo.svelte";
</script>

# Plugin

## The problem

Sometimes you want reactivity to cross boundaries and keep many pieces in sync. In Svelte, the native `$bindable` rune keeps a reactive attribute in sync between components.

But what about reactivity between functions or classes? A sensible solution is to pass around getters and setters. In this example, it allows to keep the checkbox and toggle in sync:

<Demo file="getters.svelte" />

But:

- There is no _discoverability_. Does the `ToggleButton` class accepts a reactive `active` attribute? The only way to know is to check the docs or manually test.
- There is no type safety. If the `ToggleButton` API changed and didn't accept a reactive attribute anymore, we would be passing a getter for nothing without knowing.
- It is verbose and impacts readability. For a single reactive attribute, with Prettier enable it takes 6 lines of boilerplate code.

## The solution

Once you've installed the [Vite plugin](/guides/getting-started), you can use the `bind` function which solves all three problems. It is a type-safe shorthand, and takes two arguments: the attribues object, and an array of keys to keep in sync.

<Highlighter file="./bind.svelte" />