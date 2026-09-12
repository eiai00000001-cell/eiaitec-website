# EIAI TEC Webサイト

個人事業主「EIAI TEC」のコーポレートサイト。非IT企業向けのAI業務支援・業務自動化コンサルを行う屋号としての、実績・信頼の可視化を目的とする。

このサイト自体をAI駆動開発(要件定義→設計→実装→デプロイ)のメタ事例として公開する予定。

## 1. 文書情報

- 参照元:
  - `docs/02_architect/詳細設計書.md` v1.1(2026-09-10)
  - `docs/02_architect/基本設計書.md` v1.2(2026-09-10)
  - `docs/01_requirements/機能仕様書.md` v1.4(2026-09-09)
  - `docs/01_requirements/要件定義書.md` v1.4(2026-09-09)
  - `mockup/index.html`(見た目・コピーの一次情報)
  - `docs/02_architect/mockups/mobile-nav.html`(モバイルナビのビジュアルモックアップ)
- 対象範囲: イテレーション1・第1段(F-01〜F-06, F-08〜F-10。F-07・F-11は次段で別途実装)
- 実装日: 2026-09-12

## 2. 実装概要

### 採用技術(基本設計書2.1節のとおり)

| 区分 | 技術 |
|---|---|
| 実装言語 | TypeScript |
| フレームワーク | Next.js 16(App Router)/ React 19 |
| ランタイム | Node.js(基本設計書は20系LTSを指定。ローカル動作確認は後述「要確認事項」参照) |
| スタイリング | 素のCSS(グローバルCSS + CSS変数。Tailwind等は未導入) |
| フォント配信 | `next/font/google`(Noto Sans JP / Inter / IBM Plex Mono) |
| 画像最適化 | `next/image` |
| パッケージマネージャ | npm |
| テスト | Vitest + React Testing Library(Next.js公式ガイド`01-app/02-guides/testing/vitest.md`準拠) |

### ディレクトリ構成

```
.
├── docs/                 詳細設計書・基本設計書・機能仕様書・要件定義書等
├── mockup/               見た目確定版(index.html)
├── images/               画像素材の原本(icon.png / work.png / worker1-3.png / og-image.png)
└── frontend/             Next.jsアプリケーション本体
    ├── app/
    │   ├── layout.tsx      RootLayout(フォント・メタデータ)
    │   ├── page.tsx        HomePage(各セクションの配置)
    │   ├── globals.css     mockup/index.html移植のグローバルCSS
    │   ├── icon.png / apple-icon.png   favicon(F-10)
    │   └── favicon.ico     Next.js既定favicon(create-next-app初期生成のまま)
    ├── components/         セクション・UIコンポーネント(詳細は4章参照)
    ├── hooks/              画面同期処理のカスタムフック(詳細は4章参照)
    ├── lib/                共有定数(navLinks.ts / constants.ts)
    ├── types/contact.ts    お問い合わせフォーム関連の型定義(F-07向けに先行定義)
    ├── public/images/      実ファイル化した画像素材(F-09)
    ├── __tests__/          Vitestテスト(hooks/ components/ test-utils/)
    ├── vitest.config.mts / vitest.setup.ts
    └── README.md           frontendアプリの簡易セットアップ手順(本READMEから参照)
```

## 3. セットアップ手順(実行して確認済み)

```bash
cd frontend
npm install
npm run dev     # http://localhost:3000 で確認
npm run build   # 本番ビルド(型チェック含む)
npm run lint    # ESLint
npm run test    # Vitestユニットテスト(1回実行)
```

上記すべて、本実装時に実際に実行しエラーがないことを確認済み(5章参照)。

## 4. 実装状況(機能ID別)

