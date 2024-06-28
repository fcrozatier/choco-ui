<script lang="ts">
	import { type Snippet } from "svelte";
	import "../app.css";

	let { children }: { children: Snippet } = $props();
</script>

<div class="mx-auto max-w-prose">
	{@render children()}
</div>
