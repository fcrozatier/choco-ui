<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleGroup } from "./toggleGroupExample.js";

  const toppings = new ToggleGroup({
    loop: true,
    roving: true,
    exclusive: true,
    activateOnNext: true,
    preventInactivation: false,
  });

  toppings.createItem({ value: "small", active: true });
  toppings.createItem({ value: "medium" });
  toppings.createItem({ value: "large" });
</script>

<button>A</button>

<p>
  Topping amount:

  {#if toppings.group.length === 0}
    none
  {:else}
    {toppings.group[0]}
  {/if}
</p>

<div class="my-8 flex gap-4">
  {#each toppings.items as item}
    <button class="rounded py-2 px-4 outline" class:underline={item.active} use:choco={item}>
      {item.value}
    </button>
  {/each}
</div>

<button>B</button>
