import { render } from "@testing-library/svelte/svelte5";
import { userEvent } from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import GroupBindTest from "./GroupBindTest.svelte";
import GroupTest from "./GroupTest.svelte";

it("GroupTest has no accessibility violations", async () => {
	const { container, unmount } = render(GroupTest);
	expect(await axe(container)).toHaveNoViolations();
	unmount();
});

describe("Group", () => {
	it("keyboard navigation with Arrows + loop:true", async () => {
		const { getByTestId, unmount } = render(GroupTest, { props: { options: { loop: true } } });

		const a = getByTestId("A");
		const b = getByTestId("B");
		const c = getByTestId("C");

		a.focus();
		expect(document.activeElement).toBe(a);

		await userEvent.keyboard("{ArrowRight}");
		expect(document.activeElement).toBe(b);

		await userEvent.keyboard("{ArrowRight}");
		expect(document.activeElement).toBe(c);

		await userEvent.keyboard("{ArrowRight}");
		expect(document.activeElement).toBe(a);

		await userEvent.keyboard("{ArrowLeft}");
		expect(document.activeElement).toBe(c);

		await userEvent.keyboard("{ArrowLeft}");
		expect(document.activeElement).toBe(b);

		await userEvent.keyboard("{ArrowLeft}");
		expect(document.activeElement).toBe(a);

		unmount();
	});

	it("keyboard navigation with Arrows + loop:false", async () => {
		const { getByTestId, unmount } = render(GroupTest, { props: { options: { loop: false } } });

		const a = getByTestId("A");
		const b = getByTestId("B");
		const c = getByTestId("C");

		a.focus();
		expect(document.activeElement).toBe(a);

		await userEvent.keyboard("{ArrowRight}");
		expect(document.activeElement).toBe(b);

		await userEvent.keyboard("{ArrowRight}");
		expect(document.activeElement).toBe(c);

		await userEvent.keyboard("{ArrowRight}");
		expect(document.activeElement).toBe(c);

		await userEvent.keyboard("{ArrowLeft}");
		expect(document.activeElement).toBe(b);

		await userEvent.keyboard("{ArrowLeft}");
		expect(document.activeElement).toBe(a);

		await userEvent.keyboard("{ArrowLeft}");
		expect(document.activeElement).toBe(a);

		unmount();
	});

	it("keyboard navigation with Home / End", async () => {
		const { getByTestId, unmount } = render(GroupTest);

		const a = getByTestId("A");
		const c = getByTestId("C");

		a.focus();
		expect(document.activeElement).toBe(a);

		await userEvent.keyboard("{End}");
		expect(document.activeElement).toBe(c);

		await userEvent.keyboard("{Home}");
		expect(document.activeElement).toBe(a);

		unmount();
	});

	// Doesn't work in testing env
	// it.only("with roving focus", async () => {
	// 	const { getByTestId, unmount } = render(GroupTest, { props: { options: { roving: true } } });

	// 	const before = getByTestId("before");
	// 	const a = getByTestId("A");
	// 	const b = getByTestId("B");
	// 	const c = getByTestId("C");
	// 	const after = getByTestId("after");

	// 	before.focus();
	// 	expect(document.activeElement).toBe(before);

	// 	await userEvent.tab();
	// 	expect(document.activeElement).toBe(a);

	// 	await userEvent.tab();
	// 	expect(document.activeElement).toBe(after);

	// 	unmount();
	// });

	it("active / inactive elements", async () => {
		const { getByTestId, unmount } = render(GroupTest);

		const a = getByTestId("A");
		const b = getByTestId("B");
		const c = getByTestId("C");
		const active = getByTestId("active");

		await userEvent.click(a);
		expect(active.textContent).toBe("A");

		await userEvent.click(b);
		expect(active.textContent).toBe("A,B");

		await userEvent.click(c);
		expect(active.textContent).toBe("A,B,C");

		await userEvent.click(b);
		expect(active.textContent).toBe("A,C");

		unmount();
	});

	it("exclusive element", async () => {
		const { getByTestId, unmount } = render(GroupTest, { props: { options: { exclusive: true } } });

		const a = getByTestId("A");
		const b = getByTestId("B");
		const c = getByTestId("C");
		const active = getByTestId("active");

		await userEvent.click(a);
		expect(active.textContent).toBe("A");

		await userEvent.click(b);
		expect(active.textContent).toBe("B");

		await userEvent.click(c);
		expect(active.textContent).toBe("C");

		await userEvent.click(b);
		expect(active.textContent).toBe("B");

		await userEvent.click(b);
		expect(active.textContent).toBe("");

		unmount();
	});

	it("exclusive element + activate on next with arrows", async () => {
		const { getByTestId, unmount } = render(GroupTest, {
			props: { options: { exclusive: true, activateOnNext: true } },
		});

		const a = getByTestId("A");
		const b = getByTestId("B");
		const c = getByTestId("C");
		const active = getByTestId("active");

		await userEvent.click(a);
		expect(active.textContent).toBe("A");

		await userEvent.keyboard("{ArrowRight}");
		expect(document.activeElement).toBe(b);
		expect(active.textContent).toBe("B");

		await userEvent.keyboard("{ArrowRight}");
		expect(document.activeElement).toBe(c);
		expect(active.textContent).toBe("C");

		await userEvent.keyboard("{ArrowRight}");
		expect(document.activeElement).toBe(c);
		expect(active.textContent).toBe("C");

		await userEvent.keyboard("{ArrowLeft}");
		expect(document.activeElement).toBe(b);
		expect(active.textContent).toBe("B");

		await userEvent.keyboard("{ArrowLeft}");
		expect(document.activeElement).toBe(a);
		expect(active.textContent).toBe("A");

		await userEvent.keyboard("{ArrowLeft}");
		expect(document.activeElement).toBe(a);
		expect(active.textContent).toBe("A");

		unmount();
	});

	it("prevent inactivation", async () => {
		const { getByTestId, unmount } = render(GroupTest, {
			props: {
				options: {
					active: ["A"],
					exclusive: true,
					preventInactivation: true,
				},
			},
		});

		const b = getByTestId("B");
		const c = getByTestId("C");
		const active = getByTestId("active");

		expect(active.textContent).toBe("A");

		await userEvent.click(b);
		expect(active.textContent).toBe("B");

		await userEvent.click(b);
		expect(active.textContent).toBe("B");

		await userEvent.click(c);
		expect(active.textContent).toBe("C");

		await userEvent.click(c);
		expect(active.textContent).toBe("C");

		unmount();
	});

	it("toggle <-> checkbox", async () => {
		const { getByTestId, unmount } = render(GroupBindTest);

		const a = getByTestId("A");
		const b = getByTestId("B");
		const x1 = getByTestId("checkbox-1");
		const x2 = getByTestId("checkbox-2");
		const x3 = getByTestId("checkbox-3");
		const active = getByTestId("active");
		const checked = getByTestId("checked");

		// group -> checkbox
		await userEvent.click(a);
		expect(active.textContent).toBe("A");
		expect(checked.textContent).toBe("A");

		await userEvent.click(b);
		expect(active.textContent).toBe("A,B");
		expect(checked.textContent).toBe("A,B");

		await userEvent.click(a);
		expect(active.textContent).toBe("B");
		expect(checked.textContent).toBe("B");

		// group <- checkbox
		await userEvent.click(x3);
		expect(active.textContent).toBe("B,C");
		expect(checked.textContent).toBe("B,C");

		await userEvent.click(x2);
		expect(active.textContent).toBe("C");
		expect(checked.textContent).toBe("C");

		await userEvent.click(x1);
		expect(active.textContent).toBe("A,C");
		expect(checked.textContent).toBe("A,C");

		await userEvent.click(x3);
		expect(active.textContent).toBe("A");
		expect(checked.textContent).toBe("A");

		unmount();
	});
});
