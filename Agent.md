# プロジェクト README（AI Agent 実行用）

このドキュメントは **AI Agent** に読ませ、ユーザが別途渡す「RDD_postgreSQL.md(作りたいアプリの説明)」をもとに **React + Firebase (Cloud Functions + PostgreSQL + Data Connect)** アプリを開発するためのガイドです。

## 基本設定
- **技術スタック**:
  - **フロントエンド**: React (TypeScript)
  - **データベース**: PostgreSQL
  - **バックエンドAPI**: Firebase Data Connect（PostgreSQLへの安全なアクセスAPI）
  - **バックエンドロジック**: Node.js (Firebase Cloud Functions)
  - **デプロイ/管理**: Firebase CLI
- **生成先ディレクトリ名**: `app` (フロントエンド), `functions` (バックエンド), `dataconnect` (Data Connect設定)
- **作成方法**:
  - React: create-react-app（TypeScript、npx 方式推奨）
  - Functions: Firebase CLI による初期化
  - Data Connect: Firebase CLI による初期化
- **グローバルインストールや sudo は使わないでください。ホーム配下の設定も変更しないでください。**
- **作業ログは BUILDLOG.md に残してください。ユーザ要求は app-spec.md に保存してください。**

> 重要方針: **ユーザ環境を汚さない**（グローバルインストール禁止・ホーム配下の設定ファイルに変更禁止・sudo 使用禁止）。すべて **現在のプロジェクト配下だけ** で完結させてください。

---

## 1. ゴール
- ユーザの要求に沿った **React + Firebase (PostgreSQL/Data Connect) アプリ** を生成し、初回起動可能な状態で引き渡す。
- フロントエンド（React）とバックエンド（Cloud Functions、Data Connect）を統合し、PostgreSQL でデータ管理を実現する。
- 依存関係は **ローカル** にのみインストールし、他プロジェクトへ影響を与えない。
- 実装内容・判断は `BUILDLOG.md` に時系列で簡潔に記録する（コマンド、生成物、採用方針など）。

---

## 2. 想定入力（ユーザから）
- 「作りたいアプリの説明」テキスト（RDD_postgreSQL.md として与えられる）
- 例）機能一覧、対象ユーザ、ページ構成、優先順位、期限、非機能要件（パフォーマンス・アクセシビリティなど）

Agent は、受け取った説明を `app-spec.md` に保存（コピー）し、以降の設計・実装の出発点とする。

---

## 3. 実行前チェック（Agent のやること）
1. **作業ディレクトリを固定**: 現在のフォルダをルートとし、生成物は `./app`、`./functions`、`./dataconnect` 以下に作る。
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

まず、Firebase プロジェクトを初期化します：

```bash
# Firebase にログイン
npx firebase login

# Firebase プロジェクト初期化
npx firebase init
```

**選択項目：**
- Data Connect: Firebase Data Connect（PostgreSQL接続）
- Functions: Cloud Functions for Firebase
- Hosting: Firebase Hosting（オプション）
- Emulators: Firebase Emulators（ローカル開発用）

### 4-2. React アプリ生成（フロントエンド）

```bash
# React + TypeScript アプリ作成
npx --yes create-react-app@latest app --template typescript --use-npm

# app ディレクトリに移動
cd app

# Firebase SDK インストール
npm install firebase

# Firebase Data Connect SDK インストール
npm install @firebase/data-connect

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

# PostgreSQL クライアント（必要に応じて）
npm install pg

# TypeScript 環境構築
npm install -D typescript @types/node @types/pg

# TypeScript コンパイル
npm run build
```

### 4-4. Data Connect 初期化

```bash
# プロジェクトルートに戻る
cd ..

# Data Connect 初期化
npx firebase init dataconnect
```

これにより `dataconnect/` ディレクトリが作成され、以下のファイルが生成されます：
- `dataconnect/schema/schema.gql` - PostgreSQLテーブル定義
- `dataconnect/connector/` - GraphQLクエリ/ミューテーション定義

---

## 5. Firebase 設定

### 5-1. firebase.json の設定

プロジェクトルートの `firebase.json` に Data Connect 設定を追加：

