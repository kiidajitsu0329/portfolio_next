# ポートフォリオサイト（Next.js）

フルサイクルエンジニアのポートフォリオサイトです。  
設計意図が伝わる構成（データ/表示/副作用の分離）と、読みやすいコードを重視しています。

## 主な特徴
- セクション構成をコンポーネント分割して可読性を確保
- インタラクションはクライアント島に限定し、ページはサーバー中心
- `next/image` による画像最適化
- `prefers-reduced-motion` への配慮

## 技術スタック
- Next.js (App Router)
- TypeScript
- Tailwind CSS

## セットアップ
```bash
npm install
```

## 開発サーバー起動
```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認してください。

## ディレクトリ構成（抜粋）
```
app/
  components/   UIコンポーネント
  data/         表示データ
  hooks/        UI向けカスタムフック
  page.tsx      ルートページ（サーバー中心）
```

## 画像について
外部画像は Unsplash を利用しています。  
`next.config.ts` の `images.remotePatterns` を参照してください。

## 連絡先
お問い合わせリンクの宛先は `app/components/ContactSection.tsx` の `mailto` で設定しています。  
公開時は必要に応じて変更してください。
