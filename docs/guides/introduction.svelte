<!-- Generated file from src/docs/guides/introduction/introduction.md :: Do not modify -->
  <script context="module">
    export const meta = {"title":"Introduction"}
  </script>
  <h1>Introduction</h1>
<p>Choco-ui is a Svelte library to help you to create reactive, accessible, ssr-ready, composable &#x26; extendable components by either using and customizing the provided ones or by using the choco primitives they are built on to create your own.</p>
<p>There are 3 levels you can work with when using Choco-UI, and you can mix and match them anyway you like. You can use the styled components, the headless components or the primitive mixin classes everything is built on. Let’s have a look at each level.</p>
<h2>Styled components</h2>
<p>That’s the easiest way to get started. Just import a component from the <code>/components</code> folder or even better just copy / paste this folder in your components folder and customize things to your liking.</p>
<p>For example to use the <a href="/components/accordion">Accordion</a> component:</p>
<pre class="shiki poimandres" style="background-color:#1b1e28;color:#a6accd" tabindex="0"><code><span class="line"><span style="color:#E4F0FB">&#x3C;</span><span style="color:#5DE4C7">script</span><span style="color:#91B4D5;font-style:italic"> lang</span><span style="color:#A6ACCD">=</span><span style="color:#A6ACCD">"</span><span style="color:#5DE4C7">ts</span><span style="color:#A6ACCD">"</span><span style="color:#E4F0FB">></span></span>
<span class="line"><span style="color:#5DE4C7">	import * </span><span style="color:#A6ACCDC0">as</span><span style="color:#ADD7FF"> Accordion</span><span style="color:#A6ACCD"> from</span><span style="color:#A6ACCD"> "</span><span style="color:#5DE4C7">$lib/components/accordion/index.js</span><span style="color:#A6ACCD">"</span><span style="color:#A6ACCD">;</span></span>
<span class="line"><span style="color:#E4F0FB">&#x3C;/</span><span style="color:#5DE4C7">script</span><span style="color:#E4F0FB">></span></span>
<span class="line"></span>
<span class="line"><span style="color:#E4F0FB">&#x3C;</span><span style="color:#5DE4C7">Accordion</span><span style="color:#E4F0FB">.</span><span style="color:#5DE4C7">Root</span><span style="color:#E4F0FB">></span></span>
<span class="line"><span style="color:#E4F0FB">	&#x3C;</span><span style="color:#5DE4C7">Accordion</span><span style="color:#E4F0FB">.</span><span style="color:#5DE4C7">Item</span><span style="color:#91B4D5;font-style:italic"> value</span><span style="color:#A6ACCD">=</span><span style="color:#A6ACCD">"</span><span style="color:#5DE4C7">item-1</span><span style="color:#A6ACCD">"</span><span style="color:#E4F0FB">></span></span>
<span class="line"><span style="color:#A6ACCD">		{#snippet </span><span style="color:#E4F0FBD0">header</span><span style="color:#A6ACCD">()}</span></span>
<span class="line"><span style="color:#A6ACCD">			Is it accessible?</span></span>
<span class="line"><span style="color:#A6ACCD">		{/snippet}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD">		Yes. It adheres to the WAI-ARIA design pattern.</span></span>
<span class="line"><span style="color:#E4F0FB">	&#x3C;/</span><span style="color:#5DE4C7">Accordion</span><span style="color:#E4F0FB">.</span><span style="color:#5DE4C7">Item</span><span style="color:#E4F0FB">></span></span>
<span class="line"><span style="color:#E4F0FB">	&#x3C;</span><span style="color:#5DE4C7">Accordion</span><span style="color:#E4F0FB">.</span><span style="color:#5DE4C7">Item</span><span style="color:#91B4D5;font-style:italic"> value</span><span style="color:#A6ACCD">=</span><span style="color:#A6ACCD">"</span><span style="color:#5DE4C7">item-2</span><span style="color:#A6ACCD">"</span><span style="color:#E4F0FB">></span></span>
<span class="line"><span style="color:#A6ACCD">		{#snippet </span><span style="color:#E4F0FBD0">header</span><span style="color:#A6ACCD">()}</span></span>
<span class="line"><span style="color:#A6ACCD">			Is it styled?</span></span>
<span class="line"><span style="color:#A6ACCD">		{/snippet}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD">		Yes. It comes with default styles that matches</span></span>
<span class="line"><span style="color:#A6ACCD">the other components' aesthetic.</span></span>
<span class="line"><span style="color:#E4F0FB">	&#x3C;/</span><span style="color:#5DE4C7">Accordion</span><span style="color:#E4F0FB">.</span><span style="color:#5DE4C7">Item</span><span style="color:#E4F0FB">></span></span>
<span class="line"><span style="color:#E4F0FB">	&#x3C;</span><span style="color:#5DE4C7">Accordion</span><span style="color:#E4F0FB">.</span><span style="color:#5DE4C7">Item</span><span style="color:#91B4D5;font-style:italic"> value</span><span style="color:#A6ACCD">=</span><span style="color:#A6ACCD">"</span><span style="color:#5DE4C7">item-3</span><span style="color:#A6ACCD">"</span><span style="color:#E4F0FB">></span></span>
<span class="line"><span style="color:#A6ACCD">		{#snippet </span><span style="color:#E4F0FBD0">header</span><span style="color:#A6ACCD">()}</span></span>
<span class="line"><span style="color:#A6ACCD">			Is it animated?</span></span>
<span class="line"><span style="color:#A6ACCD">		{/snippet}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#A6ACCD">		Yes. It's animated by default, but you can disable</span></span>
<span class="line"><span style="color:#A6ACCD">it if you prefer.</span></span>
<span class="line"><span style="color:#E4F0FB">	&#x3C;/</span><span style="color:#5DE4C7">Accordion</span><span style="color:#E4F0FB">.</span><span style="color:#5DE4C7">Item</span><span style="color:#E4F0FB">></span></span>
<span class="line"><span style="color:#E4F0FB">&#x3C;/</span><span style="color:#5DE4C7">Accordion</span><span style="color:#E4F0FB">.</span><span style="color:#5DE4C7">Root</span><span style="color:#E4F0FB">></span></span>
<span class="line"></span></code></pre>
<p>Feel free to open the component files and modify the styles to suit your design. If you feel like you want to modify the implementation then you may want to have a look at the corresponding headless component first.</p>
<h2>Headless components</h2>
<p>Each styled component has a corresponding headless (unstyled) component containing only the sharable logic, attributes and behavior.</p>
<p>Once you’ve instanciated a headless component you can use it with the <code>choco</code> action. Under the hood the preprocessor will take care of spreading the attributes and will manage the event listeners and behaviors.</p>
<p>Here’s an example using the headless <code>ToggleButton</code> class to create an unstyled toggle button:</p>
<pre class="shiki poimandres" style="background-color:#1b1e28;color:#a6accd" tabindex="0"><code><span class="line"><span style="color:#E4F0FB">&#x3C;</span><span style="color:#5DE4C7">script</span><span style="color:#91B4D5;font-style:italic"> lang</span><span style="color:#A6ACCD">=</span><span style="color:#A6ACCD">'</span><span style="color:#5DE4C7">ts</span><span style="color:#A6ACCD">'</span><span style="color:#E4F0FB">></span></span>
<span class="line"><span style="color:#5DE4C7">  import </span><span style="color:#A6ACCD">{</span><span style="color:#ADD7FF"> choco</span><span style="color:#A6ACCD"> }</span><span style="color:#A6ACCD"> from</span><span style="color:#A6ACCD"> "</span><span style="color:#5DE4C7">$lib/actions/choco.js</span><span style="color:#A6ACCD">"</span><span style="color:#A6ACCD">;</span></span>
<span class="line"><span style="color:#5DE4C7">  import </span><span style="color:#A6ACCD">{</span><span style="color:#ADD7FF"> ToggleButton</span><span style="color:#A6ACCD"> }</span><span style="color:#A6ACCD"> from</span><span style="color:#A6ACCD"> "</span><span style="color:#5DE4C7">$lib/headless/toggle.svelte</span><span style="color:#A6ACCD">"</span><span style="color:#A6ACCD">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B4D5">  const</span><span style="color:#E4F0FB"> toggle</span><span style="color:#91B4D5"> =</span><span style="color:#5DE4C7"> new</span><span style="color:#E4F0FBD0"> ToggleButton</span><span style="color:#A6ACCD">();</span></span>
<span class="line"><span style="color:#E4F0FB">&#x3C;/</span><span style="color:#5DE4C7">script</span><span style="color:#E4F0FB">></span></span>
<span class="line"></span>
<span class="line"><span style="color:#E4F0FB">&#x3C;</span><span style="color:#5DE4C7">p</span><span style="color:#E4F0FB">></span></span>
<span class="line"><span style="color:#767C9DB0;font-style:italic">  &#x3C;!-- Just use the choco action and you're done --></span></span>
<span class="line"><span style="color:#E4F0FB">	&#x3C;</span><span style="color:#5DE4C7">button</span></span>
<span class="line"><span style="color:#A6ACCD">    use:</span><span style="color:#E4F0FBD0">choco</span><span style="color:#A6ACCD">=</span><span style="color:#E4F0FB">{toggle}</span></span>
<span class="line"><span style="color:#91B4D5;font-style:italic">    onclick</span><span style="color:#A6ACCD">=</span><span style="color:#E4F0FB">{</span><span style="color:#A6ACCD">()</span><span style="color:#91B4D5"> =></span><span style="color:#E4F0FB"> console</span><span style="color:#A6ACCD">.</span><span style="color:#E4F0FBD0">log</span><span style="color:#A6ACCD">(</span><span style="color:#A6ACCD">"</span><span style="color:#5DE4C7">still toggling</span><span style="color:#A6ACCD">"</span><span style="color:#A6ACCD">)</span><span style="color:#E4F0FB">}></span></span>
<span class="line"><span style="color:#A6ACCD">      I'm </span><span style="color:#E4F0FB">{toggle</span><span style="color:#A6ACCD">.</span><span style="color:#E4F0FB">active</span><span style="color:#91B4D5"> ?</span><span style="color:#A6ACCD"> ""</span><span style="color:#91B4D5"> :</span><span style="color:#A6ACCD"> "</span><span style="color:#5DE4C7">not</span><span style="color:#A6ACCD">"</span><span style="color:#E4F0FB">}</span><span style="color:#A6ACCD"> pressed</span></span>
<span class="line"><span style="color:#E4F0FB">  &#x3C;/</span><span style="color:#5DE4C7">button</span><span style="color:#E4F0FB">></span></span>
<span class="line"><span style="color:#E4F0FB">&#x3C;/</span><span style="color:#5DE4C7">p</span><span style="color:#E4F0FB">></span></span>
<span class="line"></span></code></pre>
<p>In the above example there is no clash between the toggle inner <code>click</code> event listener and the one declared on the button. The <code>ChocoBase</code> class and all headless components pass their behavior through an action, avoiding clashes with other declarative listeners.</p>
<h2>Mixins</h2>
<p>Every headless component is built from a few abstract primitives. By combining these primitives you can easily create your own headless components or extend the provided ones.</p>
<p>The headless components are built with mixins. What’s a mixin? It’s just a decorator on a class actually, but since we do not have decorators in js yet, and to let you easily use the primitives without more setup and preprocessing, that’s what we have for now. Once decorators are a thing, there could be a different implementation.</p>
<p>So these mixins are just functions taking a class and returning a decorated class, maybe with new attributes or new behavior. And since functions compose well together, we have nicely composable primitives.</p>
<p>To use a mixin we just extend from its application on the base class, and to compose them we just compose the applications. For example, the <code>Togglable</code> mixin adds an <code>initTogglable</code> method taking the (initial) attributes to be toggled, whether this initial state is the active state, and what events toggle it. So the headless <code>ToggleButton</code> element could be implemented like this:</p>
<pre class="shiki poimandres" style="background-color:#1b1e28;color:#a6accd" tabindex="0"><code><span class="line"><span style="color:#91B4D5">class</span><span style="color:#ADD7FF"> ToggleButton</span><span style="color:#5DE4C7"> extends</span><span style="color:#E4F0FBD0"> Togglable</span><span style="color:#A6ACCD">(</span><span style="color:#E4F0FB">ChocoBase</span><span style="color:#A6ACCD">) {</span></span>
<span class="line"></span>
<span class="line"><span style="color:#91B4D5">  constructor</span><span style="color:#A6ACCD">(</span><span style="color:#E4F0FB">options</span><span style="color:#91B4D5">?:</span><span style="color:#A6ACCD"> {active</span><span style="color:#91B4D5">:</span><span style="color:#A6ACCDC0"> boolean</span><span style="color:#A6ACCD">}) {</span></span>
<span class="line"><span style="color:#5DE4C7;font-style:italic">    super</span><span style="color:#A6ACCD">();</span></span>
<span class="line"><span style="color:#91B4D5">    const</span><span style="color:#E4F0FB"> active</span><span style="color:#91B4D5"> =</span><span style="color:#E4F0FB"> options</span><span style="color:#A6ACCD">?.</span><span style="color:#E4F0FB">active</span><span style="color:#91B4D5"> ??</span><span style="color:#D0679D"> false</span><span style="color:#A6ACCD">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#5DE4C7;font-style:italic">    this</span><span style="color:#A6ACCD">.</span><span style="color:#E4F0FBD0">initTogglable</span><span style="color:#A6ACCD">(</span></span>
<span class="line"><span style="color:#A6ACCD">      {</span></span>
<span class="line"><span style="color:#ADD7FF">        initial</span><span style="color:#A6ACCD">:</span><span style="color:#A6ACCD"> {</span><span style="color:#A6ACCD"> "</span><span style="color:#5DE4C7">aria-pressed</span><span style="color:#A6ACCD">"</span><span style="color:#A6ACCD">:</span><span style="color:#A6ACCD"> `${</span><span style="color:#E4F0FB">active</span><span style="color:#A6ACCD">}`</span><span style="color:#A6ACCD"> },</span></span>
<span class="line"><span style="color:#E4F0FB">        active</span><span style="color:#A6ACCD">,</span></span>
<span class="line"><span style="color:#ADD7FF">        toggle</span><span style="color:#A6ACCD">:</span><span style="color:#A6ACCD"> "</span><span style="color:#5DE4C7">click</span><span style="color:#A6ACCD">"</span><span style="color:#A6ACCD">,</span></span>
<span class="line"><span style="color:#A6ACCD">      },</span></span>
<span class="line"><span style="color:#A6ACCD">    );</span></span>
<span class="line"><span style="color:#A6ACCD">	}</span></span>
<span class="line"><span style="color:#A6ACCD">}</span></span>
<span class="line"></span></code></pre>
<p>You see how we could very easily adapt this to create a headless switch component (by toggling <code>aria-checked</code>), a disclosure component (toggling <code>aria-expanded</code>), a hoverable (by toggling on during <code>mouseenter</code> and off during <code>mouseleave</code>). Many things in a UI are togglable so this is a powerful abstraction and a good starting point.</p>
<p>Also notice how readable and short the code is.</p>
<h2>And more…</h2>
<p>Actually there is also a Vite plugin, which combined to some TypeScript choco spells will help you manage two-way bindings across boundaries in a type-safe way. More about this topic <a href="/guide/plugin">here</a></p>