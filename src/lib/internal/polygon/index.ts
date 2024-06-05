export type Point = {
	x: number;
	y: number;
};

export function getPointsFromEl(el: HTMLElement): Point[] {
	const rect = el.getBoundingClientRect();
	return [
		{ x: rect.left, y: rect.top },
		{ x: rect.right, y: rect.top },
		{ x: rect.right, y: rect.bottom },
		{ x: rect.left, y: rect.bottom },
	];
}

export function convexHullFromElements(els: HTMLElement[]): Point[] {
	const points = els.flatMap((el) => getPointsFromEl(el));
	return makeConvexHull(points);
}

export function pointInConvexPolygon(point: Point, polygon: Point[], strict = false) {
	if (polygon.length < 3) return false;

	const signs = polygon.map((origin, index) => {
		const next = polygon[(index + 1) % polygon.length] as Point;
		return Math.sign(ccw(origin, next, point));
	});

	if (strict) {
		return signs.every((v) => v === signs[0]) && signs[0] !== 0;
	}
	return signs.every((v) => v >= 0) || signs.every((v) => v <= 0);
}

function norm<T extends Point>(v: T) {
	return Math.hypot(v.x, v.y);
}

function vector(to: Point, from: Point): Point {
	return { x: to.x - from.x, y: to.y - from.y };
}

/**
 * Returns the angle made by a vector (x,y) to the downward y axis.
 */
function arctan(x: number, y: number) {
	if (x === 0 && y >= 0) return 0;
	if (x === 0 && y < 0) return Math.PI;
	if (y === 0 && x > 0) return Math.PI / 2;
	if (y === 0 && x < 0) return -Math.PI / 2;
	return Math.atan2(x, y);
}

/**
 * Computes the determinant of v1 and v2 in this order (anti-symmetric)
 */
function determinant<T extends Point>(v1: T, v2: T) {
	return v1.x * v2.y - v1.y * v2.x;
}

/**
 * Determines if three points make a counter-clockwise turn
 * Returns > 0 if true, 0 if colinear, < 0 if false
 */
function ccw(a: Point, b: Point, c: Point) {
	return determinant(vector(b, a), vector(c, a));
}

/**
 * Computes the 2D convex hull of `points` by the [Graham scan](https://en.wikipedia.org/wiki/Graham_scan)
 */
export function makeConvexHull(points: Point[]): Point[] {
	// Leftmost point
	const origin = points.reduce((prev, curr) => {
		if (prev.x < curr.x) {
			return prev;
		} else if (prev.x === curr.x) {
			return prev.y <= curr.y ? prev : curr;
		}
		return curr;
	});

	// Sort by angle made from the origin point, relative to y-axis
	const sortedByAngle = points.toSorted((a: Point, b: Point) => {
		const atanA = arctan(a.x - origin.x, a.y - origin.y);
		const atanB = arctan(b.x - origin.x, b.y - origin.y);

		if (atanA < atanB) return -1;
		if (atanA > atanB) return 1;
		// Returns the point furthest appart last
		return norm(a) - norm(b);
	});

	const stack: Point[] = [];

	for (const point of sortedByAngle) {
		if (stack.length < 2) {
			stack.push(point);
			continue;
		}

		// y-axis is downward in the browser so det has the opposite sign
		while (stack.length > 1 && ccw(stack.at(-2) as Point, stack.at(-1) as Point, point) >= 0) {
			stack.pop();
		}
		stack.push(point);
	}

	return stack;
}
