import Image from "next/image";
import { HeaderHeightSync } from "./HeaderHeightSync";
import { MobileNavMenu } from "./MobileNavMenu";
import { NAV_LINKS } from "@/lib/navLinks";

/**
 * 詳細設計書 4.1節(F-01: ヘッダー・グローバルナビゲーション)。
 * ロゴ・3件のナビゲーションリンク・お問い合わせボタンを描画する(Server Component)。
 * リンクは通常の<a href="#xxx">要素とし、JavaScriptによる独自のスクロール制御は行わない
 * (CSS側の `html{scroll-behavior:smooth;}` によるアンカージャンプに委ねる)。
 *
 * ヘッダーの「お問い合わせ」ボタン(`.header-contact`)は画面幅640px以下では
 * CSS側で非表示にする(モバイル版はロゴ・ハンバーガーメニューのみを横一列に配置し、
 * お問い合わせ導線は展開後のモバイルメニュー内`.panel-cta`に一本化する)。
 */
export function SiteHeader() {
  return (
    <header className="site">
      <HeaderHeightSync />
      <div className="wrap site-bar">
        <a href="#" className="brand">
          <Image src="/images/icon.png" alt="EIAI TEC" width={1254} height={1254} priority />
          EIAI TEC
        </a>
        <nav className="site-nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="bar-actions">
          <a
            href="#contact"
            className="btn btn-primary header-contact"
            style={{ padding: "10px 20px", fontSize: "0.85rem" }}
          >
            お問い合わせ
          </a>
          <MobileNavMenu />
        </div>
      </div>
    </header>
  );
}
