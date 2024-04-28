import type { Action } from "svelte/action";

export interface ChocoBase {
	attributes: Record<string, boolean | string | null | undefined>;
	action: Action;
}
