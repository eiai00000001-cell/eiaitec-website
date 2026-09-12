import { describe, it, expect } from "vitest";
import { act, render } from "@testing-library/react";
import { useRef } from "react";
import { useSectionIconCenter } from "@/hooks/useSectionIconCenter";
import { mockRect } from "../test-utils/rect";

function Harness() {
  const headRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLImageElement>(null);
  useSectionIconCenter(headRef, iconRef);
  return (
    <div>
      <div ref={headRef} data-testid="head">
        head
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img ref={iconRef} alt="" />
    </div>
  );
}

describe("useSectionIconCenter", () => {
  it("vertically centers the icon against the heading block", () => {
    const { container, getByTestId } = render(<Harness />);
    const head = getByTestId("head");
    const img = container.querySelector("img") as HTMLImageElement;

    // 見出しブロック: top=100, height=60 -> 中心=130
    mockRect(head, { width: 200, height: 60, top: 100 });
    // アイコン: height=172.8, top=90(centerと同じ座標系で少しずれている想定)
    mockRect(img, { width: 100, height: 172.8, top: 90 });

    act(() => {
      window.dispatchEvent(new Event("resize"));
    });

    // 期待するtop = 130 - (172.8/2) = 43.6 -> delta = 43.6 - 90 = -46.4
    const marginTop = parseFloat(img.style.marginTop);
    expect(marginTop).toBeCloseTo(-46.4, 5);
  });
});
