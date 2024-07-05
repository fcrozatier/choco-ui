<script lang="ts">
  import { keys } from "@fcrozatier/ts-helpers";
  import { type Snippet } from "svelte";
  import "../app.css";

  let { children }: { children: Snippet } = $props();

  const paths = {
    guides: [
      {
        href: "/introduction",
        title: "Introduction",
      },
      {
        href: "/getting-started",
        title: "Getting Started",
      },
      {
        href: "/preprocessor",
        title: "Preprocessor",
      },
    ],
    mixins: [
      {
        href: "/togglable",
        title: "Togglable",
      },
    ],
    components: [
      {
        href: "/toggle",
        title: "Toggle",
      },
    ],
  };
</script>

<div class="grid">
  <div class="relative">
    <nav class="fixed w-64 space-y-10 p-4">
      <h1 class="sr-only">Navigation</h1>
      {#each keys(paths) as key}
        <section class="flex flex-col">
          <h2 class="mb-2 font-semibold capitalize">{key}</h2>

          {#each paths[key] as { href, title }}
            <a class="text-gray hover:text-coral py-1 px-3 capitalize" href={`/${key}${href}`}
              >{title}</a
            >
          {/each}
        </section>
      {/each}
    </nav>
  </div>
  <div class="max-w-prose px-8">
    {@render children()}
  </div>
</div>

<footer class="mt-auto">footer</footer>

<style>
  .grid {
    display: grid;
    grid-template-columns: 256px auto;
  }
</style>
