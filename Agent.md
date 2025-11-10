# プロジェクト README（AI Agent 実行用）

このドキュメントは **AI Agent** に読ませ、ユーザが別途渡す「RDD.md(作りたいアプリの説明)」をもとに **React + Firebase (Cloud Functions + Firestore)** アプリを開発するためのガイドです。

## 基本設定
- **技術スタック**:
  - **フロントエンド**: React (TypeScript)
  - **バックエンド**: Node.js (Firebase Cloud Functions)
  - **データベース**: Firestore (NoSQL)
  - **デプロイ/管理**: Firebase CLI
- **生成先ディレクトリ名**: `app` (フロントエンド), `functions` (バックエンド)
- **作成方法**:
  - React: create-react-app（TypeScript、npx 方式推奨）
  - Functions: Firebase CLI による初期化
- **グローバルインストールや sudo は使わないでください。ホーム配下の設定も変更しないでください。**
- **作業ログは BUILDLOG.md に残してください。ユーザ要求は app-spec.md に保存してください。**

> 重要方針: **ユーザ環境を汚さない**（グローバルインストール禁止・ホーム配下の設定ファイルに変更禁止・sudo 使用禁止）。すべて **現在のプロジェクト配下だけ** で完結させてください。

---

## 1. ゴール
- ユーザの要求に沿った **React + Firebase アプリ** を生成し、初回起動可能な状態で引き渡す。
- フロントエンド（React）とバックエンド（Cloud Functions）を統合し、Firestore でデータ管理を実現する。
- 依存関係は **ローカル** にのみインストールし、他プロジェクトへ影響を与えない。
- 実装内容・判断は `BUILDLOG.md` に時系列で簡潔に記録する（コマンド、生成物、採用方針など）。

---

## 2. 想定入力（ユーザから）
- 「作りたいアプリの説明」テキスト（RDD.md として与えられる）
- 例）機能一覧、対象ユーザ、ページ構成、優先順位、期限、非機能要件（パフォーマンス・アクセシビリティなど）

Agent は、受け取った説明を `app-spec.md` に保存（コピー）し、以降の設計・実装の出発点とする。

---

## 3. 実行前チェック（Agent のやること）
1. **作業ディレクトリを固定**: 現在のフォルダをルートとし、生成物は `./app`、`./functions` 以下に作る。
2. **禁止事項を遵守**:
   - `npm i -g ...` / `yarn global add ...` / `pnpm add -g ...` の禁止
   - `sudo` の禁止
   - `~/.zshrc`、`~/.bashrc`、`~/.npmrc` などホーム配下の編集禁止
   - OS やシェルのグローバル設定変更禁止
3. **Node バージョン**: LTS 相当（例: 18 〜 22 系）を想定。必要に応じて `engines` を `package.json` に定義するが、**グローバルなバージョンマネージャの設定変更はしない**。
4. **ログ**: `BUILDLOG.md` を新規作成し、以降のコマンドと結果要約を逐次追記。

---

## 4. プロジェクト生成

### 4-1. Firebase プロジェクト初期化

まず、Firebase プロジェクトを初期化します（`setup/setup.sh` を実行済みの想定）：

```bash
# Firebase にログイン
npx firebase login

# Firebase プロジェクト初期化
npx firebase init
```

**選択項目：**
- Firestore: Database rules and indexes
- Functions: Cloud Functions for Firebase
- Hosting: Firebase Hosting（オプション）

### 4-2. React アプリ生成（フロントエンド）

```bash
# React + TypeScript アプリ作成
npx --yes create-react-app@latest app --template typescript --use-npm

# app ディレクトリに移動
cd app

# Firebase SDK インストール
npm install firebase

# React Router インストール
npm install react-router-dom

# 開発サーバ起動（確認）
npm start
```

### 4-3. Cloud Functions 生成（バックエンド）

```bash
# functions ディレクトリに移動
cd ../functions

# Firebase Functions SDK インストール
npm install firebase-admin firebase-functions@latest

# TypeScript 環境構築
npm install -D typescript @types/node

# TypeScript コンパイル
npm run build
```

---

## 5. Firebase 設定

### 5-1. 環境変数設定（フロントエンド）

`app/.env` ファイルを作成し、Firebase 設定を記述：

