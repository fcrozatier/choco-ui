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
    class="hover:bg-coral focus-visible:outline-coral cursor-pointer rounded py-2 px-4 outline-2 outline-slate-100 transition-all focus-visible:outline-offset-2 active:scale-95 active:bg-orange-700"
    onclick={() => {
      console.log("button clicked");
      button++;
    }}
  >
    Button <span class="tabular-nums">{button}</span>
  </button>
  <a
    class="focus-visible:outline-coral hover:bg-coral inline-block rounded py-2 px-4 text-center text-slate-100! outline-2 outline-slate-100 transition-all focus-visible:outline-offset-2! active:scale-95 active:bg-orange-700"
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
