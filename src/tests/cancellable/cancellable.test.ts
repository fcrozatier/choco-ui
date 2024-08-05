import { render } from "@testing-library/svelte/svelte5";
import { userEvent } from "@testing-library/user-event";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";
import CancellableTest from "./CancellableTest.svelte";

describe("Cancellable", () => {
  it("has no accessibility violations", async () => {
    const { container, unmount } = render(CancellableTest);
    expect(await axe(container)).toHaveNoViolations();
    unmount();
  });

  it("toggles .data-active on click", async () => {
    const { getByRole, unmount } = render(CancellableTest);
    const button = getByRole("button");

    expect(button.textContent).toBe("Improved button");
    expect(button.getAttribute("data-active")).toBe("false");

    await userEvent.pointer({ target: button, keys: "[MouseLeft>]" });
    expect(button.getAttribute("data-active")).toBe("true");

    await userEvent.pointer("[/MouseLeft]");
    // expect(button.getAttribute("data-active")).toBe("false");
    unmount();
  });

  it("removes .data-active when hovering off ", async () => {
    const { getByRole, getByTestId, unmount } = render(CancellableTest);
    const button = getByRole("button");
    const link = getByTestId("target");

    expect(button.textContent).toBe("Improved button");
    expect(button.getAttribute("data-active")).toBe("false");

    await userEvent.pointer({ target: button, keys: "[MouseLeft>]" });
    expect(button.getAttribute("data-active")).toBe("true");

    await userEvent.pointer({ target: link, keys: "[MouseLeft>]" });
    // expect(button.getAttribute("data-active")).toBe("false");
    unmount();
  });
});
