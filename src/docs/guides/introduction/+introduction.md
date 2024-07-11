---
title: Introduction
---

<script lang="ts">
	import Highlighter from "$components/Highlighter.svelte";
</script>

# Introduction

Choco-ui is a Svelte library to help you to create reactive, accessible, ssr-ready, composable & extendable components by either using and customizing the provided components or by using the primitives they are built on to create your own.

There are 3 levels you can work with when using Choco-UI, and you can mix and match them anyway you like. You can use the UI components, the headless components or the primitive mixin classes everything is built on. Let's have a look at each level.

---

## UI components

The easiest way to get started. Just copy & paste the `/components` folder or import from there and customize the styles to your liking.

For example to use the [`Accordion`](/components/accordion) component:

<Highlighter code="styled.svelte" />

Feel free to open the component files and modify the styles to suit your design. If you want to tweak the logic in a reusable way then have a look at the corresponding headless component.

---

## Headless components

Every UI component has a corresponding headless component containing only the sharable logic, attributes and behavior.

When you instanciate a headless component you can use it with the `choco` action. The preprocessor takes care of spreading the attributes and manages actions for you.

Here's an example using the headless `ToggleButton` class to create an unstyled toggle button:

<Highlighter code="headless.svelte" />

In the above example there is no clash between the toggle's inner `click` event listener and the one declared on the button. The `ChocoBase` class and all headless components pass their behavior through an action, avoiding clashes with other declarative listeners.

---

## Mixins

The headless components are built from a few abstract primitives. By combining these primitives you can easily create your own headless components and extend the provided ones.

These primitives take the form of mixins. What's a mixin? It's like a class decorator, but we don't officially have decorators in js yet, so mixins do the job with no additional setup or preprocessing.

So mixins are just functions taking a class and returning a decorated class with new attributes or new behavior. And since functions compose well together, they are nicely composable primitives.

To use a mixin we just extend from its application on the base class, and to compose them we just compose the applications. For example, the `Togglable` mixin adds an `initTogglable` method taking the (initial) attributes to be toggled, whether this initial state is the active state, and the events toggling it. So the headless `ToggleButton` class could be implemented like this:

<Highlighter code="mixin.svelte.ts" />

You see how we could very easily adapt this to create a headless switch component, by toggling `aria-checked` on click. Many things in a UI are togglable so this is a powerful abstraction. From there we can also build a disclosure component by toggling `aria-expanded`, a hoverable by toggling on `mouseenter` and off during `mouseleave`. See the corresponding mixins for more on these low level primitives.

Also notice how readable and short the code is.

---

## And more...

The library comes with a Vite plugin, which combined to some TypeScript choco spells will help you manage two-way bindings across boundaries in a type-safe way. More about this topic [here](/guide/plugin)

---

## Credits

This project draws inspiration from:

- Melt - [https://melt-ui.com](https://melt-ui.com)
- HeadlessUI - [https://headlessui.com](https://headlessui.com)
- ReactAria - [https://react-spectrum.adobe.com/react-aria](https://react-spectrum.adobe.com/react-aria)
- Skeleton - [https://skeleton.dev](https://skeleton.dev)