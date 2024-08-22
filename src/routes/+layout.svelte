<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "$components/Icon.svelte";
  import { keys } from "$lib/utils/index.js";
  import { type Snippet } from "svelte";
  import "../site.css";

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
        href: "/faq",
        title: "FAQ",
      },
    ],
    mixins: [
      {
        href: "/togglable",
        title: "Togglable",
      },
      {
        href: "/group",
        title: "Group",
      },
    ],
    components: [
      {
        href: "/toggle",
        title: "Toggle",
      },
      {
        href: "/toggle-group",
        title: "Toggle Group",
      },
    ],
  };
</script>

<div class="grid">
  <div class="">
    <nav
      class="fixed top-0 bottom-0 flex h-full w-64 flex-col gap-10 overflow-auto p-4 pt-10 pb-8 pl-10"
    >
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
      <footer class="mt-auto">
        <a
          href="https://github.com/fcrozatier/choco-ui"
          class="fill-white opacity-50 hover:opacity-70"
          target="_blank"
          ><Icon name="github" width="2rem"></Icon> <span class="sr-only">GitHub</span>
        </a>
      </footer>
    </nav>
  </div>
  <main class="overflow-auto px-8 md:max-w-prose">
    {@render children()}
  </main>
</div>

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
