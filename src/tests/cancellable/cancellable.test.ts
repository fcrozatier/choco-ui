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

  it("toggles data-hover on hover", async () => {
    const { getByRole, unmount } = render(CancellableTest);
    const button = getByRole("button");

    await userEvent.hover(button);
    expect(button.getAttribute("data-hover")).toBe("true");

    await userEvent.unhover(button);
    expect(button.getAttribute("data-hover")).toBe("false");
    unmount();
  });

  // Error: element.setPointerCapture is not a function
  it.skip("toggles data-active when clicking and dragging on and off ", async () => {
    const { getByRole, getByTestId, unmount } = render(CancellableTest);
    const button = getByRole("button");
    const link = getByTestId("target");

    expect(button.textContent).toBe("Improved button");
    expect(button.getAttribute("data-active")).toBe("false");

    await userEvent.pointer({ target: button, keys: "[MouseLeft>]" });
    expect(button.getAttribute("data-active")).toBe("true");

    await userEvent.pointer({ target: link, pointerName: "mouse" });
    expect(button.getAttribute("data-active")).toBe("false");

    // await userEvent.pointer({ target: button, keys: "[MouseLeft>]" });
    // expect(button.getAttribute("data-active")).toBe("true");
    unmount();
  });
});