```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 5-2. Firebase 初期化コード（フロントエンド）

`app/src/firebase.ts` を作成：

```typescript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
```

### 5-3. Firestore セキュリティルール

`firestore/firestore.rules` を編集：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 認証済みユーザーのみアクセス可能
    match /{document=**} {
      allow read, write: if request.auth != null;
    }

    // チームメンバーのみアクセス可能
    match /teams/{teamId}/{document=**} {
      allow read, write: if request.auth != null
        && exists(/databases/$(database)/documents/teamMembers/$(request.auth.uid + '_' + teamId));
    }
  }
}
```

---

## 6. Firestore データ操作

### 6-1. データの作成（フロントエンド）

```typescript
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

// チーム作成
const createTeam = async (teamName: string) => {
  const docRef = await addDoc(collection(db, 'teams'), {
    name: teamName,
    createdAt: new Date(),
  });
  console.log('Team created with ID:', docRef.id);
};
```

### 6-2. データの取得（フロントエンド）

```typescript
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase';

// チーム一覧取得
const getTeams = async () => {
  const querySnapshot = await getDocs(collection(db, 'teams'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
};

// 特定のチーム取得
const getTeamById = async (teamId: string) => {
  const q = query(collection(db, 'teams'), where('__name__', '==', teamId));
  const querySnapshot = await getDocs(q);
  // ...
};
```

### 6-3. データの更新（フロントエンド）

```typescript
import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

// チーム情報更新
const updateTeam = async (teamId: string, newName: string) => {
  const teamRef = doc(db, 'teams', teamId);
  await updateDoc(teamRef, {
    name: newName,
  });
};
```

### 6-4. データの削除（フロントエンド）

```typescript
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

// チーム削除
const deleteTeam = async (teamId: string) => {
  await deleteDoc(doc(db, 'teams', teamId));
};
```

---

## 7. Cloud Functions 開発

### 7-1. 基本的な HTTP 関数

`functions/src/index.ts`:

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// HTTP リクエストを受け取る関数
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

// Firestore トリガー関数（試合データ作成時）
export const onGameCreated = functions.firestore
  .document('teams/{teamId}/games/{gameId}')
  .onCreate(async (snap, context) => {
    const gameData = snap.data();
    console.log('New game created:', gameData);

    // 自動処理（例: 成績集計）
    // ...
  });
```

### 7-2. Callable 関数（フロントエンドから呼び出し）

`functions/src/index.ts`:

```typescript
export const calculateStats = functions.https.onCall(async (data, context) => {
  // 認証チェック
  if (!context.auth) {
    throw new functions.https.HttpsError(
      'unauthenticated',
      'User must be authenticated'
    );
  }

  const { teamId, playerId } = data;

  // Firestore から成績データ取得
  const statsSnapshot = await admin.firestore()
    .collection(`teams/${teamId}/stats`)
    .where('playerId', '==', playerId)
    .get();

  // 集計処理
  // ...

  return { success: true, stats: { /* ... */ } };
});
```

### 7-3. フロントエンドから Cloud Functions を呼び出し

```typescript
import { httpsCallable } from 'firebase/functions';
import { functions } from './firebase';

const calculateStats = httpsCallable(functions, 'calculateStats');

const result = await calculateStats({ teamId: 'team123', playerId: 'player456' });
console.log(result.data);
```

---

## 8. Firebase CLI コマンド

### 8-1. ローカル開発（エミュレータ）

```bash
# Firestore + Functions エミュレータ起動
npx firebase emulators:start

# 特定のエミュレータのみ起動
npx firebase emulators:start --only firestore
npx firebase emulators:start --only functions
```

### 8-2. デプロイ

```bash
# 全体デプロイ
npx firebase deploy

# Functions のみデプロイ
npx firebase deploy --only functions

# Firestore ルールのみデプロイ
npx firebase deploy --only firestore:rules

# Hosting のみデプロイ
npx firebase deploy --only hosting
```

### 8-3. ログ確認

```bash
# Functions ログをリアルタイム表示
npx firebase functions:log

# 特定の関数のログ表示
npx firebase functions:log --only functionName
```

---

## 9. 開発ワークフロー

### 9-1. フロントエンド開発

```bash
cd app

# 開発サーバー起動
npm start

# ビルド（本番用）
npm run build

