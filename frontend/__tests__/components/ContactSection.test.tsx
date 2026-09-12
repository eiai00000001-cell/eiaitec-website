import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactSection } from "@/components/ContactSection";

describe("ContactSection (F-06)", () => {
  it("renders the intro copy, flow description, and the contact form", () => {
    render(<ContactSection />);

    expect(screen.getByRole("heading", { level: 2, name: "お問い合わせ" })).toBeInTheDocument();
    expect(
      screen.getByText("業務の自動化やAI活用について、まずは現状の課題からご相談ください。")
    ).toBeInTheDocument();
    expect(screen.getByText("ご相談の流れ")).toBeInTheDocument();
    expect(
      screen.getByText(
        "フォーム送信後、担当より通常2営業日以内にメールでご返信します。まずは概要の共有だけで構いません。"
      )
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "送信する" })).toBeInTheDocument();
  });
});
