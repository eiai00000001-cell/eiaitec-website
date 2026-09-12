/**
 * お問い合わせフォーム(F-06/F-07)関連の型定義。
 * 詳細設計書 6章のとおり定義する。
 *
 * 注意: F-07(Resend連携によるメール送信)は本イテレーション(第1段)の対象外。
 * `ContactFormResult` / `ValidationResult` は次段(F-07実装)で
 * `app/actions/contact.ts` の Server Action から利用する想定で、
 * 型定義のみ先行して用意している。
 */

export type ContactFormInput = {
  company: string; // 任意。未入力時は空文字
  name: string; // 必須
  email: string; // 必須
  message: string; // 必須
  honeypot: string; // 空文字であることが期待値
};

export type ContactFormFieldName = "company" | "name" | "email" | "message";

export type ValidationResult =
  | { valid: true }
  | { valid: false; fieldErrors: Partial<Record<ContactFormFieldName, string>> };

export type ContactFormResult =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      fieldErrors?: Partial<Record<ContactFormFieldName, string>>;
      message?: string;
    };
