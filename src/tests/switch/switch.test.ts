import { describe, expect, it } from "vitest";
import { render, act } from "@testing-library/svelte/svelte5";
import { userEvent } from "@testing-library/user-event";
import SwitchTest from "./SwitchTest.svelte";
import { axe } from "jest-axe";

describe("Switch", () => {
	it("has no accessibility violations", async () => {
		const { container, unmount } = render(SwitchTest);
		expect(await axe(container)).toHaveNoViolations();
		unmount();
	});

	it("toggles on click", async () => {
		const { getByTestId, unmount } = render(SwitchTest);
		const button = getByTestId("switch");

		expect(button.textContent).toBe("press");
		expect(button.getAttribute("aria-checked")).toBe("false");

		await userEvent.click(button);
		expect(button.getAttribute("aria-checked")).toBe("true");

		await userEvent.click(button);
		expect(button.getAttribute("aria-checked")).toBe("false");
		unmount();
	});

	it("can be toggled programmatically", async () => {
		const { getByTestId, unmount } = render(SwitchTest);
		const button = getByTestId("switch");
		const input = getByTestId("programmatic");

		expect(button.getAttribute("aria-checked")).toBe("false");

		await act(() => input.click());
		expect(button.getAttribute("aria-checked")).toBe("true");

		await act(() => input.click());
		expect(button.getAttribute("aria-checked")).toBe("false");
		unmount();
	});
});