| 機能ID | 内容 | 状況 | 補足 |
|---|---|---|---|
| F-01 | ヘッダー・グローバルナビゲーション(PC) | 実装済み | `components/SiteHeader.tsx`。`position:sticky`・ヘッダー高さ同期(`hooks/useSyncHeaderHeight.ts`)を含む |
| F-02 | ヒーローセクション | 実装済み | `components/HeroSection.tsx` / `HeroHeading.tsx`。eyebrow自動スケール(scale=0.7)込み |
| F-03 | Servicesセクション | 実装済み | `components/ServicesSection.tsx`。アイコン垂直中央揃え込み |
| F-04 | Portfolioセクション | 実装済み | `components/PortfolioSection.tsx`。CASE/000固定 |
| F-05 | Aboutセクション | 実装済み | `components/AboutSection.tsx` / `AboutContent.tsx`。ロゴ中央揃え込み |
| F-06 | Contactセクション表示 | 実装済み(表示のみ) | `components/ContactSection.tsx` / `ContactForm.tsx`。送信はダミー(`preventDefault`のみ)。F-07は次段 |
| F-07 | お問い合わせフォーム送信(Resend連携) | 未実装(次段) | `types/contact.ts`の型のみ先行定義済み |
| F-08 | モバイル用ナビゲーションメニュー | 実装済み | `components/MobileNavMenu.tsx`。開閉状態管理・640px境界でのリセット込み |
| F-09 | 画像実ファイル化・next/image最適化 | 実装済み | `public/images/`に実ファイル配置。全箇所`next/image`化 |
| F-10 | SEO/OGP・favicon・動的コピーライト年 | 実装済み | `app/layout.tsx`のmetadata、`app/icon.png`/`apple-icon.png`、`SiteFooter`の動的年。og:image用`metadataBase`は要確認事項参照 |
| F-11 | Vercelデプロイ・独自ドメイン設定 | 未実装(次段) | 運用・インフラ設定作業のため対象外 |

## 5. テスト実行結果

- フレームワーク: Vitest 4 + React Testing Library(`@testing-library/react` / `@testing-library/dom` / `@testing-library/jest-dom`)
- 実行コマンド: `npm run test`(= `vitest run`)
- 結果: **13 test files / 24 tests、すべて成功(失敗0件)**(2026-09-12実行、レビュー結果報告書R-1・R-3対応でテスト2件追加)
- テスト対象:
  - `hooks/useEyebrowAutoScale.ts`(eyebrow自動スケール・グループ内フォントサイズ統一)
  - `hooks/useSectionIconCenter.ts`(Services/Portfolioアイコン垂直中央揃え)
  - `hooks/useAboutMarkCenter.ts`(Aboutロゴ水平中央揃え・700px以下でのリセット)
  - `hooks/useSyncHeaderHeight.ts`(`--header-h`変数同期)
  - `components/MobileNavMenu.tsx`(開閉・リンクタップでの自動クローズ・640px超でのリセット)
  - `components/SiteHeader.tsx` / `HeroSection.tsx` / `ServicesSection.tsx` / `PortfolioSection.tsx` / `AboutSection.tsx` / `ContactSection.tsx` / `ContactForm.tsx` / `SiteFooter.tsx`(表示内容・確定コピーの検証)
- 上記に加え、`npm run build`(型チェック込み)・`npm run lint`が0エラーであることを確認済み。
- ブラウザでの目視確認: `npm run dev`起動後、Google Chrome(ヘッドレス)でスクリーンショットを取得し、PC幅(1400px)・スマートフォン幅(390px)でのレイアウト、eyebrowの文字サイズ自動調整、アイコンの垂直中央揃え、Aboutロゴの中央揃え、動的コピーライト年の表示を目視確認済み。

## 6. 詳細設計書との差異

