// TS Mixin constructor constraint
// https://www.typescriptlang.org/docs/handbook/mixins.html#constrained-mixins
export type Constructor<Class = {}> = new (...options: any[]) => Class;

export type MixedWith<Mixin extends (...args: any) => any> = InstanceType<ReturnType<Mixin>>;

/**
 * Custom utility type to Omit a supertype from a type
 */
export type OmitSupertype<T extends S, S> = Omit<Defined<T>, keyof Defined<S>> & {
	[K in keyof S as K extends keyof T
		? T[K] extends Record<PropertyKey, any> | undefined
			? K
			: never
		: never]?: K extends keyof T
		? T[K] extends Record<PropertyKey, any> | undefined
			? OmitSupertype<T[K], S[K]>
			: Omit<T[K], K>
		: never;
};

type Defined<T> = T extends undefined ? never : T;
