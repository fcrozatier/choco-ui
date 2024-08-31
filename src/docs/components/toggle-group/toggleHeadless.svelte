<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleGroup } from "$lib/headless/toggle-group.svelte";

  let group = $state(["nuts"]);

  const toppings = new ToggleGroup({
    loop: true,
    // bind the group
    group: () => group,
    setGroup(v) {
      group = v;
    },
  });

  toppings.createItem({ value: "nuts", active: true });
  toppings.createItem({ value: "caramel" });
  toppings.createItem({ value: "crunch" });
</script>

<div class="flex justify-center gap-2">
  {#each toppings.items as item}
    <button class="rounded py-2 px-4 outline aria-pressed:underline" use:choco={item}
      >{item.value}</button
    >
  {/each}
</div>

<!-- This part is only to demonstrate the bindability -->
<div class="mt-8 flex gap-2">
  {#each ["nuts", "caramel", "crunch"] as value}
    <label>
      <input type="checkbox" {value} bind:group />
      {value}
    </label>
  {/each}
</div>

<p>Choice: {toppings.group}</p>
