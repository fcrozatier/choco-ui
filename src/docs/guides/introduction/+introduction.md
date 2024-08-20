---
title: Introduction
---

<script lang="ts">
	import Highlighter from "$components/Highlighter.svelte";
	import Demo from "$components/Demo.svelte";
</script>

# Introduction

Choco-ui is a [Svelte 5](https://svelte.dev/) UI kit that will help you create reactive, accessible, SSR-ready, composable & extendable components by either using and customizing the provided components or by using the primitives they are built on to create your own.

The 3 levels of control and customization you can work with when using Choco-ui are: the UI components, the headless components, and the primitive mixins everything is built on. Let's have a quick look at each one.

---

## UI components

The easiest way to get started. Just copy & paste the `/components` folder or import from there and customize the styles to your liking.

For example to use the [`Accordion`](/) component:

<Demo file="styled.svelte" />

Feel free to open the component files and modify the styles to suit your design. If you want to go to the next level and tweak the logic in a reusable way then you may want to have a look at the corresponding headless component.

---

## Headless components

Every UI component has a corresponding headless component built from sharable building blocs and logic, and managing the attributes and the behavior.

When you instantiate a headless component you can use it with the `choco` action. The preprocessor takes care of spreading the attributes and managing actions for you.

Here's an example using the headless `ToggleButton` class to create an unstyled toggle button:

<Highlighter file="./headless.svelte" />

In the above example there is no clash between the toggle's inner `click` event listener and the one declared on the button. The `ChocoBase` class and all headless components pass their behavior through an action, avoiding clashes with other declarative listeners.

---

## Mixins

The headless components are built from a few primitives. By combining these primitives you can easily create your own headless components and extend the provided ones.

These primitives are mixins. What's a mixin? It's like a class decorator, but we don't officially have decorators in js yet, so mixins do the job with no additional setup or preprocessing.

So mixins are just functions taking a class and returning a decorated class with new attributes or new behavior. And since functions compose well together, they are nicely composable primitives.

To use a mixin we just extend from its application on the base class, and to compose them we just compose the applications. For example, the `Togglable` mixin adds an `initTogglable` method taking the (initial) attributes to be toggled, whether this initial state is the active state, and the events toggling it. So the headless `ToggleButton` class could be implemented like this:

<Highlighter file="./mixin.svelte.ts" />

You see how we could very easily adapt this to create a headless switch component, by toggling `aria-checked` on click. Many things in a UI are togglable so this is a powerful abstraction. From there we can also build a disclosure component by toggling `aria-expanded`, a hoverable by toggling on `mouseenter` and off during `mouseleave`. See the corresponding mixins for more on these low level primitives.

Also notice how readable and short the code is.

---

## Credits

This project draws inspiration from:

- Melt - [https://melt-ui.com](https://melt-ui.com)
- shadcn-svelte - [https://www.shadcn-svelte.com](https://www.shadcn-svelte.com)
- HeadlessUI - [https://headlessui.com](https://headlessui.com)
- ReactAria - [https://react-spectrum.adobe.com/react-aria](https://react-spectrum.adobe.com/react-aria)
- Skeleton - [https://skeleton.dev](https://skeleton.dev)