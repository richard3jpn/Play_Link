# ⚾ Play_Link - 野球クラブ用統合管理アプリ

アマチュア野球チームの「広報活動（HP）」と「チーム内部運営（選手・スコア管理）」を一つのサービスで完結させる、オールインワンのWebアプリケーション。

## 📋 プロジェクト概要

Play_Linkは、野球クラブの運営を効率化するための統合管理システムです。
- **一般向けHP機能**: 試合結果、記事、チーム紹介などを公開
- **チーム管理機能**: 選手管理、スケジュール、スコアブック、成績管理などの内部ツール

## 🛠 技術スタック

- **フロントエンド**: React (TypeScript)
- **バックエンド**: Node.js (Firebase Cloud Functions)
- **データベース**: Firestore (NoSQL)
- **認証**: Firebase Authentication
- **ホスティング**: Firebase Hosting
- **デプロイ/管理**: Firebase CLI

## 📂 プロジェクト構造

```
Play_Link/
├── README.md                    # このファイル
├── RDD.md                       # 要件定義書（機能仕様）
├── Agent.md                     # AI Agent向け開発ガイド
│
├── setup/                       # セットアップ関連
│   ├── setup.sh                 # 自動セットアップスクリプト
│   └── SETUP.md                 # セットアップ手順書
│
├── app/                         # React フロントエンド（未作成）
│   ├── src/
│   ├── public/
│   └── package.json
│
├── functions/                   # Cloud Functions バックエンド（未作成）
│   ├── src/
│   └── package.json
│
├── firestore/                   # Firestore設定
│   ├── firestore.rules          # セキュリティルール
│   └── firestore.indexes.json   # インデックス定義
│
├── firebase.json                # Firebase設定ファイル
└── .firebaserc                  # Firebaseプロジェクト情報（未作成）
```

## 🚀 クイックスタート

### 前提条件

- **Node.js** v18 以上（LTS推奨）
- **npm** v8 以上
- **Git**

### セットアップ手順

1. **自動セットアップスクリプトを実行**

```bash
./setup/setup.sh
```

2. **詳細なセットアップ手順を確認**

詳しい手順は [setup/SETUP.md](setup/SETUP.md) を参照してください。

## 📚 ドキュメント

### [RDD.md](RDD.md) - 要件定義書
- プロジェクトの全機能仕様
- データベース設計
- ユーザー要件

### [Agent.md](Agent.md) - AI Agent向け開発ガイド
- React + Firebase アプリの開発手順
- Firebase CLI コマンド
- Firestore データ操作方法
- Cloud Functions 開発方法

### [setup/SETUP.md](setup/SETUP.md) - セットアップガイド
- 環境構築の詳細手順
- Firebase プロジェクト作成方法
- トラブルシューティング

## 🎯 主な機能

### ① 広報（HP）機能（一般公開）
- トップページ（お知らせ・試合予定・結果表示）
- 記事（ブログ）機能
- 試合結果アーカイブ
- チーム紹介
- メンバー紹介

### ② チーム運営（管理）機能（要ログイン）
- ダッシュボード
- スケジュール管理
- 選手管理（選手名簿）
- スコアブック（試合入力）機能
  - スターティングメンバー登録（ドラッグ&ドロップ）
  - 一球ごとの入力
- スコア・成績管理（自動集計）
- 試合アーカイブ（動画管理）
- チーム内連絡

### ③ 共通・基盤機能
- チーム管理
- 認証機能
- 隠しボタンによるログイン
- 権限管理（管理者/一般メンバー）

## 🔧 開発コマンド

### セットアップ

```bash
# 自動セットアップ
./setup/setup.sh

# Firebase ログイン
npx firebase login

# Firebase 初期化
npx firebase init
```

### フロントエンド開発

```bash
cd app

# 開発サーバー起動
npm start

# ビルド
npm run build

# テスト
npm test
```

### バックエンド開発（Cloud Functions）

```bash
cd functions

# TypeScript コンパイル
npm run build

# ローカルエミュレータ
npm run serve
```

### Firebase エミュレータ

```bash
# 全エミュレータ起動
npx firebase emulators:start

# エミュレータUI: http://localhost:4050
```

### デプロイ

```bash
# 全体デプロイ
npx firebase deploy

# Functions のみ
npx firebase deploy --only functions

# Firestore ルールのみ
npx firebase deploy --only firestore:rules
```

## 🔒 セキュリティ

- `.env` ファイルは絶対にコミットしない
- Firestore セキュリティルールは本番環境で厳格化必須
- Cloud Functions には認証チェックを実装

## 📝 開発状況

### ✅ 完了
- 要件定義書作成
- プロジェクト構造設計
- セットアップスクリプト作成
- 開発ガイド作成
- Firebase設定ファイル作成

### 🚧 未着手
- React アプリケーション実装
- Cloud Functions 実装
- Firebase プロジェクト作成
- 実際のデプロイ

## 🤝 開発フロー

1. **要件確認**: `RDD.md` で機能仕様を確認
2. **環境構築**: `setup/SETUP.md` に従ってセットアップ
3. **開発**: `Agent.md` を参照しながら実装
4. **テスト**: エミュレータで動作確認
5. **デプロイ**: Firebase へデプロイ

## 📞 サポート

問題が発生した場合：
1. `setup/SETUP.md` のトラブルシューティングを確認
2. `Agent.md` の該当セクションを確認
3. Firebase公式ドキュメントを参照

## 📄 ライセンス

（プロジェクトのライセンスをここに記載）

---

**次のステップ: `setup/SETUP.md` を参照してセットアップを開始してください！**
