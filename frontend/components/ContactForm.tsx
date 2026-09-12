"use client";

import type { FormEvent } from "react";

/**
 * お問い合わせフォーム(F-06表示 / F-07送信)。
 *
 * 今回のイテレーション(第1段)ではF-07(Resend連携による実送信)は対象外のため、
 * 送信ボタン押下時の動作はダミー(preventDefaultのみ)としている。
 * バリデーション・Server Action呼び出し・結果表示(useActionState等、詳細設計書4.9.1節)は
 * 次段のF-07実装時に追加する。
 */
export function ContactForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // F-07実装までのダミー処理。実際の送信は行わない。
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="company">会社名・屋号</label>
        <input id="company" name="company" type="text" placeholder="例)⚪︎⚪︎商店" />
      </div>
      <div className="field">
        <label htmlFor="name">お名前</label>
        <input id="name" name="name" type="text" placeholder="例)栄愛 太郎" />
      </div>
      <div className="field">
        <label htmlFor="email">メールアドレス</label>
        <input id="email" name="email" type="email" placeholder="例)sample@example.com" />
      </div>
      <div className="field">
        <label htmlFor="message">ご相談内容</label>
        <textarea
          id="message"
          name="message"
          placeholder="現在の業務課題やご相談内容をお聞かせください"
        />
      </div>
      <button type="submit" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
        送信する
      </button>
      <p className="contact-note">
        ※このフォームはモックアップです。実際の送信機能は本実装時に組み込みます。
      </p>
    </form>
  );
}
