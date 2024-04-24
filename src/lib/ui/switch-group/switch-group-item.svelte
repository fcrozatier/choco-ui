<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { toggleVariants, type ToggleProps } from "../toggle";
	import type { CreateToggleGroupItem } from "$lib/builders/toggle-group/toggle-group.svelte";

	let {
		class: className,
		size,
		variant,
		pressed,
		children,
		...restProps
	}: ToggleProps & { value: string; children: Snippet } = $props();

	const item = getContext<CreateToggleGroupItem>("choco-createItem")({ pressed, kind: "switch" });
	const ctxVariant = getContext("choco-variant") as ToggleProps["variant"] | undefined;
</script>

<button
	use:item.action
	class={toggleVariants({ variant: variant ?? ctxVariant, size, className })}
	{...restProps}
>
	{@render children?.()}
</button>
