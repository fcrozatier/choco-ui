/**
 * Finds the deepest common ancestor
 */
export const commonParent = <T extends (HTMLElement | null | undefined)[]>(nodes: T) => {
	if (nodes.length === 0) return;

	let parent: HTMLElement | null | undefined = nodes.find(
		(node) => node !== null && node !== undefined,
	);

	for (const node of nodes) {
		if (!node) continue;

		while (parent && !parent.contains(node)) {
			parent = parent?.parentElement;
		}
	}

	return parent;
};
