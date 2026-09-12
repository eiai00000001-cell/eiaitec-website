import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "@/components/SiteHeader";

describe("SiteHeader (F-01)", () => {
  it("renders the logo, 3 navigation links, and the contact button with correct anchors", () => {
    render(<SiteHeader />);

    expect(screen.getByRole("link", { name: "サービス" })).toHaveAttribute("href", "#services");
    expect(screen.getByRole("link", { name: "実績" })).toHaveAttribute("href", "#portfolio");
    expect(screen.getByRole("link", { name: "EIAI TECとは" })).toHaveAttribute("href", "#about");
    expect(screen.getAllByRole("link", { name: /お問い合わせ/ })[0]).toHaveAttribute(
      "href",
      "#contact"
    );
    expect(screen.getByAltText("EIAI TEC")).toBeInTheDocument();
  });

  it("renders the mobile menu toggle button", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("button", { name: "メニューを開く" })).toBeInTheDocument();
  });
});
