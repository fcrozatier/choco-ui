import { describe, expect, it } from "vitest";
import { render, act } from "@testing-library/svelte/svelte5";
import { userEvent } from "@testing-library/user-event";
import ToggleTest from "./ToggleTest.svelte";
import { axe } from "jest-axe";

describe("Toggle", () => {
	it("has no accessibility violations", async () => {
		const { container, unmount } = render(ToggleTest);
		expect(await axe(container)).toHaveNoViolations();
		unmount();
	});

	it("toggles on click", async () => {
		const { getByRole, unmount } = render(ToggleTest);
		const button = getByRole("button");

		expect(button.textContent).toBe("press");
		expect(button.getAttribute("aria-pressed")).toBe("false");

		await userEvent.click(button);
		expect(button.getAttribute("aria-pressed")).toBe("true");

		await userEvent.click(button);
		expect(button.getAttribute("aria-pressed")).toBe("false");
		unmount();
	});

	it("can be toggled programmatically", async () => {
		const { getByRole, getByTestId, unmount } = render(ToggleTest);
		const button = getByRole("button");
		const input = getByTestId("programmatic");

		expect(button.getAttribute("aria-pressed")).toBe("false");

		await act(() => input.click());
		expect(button.getAttribute("aria-pressed")).toBe("true");

		await act(() => input.click());
		expect(button.getAttribute("aria-pressed")).toBe("false");
		unmount();
	});
});