# Lint チェック
npm run lint

# テスト実行
npm test
```

### 9-2. バックエンド開発（Cloud Functions）

```bash
cd functions

# TypeScript コンパイル
npm run build

# ローカルエミュレータで実行
npm run serve

# デプロイ
cd ..
npx firebase deploy --only functions
```

### 9-3. Firestore 操作

```bash
# Firestore エミュレータ起動
npx firebase emulators:start --only firestore

# Firestore ルールをテスト
npx firebase emulators:exec --only firestore "npm test"
```

---

## 10. 必須検証手順（完成前に必ず実行）

1. **フロントエンドビルドテスト**:
   ```bash
   cd app && npm run build
   ```
2. **バックエンドビルドテスト**:
   ```bash
   cd functions && npm run build
   ```
3. **エミュレータ起動テスト**:
   ```bash
   npx firebase emulators:start
   ```
4. **Lintチェック**:
   ```bash
   cd app && npm run lint
   cd ../functions && npm run lint
   ```
5. **基本機能テスト**: 作成したアプリケーションの主要機能が動作することを手動確認

---

## 11. 期待される成果物

- `app/` ディレクトリ（起動可能な React アプリ）
- `functions/` ディレクトリ（デプロイ可能な Cloud Functions）
- `firestore/` ディレクトリ（Firestore ルールとインデックス）
- `app-spec.md`（要求の写し + 抽出した要件）
- `BUILDLOG.md`（時系列ログ: コマンド/判断/差分メモ）
- `firebase.json`（Firebase 設定ファイル）
- `.firebaserc`（Firebase プロジェクト情報）

---

## 12. DO / DON'T（品質と安全のガイド）

**DO**
- ローカルのみで完結するコマンドを使用（`npx`, `npm init`）
- ロックファイル（`package-lock.json`）をコミット
- 依存追加・スクリプト変更は `BUILDLOG.md` に都度記録
- Firebase エミュレータでローカルテスト
- Firestore セキュリティルールを適切に設定

**DON'T**
- グローバルインストール（`-g`）や `sudo` の使用
- ホーム配下や他プロジェクトの設定変更
- 秘密情報のコミット（`.env` の直コミット禁止）
- 本番環境への直接デプロイ（テスト不十分の場合）

---

## 13. Firestore データモデル設計指針

RDD.md に記載されたデータ構造に従って実装してください：

```
teams/{teamId}
  ├─ players/{playerId}         # 選手名簿
  ├─ schedules/{scheduleId}     # スケジュール
  ├─ articles/{articleId}       # HP用記事
  ├─ stats/{statsId}            # 成績データ
  └─ games/{gameId}             # 試合データ
      └─ plays/{playId}         # 一球ごとのデータ
```

---

## 14. トラブルシュート

- **Firebase ログインエラー**: `npx firebase login --reauth` で再認証
- **エミュレータポート競合**: `firebase.json` でポート番号を変更
- **Functions デプロイエラー**: `functions/package.json` の `engines` フィールドを確認
- **Firestore 接続エラー**: `.env` ファイルの設定値を確認
- **CORS エラー**: Cloud Functions で CORS 設定を追加

---

## 15. セキュリティ考慮事項

- **認証**: Firebase Authentication を使用
- **Firestore ルール**: 必ず認証チェックを実装
- **環境変数**: API キーは `.env` で管理（非コミット）
- **Cloud Functions**: Callable 関数で認証状態を確認
- **HTTPS**: 本番環境では必ず HTTPS を使用

---

# 付録: コマンド早見表

## React アプリ作成
```bash
npx --yes create-react-app@latest app --template typescript --use-npm
```

## Firebase CLI コマンド
```bash
npx firebase login                          # ログイン
npx firebase init                           # 初期化
npx firebase emulators:start                # エミュレータ起動
npx firebase deploy                         # デプロイ
npx firebase deploy --only functions        # Functions のみデプロイ
npx firebase deploy --only firestore:rules  # ルールのみデプロイ
```

## Firestore 操作（SDK）
```typescript
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
```

## Cloud Functions 実行
```bash
cd functions
npm run build     # TypeScript コンパイル
npm run serve     # ローカルエミュレータ
```

---

**開発開始前に `setup/SETUP.md` を参照してセットアップを完了してください！**
