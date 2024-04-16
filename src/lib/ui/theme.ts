import { buttonVariants } from "./button/button";
import { toggleVariants } from "./toggle";
import { toggleGroupVariants } from "./toggle-group";

export const t = {
	btn: buttonVariants,
	toggle: toggleVariants,
	toggleGroup: { root: toggleGroupVariants, item: toggleVariants },
};
