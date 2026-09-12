import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PortfolioSection } from "@/components/PortfolioSection";

describe("PortfolioSection (F-04)", () => {
  it("renders the meta case card with CASE / 000 and 4 steps", () => {
    render(<PortfolioSection />);

    expect(screen.getByRole("heading", { level: 2, name: "実績" })).toBeInTheDocument();
    expect(screen.getByText("CASE / 000")).toBeInTheDocument();
    expect(screen.getByText("EIAI TEC 公式サイトの構築")).toBeInTheDocument();
    expect(screen.getByText("Webサイト")).toBeInTheDocument();
    expect(screen.getByText("方向性のヒアリング(目的・ターゲット・トーン)")).toBeInTheDocument();
    expect(screen.getByText("本実装・デプロイ")).toBeInTheDocument();
  });
});
