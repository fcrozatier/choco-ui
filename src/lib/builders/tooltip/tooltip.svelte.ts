import { updateAttribute } from "$lib/internal/helpers";
import {
	makeConvexHullFromElements,
	pointInConvexPolygon,
	type Point,
} from "$lib/internal/polygon";
import { key } from "$lib/utils/keyboard";
import { nanoId } from "$lib/utils/nano";
import { debounce } from "@fcrozatier/ts-helpers";
import type { Action } from "svelte/action";

export type CreateTooltip = { open?: boolean; position: "top" | "bottom" | "left" | "right" };

const defaults = { open: false, position: "top" } satisfies CreateTooltip;

/**
 * Tooltip
 *
 *
 * Documentation:
 *
 * ARIA tooltip role: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/tooltip_role
 * Tooltip pattern: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 * More: https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html
 */
export const createTooltip = (options?: CreateTooltip) => {
	let open: boolean = $state(options?.open ?? defaults.open);
	let element: HTMLElement | undefined;
	let parent: HTMLElement | null | undefined;

	let hull: Point[] | undefined;

	const tooltipId = nanoId();

	const handleKeydown = (e: KeyboardEvent) => {
		if (open && e.key === key.ESCAPE) {
			open = false;
		}
	};

	const handleMouse = debounce((e: MouseEvent) => {
		if (!hull || !pointInConvexPolygon({ x: e.clientX, y: e.clientY }, hull)) {
			closeTooltip();
		}
	}, 100);

	const openTooltip = (e: MouseEvent | FocusEvent) => {
		if (e instanceof MouseEvent) {
			if (element && parent && !hull) {
				hull = makeConvexHullFromElements([element, parent]);
			}
			if (!open) {
				document.addEventListener("mousemove", handleMouse);
			}
		} else if (e instanceof FocusEvent) {
			parent?.addEventListener("focusout", closeTooltip);
		}

		open = true;
		document.addEventListener("keydown", handleKeydown);
	};

	const closeTooltip = () => {
		open = false;
		document.removeEventListener("keydown", handleKeydown);
		document.removeEventListener("mousemove", handleMouse);
		parent?.removeEventListener("focusout", closeTooltip);
	};

	$effect(() => {
		updateAttribute(element, "data-open", open);
	});

	return {
		state: {
			get open() {
				return open;
			},

			set open(newVal) {
				open = newVal;
			},
		},

		action: ((node) => {
			element = node;
			parent = node.parentElement;

			element.setAttribute("id", tooltipId);
			element.setAttribute("role", "tooltip");
			element.setAttribute("inert", "");
			element.setAttribute("data-position", options?.position ?? defaults.position);
			element.setAttribute("data-open", String(open));

			parent?.setAttribute("tabindex", "0");
			parent?.setAttribute("aria-described-by", tooltipId);

			parent?.addEventListener("mouseenter", openTooltip);
			parent?.addEventListener("focusin", openTooltip);

			return {
				destroy() {
					parent?.removeEventListener("mouseenter", openTooltip);
					parent?.removeEventListener("focusin", openTooltip);
				},
			};
		}) satisfies Action,

		options,
	};
};
