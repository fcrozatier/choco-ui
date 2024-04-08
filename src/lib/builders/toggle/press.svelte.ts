import { updateAttribute, updateBooleanAttribute } from '$lib/internal/helpers';
import { key } from '$lib/utils/keyboard';
import type { Action } from 'svelte/action';

// Regarding ARIA you can achieve the same thing with only a checkbox
// https://www.accessibility-developer-guide.com/examples/sensible-aria-usage/pressed/#alternative-technique-using-checkbox

type TriState = boolean | 'mixed' | undefined;

/**
 * Toggle button
 *
 * Semantics: pressed, not pressed, partially pressed ("mixed" state) or unset
 *
 * The label should not change when the state changes. Use `simpleToggle` if needed.
 */
export const createPressToggle = (options?: { pressed?: TriState; disabled?: boolean }) => {
	let pressed: TriState = $state(options?.pressed ?? false);
	let disabled: boolean = $state(options?.disabled ?? false);
	let element: HTMLElement | undefined;

	const handleClick = () => {
		if (disabled) return;
		pressed = !pressed;
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === key.ENTER || e.key === key.SPACE) handleClick();
	};

	const cleanup = $effect.root(() => {
		$effect(() => {
			updateAttribute(element, 'aria-pressed', pressed);
			updateBooleanAttribute(element, 'disabled', disabled);
		});
	});

	return {
		states: {
			get pressed() {
				return pressed;
			},

			set pressed(newVal) {
				pressed = newVal;
			},

			get disabled() {
				return disabled;
			},

			set disabled(newVal) {
				disabled = newVal;
			}
		},

		action: ((node) => {
			element = node;

			node.addEventListener('click', handleClick);
			node.addEventListener('keydown', handleKeydown);

			return {
				destroy() {
					node.removeEventListener('click', handleClick);
					node.removeEventListener('keydown', handleKeydown);
					cleanup();
				}
			};
		}) satisfies Action,

		options
	};
};
