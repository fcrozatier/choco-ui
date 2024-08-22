<script lang="ts">
  import { choco } from "$lib/actions/choco.js";
  import { SwitchGroup } from "$lib/headless/switch-group.svelte";

  const alignment = new SwitchGroup({
    loop: false,
    exclusive: true,
    activateOnNext: true,
    preventInactivation: true,
  });

  alignment.createItem({ value: "left", active: true });
  alignment.createItem({ value: "center" });
  alignment.createItem({ value: "right" });
</script>

<div class="flex justify-center gap-2">
  {#each alignment.items as item}
    <button class="rounded py-2 px-4 outline" class:underline={item.active} use:choco={item}>
      {item.value}
    </button>
  {/each}
</div>

selected text alignment:
<pre>{alignment.group}</pre>
