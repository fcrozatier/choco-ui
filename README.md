## Composable, extensible, reactive, Svelte 5 ready, SSR ready, headless components builder

HTML attributes are already reactive by default. So let's build upon this!

Also, Svelte being HTML centric, an HTML-first solution will let us benefit from all the Svelte goodness and bindings etc.

This means adding a minimal API surface area: we rely as much as possible on standard HTML elements for taking care of state and functionality, and only add inner state and props when needed.

The benefits are many:

- First there is obviously less going back and forth with the documentation and less to remember. So it's already easier to use.

- Second it forces us to use proper HTML Elements. Sometimes headless is too powerful, and we could use div everywhere, relying on the library to fix ARIA and functionality. But here since we rely on HTML wherever possible for state and behavior we have to use the correct elements. For example the toggle functionality only makes sense on a button or input, not on a span. The types will help go in the right direction by complaining if an incorrect element is used. So it's all safe and ensures best practices.

- Another benefit of a smaller API is less code. This means a lighter library, faster to load and to run.

Even though HTML elements are reactive, the markup is not necessarily updated. We normalize this to make sure that the state is actually reflected in the DOM. This helps with debugging.
