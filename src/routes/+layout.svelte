<script lang="ts">
	import { type Snippet } from "svelte";
	import "../app.css";

	let { children }: { children: Snippet } = $props();
</script>

<div class="flex min-h-full flex-col">
	<div class="mx-auto max-w-prose px-8">
		{@render children()}
	</div>

	<footer class="mt-auto">footer</footer>
</div>
