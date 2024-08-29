# Choco UI

A Svelte UI-kit providing you building blocks for composable, extendable, reactive, SSR-ready UI components, headless classes and mixins.

## Getting Started

1. First install the `chocobytes` package:

```sh
pnpm add -D chocobytes
```

2. Then configure your `svelte.config.js` by adding the choco preprocessor:

```js
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import { chocoPreprocess } from "chocobytes/preprocessor";

export default {
  preprocess: [chocoPreprocess(), vitePreprocess()],
  //... rest of your Svelte config
};

```

The preprocessor expands the `use:choco` shorthand syntax. [Learn more](/guides/preprocessor)

3. (Recommended). To copy the component, headless and mixin files to your own project folder, run:

```sh
npx chocobytes
```

This way you own the files and can easily customize and tweak them or learn from them. Also copy-pasting examples from the documentation will just work, without adjusting the imports.

4. (Optional). If you want the default styles to experiment with before using your own, you need Tailwind 4

## Architecture

A few building blocks allow us to build the headless classes and corresponding UI components.

These building blocks are the `Togglable`, `Group` and `Triggerable` mixins.

## Credits

- Melt - [https://melt-ui.com](https://melt-ui.com)
- shadcn-svelte - [https://www.shadcn-svelte.com](https://www.shadcn-svelte.com)
- HeadlessUI - [https://headlessui.com](https://headlessui.com)
- ReactAria - [https://react-spectrum.adobe.com/react-aria](https://react-spectrum.adobe.com/react-aria)
- Skeleton - [https://skeleton.dev](https://skeleton.dev)