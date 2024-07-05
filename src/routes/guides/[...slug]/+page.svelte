<script lang="ts">
  let { data } = $props();
</script>

<article class="prose">
  <svelte:component this={data.content}></svelte:component>
</article>
