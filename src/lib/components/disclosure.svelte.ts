import type { Orientation } from "$lib/mixins/types";
import { Invokable } from "$lib/mixins/invokable.svelte";
import { Togglable } from "$lib/mixins/togglable.svelte";
import type { OmitSupertype } from "$lib/mixins/types";
import { nanoId } from "$lib/utils/nano";
import { ChocoBase } from "./base.svelte";
import { type GroupOptions } from "./group.svelte";

type BaseTabsOptions = {
	orientation?: Orientation;
	/**
	 * The default active tab. If not provided defaults to the first tab
	 */
	value?: string;
};

export type TabsOptions = BaseTabsOptions & {
	focus?: OmitSupertype<
		GroupOptions,
		{ roving?: boolean; exclusive?: boolean; preventInactivation?: boolean }
	>;
};

export type DisclosureOptions = {
	/**
	 * Whether the tab is the default active tab. If not provided the first tab is active
	 */
	active?: boolean;
};

const defaults = { active: false } satisfies DisclosureOptions;

export class Disclosure extends Invokable<HTMLButtonElement>(Togglable(ChocoBase)) {
	constructor(options?: DisclosureOptions) {
		super();
		const controlId = nanoId();
		const targetId = nanoId();
		const active = options?.active ?? defaults.active;

		this.initInvokable({
			control: { "aria-expanded": `${active}` },
			target: { hidden: !active },
			active,
			toggle: "click",
		});
		this.extendAttributes({
			id: controlId,
			"aria-controls": targetId,
		});
		this.target.extendAttributes({
			id: targetId,
			"aria-labelledby": controlId,
		});
	}
}
