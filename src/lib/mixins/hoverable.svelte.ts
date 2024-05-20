import { ChocoBase } from "../components/base.svelte";
import type { Booleanish } from "svelte/elements";
import type { Constructor } from "./types";
import { addListener } from "$lib/actions/addListener";
import {
	makeConvexHullFromElements,
	pointInConvexPolygon,
	type Point,
} from "$lib/internal/polygon";
import { key } from "$lib/utils/keyboard";
import { debounce } from "@fcrozatier/ts-helpers";

export type HoverableOptions = {
	/**
	 * Initial state of the control
	 */
	control: Record<string, Booleanish>;
	/**
	 * Initial state of the target
	 */
	target: Record<string, Booleanish>;
	/**
	 * Whether the initial state is the active state. (Optional)
	 */
	active?: boolean;
	/**
	 * Whether the target is labelled by the control
	 */
	labelledBy?: boolean;
	isOpen: boolean;
};

export const Hoverable = <
	U extends HTMLElement = HTMLElement,
	C extends Constructor<ChocoBase<U>> = Constructor<ChocoBase<U>>,
>(
	controlClass: C,
	targetClass = ChocoBase,
) => {
	return class extends controlClass {
		hull: Point[] | undefined;
		isOpen!: boolean;
		target!: InstanceType<typeof targetClass>;

		initHoverable(options: HoverableOptions) {
			this.isOpen = options.isOpen;

			this.extendActions(addListener("mouseenter", this.#open));
			this.extendActions(addListener("focusin", this.#open));
		}

		#open = (e?: MouseEvent | FocusEvent) => {
			const handleKeydown = this.#handleKeydown;
			const handleMouse = this.#handleMouse;
			const close = this.#close;

			if (e instanceof MouseEvent) {
				if (!this.hull) {
					this.hull = makeConvexHullFromElements([this.element, this.target.element]);
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
			if (!this.hull || !pointInConvexPolygon({ x: e.clientX, y: e.clientY }, this.hull)) {
				this.#close();
			}
		}, 100);
	};
};
