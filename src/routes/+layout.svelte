<script lang="ts">
  import { page } from "$app/stores";
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
      {
        href: "/plugin",
        title: "Plugin",
      },
    ],
    mixins: [
      {
        href: "/togglable",
        title: "Togglable",
      },
    ],
    // components: [
    //   {
    //     href: "/toggle",
    //     title: "Toggle",
    //   },
    // ],
  };
</script>

<div class="grid">
  <div class="">
    <nav class="fixed mt-10 ml-10 w-64 space-y-10 p-4">
      <h1 class="sr-only">Navigation</h1>
      {#each keys(paths) as key}
        <section class="flex flex-col">
          <h2 class=" mb-2 font-semibold capitalize">{key}</h2>

          {#each paths[key] as { href, title }}
            <a
              class="link"
              aria-current={$page.url.pathname === `/${key}${href}` ? "page" : undefined}
              href={`/${key}${href}`}>{title}</a
            >
          {/each}
        </section>
      {/each}
    </nav>
  </div>
  <main class="overflow-auto px-8 md:max-w-prose">
    {@render children()}
  </main>
</div>

<footer class="mt-auto">footer</footer>

<style>
  .grid {
    display: grid;
    grid-template-columns: 16rem 1fr;
  }

  .link {
    color: var(--color-choco-light);
    text-transform: capitalize;
    padding-block: var(--spacing-1);
    padding-inline: var(--spacing-3);
    position: relative;

    &:is([aria-current="page"], :hover) {
      color: var(--color-coral);

      &::before {
        content: "›";
        position: absolute;
        left: 0;
        bottom: 50%;
        line-height: 0;
      }
    }
  }
</style>
