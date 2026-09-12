/**
 * 画面右下に常時固定表示する「TOPに戻る」ボタン(クライアントからの追加要望対応)。
 * 詳細設計書・機能仕様書には未記載のため、README.md「詳細設計書との差異」に追記する。
 *
 * D-4と同様の方針(詳細設計書4.1節-2: 独自スクロール制御を行わない)に合わせ、
 * JavaScriptを使わず `<a href="#">` + CSS `html{scroll-behavior:smooth;}` による
 * アンカージャンプのみで先頭へのスムーススクロールを実現する(Server Component)。
 * スクロール量に応じた表示/非表示の切り替えは行わず、常に表示する。
 */
export function BackToTopButton() {
  return (
    <a href="#" className="back-to-top" aria-label="ページの先頭に戻る">
      <span aria-hidden="true">↑</span>
    </a>
  );
}
