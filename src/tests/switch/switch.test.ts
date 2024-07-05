import { act, render } from "@testing-library/svelte/svelte5";
import { userEvent } from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import SwitchBindTest from "./SwitchBindTest.svelte";
import SwitchTest from "./SwitchTest.svelte";

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

describe("Switch Bind", () => {
  it("has no accessibility violations", async () => {
    const { container, unmount } = render(SwitchBindTest);
    expect(await axe(container)).toHaveNoViolations();
    unmount();
  });

  it("switch <-> checkbox", async () => {
    const { getByTestId, unmount } = render(SwitchBindTest);
    const button = getByTestId("switch");
    const checkbox = getByTestId("bind") as HTMLInputElement;

    expect(button.textContent).toBe("press");
    expect(button.getAttribute("aria-checked")).toBe("false");
    expect(checkbox.checked).toBe(false);

    // switch -> checkbox
    await userEvent.click(button);
    expect(button.getAttribute("aria-checked")).toBe("true");
    expect(checkbox.checked).toBe(true);

    await userEvent.click(button);
    expect(button.getAttribute("aria-checked")).toBe("false");
    expect(checkbox.checked).toBe(false);

    // checkbox -> switch
    await userEvent.click(checkbox);
    expect(button.getAttribute("aria-checked")).toBe("true");
    expect(checkbox.checked).toBe(true);

    await userEvent.click(checkbox);
    expect(button.getAttribute("aria-checked")).toBe("false");
    expect(checkbox.checked).toBe(false);
    unmount();
  });
});
