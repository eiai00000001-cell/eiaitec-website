import { describe, it, expect, afterEach, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { MobileNavMenu } from "@/components/MobileNavMenu";

function setMatchMedia(matches: boolean) {
  const listeners = new Set<(e: MediaQueryListEvent) => void>();
  const mql = {
    matches,
    media: "(max-width:640px)",
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((_event: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.add(cb);
    }),
    removeEventListener: vi.fn((_event: string, cb: (e: MediaQueryListEvent) => void) => {
      listeners.delete(cb);
    }),
    dispatchEvent: vi.fn(),
  };
  window.matchMedia = vi.fn().mockReturnValue(mql);
  return {
    triggerChange(nextMatches: boolean) {
      listeners.forEach((cb) => cb({ matches: nextMatches } as MediaQueryListEvent));
    },
  };
}

describe("MobileNavMenu (F-08)", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("opens the panel and toggles aria-expanded/aria-hidden when the toggle button is tapped", () => {
    setMatchMedia(false);
    render(<MobileNavMenu />);

    const button = screen.getByRole("button", { name: "メニューを開く" });
    expect(button).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(button);

    expect(screen.getByRole("button", { name: "メニューを閉じる" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByText("サービス").closest(".mobile-panel")).toHaveAttribute(
      "aria-hidden",
      "false"
    );

    fireEvent.click(screen.getByRole("button", { name: "メニューを閉じる" }));
    expect(screen.getByRole("button", { name: "メニューを開く" })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("closes the panel when a link inside is clicked", () => {
    setMatchMedia(false);
    render(<MobileNavMenu />);
    fireEvent.click(screen.getByRole("button", { name: "メニューを開く" }));
    expect(screen.getByRole("button", { name: "メニューを閉じる" })).toBeInTheDocument();

    fireEvent.click(screen.getByText("実績"));

    expect(screen.getByRole("button", { name: "メニューを開く" })).toBeInTheDocument();
  });

  it("keeps panel links unfocusable while closed and focusable once opened (R-1)", () => {
    setMatchMedia(false);
    render(<MobileNavMenu />);

    const servicesLink = screen.getByText("サービス").closest("a");
    const ctaLink = screen.getByText("お問い合わせ").closest("a");
    expect(servicesLink).toHaveAttribute("tabIndex", "-1");
    expect(ctaLink).toHaveAttribute("tabIndex", "-1");

    fireEvent.click(screen.getByRole("button", { name: "メニューを開く" }));

    expect(screen.getByText("サービス").closest("a")).not.toHaveAttribute("tabIndex");
    expect(screen.getByText("お問い合わせ").closest("a")).not.toHaveAttribute("tabIndex");

    fireEvent.click(screen.getByRole("button", { name: "メニューを閉じる" }));

    expect(screen.getByText("サービス").closest("a")).toHaveAttribute("tabIndex", "-1");
  });

  it("resets to closed when the viewport grows past the mobile breakpoint", () => {
    const { triggerChange } = setMatchMedia(false);
    render(<MobileNavMenu />);
    fireEvent.click(screen.getByRole("button", { name: "メニューを開く" }));
    expect(screen.getByRole("button", { name: "メニューを閉じる" })).toBeInTheDocument();

    act(() => {
      triggerChange(false); // 640pxを超えた(matches:false)ことを通知
    });

    expect(screen.getByRole("button", { name: "メニューを開く" })).toBeInTheDocument();
  });
});
