import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { act, render } from "@testing-library/react";
import { useRef } from "react";
import {
  useEyebrowAutoScale,
  __resetEyebrowAutoScaleForTests,
} from "@/hooks/useEyebrowAutoScale";
import { mockRect } from "../test-utils/rect";

type HarnessProps = {
  scale?: number;
  groupId?: string;
  eyebrowFontSize?: string;
  isReference?: boolean;
};

function Harness({ scale, groupId, eyebrowFontSize = "10px", isReference }: HarnessProps) {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const eyebrowTextRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEyebrowAutoScale({ eyebrowRef, eyebrowTextRef, headingRef, scale, groupId, isReference });
  return (
    <div>
      <p ref={eyebrowRef} style={{ fontSize: eyebrowFontSize }}>
        <span ref={eyebrowTextRef}>Label</span>
      </p>
      <h2 ref={headingRef}>Heading</h2>
    </div>
  );
}

function fireResize() {
  act(() => {
    window.dispatchEvent(new Event("resize"));
  });
}

describe("useEyebrowAutoScale", () => {
  beforeEach(() => {
    __resetEyebrowAutoScaleForTests();
  });
  afterEach(() => {
    __resetEyebrowAutoScaleForTests();
  });

  it("scales the eyebrow font-size to match the heading width (scale=1)", () => {
    const { container } = render(<Harness />);
    const eyebrowText = container.querySelector("span") as HTMLSpanElement;
    const heading = container.querySelector("h2") as HTMLHeadingElement;

    mockRect(eyebrowText, { width: 50 });
    mockRect(heading, { width: 100 });

    fireResize();

    const eyebrow = container.querySelector("p") as HTMLParagraphElement;
    // 10px * (100 / 50) * 1 = 20px
    expect(eyebrow.style.fontSize).toBe("20px");
  });

  it("applies the scale factor passed in params", () => {
    const { container } = render(<Harness scale={0.7} eyebrowFontSize="10px" />);
    const eyebrowText = container.querySelector("span") as HTMLSpanElement;
    const heading = container.querySelector("h2") as HTMLHeadingElement;

    mockRect(eyebrowText, { width: 50 });
    mockRect(heading, { width: 100 });

    fireResize();

    const eyebrow = container.querySelector("p") as HTMLParagraphElement;
    // 10px * (100 / 50) * 0.7 = 14px
    expect(eyebrow.style.fontSize).toBe("14px");
  });

  it("does nothing when widths are not yet measurable (width=0)", () => {
    const { container } = render(<Harness eyebrowFontSize="10px" />);
    const eyebrowText = container.querySelector("span") as HTMLSpanElement;
    const heading = container.querySelector("h2") as HTMLHeadingElement;
    mockRect(eyebrowText, { width: 0 });
    mockRect(heading, { width: 0 });

    fireResize();

    const eyebrow = container.querySelector("p") as HTMLParagraphElement;
    expect(eyebrow.style.fontSize).toBe("10px");
  });

  it("overrides follower eyebrows in the same group with the isReference:true instance's size, regardless of mount order (R-3)", () => {
    // "a"を先にマウントするが、isReference:trueは"b"側に付与する。
    // マウント順(登録順)ではなく明示的なisReferenceフラグが基準を決めることを検証する。
    function TwoMembers() {
      return (
        <div>
          <div data-testid="a">
            <Harness groupId="group-1" eyebrowFontSize="10px" />
          </div>
          <div data-testid="b">
            <Harness groupId="group-1" eyebrowFontSize="20px" isReference />
          </div>
        </div>
      );
    }

    const { getByTestId } = render(<TwoMembers />);
    const a = getByTestId("a");
    const b = getByTestId("b");

    const aText = a.querySelector("span") as HTMLSpanElement;
    const aHeading = a.querySelector("h2") as HTMLHeadingElement;
    mockRect(aText, { width: 40 });
    mockRect(aHeading, { width: 40 }); // a individually -> 10 * (40/40) = 10px (follower)

    const bText = b.querySelector("span") as HTMLSpanElement;
    const bHeading = b.querySelector("h2") as HTMLHeadingElement;
    mockRect(bText, { width: 50 });
    mockRect(bHeading, { width: 100 }); // b -> 20 * (100/50) = 40px (isReference)

    fireResize();

    const aEyebrow = a.querySelector("p") as HTMLParagraphElement;
    const bEyebrow = b.querySelector("p") as HTMLParagraphElement;

    expect(bEyebrow.style.fontSize).toBe("40px");
    // aは先にマウントされているが、isReferenceを持つbのサイズで上書きされる
    expect(aEyebrow.style.fontSize).toBe(bEyebrow.style.fontSize);
  });

  it("falls back to the first-registered instance as reference when no member has isReference (backward compatibility)", () => {
    function TwoMembers() {
      return (
        <div>
          <div data-testid="a">
            <Harness groupId="group-1" eyebrowFontSize="10px" />
          </div>
          <div data-testid="b">
            <Harness groupId="group-1" eyebrowFontSize="20px" />
          </div>
        </div>
      );
    }

    const { getByTestId } = render(<TwoMembers />);
    const a = getByTestId("a");
    const b = getByTestId("b");

    const aText = a.querySelector("span") as HTMLSpanElement;
    const aHeading = a.querySelector("h2") as HTMLHeadingElement;
    mockRect(aText, { width: 50 });
    mockRect(aHeading, { width: 100 }); // a -> 10 * (100/50) = 20px (fallback reference)

    const bText = b.querySelector("span") as HTMLSpanElement;
    const bHeading = b.querySelector("h2") as HTMLHeadingElement;
    mockRect(bText, { width: 40 });
    mockRect(bHeading, { width: 40 }); // b individually -> 20 * (40/40) = 20px (coincidentally same)

    fireResize();

    const aEyebrow = a.querySelector("p") as HTMLParagraphElement;
    const bEyebrow = b.querySelector("p") as HTMLParagraphElement;

    expect(aEyebrow.style.fontSize).toBe("20px");
    expect(bEyebrow.style.fontSize).toBe(aEyebrow.style.fontSize);
  });

  it("does not affect eyebrows without a groupId", () => {
    function Mixed() {
      return (
        <div>
          <div data-testid="grouped">
            <Harness groupId="group-x" eyebrowFontSize="10px" />
          </div>
          <div data-testid="solo">
            <Harness eyebrowFontSize="10px" />
          </div>
        </div>
      );
    }
    const { getByTestId } = render(<Mixed />);
    const grouped = getByTestId("grouped");
    const solo = getByTestId("solo");

    mockRect(grouped.querySelector("span") as HTMLSpanElement, { width: 50 });
    mockRect(grouped.querySelector("h2") as HTMLHeadingElement, { width: 100 });
    mockRect(solo.querySelector("span") as HTMLSpanElement, { width: 25 });
    mockRect(solo.querySelector("h2") as HTMLHeadingElement, { width: 50 });

    fireResize();

    const groupedEyebrow = grouped.querySelector("p") as HTMLParagraphElement;
    const soloEyebrow = solo.querySelector("p") as HTMLParagraphElement;
    expect(groupedEyebrow.style.fontSize).toBe("20px");
    expect(soloEyebrow.style.fontSize).toBe("20px");
  });
});
