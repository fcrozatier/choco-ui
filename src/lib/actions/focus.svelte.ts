/**
 * A node is focusable if it is:
 * - an anchor or area element with an `href` attribute
 * - an input, select, textarea or button that is not disabled
 * - an iframe
 * - an element with a non negative `tabindex`
 * - an element with a truthy `contenteditable`
 *
 * [Ref](https://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus/1600194#1600194)
 */
export const isFocusable = (node: HTMLElement) => {
	return (
		node.querySelector(
			":is(:is(a, area)[href], :is(input, select, textarea, button):not(:disabled), iframe, [tabindex], [contenteditable]):not([tabindex='-1']):not([contenteditable='false'])",
		) !== null
	);
};

/**
 * Make a container node focusable if none of its children can be focused
 */
export const makeFocusable = (node: HTMLElement) => {
	if (!isFocusable(node)) {
		node.tabIndex = 0;
	}
};
