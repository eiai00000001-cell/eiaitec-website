import type { NextConfig } from "next";

// 開発サーバーをLAN内の他端末(スマホ実機確認等)からアクセスする際、
// Next.jsは既定でlocalhost以外のオリジンからの_nextアセット/HMR接続をブロックするため
// (https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins)、
// 各開発者のマシンのLAN IPを許可リストに追加する必要がある。
// 開発者個人のLAN IPをリポジトリに直接コミットしないよう(レビュー結果報告書 R-6)、
// `.env.local`(gitignore対象)の`DEV_ALLOWED_ORIGIN`環境変数から読み込む。
// 各自の`npm run dev`実行時にターミナルへ表示される "Network:" のIPを
// `.env.local`の`DEV_ALLOWED_ORIGIN`に設定すること(未設定時は許可リストなしで動作する)。
const devAllowedOrigin = process.env.DEV_ALLOWED_ORIGIN;

const nextConfig: NextConfig = {
  allowedDevOrigins: devAllowedOrigin ? [devAllowedOrigin] : undefined,
};

export default nextConfig;
