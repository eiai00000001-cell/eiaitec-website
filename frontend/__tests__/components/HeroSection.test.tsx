import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HeroSection } from "@/components/HeroSection";

describe("HeroSection (F-02)", () => {
  it("renders the confirmed copy and both CTA buttons", () => {
    render(<HeroSection />);

    expect(screen.getByText("AI meets EI.")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: /働き方をアップデート/ })
    ).toBeInTheDocument();
    expect(screen.getByText("EIAI TECは、AIの力でお客様の業務効率化を支援します。")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "相談してみる" })).toHaveAttribute("href", "#contact");
    expect(screen.getByRole("link", { name: "実績を見る" })).toHaveAttribute("href", "#portfolio");
  });
});
