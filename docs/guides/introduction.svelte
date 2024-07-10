<!-- Generated file from src/docs/guides/introduction/+introduction.md -- do not modify -->
<script context="module">
  export const meta = { title: "Introduction" };
</script>

<script lang="ts">
  import Highlighter from "$components/Highlighter.svelte";
</script>

<h1>Introduction</h1>
<p>
  Choco-ui is a Svelte library to help you to create reactive, accessible, ssr-ready, composable
  &#x26; extendable components by either using and customizing the provided ones or by using the
  primitives they are built on to create your own.
</p>
<p>
  There are 3 levels you can work with when using Choco-UI, and you can mix and match them anyway
  you like. You can use the UI components, the headless components or the primitive mixin classes
  everything is built on. Let’s have a look at each level.
</p>
<hr />
<h2>UI components</h2>
<p>
  The easiest way to get started. Just copy &#x26; paste the <code>/components</code> folder or import
  from there and customize the styles to your liking.
</p>
<p>For example to use the <a href="/components/accordion">Accordion</a> component:</p>
<Highlighter
  code={`
<script lang="ts">
  import * as Accordion from "$lib/components/accordion/index.js";
</script>

<Accordion.Root>
  <Accordion.Item value="item-1">
    {#snippet header()}
      Is it accessible?
    {/snippet}

    Yes. It adheres to the WAI-ARIA design pattern.
  </Accordion.Item>
  <Accordion.Item value="item-2">
    {#snippet header()}
      Is it styled?
    {/snippet}

    Yes. It comes with default styles that matches the other components' aesthetic.
  </Accordion.Item>
</Accordion.Root>

`}
  lang="svelte"
></Highlighter>
<p>
  Feel free to open the component files and modify the styles to suit your design. If you want to
  tweak the logic in a reusable way then have a look at the corresponding headless component.
</p>
<hr />
<h2>Headless components</h2>
<p>
  Every UI component has a corresponding headless component containing only the sharable logic,
  attributes and behavior.
</p>
<p>
  When you instanciate a headless component you can use it with the <code>choco</code> action. The preprocessor
  takes care of spreading the attributes and manages actions for you.
</p>
<p>
  Here’s an example using the headless <code>ToggleButton</code> class to create an unstyled toggle button:
</p>
<Highlighter
  code={`
<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleButton } from "$lib/headless/toggle.svelte";

  const toggle = new ToggleButton();
</script>

<p>
  <!-- Just use the choco action and you're done -->
  <button use:choco={toggle} onclick={() => console.log("still toggling")}>
    I'm {toggle.active ? "" : "not"} pressed
  </button>
</p>

`}
  lang="svelte"
></Highlighter>
<p>
  In the above example there is no clash between the toggle’s inner <code>click</code> event
  listener and the one declared on the button. The <code>ChocoBase</code> class and all headless components
  pass their behavior through an action, avoiding clashes with other declarative listeners.
</p>
<hr />
<h2>Mixins</h2>
<p>
  The headless components are built from a few abstract primitives. By combining these primitives
  you can easily create your own headless components and extend the provided ones.
</p>
<p>
  These primitives take the form of mixins. What’s a mixin? It’s like a class decorator, but we
  don’t officially have decorators in js yet, so mixins do the job with no additional setup or
  preprocessing.
</p>
<p>
  So mixins are just functions taking a class and returning a decorated class with new attributes or
  new behavior. And since functions compose well together, they are nicely composable primitives.
</p>
<p>
  To use a mixin we just extend from its application on the base class, and to compose them we just
  compose the applications. For example, the <code>Togglable</code> mixin adds an
  <code>initTogglable</code>
  method taking the (initial) attributes to be toggled, whether this initial state is the active
  state, and the events toggling it. So the headless <code>ToggleButton</code> element could be implemented
  like this:
</p>
<Highlighter
  code={`
import { ChocoBase } from "$lib/headless/base.svelte.js";
import { Togglable } from "$lib/mixins/togglable.svelte.js";

export class ToggleButton extends Togglable(ChocoBase) {
  constructor(options?: { active: boolean }) {
    super();
    const active = options?.active ?? false;

    this.initTogglable({
      initial: { "aria-pressed": \`\${active}\` },
      active,
      toggle: "click",
    });
  }
}

`}
  lang="ts"
></Highlighter>
<p>
  You see how we could very easily adapt this to create a headless switch component (by toggling <code
    >aria-checked</code
  >). Many things in a UI are togglable so this is a powerful abstraction. From there we can also
  build a disclosure component by toggling <code>aria-expanded</code>, a hoverable by toggling on
  <code>mouseenter</code>
  and off during <code>mouseleave</code>. See the corresponding mixins for more on these low level
  primitives.
</p>
<p>Also notice how readable and short the code is.</p>
<hr />
<h2>And more…</h2>
<p>
  The library comes with a Vite plugin, which combined to some TypeScript choco spells will help you
  manage two-way bindings across boundaries in a type-safe way. More about this topic <a
    href="/guide/plugin">here</a
  >
</p>
