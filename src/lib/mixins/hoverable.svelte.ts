import { ChocoBase } from "../components/base.svelte";
import type { Constructor } from "./types";
import { addListener } from "$lib/actions/addListener";
import {
	makeConvexHullFromElements,
	pointInConvexPolygon,
	type Point,
} from "$lib/internal/polygon";
import { key } from "$lib/utils/keyboard";
import { debounce } from "@fcrozatier/ts-helpers";
import { makeFocusable } from "$lib/actions/focus.svelte";
import { Togglable } from "./togglable.svelte";

export type HoverableOptions = {
	isOpen?: boolean;
};

export const Hoverable = <
	U extends HTMLElement = HTMLElement,
	C extends Constructor<ChocoBase<U>> = Constructor<ChocoBase<U>>,
>(
	controlClass: C,
	targetClass = Togglable(ChocoBase),
) => {
	return class extends controlClass {
		#hull: Point[] | undefined;
		#isOpen = $state(false);

		target: InstanceType<typeof targetClass>;

		get isOpen() {
			return this.#isOpen;
		}

		set isOpen(v: boolean) {
			if (v !== this.#isOpen) {
				this.#isOpen = v;
				this.target.toggle();
			}
		}

		constructor(...options: any[]) {
			super(...options);
			this.target = new targetClass();

			this.extendActions(makeFocusable);
			this.extendActions(addListener("mouseenter", this.#open));
			this.extendActions(addListener("focusin", this.#open));
		}

		initHoverable = (options?: HoverableOptions) => {
			this.isOpen = !!options?.isOpen;
			this.target.initTogglable({ initial: { "data-open": this.isOpen } });
		};

		#open = (e?: MouseEvent | FocusEvent) => {
			const handleKeydown = this.#handleKeydown;
			const handleMouse = this.#handleMouse;
			const close = this.#close;

			if (e instanceof MouseEvent) {
				if (!this.#hull && this.target.element) {
					this.#hull = makeConvexHullFromElements([this.element, this.target.element]);
				}
				if (!this.isOpen) {
					document.addEventListener("mousemove", handleMouse);
				}
			} else if (e instanceof FocusEvent) {
				this.element.addEventListener("focusout", close);
			}

			this.isOpen = true;
			document.addEventListener("keydown", handleKeydown);
		};

		#close = () => {
			const handleKeydown = this.#handleKeydown;
			const handleMouse = this.#handleMouse;
			const close = this.#close;

			this.isOpen = false;

			document.removeEventListener("keydown", handleKeydown);
			document.removeEventListener("mousemove", handleMouse);
			this.element.removeEventListener("focusout", close);
		};

		#handleKeydown = (e: KeyboardEvent) => {
			if (this.isOpen && e.key === key.ESCAPE) {
				this.isOpen = false;
			}
			document.removeEventListener("keydown", this.#handleKeydown);
		};

		#handleMouse = debounce((e: MouseEvent) => {
			if (!this.#hull || !pointInConvexPolygon({ x: e.clientX, y: e.clientY }, this.#hull)) {
				this.#close();
			}
		}, 100);
	};
};
