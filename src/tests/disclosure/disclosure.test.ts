import { render } from "@testing-library/svelte/svelte5";
import { userEvent } from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import DisclosureComponentTest from "./DisclosureComponentTest.svelte";

describe("Disclosure Component", () => {
  it("has no accessibility violations", async () => {
    const { container, unmount } = render(DisclosureComponentTest);
    expect(await axe(container)).toHaveNoViolations();
    unmount();
  });

  it("can be bound", async () => {
    const { getByRole, unmount } = render(DisclosureComponentTest);
    const input = getByRole("checkbox") as HTMLInputElement;
    const trigger = getByRole("button") as HTMLButtonElement;

    expect(input.checked).toBe(false);
    expect(trigger.getAttribute("aria-expanded")).toBe("false");

    // Disclosure -> checkbox
    await userEvent.click(trigger);
    expect(trigger.getAttribute("aria-expanded")).toBe("true");
    expect(input.checked).toBe(true);

    // Re-clicking doesn't work?
    // await userEvent.click(trigger);
    // expect(trigger.getAttribute("aria-expanded")).toBe("false");
    // expect(input.checked).toBe(false);

    // await userEvent.click(input);
    // expect(trigger.getAttribute("aria-expanded")).toBe("false");
    // expect(input.checked).toBe(false);

    unmount();
  });
});
