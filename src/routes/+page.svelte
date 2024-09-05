<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Canceller } from "$lib/mixins/cancellable.svelte.js";

  const cancel1 = new Canceller();
</script>

<svelte:head>
  <title>ChocoUI</title>
</svelte:head>

<article class="m-auto grid max-w-prose place-items-center items-center gap-y-12 px-4 text-white">
  <h1 class="font-cursive text-4xl md:text-5xl">Choco <span class="text-coral">UI</span></h1>

  <p class="max-w-2xl text-center font-light">
    Build your Svelte UI from a few building blocks allowing you to implement reactive, accessible,
    SSR-ready components and headless classes in a simple, reusable and extendable fashion.
  </p>

  <div class="flex gap-10">
    <a href="/guides/introduction" class="bg-coral rounded py-4 px-8" use:choco={cancel1}
      >Get Started</a
    >
  </div>
</article>

<style>
  a {
    border-radius: var(--radius-sm);
    transition: all 200ms ease-out;

    &[data-active="true"] {
      scale: 0.95;
    }
  }
</style>
