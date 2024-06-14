declare const __bindable: unique symbol;

type Bindable<T> = T | (T & { [__bindable]: true });

type BindableKeys<T> = keyof {
	[K in keyof T as T extends Bindable<infer _> ? K : never]: any;
};

export type Bind<T extends Record<string, unknown>, K extends keyof T> = {
	[P in K]: Bindable<T[K]>;
} & Omit<T, K>;

export type Unbind<T extends Record<string, unknown>> = {
	[K in keyof T]: T[K] extends Bindable<infer U> ? U : T[K];
};

export const bind = <T extends Record<string, unknown>, U extends BindableKeys<T>[]>(
	props?: NoInfer<T>,
	_keys?: U,
): T | undefined => {
	if (props) {
		throw new Error("Add the choco plugin to your Vite config to remove this error");
	}

	return props;
};
