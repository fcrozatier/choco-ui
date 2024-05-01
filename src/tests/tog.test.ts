import { describe, expect, it } from "vitest";
import { render, act } from "@testing-library/svelte/svelte5";
import Tog from "./Tog.svelte";

describe("ToggleComponent", () => {
	it("toggles", async () => {
		const { getByRole } = render(Tog);

		const button = getByRole("button");
		expect(button.textContent).toBe("false");

		await act(() => {
			button.click();
		});
		expect(button.textContent).toBe("true");

		await act(() => {
			button.click();
		});
		expect(button.textContent).toBe("false");
	});
});
