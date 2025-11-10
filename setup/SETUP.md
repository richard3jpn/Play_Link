# Play_Link セットアップガイド

このドキュメントは、Play_Link（野球クラブ用統合管理アプリ）の開発環境をセットアップするための手順書です。

## 📋 前提条件

以下がインストールされていることを確認してください：

- **Node.js** v18 以上（LTS推奨）
  - [公式サイト](https://nodejs.org/) からダウンロード
  - 確認: `node -v`
- **npm** v8 以上（Node.js に同梱）
  - 確認: `npm -v`
- **Git**（バージョン管理用）
  - 確認: `git --version`

## 🚀 クイックスタート

### 1. セットアップスクリプト実行

プロジェクトルートで以下を実行：

```bash
cd /home/hiasano/hiasano/myapps/Play_Link
./setup/setup.sh
```

このスクリプトは以下を自動で実行します：
- Node.js バージョン確認
- Firebase CLI のローカルインストール
- プロジェクト構造の作成
- React アプリケーションの作成
- Firebase SDK のインストール
- Cloud Functions の初期設定

### 2. Firebase プロジェクト作成

[Firebase Console](https://console.firebase.google.com/) にアクセスし、新しいプロジェクトを作成：

1. 「プロジェクトを追加」をクリック
2. プロジェクト名を入力（例: `play-link-dev`）
3. Google Analytics は任意（後から設定可能）
4. プロジェクトが作成されるまで待機

### 3. Firebase ログイン

ターミナルで Firebase にログイン：

```bash
npx firebase login
```

ブラウザが開き、Google アカウントでログインを求められます。

### 4. Firebase 初期化

プロジェクトルートで Firebase を初期化：

```bash
npx firebase init
```

以下を選択：
- **Firestore**: Database rules and indexes
- **Functions**: Cloud Functions for Firebase
- **Hosting**: Firebase Hosting

#### 設定項目：

**Firestore:**
- `firestore.rules` のパス: `firestore/firestore.rules`
- `firestore.indexes.json` のパス: `firestore/firestore.indexes.json`

**Functions:**
- 言語: `TypeScript`
- ESLint: `Yes`（推奨）
- 依存関係のインストール: `Yes`
- ソースディレクトリ: `functions`（デフォルト）

**Hosting:**
- Public ディレクトリ: `app/build`
- Single-page app: `Yes`
- GitHub自動デプロイ: `No`（後で設定可能）

### 5. Firebase 設定ファイル取得

Firebase Console から設定情報を取得：

1. Firebase Console でプロジェクトを開く
2. 「プロジェクトの設定」（⚙アイコン）をクリック
3. 「全般」タブ → 下にスクロール
4. 「アプリを追加」→「ウェブ」を選択
5. アプリのニックネームを入力（例: `Play_Link Web`）
6. Firebase Hosting は後で設定可能
7. 表示された設定情報をコピー

### 6. 環境変数設定

`app/.env` ファイルを作成し、Firebase 設定を記述：

```bash
cd app
cat > .env << 'EOF'
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
EOF
```

**⚠️ 重要:** `.env` ファイルは `.gitignore` に含まれています。コミットしないでください。

### 7. Firestore セキュリティルール設定

`firestore/firestore.rules` を編集（開発用の緩いルール）：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 開発用：全てのドキュメントに読み書き許可
    // 本番環境では必ず変更すること！
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 8. 動作確認

#### React アプリ起動

```bash
cd app
npm start
```

ブラウザで `http://localhost:3000` が開きます。

#### Cloud Functions ローカル実行

```bash
cd functions
npm run serve
```

`http://localhost:5001` でエミュレータが起動します。

## 📁 プロジェクト構造

セットアップ完了後のディレクトリ構成：

```
Play_Link/
├── app/                      # React フロントエンド
│   ├── public/
│   ├── src/
│   │   ├── components/       # UIコンポーネント
│   │   ├── pages/            # ページコンポーネント
│   │   ├── services/         # Firebase連携サービス
│   │   ├── types/            # TypeScript型定義
│   │   └── App.tsx
│   ├── .env                  # 環境変数（非コミット）
│   └── package.json
│
├── functions/                # Cloud Functions バックエンド
│   ├── src/
│   │   └── index.ts          # Functions エントリーポイント
│   ├── lib/                  # ビルド出力
│   ├── tsconfig.json
│   └── package.json
│
├── firestore/                # Firestore設定
│   ├── firestore.rules       # セキュリティルール
│   └── firestore.indexes.json # インデックス定義
│
├── setup/                    # セットアップ用
│   ├── setup.sh              # セットアップスクリプト
│   └── SETUP.md              # このファイル
│
├── firebase.json             # Firebase設定
├── .firebaserc               # Firebaseプロジェクト情報
├── RDD.md                    # 要件定義書
└── Agent.md                  # AI Agent用開発ガイド
```

## 🔧 トラブルシューティング

### Firebase CLI がインストールされない

```bash
# 手動でグローバルインストール
npm install -g firebase-tools

# または npx 経由で実行
npx firebase --version
```

### Node.js バージョンが古い

```bash
# nvm を使ってバージョン管理（推奨）
nvm install 20
nvm use 20
```

### ポート競合エラー

React の開発サーバーがポート 3000 を使用中の場合：

```bash
# 別のポートで起動
PORT=3001 npm start
```

### Firebase プロジェクトが見つからない

```bash
# プロジェクト一覧確認
npx firebase projects:list

# プロジェクトを切り替え
npx firebase use <project-id>
```

### Firestore 接続エラー

1. `.env` ファイルの設定値を確認
2. Firebase Console で Firestore を有効化
3. セキュリティルールが適切か確認

## 📚 次のステップ

セットアップが完了したら、`Agent.md` を参照して開発を開始してください：

- [Agent.md](../Agent.md) - AI Agent 向け開発ガイド
- [RDD.md](../RDD.md) - 要件定義書

## 🔒 セキュリティに関する注意

### 開発環境

- `.env` ファイルは絶対にコミットしない
- Firestore ルールは開発用の緩い設定

### 本番環境

- Firestore セキュリティルールを厳格化
- 環境変数は Firebase Hosting の環境変数機能を使用
- Cloud Functions の認証を実装

## 📞 サポート

問題が発生した場合：

1. まず `Agent.md` のトラブルシューティングを確認
2. Firebase公式ドキュメントを参照: https://firebase.google.com/docs
3. プロジェクト管理者に連絡

---

**セットアップ完了後は、`Agent.md` を参照して開発を進めてください！**
