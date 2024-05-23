import { addListener } from "$lib/actions/addListener";
import {
	makeConvexHullFromElements,
	pointInConvexPolygon,
	type Point,
} from "$lib/internal/polygon";
import { key } from "$lib/utils/keyboard";
import { debounce } from "@fcrozatier/ts-helpers";
import type { Invokable } from "./invokable.svelte";
import { makeFocusable } from "$lib/actions/focus.svelte";

export type HoverableOptions = {
	isHovered?: boolean;
};

export const Hoverable = <
	U extends HTMLElement = HTMLElement,
	C extends ReturnType<typeof Invokable<U>> = ReturnType<typeof Invokable<U>>,
>(
	invoker: C,
) => {
	return class extends invoker {
		#hull: Point[] | undefined;
		isHovered = $derived(this.active); // alias

		constructor(...options: any[]) {
			super(...options);

			this.extendActions(makeFocusable);
			this.extendActions(addListener("pointerenter", this.#open));
			this.extendActions(addListener("focusin", this.#open));
		}

		initHoverable = (options?: HoverableOptions) => {
			this.active = !!options?.isHovered;
		};

		#open = (e?: PointerEvent | FocusEvent) => {
			if (e instanceof PointerEvent) {
				if (!this.#hull && this.element && this.target.element) {
					this.#hull = makeConvexHullFromElements([this.element, this.target.element]);
				}
				if (!this.active) {
					document.addEventListener("pointermove", this.#handlePointer);
				}
			} else if (e instanceof FocusEvent) {
				this.element.addEventListener("focusout", this.#close);
			}

			this.active = true;
			document.addEventListener("keydown", this.#handleKeydown);
		};

		#close = () => {
			this.active = false;
			document.removeEventListener("keydown", this.#handleKeydown);
			document.removeEventListener("pointermove", this.#handlePointer);
			this.element.removeEventListener("focusout", this.#close);
		};

		#handleKeydown = (e: KeyboardEvent) => {
			if (this.active && e.key === key.ESCAPE) {
				this.active = false;
			}

			document.removeEventListener("keydown", this.#handleKeydown);
		};

		#handlePointer = debounce((e: PointerEvent) => {
			if (!this.#hull || !pointInConvexPolygon({ x: e.clientX, y: e.clientY }, this.#hull)) {
				this.#close();
			}
		}, 100);
	};
};
