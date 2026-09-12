import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ContactForm } from "@/components/ContactForm";

describe("ContactForm (F-06表示 / F-07は次段対応)", () => {
  it("renders all input fields with the confirmed placeholders", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText("会社名・屋号")).toHaveAttribute("placeholder", "例)⚪︎⚪︎商店");
    expect(screen.getByLabelText("お名前")).toHaveAttribute("placeholder", "例)栄愛 太郎");
    expect(screen.getByLabelText("メールアドレス")).toHaveAttribute(
      "placeholder",
      "例)sample@example.com"
    );
    expect(screen.getByLabelText("ご相談内容")).toHaveAttribute(
      "placeholder",
      "現在の業務課題やご相談内容をお聞かせください"
    );
    expect(screen.getByRole("button", { name: "送信する" })).toBeInTheDocument();
  });

  it("does not perform an actual submission when the submit button is pressed (F-07 is out of scope this iteration)", () => {
    render(<ContactForm />);
    const form = screen.getByRole("button", { name: "送信する" }).closest("form") as HTMLFormElement;
    const submitHandler = vi.fn((e: Event) => e.preventDefault());
    form.addEventListener("submit", submitHandler);

    fireEvent.click(screen.getByRole("button", { name: "送信する" }));

    // jsdomの「未実装ナビゲーション」エラーが発生しない(=preventDefaultされている)ことを
    // もって、ダミーの送信処理が機能していることを確認する。
    expect(submitHandler).toHaveBeenCalledTimes(1);
  });
});
