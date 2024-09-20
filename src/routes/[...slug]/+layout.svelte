<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "$components/Icon.svelte";
  import { clickOutside } from "$lib/actions/clickOutside.js";
  import { ToggleButton } from "$lib/headless/toggle.svelte.js";
  import { choco } from "$lib/index.js";
  import { keys } from "$lib/utils/index.js";
  import { onMount, type Snippet } from "svelte";
  import { fly } from "svelte/transition";
  import { paths } from "./menu.js";

  let { children }: { children: Snippet } = $props();

  const menu = new ToggleButton({ active: true });

  let width = $state(0);

  const resize = () => {
    width = window.innerWidth;
  };

  onMount(() => {
    width = window.innerWidth;
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
    };
  });
</script>

<div>
  <button
    class="absolute top-0 left-0 flex items-center gap-1 p-4 md:hidden"
    inert={width > 48 * 16}
    title="Menu"
    use:choco={menu}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 34"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
      <rect x="3" y="25" width="7" height="7"></rect>
      <rect x="14" y="25" width="7" height="7"></rect>
    </svg>
    <span class="text-sm"> Menu </span>
  </button>
</div>

<div class="grid">
  <div class="">
    {#if menu.active || width > 48 * 16}
      <nav
        class="bg-dark-muted/95 md:bg-dark-muted/80 fixed top-0 bottom-0 flex w-64 flex-col gap-10 overflow-auto p-4 pt-10 pb-8 shadow-2xl"
        transition:fly={{ x: -100, duration: 150 }}
        use:clickOutside={() => {
          if (width < 48 * 16) {
            menu.off();
          }
        }}
      >
        {#each keys(paths) as key}
          <section class="flex flex-col pl-8">
            <h2 class=" mb-2 font-semibold capitalize">{key}</h2>

            {#each paths[key] as { href, title }}
              {@const current = $page.url.pathname === `/${key}${href}` ? "page" : undefined}
              <div class="inline-flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke-width="1"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="stroke-coral fill-coral invisible"
                  class:visible={current}
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                </svg>
                <a class="link" aria-current={current} href={`/${key}${href}`}>{title}</a>
              </div>
            {/each}
          </section>
        {/each}
        <footer class="">
          <a
            href="https://github.com/fcrozatier/choco-ui"
            class="flex items-center justify-center gap-2 fill-slate-100 opacity-90 hover:opacity-70"
            target="_blank"
          >
            <Icon name="github" width="2rem"></Icon>
            <span class="">GitHub</span>
          </a>
        </footer>
      </nav>
    {/if}
  </div>

  <main class="overflow-auto px-4 sm:px-20 md:max-w-prose">
    {@render children()}
  </main>
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: 16rem 1fr;

    /* Since --breakpoint-md: 48rem */
    @media screen and (max-width: 48rem) {
      grid-template-columns: 1fr;
    }
  }

  .link {
    color: var(--color-choco-light);
    text-transform: capitalize;
    padding-block: var(--spacing-1);
    padding-inline: var(--spacing-3);

    &:is([aria-current="page"], :hover) {
      color: var(--color-coral);
    }
  }
</style>
