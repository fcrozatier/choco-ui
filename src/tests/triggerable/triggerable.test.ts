import { render } from "@testing-library/svelte/svelte5";
import { userEvent } from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import TriggerableTest from "./TriggerableTest.svelte";

describe("Trigger", () => {
	it("has no accessibility violations", async () => {
		const { container, unmount } = render(TriggerableTest);
		expect(await axe(container)).toHaveNoViolations();
		unmount();
	});

	it("controls target", async () => {
		const { getByTestId, unmount } = render(TriggerableTest);
		const trigger = getByTestId("trigger");
		const target = getByTestId("target");

		expect(trigger.getAttribute("aria-expanded")).toBe("false");
		expect(target.getAttribute("data-open")).toBe("false");

		await userEvent.click(trigger);
		expect(trigger.getAttribute("aria-expanded")).toBe("true");
		expect(target.getAttribute("data-open")).toBe("true");

		await userEvent.click(trigger);
		expect(trigger.getAttribute("aria-expanded")).toBe("false");
		expect(target.getAttribute("data-open")).toBe("false");
		unmount();
	});
});