| No. | 内容 | 理由 |
|---|---|---|
| D-1 | `EyebrowHeading`のPropsを、詳細設計書5章の`headingText: string`ではなく`headingRef: RefObject<HTMLElement>`を受け取る形にした(見出し要素自体は呼び出し側が描画する)。 | Heroの見出し(h1)は「AI」「EI(感性)」のアクセント強調・改行を含む固有マークアップであり、単純な文字列propでは表現できないため。Services/Portfolio/About/Contactの共通部分は`components/SectionHeading.tsx`に切り出し、Heroのみ`components/HeroHeading.tsx`で個別対応した。 |
| D-2 | 詳細設計書4.2節・4.6節・4.7節・4.1節の同期処理(`mockup/index.html`では単一のIIFE`syncAll`)を、`useEyebrowAutoScale` / `useSectionIconCenter` / `useAboutMarkCenter` / `useSyncHeaderHeight`の4つの小さなカスタムフックに分割した。 | コンポーネント単位で責務を分離し、それぞれ独立してテスト可能にするため。各フックは同じ`load`/`resize`/`document.fonts.ready`イベントを購読しており、最終的な計算結果・見た目は目視確認のとおり同一。 |
| D-3 | Heroの見出しテキストを囲うspan要素について、`mockup/index.html`では`<span id="heroLine1">`の閉じタグが`</h1>`まで省略されている(HTMLの暗黙補完に依存)。JSXでは閉じタグが必須のため、明示的に`</span>`を追加した。 | 見た目・eyebrow幅測定の結果に影響はなく、JSXの構文要件に対応するための最小限の修正。 |
| D-4 | ヘッダーロゴリンクを、`mockup/index.html`の`onclick`によるJavaScriptスムーススクロールから、通常の`<a href="#">`+CSS`scroll-behavior:smooth`に置き換えた。 | 詳細設計書4.1節-2の指示(独自スクロール制御を行わない)に従った意図的な変更。到達結果(ページ最上部へのスクロール)は同一。 |
| D-5 | `app/page.tsx`に`export const revalidate = 86400;`を設定し、トップページ全体を1日単位のISR(Incremental Static Regeneration)対象にした。 | 詳細設計書4.12節-3は「`SiteFooter`は静的にプリレンダリングしない」としているが、Next.js App Routerの動的レンダリング設定はルート単位でしか指定できないため、`SiteFooter`を含むページ全体を対象とする方式で対応した。当初は`export const dynamic = "force-dynamic"`(リクエスト時レンダリング)としていたが、レビュー結果報告書R-2の指摘を受け、年に1回しか変化しない値の更新には過剰であったため`revalidate`によるISRに変更し、静的最適化を維持している(2026-09-12)。 |
| D-6 | モバイルナビの開閉ボタンを、お問い合わせボタンの**右側**に配置した。 | `docs/02_architect/mockups/mobile-nav.html`本文中のキャプションは「お問い合わせボタンの左に表示」と記載されているが、同ファイルの実際のHTML構造・添付スクリーンショット(`mobile-nav_closed.png`等)はいずれも開閉ボタンが右側にある構成のため、視覚資料(一次情報)を優先した。7章の要確認事項にも記載。 |
| D-7 | 画面右下に常時固定表示の「TOPに戻る」ボタン(`components/BackToTopButton.tsx`)を新規追加した。 | クライアントからの追加要望(2026-09-12)。詳細設計書・機能仕様書には未記載の新規UI要素のため、次回設計書更新時に正式反映を検討する。 |
| D-8 | モバイル表示(640px以下)のヘッダーから「お問い合わせ」ボタンを非表示にし(`.header-contact`)、ロゴ(左)とハンバーガーメニュー(右)のみの構成にした。 | クライアントからの追加要望(2026-09-12)。お問い合わせ導線は展開後のモバイルメニュー内`.panel-cta`に一本化されており機能的な後退はない。 |
| D-9 | Hero見出し内の「アップデート。」を`<span className="no-split">`(`white-space:nowrap`)で囲み、単語の途中(例:「アップデ」/「ート。」)で改行されないようにした。 | クライアントからの指摘(2026-09-12)。`word-break:keep-all`は句読点等の区切りがない短いフレーズには効果がないことを実機検証で確認したため不採用とし、対象語をnowrapで保護する方式を採用。基本設計書7章に今後の実装ルールとして明記した。 |
| D-10 | `.mobile-panel`(モバイルメニューの展開パネル)に`position:absolute; top:100%; left:0; right:0;`を指定した。 | バグ修正。`mobile-nav.html`の意匠では`.mobile-panel`は`<header>`の外側の兄弟要素だが、本実装では`MobileNavMenu`コンポーネント内で開閉ボタンと状態を共有する構成上`.bar-actions`(横並びflex)の子要素になっており、閉じている間も見えない横幅(実測 約145px)を消費してロゴ+ハンバーガーが2段に折り返される不具合があった(Chrome DevToolsのデバイスエミュレーションで再現、通常のウィンドウリサイズでは再現しないため発見が遅れた)。position:absoluteでflexレイアウトから切り離すことで、コンポーネント構成は変えずに意匠通りの「ヘッダー直下・画面幅いっぱい」を実現し、横幅消費の問題も解消した。 |

