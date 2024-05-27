import { addListener } from "$lib/actions/addListener";
import { Togglable } from "$lib/mixins/togglable.svelte";
import { nanoId } from "$lib/utils/nano";
import type { AriaAttributes } from "svelte/elements";
import { ChocoBase } from "./base.svelte";
import { Group, type GroupOptions } from "./group.svelte";

type CheckboxGroupOptions = GroupOptions & {
	/**
	 * The initial state of the root checkbox. Only used to avoid flicker during hydration
	 */
	active?: boolean | "mixed";
};

export type CheckboxOptions = {
	/**
	 * Whether the checkbox is initially pressed or not. Defaults to `false`
	 */
	active?: boolean;
	value: string;
};

class Checkbox extends Togglable<HTMLInputElement>(ChocoBase) {
	value;

	constructor(options: CheckboxOptions) {
		super();
		const active = !!options?.active;
		this.value = options.value;
		this.initTogglable({ active, initial: { checked: active }, toggle: "click" });
		this.extendAttributes({ type: "checkbox", value: options?.value });
	}
}

class TriState extends ChocoBase<HTMLInputElement> {
	checked?: boolean = $state();
	indeterminate?: boolean = $state();

	override get attributes() {
		console.log("state is", {
			checked: this.checked,
			indeterminate: this.indeterminate,
			"aria-checked": this.indeterminate ? ("mixed" as const) : undefined,
		});
		return {
			...super.attributes,
			checked: this.checked,
			indeterminate: this.indeterminate,
			"aria-checked": this.indeterminate ? ("mixed" as const) : undefined,
		};
	}

	constructor(initial?: AriaAttributes["aria-checked"]) {
		super({ type: "checkbox" });
		this.setState(initial);
	}

	setState(state: AriaAttributes["aria-checked"]) {
		if (typeof state === "boolean") {
			this.checked = state;
			this.indeterminate = false;
		} else if (state === "mixed") {
			this.checked = false; // here?
			this.indeterminate = true;
		} else if (typeof state === "string") {
			this.checked = state === "true";
			this.indeterminate = false;
		} else {
			this.checked = false;
			this.indeterminate = false;
		}
	}
}

export class CheckboxGroup extends Group(Checkbox) {
	#lastActive: string[] = [];

	active = $derived(this.activeItems.map((item) => item.value));
	checked: boolean | "mixed" = $derived(
		this.activeItems.length === this.items.length
			? true
			: this.activeItems.length === 0
				? false
				: "mixed",
	);

	root;

	#toggleMixed = () => {
		if (this.checked === "mixed") {
			for (const item of this.items) {
				item.on();
			}
			this.root.setState(true);
		} else if (this.checked === true) {
			for (const item of this.items) {
				item.off();
			}
			this.root.setState(false);
		} else {
			for (const item of this.items) {
				this.#lastActive.includes(item.value) ? item.on() : item.off();
			}
			this.root.setState(
				this.#lastActive.length !== this.items.length && this.#lastActive.length !== 0
					? "mixed"
					: this.#lastActive.length === this.items.length,
			);
		}
	};

	constructor(options?: CheckboxGroupOptions) {
		super(options);

		this.root = new TriState(options?.active);
		this.root.extendAttributes({ "aria-controls": "" });
		this.root.extendActions(addListener("click", this.#toggleMixed));
	}

	createItem = (options: CheckboxOptions) => {
		const id = nanoId();
		const item = new this.Item(options);

		item.extendAttributes({ id });
		item.extendActions(
			addListener("click", () => {
				this.#lastActive = $state.snapshot(this.active);
				console.log("lastActive:", this.#lastActive);
				console.log("lastActive:", this.checked);
				this.root.setState(this.checked);
				console.log("lastActive:", this.checked);
			}),
		);

		this.root.extendAttributes({
			"aria-controls":
				this.root.attributes["aria-controls"] + (this.items.length === 1 ? "" : " ") + id,
		});

		if (this.items.length === 1) {
			// Update root state after items creation
			setTimeout(() => {
				console.log("createItem effect");
				this.#lastActive = $state.snapshot(this.active);
				this.root.setState(this.checked);
				console.log("lastActive:", this.#lastActive);
			}, 0);
		}

		return item;
	};
}
