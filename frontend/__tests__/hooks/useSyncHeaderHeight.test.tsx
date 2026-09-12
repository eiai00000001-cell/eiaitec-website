import { describe, it, expect } from "vitest";
import { act, render } from "@testing-library/react";
import { useRef } from "react";
import { useSyncHeaderHeight } from "@/hooks/useSyncHeaderHeight";
import { mockRect } from "../test-utils/rect";

function Harness() {
  const markerRef = useRef<HTMLSpanElement>(null);
  useSyncHeaderHeight(markerRef);
  return (
    <header className="site">
      <span ref={markerRef} />
    </header>
  );
}

describe("useSyncHeaderHeight", () => {
  it("sets the --header-h CSS variable to the header's rendered height", () => {
    const { container } = render(<Harness />);
    const header = container.querySelector("header.site") as HTMLElement;
    mockRect(header, { width: 1000, height: 96 });

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(document.documentElement.style.getPropertyValue("--header-h")).toBe("96px");
  });
});
