---
title: Why
---

## What is this?

Choco is not really a UI library, it's more a UI kit.

It will shine when you want more control over your components, create your own extendable headless components and at the same time reuse some of the logic and building blocs of the provided headless components and mixins. It's meant to be customized and extended.

---

## Who is it not for?

This is not meant to be an out of the box default UI. Actually the provided components are only implementation examples of the headless components, and often use the [shadcn](https://www.shadcn-svelte.com) styles. The intent being that you own the files and can customize the component styles to follow your own design system.

---

## Is it opinionated?

Yes, it follows the "no ARIA is better than bad ARIA" principle and promotes best practices.

For example if a headless component was made to be used on a button element like the headless `ToggleButton`, you'll get a warning if you try to use it on a div.

Internally it means we're not setting `roles` and `aria` everywhere, as it doesn't make sense in modern, semantic HTML.

This also means better SSR, because we know the element and its attributes ahead of time, and less logic.

---

## Is it packed with third party libs?

No, the design is minimalist, with the goal of having a consistent and simple way of getting started and extending things.

Less dependencies implies a smaller API surface, a smaller bundle and more developer happiness.

---

## Is it extendable?

Yes, the UI components are built from the headless components, which are built using the mixins building blocs, and all three levels are part of the lib and documented.

So you can reuse the mixins to build your own headless components and then implement your own custom UI component.