# 🎯 Play_Link 次回作業内容（最新版）

**更新日**: 2025-11-14
**プロジェクト**: Play_Link（野球クラブ用統合管理アプリ）
**技術スタック**: React + Firebase Data Connect (PostgreSQL) + Cloud Functions

---

## 📌 重要な設計変更

**旧設計**: Firestore ベース
**新設計**: **PostgreSQL + Firebase Data Connect** ベース

- データベース: PostgreSQL（リレーショナルDB）
- API: Firebase Data Connect（GraphQL自動生成）
- 参照ドキュメント:
  - `DS.md`（設計仕様書）- 完全なテーブル定義とAPI設計
  - `RDD_postgreSQL.md`（要件定義書）
  - `Agent.md`（開発ガイド）

---

## ✅ すでに完了していること

### 1. プロジェクト設計
- ✅ RDD_postgreSQL.md（要件定義書）
- ✅ DS.md（設計仕様書）- 完全なDB設計とAPI設計
- ✅ Agent.md（AI Agent向け開発ガイド）

### 2. Firebase環境構築
- ✅ Firebaseプロジェクト初期化（.firebaserc存在）
- ✅ firebase.json 設定ファイル作成済み

### 3. ディレクトリ構成
- ✅ `app/` - Reactフロントエンド
- ✅ `functions/` - Cloud Functions（Node.js）
- ✅ `dataconnect/` - Data Connect設定

---

## 📋 次回やること（優先順位順）

### 🔴 Phase 1: Data Connect スキーマ実装（最優先）

#### ステップ1-1: PostgreSQLテーブル定義（schema.gql）

**作業場所**: `dataconnect/schema/schema.gql`

**実装内容**: DS.mdの「2.2. テーブル定義」に基づいて、以下の10テーブルをGraphQLスキーマとして定義

1. **users** - ユーザー情報
2. **teams** - チーム情報
3. **team_members** - チームメンバー（中間テーブル）
4. **players** - 選手名簿
5. **schedules** - スケジュール
6. **games** - 試合情報
7. **game_lineups** - スタメン・ベンチ情報
8. **game_plays** - 一球ごとの記録
9. **player_stats** - 選手成績集計
10. **articles** - 記事・ブログ

**実装例**（users テーブル）:
```graphql
type User @table {
  id: UUID! @default(expr: "gen_random_uuid()")
  email: String! @col(name: "email")
  display_name: String @col(name: "display_name")
  avatar_url: String @col(name: "avatar_url")
  created_at: Timestamp! @default(expr: "NOW()")
  updated_at: Timestamp! @default(expr: "NOW()")
}
```

**参照**: DS.md の 2.2 節（全テーブル定義が記載）

---

#### ステップ1-2: GraphQLクエリ定義（queries.gql）

**作業場所**: `dataconnect/connector/queries.gql`

**実装するクエリ**:

```graphql
# チーム情報取得（スラッグ指定）
query GetTeamBySlug($slug: String!) @auth(level: PUBLIC) {
  teams(where: { slug: { _eq: $slug } }) {
    id
    name
    logo_url
    description
  }
}

# 試合一覧取得（アーカイブ用）
query GetGamesByTeam($teamId: UUID!, $limit: Int) @auth(level: PUBLIC) {
  games(
    where: {
      team_id: { _eq: $teamId }
      status: { _eq: "final" }
    }
    order_by: { game_date: desc }
    limit: $limit
  ) {
    id
    opponent_name
    game_date
    home_score
    away_score
    is_home
  }
}

# 選手成績取得
query GetPlayerStats($playerId: UUID!, $season: Int!) @auth(level: PUBLIC) {
  player_stats(
    where: {
      player_id: { _eq: $playerId }
      season: { _eq: $season }
    }
  ) {
    games_played
    at_bats
    hits
    batting_average
    home_runs
    rbi
  }
}

# 試合詳細（ボックススコア）
query GetGameDetail($gameId: UUID!) @auth(level: PUBLIC) {
  games(where: { id: { _eq: $gameId } }) {
    id
    opponent_name
    game_date
    home_score
    away_score
    lineups: game_lineups_on_game {
      batting_order
      position
      player {
        id
        name
        uniform_number
      }
    }
    plays: game_plays_on_game(order_by: { inning: asc, created_at: asc }) {
      inning
      is_top
      batter {
        name
      }
      play_type
      result
      rbi
    }
  }
}

# 選手一覧取得
query GetPlayersByTeam($teamId: UUID!) @auth(level: USER) {
  players(
    where: { team_id: { _eq: $teamId } }
    order_by: { uniform_number: asc }
  ) {
    id
    name
    uniform_number
    position
    bats
    throws
    photo_url
  }
}
```

