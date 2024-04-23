<script lang="ts">
	import { createToggle } from "$lib/builders/toggle/toggle.svelte";
	import { cn } from "$lib/utils/styles.js";
	import type { SwitchProps } from ".";

	let { class: className, pressed, children, ...restProps }: SwitchProps = $props();

	let toggle = createToggle({ pressed, type: "switch" });
</script>

<!-- "      transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0" -->
<!-- <svelte:element
	this={element}
	class={cn(
		"handle h-6 w-12 shrink-0 cursor-pointer appearance-none rounded-full border border-gray-500 bg-gray-500 transition-shadow",
		className,
	)}
	use:toggle.action
/> -->

<!-- {#if element === "input"}
	<input
		class={cn(
			"handle h-6 w-12 shrink-0 cursor-pointer appearance-none rounded-full border border-gray-500 bg-gray-500 transition-shadow",
			className,
		)}
		use:toggle.action
	/>
{:else if element === "button"} -->
<button
	class={cn(
		"handle h-6 w-12 shrink-0 cursor-pointer appearance-none rounded-full border border-gray-500 bg-gray-500 transition-shadow",
		className,
	)}
	use:toggle.action
	{...restProps}
>
	{@render children?.()}
</button>

<!-- {/if} -->

<style>
	.handle {
		--handle-offset: 1.5rem;
		--handle-offset-calculator: calc(var(--handle-offset) * -1);
		--toggle-handle-border: 0 0;

		box-shadow:
			var(--handle-offset-calculator) 0 0 2px var(--color-white) inset,
			0 0 0 2px var(--color-white) inset;

		&:checked,
		&[aria-checked="true"] {
			--handle-offset-calculator: var(--handle-offset);
			--tw-border-opacity: 1;
			--tw-bg-opacity: 1;
		}
	}
</style>
