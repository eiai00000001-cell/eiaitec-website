import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { AboutSection } from "@/components/AboutSection";

describe("AboutSection (F-05)", () => {
  it("renders the heading, logo, and the 3 confirmed paragraphs without personal details", () => {
    render(<AboutSection />);

    expect(screen.getByRole("heading", { level: 2, name: "EIAI TECとは" })).toBeInTheDocument();
    expect(
      screen.getByText(
        "EIAI TECでは、お客様の業務効率化に向けてAIを活用した支援・コンサルティングを行っています。"
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("AIによる業務改善にはお客様とコミュニケーションがとても重要です。")
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "AI活用とEI(感性)を大切にしたコミュニケーションで、お客様が抱える業務上の問題を解決します。"
      )
    ).toBeInTheDocument();
  });
});