## 7. 要確認事項・未解決事項

詳細設計書・基本設計書からの持ち越し事項(B-4, B-7等)は、それぞれの文書の8章を参照してください(本書では新規分のみ記載します)。

| No. | 内容 | 影響 | 確認方法 | 確認先 | 期限目安 |
|---|---|---|---|---|---|
| ~~★C-1~~ | ~~**作業中の誤操作の報告**: 画像配置作業の際、`frontend/app/favicon.ico`を誤ってユーザーの明示的許可なく削除した。~~ | — | — | ユーザー本人 | **解決済(2026-09-12)**: 経緯を確認のうえ、Next.js既定favicon.icoの削除を明示的に許可された。`icon.png`(EIAI TECロゴ)のみをfaviconとして使う方針を確認し、`favicon.ico`を削除。build/lint再確認済み。 |
| ~~★C-2~~ | ~~モバイルナビ開閉ボタンの位置(6章D-6参照)。`mobile-nav.html`のキャプション文言と実際のHTML/画像が食い違っている。~~ | F-08の見た目 | — | クライアント / デザイン担当 | **解決済(2026-09-12)**: HTML構造・スクリーンショット(視覚資料)を優先し、現状の右側配置を正とすることを確認。キャプション文言側の誤記と判断し、コード変更なし。 |
| ★C-3 | ローカル開発機のNode.jsバージョンがv25.2.1であり、基本設計書2.1節が指定するNode.js 20系(LTS)と異なる。今回の動作確認(`npm run dev`/`build`/`test`)はすべてv25.2.1で実施した。 | Vercel本番環境(F-11で設定)との差異により、将来的に挙動差が出る可能性(現時点でNode20系専用APIは使用していない)。 | F-11実装時にVercelプロジェクト設定(または`package.json`の`engines`フィールド)でNode.js 20系を明示的に指定し、あらためて動作確認する。 | developer(F-11実装時) | **保留(2026-09-12確認)**: 現時点では対応せず、F-11着手時に判断する方針を確認済み。 |
| ★C-4 | `app/layout.tsx`の`metadataBase`を未設定のため、`npm run build`時に「og:image解決に`http://localhost:3000`を暫定使用する」旨の警告が出力される。 | 本番ドメイン確定前は軽微だが、SNSシェア時のog:image絶対URLが正しく解決されない可能性。 | F-11で独自ドメイン`eiaitec.jp`取得後、`metadataBase: new URL("https://eiaitec.jp")`を追加する。 | developer(F-11実装時) | F-11着手時 |
| ★C-5 | Contactフォームの注記文言「※このフォームはモックアップです。実際の送信機能は本実装時に組み込みます。」は`mockup/index.html`の実際の表示文言をそのまま採用したが、F-07(実送信)実装後はこの文言が実態と合わなくなる。 | F-07実装時のUI文言 | F-07着手時に、この注記を残す/変更する/削除するかを確認する。 | クライアント | **対応方針確定(2026-09-12)**: F-07実装時にこの注記を削除し、実際の送信結果表示(成功/失敗メッセージ)に置き換える方針を確認済み。今回はコード変更なし。 |
| ~~★C-6~~ | ~~未使用の初期生成ファイルが残っている: `frontend/app/page.module.css`、`frontend/public/file.svg` `globe.svg` `next.svg` `vercel.svg` `window.svg`(いずれも`create-next-app`の既定テンプレートが生成した未使用ファイル)。~~ | 実害はないが、リポジトリの整理観点で削除候補。 | — | ユーザー本人 | **解決済(2026-09-12)**: 削除の明示的許可を得て、使用箇所がないことを確認したうえで6ファイルすべて削除。build/lint再確認済み。 |

