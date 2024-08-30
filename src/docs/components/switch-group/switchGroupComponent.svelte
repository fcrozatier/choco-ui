<script lang="ts">
  import * as SwitchGroup from "$lib/components/switch-group/index.js";
  import { Group } from "three";

  let group = $state([]);
</script>

<h2 class="text-sm">Spice level</h2>
<SwitchGroup.Root focus={{ preventInactivation: false }} bind:group>
  <SwitchGroup.Item value="mild" active>Mild</SwitchGroup.Item>
  <SwitchGroup.Item value="medium" variant="outline">Medium</SwitchGroup.Item>
  <SwitchGroup.Item value="hot">Hot</SwitchGroup.Item>
</SwitchGroup.Root>

<span class="font-semibold">Choice: {group.length > 0 ? group : "no spice"}</span>

<p class="text-sm italic">
  {#if group.includes("mild")}
    Enjoy a subtle hint of spice that adds a gentle kick to your chocolate without overwhelming the
    palate
  {:else if group.includes("medium")}
    Experience a balanced heat that complements the rich chocolate flavor for a satisfying, spicy
    kick
  {:else if group.includes("hot")}
    Get ready for a bold and fiery experience with a strong spice kick that pairs intensely with
    your chocolate
  {:else if group.length === 0}
    Feel free to explore other spice levels to find the perfect amount of heat for your taste
  {/if}
</p>
