---
title: Introduction
---

<script lang="ts">
	import Highlighter from "$components/Highlighter.svelte";
	import Demo from "$components/Demo.svelte";
</script>

# Introduction

Choco-ui is a UI-kit for [Svelte 5](https://svelte.dev/) to help you create reactive, accessible, SSR-ready, composable & extendable components by either using and customizing the provided components or by using the primitives they are built on to create your own.

We can describe the architecture in the following way:
> You own the design, and we share the logic.

This is a hybrid approach where you literally own the component files and can modify them to suit your designs, and yet still get updates and bug fixes on the shared logic, headless classes and building blocks, all in a seamless way.

You can think of the provided components as implementation examples of the headless classes that you can customize. So `choco-ui` can be used both as a headless component library if you do not copy the components, or as a UI library if you want a solid starting point and customize later on.

The library is composed of components, headless classes, and the primitive building blocks everything is built on. You can use these building blocks to go beyond what's provided and create your own headless classes.

Let's have a quick look at these different parts.

---

## UI components

The easiest way to get started. Once you've [added the library](/guides/getting-started), the install script will let you choose the components you want to copy to your project's `$lib/components` folder. Then you can easily modify these files and tweak their Tailwind styles.

Here's an example using the [`Accordion`](/) component. The files live inside `$lib/components` and the implementation can be modified there. Again, you own the components.

<Demo file="component.svelte" />

---

## Headless classes

Each UI component is paired with a corresponding headless class built from the building blocks. This headless class is in charge of managing the attributes, the behavior, keyboard navigation, accessibility etc.

You can use these headless classes directly with the `choco` action: the [preprocessor](/guides/preprocessor) takes care of everything for you. Here's an example using the headless `ToggleButton` class to create an unstyled toggle button:

<Demo file="./headless.svelte" value="code" />

In the above example there is no clash between the toggle's inner `click` event listener and the one declared on the button. Internally, the [`ChocoBase`](/blocks/chocobase) class everything inherits from manages behaviors with actions, avoiding clashes with other declarative listeners.

---

## Building blocks

The headless classes are built from a few building blocks, which allow for power code reuse and extensions. By combining these building blocks you can easily create your own headless classes. Here's an overview:

- The main building block is the [`ChocoBase`](/blocks/chocobase) class. All headless classes inherit from it and its role is to set the simple contract that all components share.

- Two conceptual classes help solve recurring UI patterns:
  1. The [`Toggleable`](/blocks/toggleable) class allows to toggle a set of attributes on specific events. This is quite versatile: almost every interactive component toggles attributes in some way.
  2. The [`Triggerable`](/blocks/triggerable) class helps orchestrate a control-target relation. Think Tabs, Disclosures, Accordions etc.

- The last main abstraction is the [`Group`](/blocks/group) mixin. It allows us to easily group things together as in toggle groups, tabs, accordions etc; track active elements and manage keyboard navigation.

What's a mixin? It's like a class decorator, but we don't officially have decorators in js yet, so mixins do the job with no additional setup or preprocessing. It's just a fancy word for a function taking a class and returning a decorated class with new attributes or new behavior.

---

## Credits

This project draws inspiration from:

- Melt - [https://melt-ui.com](https://melt-ui.com)
- shadcn-svelte - [https://www.shadcn-svelte.com](https://www.shadcn-svelte.com)
- HeadlessUI - [https://headlessui.com](https://headlessui.com)
- ReactAria - [https://react-spectrum.adobe.com/react-aria](https://react-spectrum.adobe.com/react-aria)
- Skeleton - [https://skeleton.dev](https://skeleton.dev)