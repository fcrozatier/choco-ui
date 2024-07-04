<script lang="ts">
	import { choco } from "$lib/actions/choco.js";
	import { CheckboxGroup } from "$lib/headless/checkbox-group.svelte";

	const checkboxGroup = new CheckboxGroup({ checked: "mixed", roving: true });
	const items = [
		{ item: checkboxGroup.createItem({ value: "Lettuce", checked: true }) },
		{ item: checkboxGroup.createItem({ value: "Tomato", checked: true }) },
		{ item: checkboxGroup.createItem({ value: "Mustard", checked: false }) },
		{ item: checkboxGroup.createItem({ value: "Sprout" }) },
	];
</script>

<fieldset>
	<legend> Sandwich Condiments</legend>
	<label class="select-none">
		<input use:choco={checkboxGroup.root} />
		Choose condiment:
	</label>

	<ul class="listot ml-4">
		{#each items as item}
			<li>
				<label class="select-none">
					<input use:choco={item.item} type="checkbox" />
					{item.item.value}
				</label>
			</li>
		{/each}
	</ul>
</fieldset>

{checkboxGroup.active}
{checkboxGroup.checked}

<pre>{JSON.stringify(checkboxGroup.root?.checked, null, 2)}</pre>

<style>
	input[type="checkbox"] {
		appearance: none;
		padding: 0;
		display: inline-block;
		vertical-align: sub;
		background-origin: border-box;
		user-select: none;
		cursor: pointer;
		flex-shrink: 0;
		height: 1rem;
		width: 1rem;
		color: var(--primary);
		background-color: #fff;
		border-color: #000;
		border-width: 1px;
		border-radius: var(--radius-sm);

		@media (pointer: coarse) {
			padding: var(--size);
		}

		&:checked {
			border-color: transparent;
			background-color: currentColor;
			background-size: 100% 100%;
			background-position: center;
			background-repeat: no-repeat;
			background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
		}

		&:indeterminate,
		&[aria-checked="mixed"] {
			background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 16'%3e%3cpath stroke='white' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M4 8h8'/%3e%3c/svg%3e");
			border-color: transparent;
			background-color: currentColor;
			background-size: 100% 100%;
			background-position: center;
			background-repeat: no-repeat;
		}

		&:disabled {
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round' %3E%3Cline x1='18' y1='6' x2='6' y2='18'/%3E%3Cline x1='6' y1='6' x2='18' y2='18'/%3E%3C/svg%3E");
			border-color: transparent;
			background-color: var(--color-gray-300);
			background-size: 80% 80%;
			background-position: center;
			background-repeat: no-repeat;

			&:hover {
				cursor: default;
			}

			&:checked {
				background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
				background-color: var(--color-gray-300);
				background-size: 100% 100%;
				background-position: center;
				background-repeat: no-repeat;
			}
		}
	}
</style>
