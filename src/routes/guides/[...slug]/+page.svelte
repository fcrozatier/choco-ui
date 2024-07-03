<script lang="ts">
	let { data } = $props();
</script>

<article class="prose">
	<h1>{data?.meta?.title}</h1>
	<svelte:component this={data.content}></svelte:component>
</article>
