/**
 * Helps keep two reactive values in sync.
 *
 * Takes in the two getters and setters
 */
export function sync<T>(
	getA: () => T,
	getB: () => T,
	setA: (newA: T) => void,
	setB: (newB: T) => void,
) {
	let a = getA();
	let b = getB();

	$effect.pre(() => {
		const [newA, newB] = [getA(), getB()];

		if (a !== newA) {
			a = newA;
			b = newA;
			setB(newA);
		} else if (b !== newB) {
			a = newB;
			b = newB;
			setA(newB);
		}
	});
}