## 8. 変更履歴

| バージョン | 日付 | 内容 |
|---|---|---|
| v1.0 | 2026-09-12 | イテレーション1・第1段の実装(F-01〜F-06, F-08〜F-10)。`frontend/`にNext.js(App Router/TypeScript)アプリを新規作成し、mockup/index.htmlの見た目・コピーを移植。Vitest+React Testing Libraryによるユニットテスト22件を追加。 |
| v1.1 | 2026-09-12 | ユーザー確認により要確認事項を一部解決。`favicon.ico`(Next.js既定)を削除し`icon.png`のみをfaviconとして使用する構成に変更(★C-1)。モバイルナビ開閉ボタンの右側配置を正として確定(★C-2、コード変更なし)。Contact注記文言はF-07実装時に削除する方針を確定(★C-5、コード変更なし)。未使用の初期生成ファイル6件を削除(★C-6)。build/lint再確認済み。 |
| v1.2 | 2026-09-12 | クライアント要望によるデザイン修正3件を実装。①画面右下固定の「TOPに戻る」ボタン新規追加(D-7)。②モバイルヘッダーの「お問い合わせ」ボタンを非表示にしロゴ+ハンバーガーの2要素構成に変更(D-8)。③Hero見出し「アップデート。」を`.no-split`(white-space:nowrap)で保護し単語途中での改行を防止、基本設計書7章に日本語改行の実装ルールとして明記(D-9)。build/lint/test(22件)再確認済み。 |
| v1.3 | 2026-09-12 | 動作確認中に発見した不具合2件を修正。①開発サーバーをLAN内IP(例: `192.168.1.2:3000`)からアクセスするとNext.jsの既定セキュリティ挙動によりクライアント側JS(eyebrow自動拡大等)が動作しない問題に対し、`next.config.ts`に`allowedDevOrigins`を追加(本番ビルドには影響しない開発環境限定の設定)。②Chrome DevToolsのデバイスエミュレーション(例: 405px幅)でモバイルヘッダーのロゴ+ハンバーガーが2段に折り返される不具合を修正(D-10)。build/lint/test(22件)再確認済み。 |
| v1.4 | 2026-09-12 | レビュー結果報告書のR-1〜R-6(中2件・低4件)に対応。①モバイルメニュー閉状態のパネル内リンクに`tabIndex={-1}`を付与しキーボードフォーカス不可に(R-1)。②`app/page.tsx`の`force-dynamic`を`revalidate = 86400`(ISR)に置き換え静的最適化を復元(R-2、D-5更新)。③`useEyebrowAutoScale`に`isReference`フラグを追加し、eyebrowグループの基準セクションをマウント順ではなく明示指定で表現するようリファクタリング(R-3)。④`lib/navLinks.ts`を新設しNAV_LINKS定義の重複を解消(R-4)。⑤`lib/constants.ts`を新設し`SECTION_EYEBROW_GROUP_ID`の逆輸入構成を解消(R-5)。⑥`next.config.ts`のLAN IPハードコードを環境変数`DEV_ALLOWED_ORIGIN`(`.env.local`)経由に変更(R-6、`.env.example`更新)。関連テストを追加・更新し、build/lint/test(13ファイル/24件)再確認済み。R-7・R-8は本対応の対象外(R-7はarchitectureフェーズ、R-8はF-07着手時に対応)。 |
