export type Constructor<Class = any, Options extends unknown = unknown> = new (
	options: Options,
) => Class;
