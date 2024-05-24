import type { HTMLAttributes } from "svelte/elements";

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

/**
 * Only keep the keys whose values match a given type
 */
export type Filter<T extends Record<any, any>, S> = {
	[K in keyof T as T[K] extends S ? K : never]: T[K];
};

export type Attributes<T extends HTMLElement> = HTMLAttributes<HTMLElement> &
	Partial<Filter<T, boolean | string | number | undefined>> & {
		[name: string]: any;
	};

export type Orientation = "horizontal" | "vertical";
