<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { Cancellable } from "$lib/blocks/cancellable.svelte";

  const b1 = new Cancellable();
  const b2 = new Cancellable();
  const b3 = new Cancellable();
</script>

<p class="p-10">
  <button
    class="active:bg-coral border-none py-2 px-4 outline-blue-300 hover:bg-red-400 focus-visible:outline-2 active:scale-95"
    onclick={() => console.log("click")}>button</button
  >

  <button
    class="data-[active=true]:bg-coral py-2 px-4 outline-blue-300 data-[active=true]:scale-95 data-[focus-visible=true]:outline-2 data-[hover=true]:bg-red-400"
    onclick={() => console.log("hi")}
    use:choco={b2}>Improved button Canceller</button
  >
  <a
    class="data-[active=true]:bg-coral py-2 px-4 outline-blue-300 data-[active=true]:scale-95 data-[focus-visible=true]:outline-2 data-[hover=true]:bg-red-400"
    href="/"
    use:choco={b3}>Improved a Canceller</a
  >
</p>

<form
  onsubmit={(e) => {
    console.log("submit");
    e.preventDefault();
  }}
>
  <button
    class="data-[active=true]:bg-coral py-2 px-4 outline-blue-300 data-[active=true]:scale-95 data-[focus-visible=true]:outline-2 data-[hover=true]:bg-red-400"
    use:choco={b1}>Submit</button
  >
</form>

<pre>{JSON.stringify(b2.attributes, null, 2)}</pre>
<pre>{JSON.stringify(b3.attributes, null, 2)}</pre>

<style>
  button,
  a {
    border-radius: var(--radius-sm);
    transition:
      background 200ms ease-out,
      scale 200ms ease-out;
  }
</style>
