---
title: Introduction
---

<script lang="ts">
	import Highlighter from "$components/Highlighter.svelte";
</script>

# Introduction

Choco-ui is a Svelte library to help you to create reactive, accessible, ssr-ready, composable & extendable components by either using and customizing the provided ones or by using the choco primitives they are built on to create your own.

There are 3 levels you can work with when using Choco-UI, and you can mix and match them anyway you like. You can use the styled components, the headless components or the primitive mixin classes everything is built on. Let's have a look at each level.

## Styled components

That's the easiest way to get started. Just import a component from the `/components` folder or even better just copy / paste this folder in your components folder and customize things to your liking.

For example to use the [Accordion](/components/accordion) component:

<Highlighter code="styled.svelte" />

Feel free to open the component files and modify the styles to suit your design. If you feel like you want to modify the implementation then you may want to have a look at the corresponding headless component first.

## Headless components

Each styled component has a corresponding headless (unstyled) component containing only the sharable logic, attributes and behavior.

Once you've instanciated a headless component you can use it with the `choco` action. Under the hood the preprocessor will take care of spreading the attributes and will manage the event listeners and behaviors.

Here's an example using the headless `ToggleButton` class to create an unstyled toggle button:

<Highlighter code="unstyled.svelte" />

In the above example there is no clash between the toggle inner `click` event listener and the one declared on the button. The `ChocoBase` class and all headless components pass their behavior through an action, avoiding clashes with other declarative listeners.

## Mixins

Every headless component is built from a few abstract primitives. By combining these primitives you can easily create your own headless components or extend the provided ones.

The headless components are built with mixins. What's a mixin? It's just a decorator on a class actually, but since we do not have decorators in js yet, and to let you easily use the primitives without more setup and preprocessing, that's what we have for now. Once decorators are a thing, there could be a different implementation.

So these mixins are just functions taking a class and returning a decorated class, maybe with new attributes or new behavior. And since functions compose well together, we have nicely composable primitives.

To use a mixin we just extend from its application on the base class, and to compose them we just compose the applications. For example, the `Togglable` mixin adds an `initTogglable` method taking the (initial) attributes to be toggled, whether this initial state is the active state, and what events toggle it. So the headless `ToggleButton` element could be implemented like this:

<Highlighter code="mixin.svelte.ts" lang="ts" />

You see how we could very easily adapt this to create a headless switch component (by toggling `aria-checked`), a disclosure component (toggling `aria-expanded`), a hoverable (by toggling on during `mouseenter` and off during `mouseleave`). Many things in a UI are togglable so this is a powerful abstraction and a good starting point.

Also notice how readable and short the code is.

## And more...

Actually there is also a Vite plugin, which combined to some TypeScript choco spells will help you manage two-way bindings across boundaries in a type-safe way. More about this topic [here](/guide/plugin)
