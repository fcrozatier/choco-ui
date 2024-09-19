<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { SwitchGroup } from "chocobytes/headless/switch-group.svelte.js";

  const alignment = new SwitchGroup({
    loop: false,
    exclusive: true,
    activateOnNext: true,
    preventInactivation: true,
  });

  alignment.createItem({ value: "mild", active: true });
  alignment.createItem({ value: "medium" });
  alignment.createItem({ value: "hot" });
</script>

<div class="flex justify-center gap-2">
  {#each alignment.items as item}
    <button class="rounded py-2 px-4 outline" class:underline={item.active} use:choco={item}>
      {item.value}
    </button>
  {/each}
</div>

selected heat:
<pre>{alignment.group}</pre>
