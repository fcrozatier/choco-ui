<script lang="ts">
	import { type Snippet } from "svelte";
	import "../app.css";

	let { children }: { children: Snippet } = $props();
</script>

<div class="grid">
	<div class="relative">
		<nav class="fixed w-64 p-4">
			<h1 class="sr-only">Navigation</h1>
			<section class="flex flex-col gap-2">
				<h2 class="font-semibold">Guide</h2>
				<a class="hover:bg-red-300" href="/accordion">Introduction</a>
				<a class="hover:bg-red-300" href="/accordion">Getting Started</a>
				<a class="hover:bg-red-300" href="/accordion">Accordion</a>
				<a class="hover:bg-red-300" href="/accordion">Accordion</a>
			</section>

			<hr />

			<section>
				<h2 class="font-semibold">Components</h2>
				<a href="/accordion">Accordion</a>
			</section>
		</nav>
	</div>
	<div class="max-w-prose px-8">
		{@render children()}
	</div>
</div>

<footer class="mt-auto">footer</footer>

<style>
	.grid {
		display: grid;
		grid-template-columns: 256px auto;
	}
</style>
