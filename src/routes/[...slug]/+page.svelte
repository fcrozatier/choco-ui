<script lang="ts">
  let { data } = $props();

  const Component = $derived(data.content);
</script>

<article class="prose py-10">
  <Component></Component>
</article>