**参照**: DS.md の 3.2 節（主要なクエリ）

---

#### ステップ1-3: GraphQLミューテーション定義（mutations.gql）

**作業場所**: `dataconnect/connector/mutations.gql`

**実装するミューテーション**:

```graphql
# スタメン登録
mutation CreateLineup($lineups: [GameLineupInsertInput!]!) @auth(level: USER) {
  game_lineup_insertMany(data: $lineups) {
    affected_rows
  }
}

# 一球記録の追加
mutation RecordPlay($input: GamePlayInsertInput!) @auth(level: USER) {
  game_play_insert(data: $input) {
    id
  }
}

# 試合ステータス更新（試合終了時）
mutation FinalizeGame($gameId: UUID!, $homeScore: Int!, $awayScore: Int!) @auth(level: USER) {
  game_update(
    id: $gameId
    data: {
      status: "final"
      home_score: $homeScore
      away_score: $awayScore
    }
  ) {
    id
    status
    home_score
    away_score
  }
}

# 選手登録
mutation CreatePlayer($input: PlayerInsertInput!) @auth(level: USER) {
  player_insert(data: $input) {
    id
    name
    uniform_number
    position
  }
}

# 試合作成
mutation CreateGame($input: GameInsertInput!) @auth(level: USER) {
  game_insert(data: $input) {
    id
    opponent_name
    game_date
  }
}

# 記事作成
mutation CreateArticle($input: ArticleInsertInput!) @auth(level: USER) {
  article_insert(data: $input) {
    id
    title
    published_at
  }
}
```

**参照**: DS.md の 3.3 節（主要なミューテーション）

---

#### ステップ1-4: Data Connect SDKの生成

**コマンド**:
```bash
cd /home/hiasano/hiasano/myapps/Play_Link

# SDK自動生成
npx firebase dataconnect:sdk:generate --output-dir app/src/generated
```

**生成されるファイル**:
- `app/src/generated/` - TypeScript型定義とクエリ関数

---

### 🟡 Phase 2: フロントエンド実装

#### ステップ2-1: Firebase初期化コード更新

**作業場所**: `app/src/firebase.ts`

**実装内容**:
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
export const functions = getFunctions(app, 'asia-northeast1');

// Data Connect 接続
export const dataConnect = getDataConnect(app, {
  connector: 'playlink-connector',
  location: 'asia-northeast1',
  service: 'playlink-dataconnect',
});

// ローカル開発時はエミュレータに接続
if (process.env.NODE_ENV === 'development') {
  connectDataConnectEmulator(dataConnect, 'localhost', 9399);
}
```

---

#### ステップ2-2: カスタムフック作成（Data Connect操作）

**作業場所**: `app/src/hooks/useGames.ts`

**実装例**:
```typescript
import { useQuery, useMutation } from '@firebase/data-connect';
import {
  getGamesByTeam,
  getGameDetail,
  createGame,
  finalizeGame
} from '../generated';

export const useGames = (teamId: string) => {
  // 試合一覧取得
  const { data, loading, error } = useQuery(getGamesByTeam, {
    teamId,
    limit: 10,
  });

  // 試合作成
  const [createGameMutation] = useMutation(createGame);

  // 試合終了処理
  const [finalizeGameMutation] = useMutation(finalizeGame);

  return {
    games: data?.games || [],
    loading,
    error,
    createGame: createGameMutation,
    finalizeGame: finalizeGameMutation,
  };
};
```

**同様に作成するフック**:
- `useTeams.ts` - チーム操作
- `usePlayers.ts` - 選手操作
- `usePlayerStats.ts` - 成績取得
- `useLineup.ts` - スタメン登録
- `useScoreInput.ts` - スコア入力

---

#### ステップ2-2.5: 選手名簿カード設計（決定事項）

**作業場所**: `app/src/components/PlayerCard/PlayerCard.tsx`

**デザイン仕様**:
- **フリップカード形式**（野球トレーディングカード風）
- **表面**: 選手の基本情報
  - 背番号
  - 名前
  - ポジション
  - 写真（あれば）
- **裏面**: 詳細な統計情報
  - 打率、本塁打、打点
  - 試合数、打数、安打数
  - その他の成績指標
- **インタラクション**:
  - マウスオーバーで裏返る
  - タッチデバイスではタップで裏返る

**使用ライブラリ**:
```bash
# CSS transformを使用（追加パッケージ不要）
```

**実装例**:
```tsx
interface PlayerCardProps {
  player: {
    id: string;
    name: string;
    uniformNumber: number;
    position: string;
    photoUrl?: string;
    stats?: PlayerStats;
  };
}

