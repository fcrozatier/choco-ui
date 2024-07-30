<script lang="ts">
  let { data } = $props();
</script>

<article class="prose py-10">
  <svelte:component this={data.content}></svelte:component>
</article>
