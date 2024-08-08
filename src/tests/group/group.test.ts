import { render } from "@testing-library/svelte";
import { describe, expect, it } from "vitest";
import GroupTest from "./GroupTest.svelte";

describe("Group", () => {
  it("doesn't leak data", async () => {
    const { getByTestId, unmount } = render(GroupTest);

    const a = getByTestId("group1");
    const b = getByTestId("group2");

    expect(a.innerText).toBe("U");
    expect(b.innerText).toBe("B");

    unmount();
  });
});
