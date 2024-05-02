import type { Constructor } from "./types";

export const mix = <SuperClass>(superclass: Constructor<SuperClass>) =>
	new MixinBuilder(superclass);

class MixinBuilder<SuperClass> {
	superclass;

	constructor(superclass: Constructor<SuperClass>) {
		this.superclass = superclass;
	}

	with = <T extends ((...args: any) => any)[]>(...mixins: T) => {
		// @ts-ignore
		return mixins.reduce((c, mixin) => mixin(c), this.superclass) as Intersect<ReturnMap<T>>;
	};
}

class Cat {
	meow() {}
}

class Dog {
	bark() {}
}

const classes = [Cat, Dog];

type Intersect<T extends unknown[]> = T extends [infer A, ...infer Rest]
	? Rest extends []
		? A
		: A & Intersect<Rest>
	: T;

function intersect<T extends unknown[]>(...args: T) {
	return args as Intersect<T>;
}

const i = intersect(Cat, Dog);

type InstanceMap<T extends (new (...args: any) => any)[]> = {
	[K in keyof T]: InstanceType<T[K]>;
};
type ReturnMap<T extends ((...args: any) => any)[]> = {
	[K in keyof T]: ReturnType<T[K]>;
};

type R = ReturnMap<[() => number, () => string]>;
