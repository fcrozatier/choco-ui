import { addListener } from "$lib/actions/addListener";
import { Togglable } from "$lib/mixins/togglable.svelte";
import { nanoId } from "$lib/utils/nano";
import { ChocoBase } from "./base.svelte";
import { Group, type GroupOptions } from "./group.svelte";

type CheckboxGroupOptions = GroupOptions & { active?: boolean | "mixed" };

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
		return { ...super.attributes, checked: this.checked, indeterminate: this.indeterminate };
	}

	constructor(initial?: boolean | "mixed") {
		super({ type: "checkbox" });
		this.updateState(initial ?? false);
	}

	updateState(state: boolean | "mixed") {
		if (typeof state === "boolean") {
			this.checked = state;
			this.indeterminate = false;
		} else {
			this.checked = true;
			this.indeterminate = true;
		}
	}
}

export class CheckboxGroup extends Group(Checkbox) {
	#lastActive: string[] = [];

	active = $derived(this.activeItems.map((item) => item.value));
	state: boolean | "mixed" = $derived(
		this.activeItems.length === this.items.length
			? true
			: this.activeItems.length === 0
				? false
				: "mixed",
	);

	root;

	#toggleMixed = () => {
		if (this.state === "mixed") {
			this.#lastActive = $state.snapshot(this.active);
		}

		if (this.state === true) {
			for (const item of this.items) {
				item.off();
			}
			this.root.updateState(false);
		} else if (this.state === false) {
			if (this.#lastActive.length !== 0) {
				for (const item of this.items) {
					if (this.#lastActive.includes(item.value)) {
						item.on();
					} else {
						item.off();
					}
				}
				this.root.updateState("mixed");
			} else {
				for (const item of this.items) {
					item.on();
				}
				this.root.updateState(true);
			}
		} else if (this.state === "mixed") {
			for (const item of this.items) {
				item.on();
			}
			this.root.updateState(true);
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
				this.#lastActive = [];
				this.root.updateState(this.state);
			}),
		);

		this.root.extendAttributes({
			"aria-controls":
				this.root.attributes["aria-controls"] + `${this.items.length === 1 ? "" : " "}` + id,
		});

		this.root.updateState(this.state);

		return item;
	};
}
