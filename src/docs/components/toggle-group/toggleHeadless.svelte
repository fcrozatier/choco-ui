<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { ToggleGroup } from "$lib/headless/toggle-group.svelte";

  let group = $state(["B"]);

  const toggleGroup = new ToggleGroup({
    loop: true,
    // bind the group
    group: () => group,
    setGroup(v) {
      group = v;
    },
  });

  toggleGroup.createItem({ value: "B", active: true });
  toggleGroup.createItem({ value: "I" });
  toggleGroup.createItem({ value: "U" });
</script>

<div class="flex justify-center gap-2">
  {#each toggleGroup.items as item}
    <button class="rounded py-2 px-4 outline aria-pressed:underline" use:choco={item}
      >{item.value}</button
    >
  {/each}
</div>

<!-- This part is only to demonstrate the bindability -->
<div class="mt-8 flex gap-2">
  {#each ["B", "I", "U"] as value}
    <label>
      <input type="checkbox" {value} bind:group />
      {value}
    </label>
  {/each}
</div>

<span>active {toggleGroup.group}</span>
