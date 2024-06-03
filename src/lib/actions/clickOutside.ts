export function clickOutside<T extends HTMLElement>(node: T, callback: (node: T) => void) {
	const handleClick = (e: Event) => {
		if (!node.contains(e.target as T)) {
			callback(node);
		}
	};

	document.addEventListener("click", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		},
	};
}
