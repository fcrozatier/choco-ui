import { act, render } from "@testing-library/svelte/svelte5";
import { userEvent } from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import ToggleBindTest from "./ToggleBindTest.svelte";
import ToggleTest from "./ToggleTest.svelte";

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

describe("Toggle binding", () => {
	it("has no accessibility violations", async () => {
		const { container, unmount } = render(ToggleBindTest);
		expect(await axe(container)).toHaveNoViolations();
		unmount();
	});

	it("toggle <-> checkbox", async () => {
		const { getByRole, unmount } = render(ToggleBindTest);
		const button = getByRole("button");
		const checkbox = getByRole("checkbox") as HTMLInputElement;

		expect(button.textContent).toBe("press");
		expect(button.getAttribute("aria-pressed")).toBe("false");
		expect(checkbox.checked).toBe(false);

		// toggle -> checkbox
		await userEvent.click(button);
		expect(button.getAttribute("aria-pressed")).toBe("true");
		expect(checkbox.checked).toBe(true);

		await userEvent.click(button);
		expect(button.getAttribute("aria-pressed")).toBe("false");
		expect(checkbox.checked).toBe(false);

		// checkbox -> toggle
		await userEvent.click(checkbox);
		expect(button.getAttribute("aria-pressed")).toBe("true");
		expect(checkbox.checked).toBe(true);

		await userEvent.click(checkbox);
		expect(button.getAttribute("aria-pressed")).toBe("false");
		expect(checkbox.checked).toBe(false);
		unmount();
	});
});
