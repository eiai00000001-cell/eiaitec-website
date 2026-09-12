import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesSection } from "@/components/ServicesSection";

describe("ServicesSection (F-03)", () => {
  it("renders the heading and all 3 service rows", () => {
    render(<ServicesSection />);

    expect(screen.getByRole("heading", { level: 2, name: "サービス内容" })).toBeInTheDocument();
    expect(screen.getByText("課題の棚卸し")).toBeInTheDocument();
    expect(screen.getByText("手作業・属人化している業務の洗い出し")).toBeInTheDocument();
    expect(screen.getByText("ツール開発")).toBeInTheDocument();
    expect(screen.getByText("AIを活用した業務ツールの設計・実装")).toBeInTheDocument();
    expect(screen.getByText("導入・定着")).toBeInTheDocument();
    expect(screen.getByText("現場で無理なく使い続けられる形に落とし込み")).toBeInTheDocument();
  });
});
