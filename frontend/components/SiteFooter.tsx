import Image from "next/image";

/**
 * 詳細設計書 4.12節-3(動的コピーライト年)。
 * `new Date().getFullYear()` をリクエスト時に評価する
 * (呼び出し元の `app/page.tsx` で `export const dynamic = "force-dynamic"` を
 * 設定し、ページ全体を都度レンダリングすることで、年が古いまま固定表示されないようにする)。
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <div className="wrap footer-row">
        <div className="footer-brand">
          <Image src="/images/icon.png" alt="EIAI TEC" width={1254} height={1254} />
          EIAI TEC
        </div>
        <span>
          © {year} EIAI TEC. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