export const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="player-card-container"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`player-card ${isFlipped ? 'flipped' : ''}`}>
        {/* 表面 */}
        <div className="card-front">
          <img src={player.photoUrl} alt={player.name} />
          <div className="uniform-number">{player.uniformNumber}</div>
          <h3>{player.name}</h3>
          <p>{player.position}</p>
        </div>

        {/* 裏面 */}
        <div className="card-back">
          <h3>{player.name}の成績</h3>
          <div className="stats-grid">
            <div>打率: {player.stats?.battingAverage}</div>
            <div>本塁打: {player.stats?.homeRuns}</div>
            <div>打点: {player.stats?.rbi}</div>
            <div>安打: {player.stats?.hits}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

**CSS例** (`PlayerCard.css`):
```css
.player-card-container {
  perspective: 1000px;
  width: 200px;
  height: 300px;
}

.player-card {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.player-card.flipped {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.card-back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
}
```

**参照**: ユーザー提供の野球カード画像を参考

---

#### ステップ2-3: 重要コンポーネント実装

**1. LineupBoard（スタメン登録UI）**

**作業場所**: `app/src/components/LineupBoard/LineupBoard.tsx`

**要件**:
- 作戦ボード風のUI
- ドラッグ&ドロップでスタメン配置
- ポジション枠（P, C, 1B, 2B, 3B, SS, LF, CF, RF）
- 打順枠（1-9番）
- 選手プール（全選手一覧）
- ベンチエリア

**使用ライブラリ**:
```bash
cd app
npm install @dnd-kit/core @dnd-kit/sortable
```

**参照**: DS.md の 4.2.1 節（LineupBoard設計）

---

**2. ScoreInput（スコア入力UI）**

**作業場所**: `app/src/components/ScoreInput/ScoreInput.tsx`

**要件**:
- イニング選択
- 打者選択
- プレイタイプボタン（単打、二塁打、三塁打、本塁打、三振、四球等）
- 打点・得点入力
- リアルタイム記録

**参照**: DS.md の 4.2.2 節（ScoreInput設計）

---

#### ステップ2-4: ページコンポーネント作成

**作成するページ**:

1. **`app/src/pages/Home.tsx`** - 一般HP（トップページ）
   - お知らせ
   - 最新試合結果
   - 次回試合予定

2. **`app/src/pages/Games/GameArchive.tsx`** - 試合結果アーカイブ
   - 過去の試合一覧
   - ボックススコア表示

3. **`app/src/pages/Dashboard/Dashboard.tsx`** - 管理画面（要ログイン）
   - ダッシュボード

4. **`app/src/pages/Games/LineupPage.tsx`** - スタメン登録画面
   - LineupBoardコンポーネント使用

5. **`app/src/pages/Games/ScorePage.tsx`** - スコア入力画面
   - ScoreInputコンポーネント使用

6. **`app/src/pages/Stats/StatsPage.tsx`** - 成績一覧
   - 選手成績表示

---

#### ステップ2-5: ルーティング設定

**作業場所**: `app/src/App.tsx`

**実装内容**:
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard/Dashboard';
import GameArchive from './pages/Games/GameArchive';
import LineupPage from './pages/Games/LineupPage';
import ScorePage from './pages/Games/ScorePage';
import StatsPage from './pages/Stats/StatsPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 一般公開エリア */}
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameArchive />} />
        <Route path="/games/:id" element={<GameDetail />} />

        {/* 隠しボタンからログインへ */}
        <Route path="/login" element={<Login />} />

        {/* 管理画面（要ログイン） */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/games/:id/lineup" element={
          <ProtectedRoute>
            <LineupPage />
          </ProtectedRoute>
        } />
        <Route path="/games/:id/score" element={
          <ProtectedRoute>
            <ScorePage />
          </ProtectedRoute>
        } />
        <Route path="/stats" element={
          <ProtectedRoute>
            <StatsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}
```

**参照**: DS.md の 4.1 節（画面遷移図）

---

### 🟢 Phase 3: Cloud Functions 実装（自動集計）

#### ステップ3-1: PostgreSQL接続設定

**作業場所**: `functions/src/db.ts`

**実装内容**:
```typescript
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'dataconnect',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
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

---

#### ステップ3-2: 自動集計ロジック実装

**作業場所**: `functions/src/index.ts`

**実装内容**: DS.md の 6.2.2 節に記載された完全な集計ロジック

