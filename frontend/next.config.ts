import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 開発サーバーをLAN内の他端末(スマホ実機確認等)からアクセスする際、
  // Next.jsは既定でlocalhost以外のオリジンからの_nextアセット/HMR接続をブロックするため
  // (https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins)、
  // このマシンのLAN IPを許可リストに追加する。IPが変わった場合(DHCP再割当等)は
  // `npm run dev`実行時にターミナルへ表示される "Network:" のIPに合わせて書き換えること。
  // 本設定は開発時のみ有効で、本番ビルド(F-11)には影響しない。
  allowedDevOrigins: ["192.168.1.2"],
};

export default nextConfig;
