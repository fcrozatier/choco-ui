<script lang="ts">
  let button = $state(0);
  let anchor = $state(0);
</script>

<p class="mt-0! mb-10! text-balance text-center">
  Styling with CSS <code>:hover</code>, <code>:active</code> and
  <code class="whitespace-nowrap">:focus-within</code> states
</p>

<div class="not-prose grid grid-cols-2 gap-8">
  <button
    class="bg-coral focus-visible:outline-coral touch-none rounded py-2 px-4 outline-none transition-all select-none hover:cursor-pointer hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95"
    onclick={() => {
      console.log("button clicked");
      button++;
    }}
  >
    Button <span class="tabular-nums">{button}</span>
  </button>
  <a
    class="bg-coral focus-visible:outline-coral inline-block cursor-default touch-none rounded py-2 px-4 text-center text-slate-100! no-underline! transition-all select-none hover:cursor-pointer hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2! active:scale-95"
    href="/"
    onclick={(e) => {
      e.preventDefault();
      console.log("anchor clicked");
      anchor++;
    }}
  >
    Anchor <span class="tabular-nums">{anchor}</span>
  </a>
</div>
