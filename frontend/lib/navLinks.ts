/**
 * 詳細設計書 4.1節(F-01)・4.10節(F-08)で共通利用するグローバルナビゲーションのリンク定義。
 * `SiteHeader`(PC表示)と`MobileNavMenu`(モバイル表示)の双方から参照する
 * (レビュー結果報告書 R-4: 重複定義の解消)。
 */
export const NAV_LINKS = [
  { href: "#services", label: "サービス" },
  { href: "#portfolio", label: "実績" },
  { href: "#about", label: "EIAI TECとは" },
] as const;
