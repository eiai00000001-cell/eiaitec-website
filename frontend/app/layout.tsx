import type { Metadata } from "next";
import { Noto_Sans_JP, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// 基本設計書2.1節: フォント配信をGoogle Fonts CDN直リンクからnext/fontによる
// ビルド時セルフホスティングへ変更する(表示上の書体・見た目は変更しない)。
const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const SITE_TITLE = "EIAI TEC | AIとEI(感性)で業務効率化を支援";
const SITE_DESCRIPTION =
  "EIAI TECは、非IT企業向けにAIを活用した業務効率化を支援する個人事業です。手作業・属人化している業務の洗い出しから、AIを活用したツールの設計・実装、現場での定着まで伴走します。";

// 詳細設計書 4.12節(F-10: SEO/OGP・favicon・動的コピーライト年)。
export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
};

/**
 * 詳細設計書 5章クラス設計 `RootLayout`(app/layout.tsx)。
 * 全ページ共通の<html>/<head>/<body>、フォント読み込み、既定メタデータを定義する。
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