**トリガー条件**:
- `games` テーブルの `status` が `"final"` に更新された時

**処理フロー**:
1. `game_plays` から該当試合のプレイデータを取得
2. 選手ごとに成績を集計（打数、安打、打率、本塁打、打点等）
3. `player_stats` テーブルをUPSERT（更新または挿入）

**参照**: DS.md の 6 節（自動集計ロジック設計）

---

#### ステップ3-3: Cloud Functions依存関係インストール

**コマンド**:
```bash
cd /home/hiasano/hiasano/myapps/Play_Link/functions

# 必要なパッケージをインストール
npm install firebase-admin firebase-functions@latest
npm install pg
npm install -D typescript @types/node @types/pg

# TypeScriptコンパイル
npm run build
```

---

### 🔵 Phase 4: エミュレータでのテスト

#### ステップ4-1: エミュレータ起動

**コマンド**:
```bash
cd /home/hiasano/hiasano/myapps/Play_Link

# 全エミュレータ起動
npx firebase emulators:start
```

**起動されるサービス**:
- Authentication: http://localhost:9199
- Functions: http://localhost:5051
- Data Connect: http://localhost:9399
- Hosting: http://localhost:5050
- Emulator UI: http://localhost:4050

---

#### ステップ4-2: Data Connectスキーマ確認

**コマンド**:
```bash
# スキーマ差分確認
npx firebase dataconnect:sql:diff

# スキーマ適用
npx firebase dataconnect:sql:migrate
```

---

#### ステップ4-3: 機能テスト項目

**テストするべき機能**:

1. **認証機能**
   - [ ] メール/パスワードでログイン
   - [ ] ログアウト
   - [ ] 認証状態の保持

2. **チーム管理**
   - [ ] チーム一覧取得
   - [ ] チーム詳細表示

3. **選手管理**
   - [ ] 選手一覧取得
   - [ ] 選手登録

4. **試合管理**
   - [ ] 試合作成
   - [ ] スタメン登録（LineupBoard）
   - [ ] スコア入力（ScoreInput）
   - [ ] 試合終了時の自動集計

5. **成績表示**
   - [ ] 選手成績取得
   - [ ] ボックススコア表示

---

## 📚 参考ドキュメント

### 必ず確認するべきファイル

| ファイル | 内容 | 参照タイミング |
|---------|------|--------------|
| **DS.md** | 設計仕様書（完全なDB設計・API設計） | 実装中、常に参照 |
| **RDD_postgreSQL.md** | 要件定義書（機能仕様） | 機能実装時 |
| **Agent.md** | 開発ガイド（コマンド・実装方法） | 環境構築時、コマンド確認時 |

---

## 🔧 開発コマンド早見表

### エミュレータ起動
```bash
cd /home/hiasano/hiasano/myapps/Play_Link
npx firebase emulators:start
```

### SDK生成
```bash
npx firebase dataconnect:sdk:generate --output-dir app/src/generated
```

### フロントエンド開発サーバー
```bash
cd app
npm start
```
→ http://localhost:3000

### Functions コンパイル
```bash
cd functions
npm run build
```

### スキーマ確認・適用
```bash
npx firebase dataconnect:sql:diff
npx firebase dataconnect:sql:migrate
```

---

## ⚠️ 重要な注意事項

### 1. Data Connect の認証レベル

クエリ・ミューテーションには適切な認証レベルを設定：
- `@auth(level: PUBLIC)` - 一般公開
- `@auth(level: USER)` - ログイン必須

### 2. エミュレータでの開発

**本番環境にデプロイする前に、必ずエミュレータで動作確認**

### 3. スキーマ変更時の手順

1. `dataconnect/schema/schema.gql` を編集
2. `npx firebase dataconnect:sql:diff` で差分確認
3. `npx firebase dataconnect:sdk:generate` でSDK再生成
4. フロントエンドコードを更新

### 4. グローバルインストール禁止

**Agent.mdのルールを厳守**:
- ❌ `npm install -g ...` 禁止
- ❌ `sudo` 禁止
- ✅ すべて `npx` で実行

---

## 📊 実装の優先順位

### 最優先（Phase 1）
1. ✅ Data Connect スキーマ実装
2. ✅ GraphQL クエリ・ミューテーション定義
3. ✅ SDK生成

### 次（Phase 2）
4. React コンポーネント実装
   - 特に **LineupBoard**（スタメン登録）と **ScoreInput**（スコア入力）

### その後（Phase 3）
5. Cloud Functions（自動集計ロジック）

### 最後（Phase 4）
6. エミュレータでの総合テスト

