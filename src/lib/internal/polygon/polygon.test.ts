import { describe, expect, it } from "vitest";
import { makeConvexHull } from ".";

describe("makeConvexHull", () => {
	it("deals with edge cases", () => {
		const points = [{ x: 1, y: 1 }];
		expect(makeConvexHull(points)).toStrictEqual(points);

		points.push({ x: 2, y: 2 });
		expect(makeConvexHull(points)).toStrictEqual(points);

		points.push({ x: 3, y: 1 });
		expect(makeConvexHull(points)).toStrictEqual(points);
	});

	const square = [
		{ x: 1, y: 1 },
		{ x: 5, y: 1 },
		{ x: 5, y: 5 },
		{ x: 1, y: 5 },
	];

	const star = [
		{ x: 1, y: 1 },
		{ x: 3, y: 2 },
		{ x: 5, y: 1 },
		{ x: 4, y: 3 },
		{ x: 5, y: 5 },
		{ x: 3, y: 4 },
		{ x: 1, y: 5 },
		{ x: 2, y: 3 },
	];

	it("deals with convex shape", () => {
		expect(new Set(makeConvexHull(square))).toEqual(new Set(square));
	});

	it("works with a star", () => {
		expect(new Set(makeConvexHull(star))).toEqual(new Set(square));
	});

	it("deals with colinear points", () => {
		const points = [
			{ x: 1, y: 1 },
			{ x: 1, y: 3 },
			{ x: 1, y: 4 },
			{ x: 5, y: 1 },
			{ x: 5, y: 5 },
			{ x: 2, y: 2 },
			{ x: 1, y: 5 },
		];
		expect(new Set(makeConvexHull(points))).toEqual(new Set(square));
	});
});
