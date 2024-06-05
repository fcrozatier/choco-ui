import { makeFocusable } from "$lib/actions/focus.svelte";
import { ChocoBase } from "$lib/components/base.svelte";
import { convexHullFromElements, pointInConvexPolygon, type Point } from "$lib/internal/polygon";
import { key } from "$lib/utils/keyboard";
import { debounce, merge } from "@fcrozatier/ts-helpers";
import { Invokable, type InvokableOptions } from "./invokable.svelte";
import type { Constructor } from "./types";

const hoverable = Symbol();

const defaults = { active: false } satisfies InvokableOptions;

/**
 * Triggers on hover and focus
 */
export const Hoverable = <
	S extends HTMLElement = HTMLElement,
	T extends Constructor<ChocoBase<S>> = Constructor<ChocoBase<S>>,
>(
	superclass: T,
) => {
	return class extends Invokable(superclass) {
		#hull: Point[] | undefined;

		initHoverable(options?: InvokableOptions) {
			this.initInvokable({
				...merge(defaults, options),
				on: ["pointerenter", "focusin"],
				off: ["focusout"],
			});
			// Allow hoverable text nodes
			this.extendActions(makeFocusable);
		}

		override on(e: Event) {
			if (!this.#hull && this.element && this.target.element) {
				this.#hull = convexHullFromElements([this.element, this.target.element]);
			}

			if (e instanceof PointerEvent && !this.active) {
				document.addEventListener("pointermove", this.#handlePointer);
			} else if (e instanceof FocusEvent) {
				this.element.addEventListener("focusout", this.off);
			}

			super.on(e);

			document.addEventListener("keydown", this.#handleKeydown);
		}

		override off = (e?: Event) => {
			super.off(e);
			document.removeEventListener("pointermove", this.#handlePointer);
			this.element.removeEventListener("focusout", this.off);
			document.removeEventListener("keydown", this.#handleKeydown);
		};

		#handleKeydown = (e: KeyboardEvent) => {
			if (this.active && e.key === key.ESCAPE) {
				this.active = false;
			}

			document.removeEventListener("keydown", this.#handleKeydown);
		};

		#handlePointer = debounce((e: PointerEvent) => {
			if (!pointInConvexPolygon({ x: e.clientX, y: e.clientY }, this.#hull!)) {
				this.off();
			}
		}, 100);

		[hoverable] = true;

		static [Symbol.hasInstance](instance: any) {
			return instance[hoverable];
		}
	};
};
