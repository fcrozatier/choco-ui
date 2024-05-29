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
	[K in keyof T as T[K] extends S ? (K extends S ? K : never) : never]: T[K];
};

export type Orientation = "horizontal" | "vertical";

// https://github.com/Microsoft/TypeScript/issues/27024
type Equals<X, Y> =
	(<T>() => T extends X ? 1 : 0) extends <T>() => T extends Y ? 1 : 0 ? true : false;

type WritableKeys<T> = {
	[K in keyof T]: Equals<{ [P in K]: T[K] }, { -readonly [P in K]: T[K] }> extends true ? K : never;
}[keyof T];

export type Attributes<T extends HTMLElement> = Omit<
	{
		[K in keyof Omit<
			HTMLAttributes<HTMLElement>,
			`on:${string}` | `bind:${string}` | "children"
		>]?: HTMLAttributes<HTMLElement>[K];
	} & {
		[K in WritableKeys<T> as K extends (typeof NonGlobalAttributes)[number] ? K : never]?:
			| T[K]
			| null
			| undefined;
	},
	never
>;

const NonGlobalAttributes = [
	"accept",
	"accept-charset",
	"action",
	"allow",
	"alt",
	"as",
	"async",
	"autocomplete",
	"autoplay",
	"capture",
	"charset",
	"checked",
	"cite",
	"cols",
	"colspan",
	"content",
	"controls",
	"coords",
	"crossorigin",
	"csp",
	"data",
	"datetime",
	"decoding",
	"default",
	"defer",
	"dirname",
	"disabled",
	"download",
	"enctype",
	"enterkeyhint",
	"for",
	"form",
	"formaction",
	"formenctype",
	"formmethod",
	"formnovalidate",
	"formtarget",
	"headers",
	"high",
	"href",
	"hreflang",
	"http-equiv",
	"integrity",
	"inputmode",
	"ismap",
	"kind",
	"label",
	"loading",
	"list",
	"loop",
	"low",
	"max",
	"maxlength",
	"minlength",
	"media",
	"method",
	"min",
	"multiple",
	"muted",
	"name",
	"novalidate",
	"open",
	"optimum",
	"pattern",
	"ping",
	"placeholder",
	"playsinline",
	"poster",
	"preload",
	"readonly",
	"referrerpolicy",
	"rel",
	"required",
	"reversed",
	"rows",
	"rowspan",
	"sandbox",
	"scope",
	"selected",
	"shape",
	"size",
	"sizes",
	"span",
	"src",
	"srcdoc",
	"srclang",
	"srcset",
	"start",
	"step",
	"target",
	"type",
	"usemap",
	"value",
	"wrap",
] as const;
