---
title: FAQ
---

# FAQ

---

## Is it a UI library?

Not really, it's more a UI-kit.

Meaning it's not meant to give out of the box styling. Actually the provided components are only implementation examples of the headless components. It's a starting point, and these components often use the [shadcn](https://www.shadcn-svelte.com) styles. The intent being that you own the files and can customize the component styles to follow your own design system.

It will help you to easily build accessible, reactive and SSR-ready components. The building blocks give you powerful primitives to go beyond what's provided and create your own headless classes while reusing some of the logic and keyboard management from the provided headless classes.

---

## Is it opinionated?

Yes, it follows the "no ARIA is better than bad ARIA" principle and promotes best practices.

For example if a headless component is meant to be used on a button element like the headless `ToggleButton`, you'll get a warning if you try to use it on a div.

Internally it means we're not setting `role` and `aria` everywhere, which would't make sense in modern semantic HTML.

This also implies better SSR, because we know the element and its attributes ahead of time; and less logic so a smaller footprint.

---

## Is it packed with third party libs?

Nope, the design is voluntarily minimalist, with the goal of having a consistent and simple way of getting started and extending things.

Less dependencies implies a smaller API surface, a smaller bundle and more developer happiness.

---

## Is it extendable?

Yes, the UI components are built from the headless classes, which are built on top of a few building blocks, and all three levels are part of the lib and documented.

So you can reuse the building blocks to build your own headless classes and then implement your own custom component.

---