```json
{
  "dataconnect": {
    "source": "dataconnect",
    "location": "asia-northeast1"
  },
  "functions": [
    {
      "codebase": "default",
      "ignore": [
        "node_modules",
        ".git",
        "firebase-debug.log",
        "firebase-debug.*.log",
        "*.local"
      ],
      "predeploy": [
        "npm --prefix \"$RESOURCE_DIR\" run lint",
        "npm --prefix \"$RESOURCE_DIR\" run build"
      ],
      "source": "functions"
    }
  ],
  "hosting": {
    "public": "app/build",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ]
  },
  "emulators": {
    "auth": {
      "port": 9199
    },
    "functions": {
      "port": 5051
    },
    "dataconnect": {
      "port": 9399
    },
    "hosting": {
      "port": 5050
    },
    "ui": {
      "enabled": true,
      "port": 4050
    },
    "singleProjectMode": true
  }
}
```

### 5-2. 環境変数設定（フロントエンド）

`app/.env` ファイルを作成し、Firebase 設定を記述：

```bash
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### 5-3. Firebase 初期化コード（フロントエンド）

`app/src/firebase.ts` を作成：

```typescript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { connectDataConnectEmulator, getDataConnect } from '@firebase/data-connect';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const functions = getFunctions(app);

// Data Connect 接続
export const dataConnect = getDataConnect(app, {
  connector: 'your-connector-name',
  location: 'asia-northeast1',
  service: 'your-service-id',
});

// ローカル開発時はエミュレータに接続
if (process.env.NODE_ENV === 'development') {
  connectDataConnectEmulator(dataConnect, 'localhost', 9399);
}
```

---

## 6. PostgreSQL スキーマ定義（Data Connect）

### 6-1. テーブル定義（schema.gql）

`dataconnect/schema/schema.gql` にPostgreSQLテーブルをGraphQLスキーマとして定義：

```graphql
# ユーザー
type User @table {
  id: UUID! @default(expr: "gen_random_uuid()")
  email: String!
  display_name: String
  created_at: Timestamp! @default(expr: "NOW()")
}

# チーム
type Team @table {
  id: UUID! @default(expr: "gen_random_uuid()")
  name: String!
  logo_url: String
  created_at: Timestamp! @default(expr: "NOW()")
}

# チームメンバー（中間テーブル）
type TeamMember @table {
  id: UUID! @default(expr: "gen_random_uuid()")
  user_id: UUID!
  team_id: UUID!
  role: String! # "admin" or "member"
  user: User! @ref(fields: "user_id")
  team: Team! @ref(fields: "team_id")
}

# 選手
type Player @table {
  id: UUID! @default(expr: "gen_random_uuid()")
  team_id: UUID!
  name: String!
  uniform_number: Int
  position: String
  team: Team! @ref(fields: "team_id")
}

# 試合
type Game @table {
  id: UUID! @default(expr: "gen_random_uuid()")
  team_id: UUID!
  opponent: String!
  game_date: Date!
  home_score: Int
  away_score: Int
  status: String! # "scheduled", "in_progress", "final"
  video_url: String
  team: Team! @ref(fields: "team_id")
}

# スタメン・ベンチ情報
type GameLineup @table {
  id: UUID! @default(expr: "gen_random_uuid()")
  game_id: UUID!
  player_id: UUID!
  batting_order: Int
  position: String
  is_starter: Boolean!
  game: Game! @ref(fields: "game_id")
  player: Player! @ref(fields: "player_id")
}

# 一球ごとの記録
type GamePlay @table {
  id: UUID! @default(expr: "gen_random_uuid()")
  game_id: UUID!
  inning: Int!
  at_bat_number: Int!
  pitch_count: Int!
  pitch_type: String # "ball", "strike", "hit", etc.
  result: String
  created_at: Timestamp! @default(expr: "NOW()")
  game: Game! @ref(fields: "game_id")
}

# 選手成績
type PlayerStats @table {
  id: UUID! @default(expr: "gen_random_uuid()")
  player_id: UUID!
  season: String!
  batting_average: Float
  hits: Int
  at_bats: Int
  home_runs: Int
  rbis: Int
  era: Float
  wins: Int
  losses: Int
  player: Player! @ref(fields: "player_id")
}

