<script lang="ts">
  import type { Snippet } from "svelte";
  import "../site.css";

  let { children }: { children: Snippet } = $props();
</script>

{@render children()}
