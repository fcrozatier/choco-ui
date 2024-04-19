/**
 * Finds the deepest common ancestor
 */
export const commonParent = <T extends HTMLElement[]>(nodes: T) => {
	if (nodes.length === 0) return;

	let parent: HTMLElement | null | undefined = nodes[0];

	for (const node of nodes) {
		while (!(parent as HTMLElement).contains(node)) {
			parent = (parent as HTMLElement).parentElement;
		}
	}

	return parent;
};
