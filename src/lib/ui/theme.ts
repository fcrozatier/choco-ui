import { buttonVariants } from "./button/index.js";
import { toggleGroupVariants } from "./toggle-group/index.js";
import { toggleVariants } from "./toggle/index.js";

export const t = {
	btn: buttonVariants,
	toggle: toggleVariants,
	toggleGroup: { root: toggleGroupVariants, item: toggleVariants },
};
