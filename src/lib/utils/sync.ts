export const bind = <T extends Record<string, unknown>, U extends BindableKeys<T>[]>(
	record: NoInfer<T>,
	_keys: U,
): T => {
	return record;
};

declare const __bindable: unique symbol;

type Bindable<T> = T | (T & { [__bindable]: true });

type isBindable<T> = (T extends { [__bindable]: true } ? true : false) extends false ? false : true;

type BindableKeys<T> = keyof {
	[K in keyof T as isBindable<T[K]> extends true ? K : never]: any;
};

export type Bind<T extends Record<string, unknown>, K extends keyof T> = {
	[P in K]: Bindable<T[K]>;
} & Omit<T, K>;
