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
export const createPressToggle = (options?: { pressed?: TriState }) => {
	let pressed: TriState = $state(options?.pressed ?? false);
	let element: HTMLElement | undefined;

	const handleClick = () => {
		pressed = !pressed;
		updateAttributes();
	};

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === key.ENTER || e.key === key.SPACE) handleClick();
	};

	const updateAttributes = () => {
		if (pressed !== undefined) {
			element?.setAttribute('aria-pressed', String(pressed));
		} else {
			element?.removeAttribute('aria-pressed');
		}
	};

	return {
		get pressed() {
			return pressed;
		},

		set pressed(newVal) {
			pressed = newVal;
			updateAttributes();
		},

		action: ((node) => {
			element = node;
			node.setAttribute('aria-pressed', String(pressed));

			node.addEventListener('click', handleClick);
			node.addEventListener('keydown', handleKeydown);

			return {
				destroy() {
					node.removeEventListener('click', handleClick);
					node.removeEventListener('keydown', handleKeydown);
				}
			};
		}) satisfies Action
	};
};
