<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Canceller } from "$lib/mixins/cancellable.svelte.js";

  const cancel1 = new Canceller();
  const cancel2 = new Canceller();
</script>

<svelte:head>
  <title>ChocoUI</title>
</svelte:head>

<article class="m-auto grid max-w-prose place-items-center items-center gap-y-12 text-white">
  <h1 class="font-cursive text-3xl md:text-4xl">Choco UI</h1>

  <p class="max-w-2xl text-center">
    Build your Svelte UI from a few building blocks allowing you to implement reactive, accessible,
    SSR ready components and headless classes in a simple, reusable and extendable fashion.
  </p>

  <div class="flex gap-10">
    <a href="/guides/getting-started" class="bg-coral rounded py-4 px-8" use:choco={cancel1}
      >Get Started</a
    >
    <a
      href="/guides/introduction"
      class="text-dark rounded bg-neutral-100 py-4 px-8"
      use:choco={cancel2}
    >
      Learn More</a
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
