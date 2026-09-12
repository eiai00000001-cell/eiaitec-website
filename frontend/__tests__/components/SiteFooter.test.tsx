import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteFooter } from "@/components/SiteFooter";

describe("SiteFooter (F-10: 動的コピーライト年)", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the copyright text with the current year", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2031-05-01T00:00:00+09:00"));

    render(<SiteFooter />);

    expect(screen.getByText("© 2031 EIAI TEC. All rights reserved.")).toBeInTheDocument();
  });
});
