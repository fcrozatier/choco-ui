<script lang="ts">
  import { page } from "$app/stores";
  import Icon from "$components/Icon.svelte";
  import { clickOutside } from "$lib/actions/clickOutside.js";
  import { ToggleButton } from "$lib/headless/toggle.svelte.js";
  import { choco } from "$lib/index.js";
  import { keys } from "$lib/utils/index.js";
  import { onMount, type Snippet } from "svelte";
  import { fly } from "svelte/transition";

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
        href: "/triggerable",
        title: "Triggerable",
      },
      {
        href: "/group",
        title: "Group",
      },
    ],
    components: [
      {
        href: "/accordion",
        title: "Accordion",
      },
      {
        href: "/disclosure",
        title: "Disclosure",
      },
      {
        href: "/switch",
        title: "Switch",
      },
      {
        href: "/switch-group",
        title: "Switch Group",
      },
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
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="active:fill-current"
    >
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>
    <span class="text-sm"> Menu </span>
  </button>
</div>

<div class="grid">
  <div class="">
    {#if menu.active || width > 48 * 16}
      <nav
        class="bg-dark-muted/95 md:bg-dark-muted/80 fixed top-0 bottom-0 flex h-full w-64 flex-col gap-10 overflow-auto p-4 pt-10 pb-8 pl-10 shadow-2xl"
        transition:fly={{ x: -100, duration: 150 }}
        use:clickOutside={() => {
          if (width < 48 * 16) {
            menu.off();
          }
        }}
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
          >
            <Icon name="github" width="2rem"></Icon> <span class="sr-only">GitHub</span>
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
