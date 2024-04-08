import type { AriaAttributes, Booleanish, HTMLAttributes } from "svelte/elements";

type KeysMatching<T, U> = {
	[P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

type AriaBooleanAttributes = Exclude<
	KeysMatching<AriaAttributes, Booleanish | undefined | null>,
	undefined
>;

export function updateBooleanAttribute(
	element: HTMLElement | undefined,
	attribute: AriaBooleanAttributes | (string & NonNullable<unknown>),
	value: Booleanish | undefined | null,
) {
	if (value === true || value === "true") {
		element?.setAttribute(attribute, "");
	} else {
		element?.removeAttribute(attribute);
	}
}

export function updateAttribute(
	element: HTMLElement | undefined,
	attribute:
		| keyof AriaAttributes
		| keyof HTMLAttributes<EventTarget>
		| (string & NonNullable<unknown>),
	value: string | number | boolean | undefined,
) {
	if (value !== undefined) {
		element?.setAttribute(attribute, String(value));
	} else {
		element?.removeAttribute(attribute);
	}
}
