/**
 * @deprecated DO NOT USE
 *
 * Decorators don't work in Svelte
 *
 * https://github.com/sveltejs/svelte/issues/11397
 */
export function bind(_: any, context: ClassMethodDecoratorContext) {
	const methodName = context.name;
	if (context.private) {
		throw new Error(`'bound' cannot decorate private properties like ${methodName as string}.`);
	}

	context.addInitializer(function () {
		//@ts-ignore
		this[methodName] = this[methodName].bind(this);
	});
}