# 記事
type Article @table {
  id: UUID! @default(expr: "gen_random_uuid()")
  team_id: UUID!
  title: String!
  content: String!
  linked_game_id: UUID
  published_at: Timestamp
  created_at: Timestamp! @default(expr: "NOW()")
  team: Team! @ref(fields: "team_id")
  linked_game: Game @ref(fields: "linked_game_id")
}

# スケジュール
type Schedule @table {
  id: UUID! @default(expr: "gen_random_uuid()")
  team_id: UUID!
  title: String!
  event_type: String! # "practice", "game", "event"
  event_date: Timestamp!
  location: String
  team: Team! @ref(fields: "team_id")
}
```

### 6-2. クエリ・ミューテーション定義（connectors.gql）

`dataconnect/connector/queries.gql` - データ取得用クエリ：

```graphql
# チーム一覧取得
query GetTeams {
  teams {
    id
    name
    logo_url
    created_at
  }
}

# チーム詳細取得
query GetTeam($teamId: UUID!) {
  team(id: $teamId) {
    id
    name
    logo_url
    created_at
  }
}

# 選手一覧取得
query GetPlayers($teamId: UUID!) {
  players(where: { team_id: { eq: $teamId } }) {
    id
    name
    uniform_number
    position
  }
}

# 試合一覧取得
query GetGames($teamId: UUID!) {
  games(
    where: { team_id: { eq: $teamId } }
    orderBy: { game_date: DESC }
  ) {
    id
    opponent
    game_date
    home_score
    away_score
    status
  }
}

# 試合詳細取得
query GetGame($gameId: UUID!) {
  game(id: $gameId) {
    id
    opponent
    game_date
    home_score
    away_score
    status
    video_url
    lineups {
      player {
        name
        uniform_number
      }
      batting_order
      position
      is_starter
    }
  }
}
```

`dataconnect/connector/mutations.gql` - データ更新用ミューテーション：

```graphql
# チーム作成
mutation CreateTeam($name: String!, $logoUrl: String) {
  team_insert(data: { name: $name, logo_url: $logoUrl }) {
    id
    name
  }
}

# 選手作成
mutation CreatePlayer(
  $teamId: UUID!
  $name: String!
  $uniformNumber: Int
  $position: String
) {
  player_insert(
    data: {
      team_id: $teamId
      name: $name
      uniform_number: $uniformNumber
      position: $position
    }
  ) {
    id
    name
  }
}

# 試合作成
mutation CreateGame(
  $teamId: UUID!
  $opponent: String!
  $gameDate: Date!
) {
  game_insert(
    data: {
      team_id: $teamId
      opponent: $opponent
      game_date: $gameDate
      status: "scheduled"
    }
  ) {
    id
    opponent
  }
}

# 試合スコア更新
mutation UpdateGameScore(
  $gameId: UUID!
  $homeScore: Int!
  $awayScore: Int!
  $status: String!
) {
  game_update(
    id: $gameId
    data: {
      home_score: $homeScore
      away_score: $awayScore
      status: $status
    }
  ) {
    id
    home_score
    away_score
  }
}
```

---

## 7. Data Connect SDK の使用（フロントエンド）

### 7-1. SDK コード生成

Data Connect SDKは、定義したGraphQLスキーマから自動的にTypeScript型とクエリ関数を生成します：

```bash
npx firebase dataconnect:sdk:generate
```

これにより、`app/src/generated/` にSDKファイルが生成されます。

### 7-2. データ操作の例

`app/src/hooks/useTeams.ts`:

```typescript
import { useQuery } from '@firebase/data-connect';
import { getTeams, createTeam } from '../generated';

export const useTeams = () => {
  // チーム一覧取得
  const { data, loading, error } = useQuery(getTeams);

  // チーム作成
  const handleCreateTeam = async (name: string, logoUrl?: string) => {
    try {
      const result = await createTeam({ name, logoUrl });
      console.log('Team created:', result);
    } catch (err) {
      console.error('Error creating team:', err);
    }
  };

  return {
    teams: data?.teams || [],
    loading,
    error,
    createTeam: handleCreateTeam,
  };
};
```

`app/src/components/TeamList.tsx`:

```typescript
import React from 'react';
import { useTeams } from '../hooks/useTeams';

