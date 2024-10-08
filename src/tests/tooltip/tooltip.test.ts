import { render } from "@testing-library/svelte/svelte5";
import { userEvent } from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import TooltipTest from "./TooltipTest.svelte";

describe("Tooltip", () => {
  it("has no accessibility violations", async () => {
    const { container, unmount } = render(TooltipTest);
    expect(await axe(container)).toHaveNoViolations();
    unmount();
  });

  it("with mouse", async () => {
    const { getByTestId, unmount } = render(TooltipTest);
    const checkbox = getByTestId("checkbox") as HTMLInputElement;
    const abbr = getByTestId("abbr");
    const active = getByTestId("active");

    expect(active.textContent).toBe("false");
    expect(checkbox.checked).toBe(false);

    await userEvent.hover(abbr);
    expect(checkbox.checked).toBe(true);
    expect(active.textContent).toBe("true");

    // Unhover doesn't work
    // await userEvent.hover(checkbox);
    // expect(checkbox.checked).toBe(false);
    // expect(show.textContent).toBe("false");
    await userEvent.keyboard("{Escape}");
    expect(checkbox.checked).toBe(false);
    expect(active.textContent).toBe("false");

    unmount();
  });

  // tab doesn't work?
  it.skip("with keyboard", async () => {
    const { getByTestId, getByRole, unmount } = render(TooltipTest);
    const checkbox = getByRole("checkbox") as HTMLInputElement;
    const active = getByTestId("active");

    expect(active.textContent).toBe("false");
    expect(checkbox.checked).toBe(false);
    checkbox.focus();

    await userEvent.tab();
    expect(checkbox.checked).toBe(true);
    expect(active.textContent).toBe("true");

    await userEvent.tab();
    expect(checkbox.checked).toBe(false);
    expect(active.textContent).toBe("false");

    await userEvent.keyboard("{Shift>}{Tab}{/Shift}");
    expect(checkbox.checked).toBe(true);
    expect(active.textContent).toBe("true");

    await userEvent.keyboard("{Escape}");
    expect(checkbox.checked).toBe(false);
    expect(active.textContent).toBe("false");
    unmount();
  });

  it("can be bound", async () => {
    const { getByTestId, getByRole, unmount } = render(TooltipTest);
    const checkbox = getByRole("checkbox") as HTMLInputElement;
    const active = getByTestId("active");

    expect(active.textContent).toBe("false");
    expect(checkbox.checked).toBe(false);

    await userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(active.textContent).toBe("true");

    await userEvent.click(checkbox);
    expect(checkbox.checked).toBe(false);
    expect(active.textContent).toBe("false");

    unmount();
  });
});