---

### 🟣 Phase 5: CI/CDセットアップ（推奨）

**参照**: `/docs/CICDtest.md`, DS.md 8.4-8.5 節

#### ステップ5-1: GitHub Actions設定

**作業場所**: `.github/workflows/ci.yml`

**実装内容**:
```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      # Reactビルド＆テスト
      - name: Install dependencies (React)
        run: cd app && npm ci

      - name: Lint (React)
        run: cd app && npm run lint

      - name: Test (React)
        run: cd app && npm test

      - name: Build (React)
        run: cd app && npm run build

      # Functionsビルド＆テスト
      - name: Install dependencies (Functions)
        run: cd functions && npm ci

      - name: Lint (Functions)
        run: cd functions && npm run lint

      - name: Build (Functions)
        run: cd functions && npm run build
```

#### ステップ5-2: セキュリティスキャン設定

**作業場所**: `.github/workflows/security.yml`

**実装内容**:
```yaml
name: Security Scan

on:
  push:
  schedule:
    - cron: '0 0 * * 0'  # 毎週日曜日

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run npm audit (React)
        run: cd app && npm audit --audit-level=moderate

      - name: Run npm audit (Functions)
        run: cd functions && npm audit --audit-level=moderate
```

#### ステップ5-3: E2Eテスト設定（オプション）

**使用ツール**: Playwright

**インストール**:
```bash
cd app
npm install -D @playwright/test
npx playwright install
```

**テスト作成例**: `app/e2e/login.spec.ts`
```typescript
import { test, expect } from '@playwright/test';

test('ログイン → ダッシュボード遷移', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('[data-testid="hidden-login-button"]');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('[type="submit"]');
  await expect(page).toHaveURL(/.*dashboard/);
});
```

---

### 🟤 Phase 6: FinOps設定（推奨）

**参照**: `/docs/FinOps.md`, DS.md 9 節

#### ステップ6-1: リソースタグ付け

**Firebase プロジェクトにタグを設定**:

Firebase Console > プロジェクト設定 > 一般 > ラベル（タグ）

| キー | 値 |
|------|-----|
| `team` | `baseball-ops` |
| `project` | `playlink` |
| `env` | `production` |
| `owner` | `manager@example.com` |

#### ステップ6-2: コスト監視設定

**予算アラート設定**:

1. Google Cloud Console > お支払い > 予算とアラート
2. 新しい予算を作成
   - 予算名: `PlayLink Production Budget`
   - 予算額: 10,000円/月
   - アラート: 50%, 90%, 100%

#### ステップ6-3: 開発環境でエミュレータ徹底

**ローカル開発時は必ずエミュレータを使用**:
```bash
# エミュレータ起動
npx firebase emulators:start

# React開発サーバー（別ターミナル）
cd app
npm start
```

**本番APIは最終確認時のみ使用**

#### ステップ6-4: コスト最適化チェック

- [ ] Data Connectクエリに不要なフィールドが含まれていないか確認
- [ ] `limit`を使用してページネーション実装
- [ ] Cloud Functionsのタイムアウト・メモリ設定を最適化
- [ ] 不要なログの削除または保存期間短縮
- [ ] 終了したプロジェクトのリソース削除

**目標**: Wix社の事例に倣い、無駄なコストを50%削減

---

## 🚀 次回作業開始時のコマンド

```bash
# 1. プロジェクトディレクトリに移動
cd /home/hiasano/hiasano/myapps/Play_Link

# 2. このファイルを確認
cat NEXT_STEPS.md

# 3. DS.md（設計仕様書）を確認
cat DS.md

# 4. エミュレータ起動
npx firebase emulators:start

# 5. 別ターミナルで開発サーバー起動
cd app
npm start

# 6. 開発開始！
```

---

## 💡 開発Tips

### DS.mdを活用する
- テーブル定義: DS.md 2.2 節
- API設計: DS.md 3 節
- コンポーネント設計: DS.md 4.2 節
- 自動集計ロジック: DS.md 6 節

### Agent.mdを活用する
- Firebase CLIコマンド: Agent.md 9 節
- Data Connect使用例: Agent.md 7 節
- トラブルシュート: Agent.md 15 節

### 小さく始める
- まずは1つのテーブル（teams）から実装
- クエリを1つずつテスト
- 動作確認後に次の機能へ

### 頻繁にコミット
```bash
git add .
git commit -m "feat: Implement teams schema"
git commit -m "feat: Add GetTeamBySlug query"
```

---

**PostgreSQL + Data Connectでの本格的な開発を始めましょう！ 🚀⚾**