export const TeamList: React.FC = () => {
  const { teams, loading, error, createTeam } = useTeams();

  const handleCreate = () => {
    createTeam('新しいチーム', 'https://example.com/logo.png');
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>チーム一覧</h2>
      <button onClick={handleCreate}>チーム作成</button>
      <ul>
        {teams.map(team => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
};
```

---

## 8. Cloud Functions 開発

### 8-1. PostgreSQL 接続（Functions）

`functions/src/db.ts`:

```typescript
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'dataconnect',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
};
```

### 8-2. 試合終了時の自動集計（Functions）

`functions/src/index.ts`:

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { query } from './db';

admin.initializeApp();

// 試合終了時のトリガー（Firestoreトリガーまたは定期実行）
export const calculatePlayerStats = functions.https.onCall(
  async (data, context) => {
    // 認証チェック
    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const { gameId } = data;

    try {
      // 試合のプレイデータを取得
      const playsResult = await query(
        'SELECT * FROM game_plays WHERE game_id = $1',
        [gameId]
      );

      // 成績を集計
      const stats = calculateStatsFromPlays(playsResult.rows);

      // player_statsテーブルを更新
      for (const stat of stats) {
        await query(
          `INSERT INTO player_stats 
           (player_id, season, batting_average, hits, at_bats) 
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (player_id, season) 
           DO UPDATE SET 
             batting_average = EXCLUDED.batting_average,
             hits = EXCLUDED.hits,
             at_bats = EXCLUDED.at_bats`,
          [
            stat.playerId,
            stat.season,
            stat.battingAverage,
            stat.hits,
            stat.atBats,
          ]
        );
      }

      return { success: true, stats };
    } catch (error) {
      console.error('Error calculating stats:', error);
      throw new functions.https.HttpsError(
        'internal',
        'Failed to calculate stats'
      );
    }
  }
);

function calculateStatsFromPlays(plays: any[]) {
  // 成績集計ロジック
  // TODO: 実装
  return [];
}

// HTTP関数の例
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase with PostgreSQL!');
});
```

---

## 9. Firebase CLI コマンド

### 9-1. ローカル開発（エミュレータ）

```bash
# 全エミュレータ起動（Auth, Functions, Data Connect, Hosting）
npx firebase emulators:start

# 特定のエミュレータのみ起動
npx firebase emulators:start --only dataconnect
npx firebase emulators:start --only functions
```

エミュレータUI: http://localhost:4050

### 9-2. Data Connect スキーマのデプロイ

```bash
# Data Connect スキーマをデプロイ
npx firebase deploy --only dataconnect

# Functions をデプロイ
npx firebase deploy --only functions

# Hosting をデプロイ
npx firebase deploy --only hosting

# 全体デプロイ
npx firebase deploy
```

### 9-3. SDK の再生成

スキーマを変更した後、SDKを再生成：

```bash
npx firebase dataconnect:sdk:generate
```

---

## 10. 開発ワークフロー

### 10-1. フロントエンド開発

```bash
cd app

# 開発サーバー起動
npm start

# ビルド（本番用）
npm run build

# テスト実行
npm test
```

### 10-2. バックエンド開発（Cloud Functions）

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

### 10-3. Data Connect スキーマ開発

```bash
# スキーマ編集
# dataconnect/schema/schema.gql を編集

# エミュレータで確認
npx firebase emulators:start --only dataconnect

# SDK 再生成
npx firebase dataconnect:sdk:generate

# デプロイ
npx firebase deploy --only dataconnect
```

---

## 11. 必須検証手順（完成前に必ず実行）

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
4. **Data Connect スキーマ検証**:
   ```bash
   npx firebase dataconnect:sql:diff
   ```
5. **SDK 生成テスト**:
   ```bash
   npx firebase dataconnect:sdk:generate
   ```
6. **基本機能テスト**: 作成したアプリケーションの主要機能が動作することを手動確認

---

## 12. 期待される成果物

- `app/` ディレクトリ（起動可能な React アプリ）
- `functions/` ディレクトリ（デプロイ可能な Cloud Functions）
- `dataconnect/` ディレクトリ（PostgreSQLスキーマ定義とGraphQLクエリ）
- `app/src/generated/` ディレクトリ（自動生成されたData Connect SDK）
- `app-spec.md`（要求の写し + 抽出した要件）
- `BUILDLOG.md`（時系列ログ: コマンド/判断/差分メモ）
- `firebase.json`（Firebase 設定ファイル）
- `.firebaserc`（Firebase プロジェクト情報）

---

## 13. DO / DON'T（品質と安全のガイド）

**DO**
- ローカルのみで完結するコマンドを使用（`npx`, `npm init`）
- ロックファイル（`package-lock.json`）をコミット
- 依存追加・スクリプト変更は `BUILDLOG.md` に都度記録
- Firebase エミュレータでローカルテスト
- Data Connect スキーマ変更時は必ず SDK を再生成
- GraphQL スキーマに適切な型制約を設定

**DON'T**
- グローバルインストール（`-g`）や `sudo` の使用
- ホーム配下や他プロジェクトの設定変更
- 秘密情報のコミット（`.env` の直コミット禁止）
- 本番環境への直接デプロイ（テスト不十分の場合）
- Data Connect スキーマの破壊的変更（マイグレーション計画なしに）

---

## 14. PostgreSQL データモデル設計指針

RDD_postgreSQL.md に記載されたテーブル構造に従って実装してください：

**主要テーブル:**
- `users` - ユーザー情報
- `teams` - チーム情報
- `team_members` - ユーザーとチームの紐付け（中間テーブル）
- `players` - 選手名簿
- `games` - 試合情報
- `game_lineups` - スタメン・ベンチ情報
- `game_plays` - 一球ごとの記録
- `player_stats` - 集計済み選手成績
- `articles` - HP用記事
- `schedules` - スケジュール

**リレーション:**
- 外部キー制約を使用してデータ整合性を保証
- `@ref` ディレクティブでGraphQLリレーションを定義

---

## 15. トラブルシュート

- **Firebase ログインエラー**: `npx firebase login --reauth` で再認証
- **エミュレータポート競合**: `firebase.json` でポート番号を変更
- **Functions デプロイエラー**: `functions/package.json` の `engines` フィールドを確認
- **Data Connect 接続エラー**: `firebase.json` の dataconnect 設定を確認
- **SDK 生成エラー**: `dataconnect/schema/schema.gql` の構文エラーを確認
- **PostgreSQL 接続エラー**: エミュレータが起動しているか確認
- **CORS エラー**: Cloud Functions で CORS 設定を追加

---

## 16. セキュリティ考慮事項

- **認証**: Firebase Authentication を使用
- **Data Connect**: 自動的に認証状態を考慮したクエリを生成
- **環境変数**: API キーは `.env` で管理（非コミット）
- **Cloud Functions**: Callable 関数で認証状態を確認
- **PostgreSQL**: Data Connect 経由のアクセスで SQL インジェクションを防止
- **HTTPS**: 本番環境では必ず HTTPS を使用

---

# 付録: コマンド早見表

## React アプリ作成
```bash
npx --yes create-react-app@latest app --template typescript --use-npm
```

## Firebase CLI コマンド
```bash
npx firebase login                              # ログイン
npx firebase init                               # 初期化
npx firebase init dataconnect                   # Data Connect 初期化
npx firebase emulators:start                    # エミュレータ起動
npx firebase dataconnect:sdk:generate           # SDK 生成
npx firebase dataconnect:sql:diff               # スキーマ差分確認
npx firebase deploy                             # デプロイ
npx firebase deploy --only dataconnect          # Data Connect のみデプロイ
npx firebase deploy --only functions            # Functions のみデプロイ
```

## Data Connect SDK 使用（フロントエンド）
```typescript
import { useQuery, useMutation } from '@firebase/data-connect';
import { getTeams, createTeam } from './generated';

// クエリ実行
const { data, loading, error } = useQuery(getTeams);

// ミューテーション実行
const result = await createTeam({ name: 'New Team' });
```

## Cloud Functions（PostgreSQL接続）
```typescript
import { Pool } from 'pg';

const pool = new Pool({ /* config */ });
const result = await pool.query('SELECT * FROM teams');
```

---

**開発開始前に環境セットアップを完了してください！**
