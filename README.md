# EIAI TEC Webサイト

個人事業主「EIAI TEC」のコーポレートサイト。非IT企業向けのAI業務支援・業務自動化コンサルを行う屋号としての、実績・信頼の可視化を目的とする。

このサイト自体をAI駆動開発(要件定義→設計→実装→デプロイ)のメタ事例として公開する予定。詳細は [`docs/site-direction.md`](docs/site-direction.md) を参照。

## ディレクトリ構成

```
.
├── docs/            サイトの方向性・要件などのドキュメント
│   └── site-direction.md
├── mockup/          画面モックアップ(HTML/CSS)
│   └── index.html
└── icon.png         ロゴ/アイコン素材
```

## サイト概要

- 構成: LP(トップページ1枚)+ ポートフォリオ専用ページ
- 言語: 日本語のみ
- 実装方針: モダンな静的サイト(Next.js等)として構築し、Vercel等へデプロイ予定

詳しくは [`docs/site-direction.md`](docs/site-direction.md) を参照。

## 現在の状況

- モックアップ(`mockup/index.html`)を作成中
- 本実装(Next.js化・デプロイ)は未着手
