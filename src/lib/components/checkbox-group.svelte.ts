import { addListener } from "$lib/actions/addListener";
import { Togglable } from "$lib/mixins/togglable.svelte";
import { nanoId } from "$lib/utils/nano";
import { ChocoBase } from "./base.svelte";
import { Group, type GroupOptions } from "./group.svelte";

type CheckboxGroupOptions = GroupOptions & { active?: boolean };

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

	constructor() {
		super({ type: "checkbox" });
	}

	updateState(state?: boolean | "mixed") {
		if (typeof state === "boolean") {
			this.checked = state;
			this.indeterminate = false;
		} else {
			this.checked = false;
			this.indeterminate = true;
		}
	}
}

export class CheckboxGroup extends Group(Checkbox) {
	#ids: string[] = $state([]);

	active = $derived(this.activeItems.map((item) => item.value));
	triState: boolean | "mixed" = $derived(
		this.activeItems.length === this.items.length
			? true
			: this.activeItems.length === 0
				? false
				: "mixed",
	);

	lastState: string[] | null = null;

	root;

	nextState = () => {
		if (this.triState === "mixed") {
			this.lastState = $state.snapshot(this.active);
		}

		if (this.triState === true) {
			for (const item of this.items) {
				item.off();
			}
			this.root.updateState(false);
		} else if (this.triState === false) {
			if (this.lastState && this.lastState.length !== 0) {
				for (const item of this.items) {
					if (this.lastState.includes(item.value)) {
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
		} else if (this.triState === "mixed") {
			for (const item of this.items) {
				item.on();
			}
			this.root.updateState(true);
		}
	};

	constructor(options?: CheckboxGroupOptions) {
		super(options);

		this.root = new TriState();
		this.root.extendActions(
			(node) => node.setAttribute("aria-controls", this.#ids.join(" ")),
			addListener("click", this.nextState),
		);

		$effect(() => {
			this.root.updateState(this.triState);
		});
	}

	createItem = (options: CheckboxOptions) => {
		const item = new this.Item(options);
		const id = nanoId();

		this.#ids.push(id);
		item.extendAttributes({ id });
		item.extendActions(addListener("click", () => (this.lastState = null)));

		return item;
	};
}
