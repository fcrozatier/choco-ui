import { describe, expect, it } from "vitest";
import { render } from "@testing-library/svelte/svelte5";
import { userEvent } from "@testing-library/user-event";
import InvokableTest from "./InvokableTest.svelte";
import { axe } from "jest-axe";

describe("Invoker", () => {
	it("has no accessibility violations", async () => {
		const { container, unmount } = render(InvokableTest);
		expect(await axe(container)).toHaveNoViolations();
		unmount();
	});

	it("controls target", async () => {
		const { getByTestId, unmount } = render(InvokableTest);
		const invoker = getByTestId("invoker");
		const target = getByTestId("target");

		expect(invoker.getAttribute("aria-expanded")).toBe("false");
		expect(target.getAttribute("data-open")).toBe("false");

		await userEvent.click(invoker);
		expect(invoker.getAttribute("aria-expanded")).toBe("true");
		expect(target.getAttribute("data-open")).toBe("true");

		await userEvent.click(invoker);
		expect(invoker.getAttribute("aria-expanded")).toBe("false");
		expect(target.getAttribute("data-open")).toBe("false");
		unmount();
	});
});
