import { describe, it, expect, afterEach, vi } from "vitest";
import { act, render } from "@testing-library/react";
import { useRef } from "react";
import { useAboutMarkCenter } from "@/hooks/useAboutMarkCenter";
import { mockRect } from "../test-utils/rect";

function Harness() {
  const markRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLSpanElement>(null);
  const columnRef = useRef<HTMLDivElement>(null);
  useAboutMarkCenter({ markRef, headingRef, columnRef });
  return (
    <div ref={columnRef}>
      <div ref={markRef}>mark</div>
      <span ref={headingRef}>heading</span>
    </div>
  );
}

function setMatchMedia(matches: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

describe("useAboutMarkCenter", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("horizontally centers the mark under the heading on desktop widths", () => {
    setMatchMedia(false);
    const { container } = render(<Harness />);
    const column = container.querySelector("div") as HTMLDivElement;
    const mark = column.querySelector("div") as HTMLDivElement;
    const heading = container.querySelector("span") as HTMLSpanElement;

    mockRect(column, { width: 600, left: 0 });
    mockRect(heading, { width: 200, left: 220 }); // heading中心 = 220 + 100 = 320
    mockRect(mark, { width: 180, left: 0 });

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    // offset = 320 - 0 - (180/2) = 230
    expect(mark.style.marginLeft).toBe("230px");
  });

  it("resets the margin on narrow widths (<=700px)", () => {
    setMatchMedia(true);
    const { container } = render(<Harness />);
    const column = container.querySelector("div") as HTMLDivElement;
    const mark = column.querySelector("div") as HTMLDivElement;
    const heading = container.querySelector("span") as HTMLSpanElement;
    mockRect(column, { width: 300, left: 0 });
    mockRect(heading, { width: 100, left: 20 });
    mockRect(mark, { width: 180, left: 0 });

    // 事前にmarginLeftが設定されている状態を模擬
    mark.style.marginLeft = "230px";

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    expect(mark.style.marginLeft).toBe("");
  });
});
