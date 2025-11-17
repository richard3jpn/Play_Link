# ⚾ プレイリンク (Play Link) - Design Specification (設計仕様書)

**バージョン**: 1.0
**作成日**: 2025-01-14
**対象プロジェクト**: 野球クラブ用統合管理アプリ「プレイリンク」

---

## 目次
1. [システムアーキテクチャ](#1-システムアーキテクチャ)
2. [データベース詳細設計](#2-データベース詳細設計)
3. [API設計 (GraphQL)](#3-api設計-graphql)
4. [UI/UX設計](#4-uiux設計)
5. [認証・権限設計](#5-認証権限設計)
6. [自動集計ロジック設計](#6-自動集計ロジック設計)
7. [デプロイ・環境設定](#7-デプロイ環境設定)
8. [非機能要件](#8-非機能要件)
9. [FinOps（コスト管理）](#9-finopsコスト管理)
10. [今後の拡張案](#10-今後の拡張案)

---

## 1. システムアーキテクチャ

### 1.1. 全体構成図

```
┌─────────────────────────────────────────────────────────┐
│                     ユーザー層                           │
│  ┌──────────────┐           ┌──────────────┐           │
│  │ 一般訪問者    │           │ チームメンバー │           │
│  │ (HP閲覧)     │           │ (ログイン済み) │           │
│  └──────┬───────┘           └──────┬───────┘           │
└─────────┼──────────────────────────┼──────────────────┘
          │                          │
          └──────────┬───────────────┘
                     ▼
┌─────────────────────────────────────────────────────────┐
│              フロントエンド (React SPA)                   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  - React Router (ルーティング)                    │   │
│  │  - Context API / Redux (状態管理)                │   │
│  │  - Material-UI / Tailwind CSS (UIコンポーネント) │   │
│  │  - Firebase SDK (認証、Data Connect連携)         │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│           Firebase プラットフォーム                       │
│  ┌───────────────────┐  ┌──────────────────────────┐  │
│  │ Authentication    │  │ Data Connect (GraphQL)   │  │
│  │ - Email/Password  │  │ - PostgreSQL クエリ生成   │  │
│  │ - 招待リンク      │  │ - スキーマ自動管理        │  │
│  └───────────────────┘  └──────────┬───────────────┘  │
│  ┌───────────────────────────────┐ │                  │
│  │ Cloud Functions (Node.js)     │ │                  │
│  │ - 成績自動集計バッチ           │ │                  │
│  │ - 試合終了時トリガー           │ │                  │
│  │ - メール送信                  │ │                  │
│  └───────────────────────────────┘ │                  │
└────────────────────────────────────┼──────────────────┘
                                     ▼
┌─────────────────────────────────────────────────────────┐
│           データベース (PostgreSQL)                       │
│  - users, teams, team_members                           │
│  - players, schedules, games, game_lineups, game_plays  │
│  - player_stats, articles                               │
└─────────────────────────────────────────────────────────┘
```

### 1.2. レイヤー構成

| レイヤー | 技術 | 役割 |
|---------|-----|------|
| **プレゼンテーション層** | React | UI表示、ユーザー操作の受付 |
| **アプリケーション層** | React + Firebase SDK | 状態管理、ビジネスロジック、認証処理 |
| **API層** | Firebase Data Connect | GraphQL APIの自動生成・提供 |
| **バックエンドロジック層** | Cloud Functions | 複雑な集計処理、バッチ処理 |
| **データ層** | PostgreSQL | データ永続化 |

---

## 2. データベース詳細設計

### 2.1. ER図（エンティティリレーション図）

```
users ──┬─< team_members >─┬── teams
        │                   │
        │                   └──< players
        │                   └──< schedules
        │                   └──< games ──┬──< game_lineups >─┬─ players
        │                                 │                    │
        │                                 ├──< game_plays      │
        │                                 └──< articles        │
        │                                                      │
        └────────────────────────────────< player_stats >─────┘
```

### 2.2. テーブル定義

#### 2.2.1. users (ユーザー)
| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|----|----|----------|------|
| id | UUID | NOT NULL | gen_random_uuid() | PK, Firebase Auth UIDと一致 |
| email | VARCHAR(255) | NOT NULL | - | メールアドレス |
| display_name | VARCHAR(100) | NULL | - | 表示名 |
| avatar_url | TEXT | NULL | - | プロフィール画像URL |
| created_at | TIMESTAMP | NOT NULL | NOW() | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL | NOW() | 更新日時 |

**制約**:
- PRIMARY KEY: `id`
- UNIQUE: `email`

---

#### 2.2.2. teams (チーム)
| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|----|----|----------|------|
| id | UUID | NOT NULL | gen_random_uuid() | PK |
| name | VARCHAR(100) | NOT NULL | - | チーム名 |
| slug | VARCHAR(50) | NOT NULL | - | URL用スラッグ（例: tigers） |
| logo_url | TEXT | NULL | - | チームロゴURL |
| description | TEXT | NULL | - | チーム紹介文 |
| created_at | TIMESTAMP | NOT NULL | NOW() | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL | NOW() | 更新日時 |

**制約**:
- PRIMARY KEY: `id`
- UNIQUE: `slug`

---

#### 2.2.3. team_members (チームメンバー・中間テーブル)
| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|----|----|----------|------|
| id | UUID | NOT NULL | gen_random_uuid() | PK |
| user_id | UUID | NOT NULL | - | FK → users.id |
| team_id | UUID | NOT NULL | - | FK → teams.id |
| role | VARCHAR(20) | NOT NULL | 'member' | 権限 ('admin', 'member') |
| joined_at | TIMESTAMP | NOT NULL | NOW() | 参加日時 |

**制約**:
- PRIMARY KEY: `id`
- FOREIGN KEY: `user_id` REFERENCES `users(id)` ON DELETE CASCADE
- FOREIGN KEY: `team_id` REFERENCES `teams(id)` ON DELETE CASCADE
- UNIQUE: `(user_id, team_id)`

---

#### 2.2.4. players (選手名簿)
| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|----|----|----------|------|
| id | UUID | NOT NULL | gen_random_uuid() | PK |
| team_id | UUID | NOT NULL | - | FK → teams.id |
| user_id | UUID | NULL | - | FK → users.id (紐づけ任意) |
| name | VARCHAR(100) | NOT NULL | - | 選手名 |
| uniform_number | INTEGER | NULL | - | 背番号 |
| position | VARCHAR(20) | NULL | - | ポジション (P, C, 1B等) |
| bats | VARCHAR(10) | NULL | - | 打席 (右, 左, 両) |
| throws | VARCHAR(10) | NULL | - | 投げ (右, 左) |
| photo_url | TEXT | NULL | - | 顔写真URL |
| is_active | BOOLEAN | NOT NULL | true | 現役フラグ |
| created_at | TIMESTAMP | NOT NULL | NOW() | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL | NOW() | 更新日時 |

**制約**:
- PRIMARY KEY: `id`
- FOREIGN KEY: `team_id` REFERENCES `teams(id)` ON DELETE CASCADE
- FOREIGN KEY: `user_id` REFERENCES `users(id)` ON DELETE SET NULL

---

#### 2.2.5. schedules (スケジュール)
| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|----|----|----------|------|
| id | UUID | NOT NULL | gen_random_uuid() | PK |
| team_id | UUID | NOT NULL | - | FK → teams.id |
| title | VARCHAR(200) | NOT NULL | - | 予定タイトル |
| event_type | VARCHAR(20) | NOT NULL | - | 種別 (practice, game, meeting) |
| start_time | TIMESTAMP | NOT NULL | - | 開始日時 |
| end_time | TIMESTAMP | NULL | - | 終了日時 |
| location | VARCHAR(200) | NULL | - | 場所 |
| description | TEXT | NULL | - | 詳細 |
| created_at | TIMESTAMP | NOT NULL | NOW() | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL | NOW() | 更新日時 |

**制約**:
- PRIMARY KEY: `id`
- FOREIGN KEY: `team_id` REFERENCES `teams(id)` ON DELETE CASCADE

---

#### 2.2.6. games (試合情報)
| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|----|----|----------|------|
| id | UUID | NOT NULL | gen_random_uuid() | PK |
| team_id | UUID | NOT NULL | - | FK → teams.id |
| schedule_id | UUID | NULL | - | FK → schedules.id |
| opponent_name | VARCHAR(100) | NOT NULL | - | 対戦相手名 |
| game_date | DATE | NOT NULL | - | 試合日 |
| location | VARCHAR(200) | NULL | - | 試合会場 |
| is_home | BOOLEAN | NOT NULL | true | ホームゲームフラグ |
| home_score | INTEGER | NULL | - | 自チームスコア（確定後） |
| away_score | INTEGER | NULL | - | 相手チームスコア（確定後） |
| status | VARCHAR(20) | NOT NULL | 'scheduled' | scheduled, ongoing, final |
| video_url | TEXT | NULL | - | 試合動画URL |
| created_at | TIMESTAMP | NOT NULL | NOW() | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL | NOW() | 更新日時 |

**制約**:
- PRIMARY KEY: `id`
- FOREIGN KEY: `team_id` REFERENCES `teams(id)` ON DELETE CASCADE
- FOREIGN KEY: `schedule_id` REFERENCES `schedules(id)` ON DELETE SET NULL

---

#### 2.2.7. game_lineups (試合スタメン・ベンチ)
| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|----|----|----------|------|
| id | UUID | NOT NULL | gen_random_uuid() | PK |
| game_id | UUID | NOT NULL | - | FK → games.id |
| player_id | UUID | NOT NULL | - | FK → players.id |
| batting_order | INTEGER | NULL | - | 打順 (1-9, NULL=ベンチ) |
| position | VARCHAR(20) | NULL | - | 守備位置 (P, C, 1B等) |
| is_starter | BOOLEAN | NOT NULL | true | スタメンフラグ |

**制約**:
- PRIMARY KEY: `id`
- FOREIGN KEY: `game_id` REFERENCES `games(id)` ON DELETE CASCADE
- FOREIGN KEY: `player_id` REFERENCES `players(id)` ON DELETE CASCADE

---

#### 2.2.8. game_plays (一球ごとの記録)
| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|----|----|----------|------|
| id | UUID | NOT NULL | gen_random_uuid() | PK |
| game_id | UUID | NOT NULL | - | FK → games.id |
| inning | INTEGER | NOT NULL | - | イニング |
| is_top | BOOLEAN | NOT NULL | - | 表/裏 (true=表) |
| batter_id | UUID | NOT NULL | - | FK → players.id |
| pitcher_id | UUID | NULL | - | FK → players.id (相手投手) |
| play_type | VARCHAR(30) | NOT NULL | - | プレイ種別 (single, double等) |
| result | VARCHAR(50) | NOT NULL | - | 結果 (詳細テキスト) |
| rbi | INTEGER | NOT NULL | 0 | 打点 |
| runs_scored | INTEGER | NOT NULL | 0 | 得点 |
| created_at | TIMESTAMP | NOT NULL | NOW() | 記録日時 |

**制約**:
- PRIMARY KEY: `id`
- FOREIGN KEY: `game_id` REFERENCES `games(id)` ON DELETE CASCADE
- FOREIGN KEY: `batter_id` REFERENCES `players(id)` ON DELETE CASCADE
- FOREIGN KEY: `pitcher_id` REFERENCES `players(id)` ON DELETE SET NULL

**play_type の値例**:
- `single`, `double`, `triple`, `home_run`
- `strikeout`, `walk`, `groundout`, `flyout`
- `sacrifice_fly`, `hit_by_pitch`

---

#### 2.2.9. player_stats (選手成績集計)
| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|----|----|----------|------|
| id | UUID | NOT NULL | gen_random_uuid() | PK |
| player_id | UUID | NOT NULL | - | FK → players.id |
| season | INTEGER | NOT NULL | - | シーズン年 (2025等) |
| games_played | INTEGER | NOT NULL | 0 | 出場試合数 |
| at_bats | INTEGER | NOT NULL | 0 | 打数 |
| hits | INTEGER | NOT NULL | 0 | 安打数 |
| doubles | INTEGER | NOT NULL | 0 | 二塁打 |
| triples | INTEGER | NOT NULL | 0 | 三塁打 |
| home_runs | INTEGER | NOT NULL | 0 | 本塁打 |
| rbi | INTEGER | NOT NULL | 0 | 打点 |
| walks | INTEGER | NOT NULL | 0 | 四球 |
| strikeouts | INTEGER | NOT NULL | 0 | 三振 |
| batting_average | DECIMAL(4,3) | NULL | - | 打率 (計算結果) |
| updated_at | TIMESTAMP | NOT NULL | NOW() | 最終更新日時 |

**制約**:
- PRIMARY KEY: `id`
- FOREIGN KEY: `player_id` REFERENCES `players(id)` ON DELETE CASCADE
- UNIQUE: `(player_id, season)`

---

#### 2.2.10. articles (記事・ブログ)
| カラム名 | 型 | NULL | デフォルト | 説明 |
|---------|----|----|----------|------|
| id | UUID | NOT NULL | gen_random_uuid() | PK |
| team_id | UUID | NOT NULL | - | FK → teams.id |
| author_id | UUID | NOT NULL | - | FK → users.id |
| linked_game_id | UUID | NULL | - | FK → games.id (試合連携) |
| title | VARCHAR(200) | NOT NULL | - | 記事タイトル |
| content | TEXT | NOT NULL | - | 本文 (Markdown) |
| thumbnail_url | TEXT | NULL | - | サムネイル画像URL |
| is_published | BOOLEAN | NOT NULL | false | 公開フラグ |
| published_at | TIMESTAMP | NULL | - | 公開日時 |
| created_at | TIMESTAMP | NOT NULL | NOW() | 作成日時 |
| updated_at | TIMESTAMP | NOT NULL | NOW() | 更新日時 |

**制約**:
- PRIMARY KEY: `id`
- FOREIGN KEY: `team_id` REFERENCES `teams(id)` ON DELETE CASCADE
- FOREIGN KEY: `author_id` REFERENCES `users(id)` ON DELETE CASCADE
- FOREIGN KEY: `linked_game_id` REFERENCES `games(id)` ON DELETE SET NULL

---

## 3. API設計 (GraphQL)

### 3.1. Firebase Data Connect の役割
PostgreSQLのテーブルスキーマから、GraphQLのクエリ・ミューテーションを自動生成。
開発者は `dataconnect.yaml` と GraphQL スキーマファイルを定義するだけで、型安全なAPIが利用可能。

### 3.2. 主要なクエリ

#### 3.2.1. チーム情報取得
```graphql
query GetTeamBySlug($slug: String!) {
  teams(where: { slug: { _eq: $slug } }) {
    id
    name
    logo_url
    description
  }
}
```

#### 3.2.2. 試合一覧取得（アーカイブ用）
```graphql
query GetGamesByTeam($teamId: UUID!, $limit: Int = 10) {
  games(
    where: { team_id: { _eq: $teamId }, status: { _eq: "final" } }
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
```

#### 3.2.3. 選手成績取得
```graphql
query GetPlayerStats($playerId: UUID!, $season: Int!) {
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
```

#### 3.2.4. 試合詳細（ボックススコア）取得
```graphql
query GetGameDetail($gameId: UUID!) {
  games(where: { id: { _eq: $gameId } }) {
    id
    opponent_name
    game_date
    home_score
    away_score
    lineups: game_lineups {
      batting_order
      position
      player {
        id
        name
        uniform_number
      }
    }
    plays: game_plays(order_by: { inning: asc, created_at: asc }) {
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
```

### 3.3. 主要なミューテーション

#### 3.3.1. スタメン登録
```graphql
mutation CreateLineup($gameId: UUID!, $lineups: [GameLineupInput!]!) {
  insert_game_lineups(objects: $lineups) {
    affected_rows
  }
}
```

#### 3.3.2. 一球記録の追加
```graphql
mutation RecordPlay($input: GamePlayInput!) {
  insert_game_plays_one(object: $input) {
    id
  }
}
```

#### 3.3.3. 試合ステータス更新
```graphql
mutation FinalizeGame($gameId: UUID!, $homeScore: Int!, $awayScore: Int!) {
  update_games(
    where: { id: { _eq: $gameId } }
    _set: {
      status: "final"
      home_score: $homeScore
      away_score: $awayScore
    }
  ) {
    affected_rows
  }
}
```

---

## 4. UI/UX設計

### 4.1. 画面遷移図

```
[一般HP]
  ├─ / (トップページ)
  ├─ /articles (記事一覧)
  ├─ /articles/:id (記事詳細)
  ├─ /games (試合結果アーカイブ)
  ├─ /games/:id (試合詳細・ボックススコア)
  ├─ /about (チーム紹介)
  ├─ /members (メンバー紹介)
  └─ [隠しボタン] → /login

[管理画面] (要ログイン)
  ├─ /dashboard (ダッシュボード)
  ├─ /schedule (スケジュール管理)
  ├─ /players (選手名簿)
  ├─ /games/new (試合登録)
  ├─ /games/:id/lineup (スタメン登録)
  ├─ /games/:id/score (スコア入力)
  ├─ /stats (成績一覧)
  ├─ /articles/new (記事作成)
  └─ /settings (設定)
```

### 4.2. 重要コンポーネント設計

#### 4.2.1. LineupBoard（スタメン登録UI）
**要件**: 作戦ボード風のドラッグ&ドロップUI

**構成**:
```jsx
<LineupBoard>
  <FieldDiagram>
    {/* ダイヤモンド形式のポジション枠 (P, C, 1B, 2B, 3B, SS, LF, CF, RF) */}
    <PositionSlot position="P" player={lineup.pitcher} />
    <PositionSlot position="C" player={lineup.catcher} />
    ...
  </FieldDiagram>

  <BattingOrderList>
    {/* 1番〜9番の打順枠 */}
    <BattingSlot order={1} player={lineup.first} />
    ...
  </BattingOrderList>

  <PlayerPool>
    {/* 全選手一覧（ドラッグ元） */}
    <PlayerCard player={player1} draggable />
    <PlayerCard player={player2} draggable />
  </PlayerPool>

  <BenchArea>
    {/* ベンチ選手 */}
    <PlayerCard player={bench1} />
  </BenchArea>
</LineupBoard>
```

**技術**:
- `react-beautiful-dnd` または `@dnd-kit/core` を使用
- 選手カードをドラッグして、ポジション枠・打順枠にドロップ
- 登録完了で `game_lineups` テーブルに一括INSERT

#### 4.2.2. ScoreInput（スコア入力UI）
**要件**: 試合中にリアルタイムで一球ごとに入力

**構成**:
```jsx
<ScoreInput>
  <InningSelector currentInning={3} isTop={true} />

  <BatterSelector
    currentBatter={currentPlayer}
    onSelectBatter={handleSelectBatter}
  />

  <PlayTypeButtons>
    <Button onClick={() => recordPlay('single')}>単打</Button>
    <Button onClick={() => recordPlay('double')}>二塁打</Button>
    <Button onClick={() => recordPlay('home_run')}>本塁打</Button>
    <Button onClick={() => recordPlay('strikeout')}>三振</Button>
    <Button onClick={() => recordPlay('walk')}>四球</Button>
    ...
  </PlayTypeButtons>

  <RunsInput rbi={0} runsScored={0} />

  <SubmitButton onClick={handleSubmit}>記録</SubmitButton>
</ScoreInput>
```

**フロー**:
1. イニング・打者を選択
2. プレイタイプボタンをタップ
3. 打点・得点を入力
4. 「記録」で `game_plays` テーブルにINSERT

---

## 5. 認証・権限設計

### 5.1. Firebase Authentication 設定

#### 認証方法
- **Email/Password認証** を基本とする
- 将来的にGoogle OAuth対応も検討

#### ユーザー登録フロー
1. 管理者が「招待リンク」を生成（Cloud Functionsで実装）
2. メンバーが招待リンクからメールアドレスを入力
3. Firebase Authenticationでアカウント作成
4. `users` テーブルに自動登録（Cloud Functions onCreateトリガー）
5. `team_members` テーブルに所属情報を登録（role: 'member'）

### 5.2. ロール（権限）定義

| ロール | 説明 | 可能な操作 |
|-------|-----|----------|
| **admin** | 管理者 | 全機能の利用、チーム設定変更、メンバー招待、記事公開 |
| **member** | 一般メンバー | 試合記録入力、スケジュール閲覧、成績閲覧 |
| **public** | 未ログイン | HP閲覧のみ |

### 5.3. 認証チェック実装

#### フロントエンド
```javascript
// Context APIで認証状態を管理
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        // Data Connectでユーザーのroleをフェッチ
        const { role } = await fetchUserRole(user.uid);
        setRole(role);
      } else {
        setCurrentUser(null);
        setRole(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, role }}>
      {children}
    </AuthContext.Provider>
  );
}

// 管理画面のルート保護
<Route path="/dashboard" element={
  <ProtectedRoute requiredRole="member">
    <Dashboard />
  </ProtectedRoute>
} />
```

#### バックエンド (Cloud Functions)
```javascript
// 認証チェック用ミドルウェア
async function verifyAuth(req, res, next) {
  const idToken = req.headers.authorization?.split('Bearer ')[1];

  if (!idToken) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.uid = decodedToken.uid;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

---

## 6. 自動集計ロジック設計

### 6.1. トリガー条件
- `games` テーブルの `status` カラムが `"final"` に更新された時

### 6.2. 実装 (Cloud Functions)

#### 6.2.1. Firestore トリガー設定
```javascript
exports.onGameFinalized = functions.firestore
  .document('games/{gameId}')
  .onUpdate(async (change, context) => {
    const beforeStatus = change.before.data().status;
    const afterStatus = change.after.data().status;

    // statusが"final"に変更された場合のみ実行
    if (beforeStatus !== 'final' && afterStatus === 'final') {
      const gameId = context.params.gameId;
      await calculatePlayerStats(gameId);
    }
  });
```

#### 6.2.2. 集計ロジック
```javascript
async function calculatePlayerStats(gameId) {
  // 1. game_playsテーブルから該当試合のプレイをすべて取得
  const plays = await db.query(
    'SELECT * FROM game_plays WHERE game_id = $1',
    [gameId]
  );

  // 2. 選手ごとに成績を集計
  const statsByPlayer = {};

  plays.forEach(play => {
    const batterId = play.batter_id;

    if (!statsByPlayer[batterId]) {
      statsByPlayer[batterId] = {
        at_bats: 0,
        hits: 0,
        doubles: 0,
        triples: 0,
        home_runs: 0,
        rbi: 0,
        walks: 0,
        strikeouts: 0
      };
    }

    const stats = statsByPlayer[batterId];

    // 打数計算（四球、死球は除く）
    if (!['walk', 'hit_by_pitch'].includes(play.play_type)) {
      stats.at_bats++;
    }

    // 安打判定
    if (['single', 'double', 'triple', 'home_run'].includes(play.play_type)) {
      stats.hits++;

      if (play.play_type === 'double') stats.doubles++;
      if (play.play_type === 'triple') stats.triples++;
      if (play.play_type === 'home_run') stats.home_runs++;
    }

    // その他の成績
    stats.rbi += play.rbi;
    if (play.play_type === 'walk') stats.walks++;
    if (play.play_type === 'strikeout') stats.strikeouts++;
  });

  // 3. 試合日から該当シーズンを取得
  const game = await db.query(
    'SELECT game_date FROM games WHERE id = $1',
    [gameId]
  );
  const season = new Date(game.rows[0].game_date).getFullYear();

  // 4. player_statsテーブルを更新（UPSERT）
  for (const [playerId, stats] of Object.entries(statsByPlayer)) {
    // 打率計算
    const battingAverage = stats.at_bats > 0
      ? (stats.hits / stats.at_bats).toFixed(3)
      : null;

    await db.query(`
      INSERT INTO player_stats (
        player_id, season, games_played, at_bats, hits,
        doubles, triples, home_runs, rbi, walks, strikeouts, batting_average
      )
      VALUES ($1, $2, 1, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (player_id, season)
      DO UPDATE SET
        games_played = player_stats.games_played + 1,
        at_bats = player_stats.at_bats + $3,
        hits = player_stats.hits + $4,
        doubles = player_stats.doubles + $5,
        triples = player_stats.triples + $6,
        home_runs = player_stats.home_runs + $7,
        rbi = player_stats.rbi + $8,
        walks = player_stats.walks + $9,
        strikeouts = player_stats.strikeouts + $10,
        batting_average = (player_stats.hits + $4) / NULLIF(player_stats.at_bats + $3, 0),
        updated_at = NOW()
    `, [
      playerId, season, stats.at_bats, stats.hits,
      stats.doubles, stats.triples, stats.home_runs,
      stats.rbi, stats.walks, stats.strikeouts, battingAverage
    ]);
  }

  console.log(`Stats updated for game ${gameId}`);
}
```

---

## 7. デプロイ・環境設定

### 7.1. ローカル開発環境 (Firebase Emulators)

#### 7.1.1. 起動コマンド
```bash
# Emulators起動（PostgreSQL含む）
firebase emulators:start

# 起動されるサービス
# - Authentication Emulator: http://localhost:9099
# - Data Connect Emulator: http://localhost:9399
# - Cloud Functions Emulator: http://localhost:5001
```

#### 7.1.2. 設定ファイル (`firebase.json`)
```json
{
  "emulators": {
    "auth": {
      "port": 9099
    },
    "dataconnect": {
      "port": 9399
    },
    "functions": {
      "port": 5001
    },
    "ui": {
      "enabled": true,
      "port": 4000
    }
  },
  "dataconnect": {
    "source": "dataconnect"
  }
}
```

### 7.2. 本番環境デプロイ

#### 7.2.1. デプロイ前チェックリスト
- [ ] PostgreSQLスキーマの最終確認
- [ ] GraphQLクエリ・ミューテーションのテスト完了
- [ ] Cloud Functionsの単体テスト通過
- [ ] 認証フローの動作確認
- [ ] フロントエンドのビルド成功

#### 7.2.2. デプロイコマンド
```bash
# すべてデプロイ
firebase deploy

# 個別デプロイ
firebase deploy --only dataconnect  # Data Connect (PostgreSQL)
firebase deploy --only functions    # Cloud Functions
firebase deploy --only hosting      # React アプリ
```

### 7.3. 環境変数設定

#### フロントエンド (`.env`)
```env
REACT_APP_FIREBASE_API_KEY=<your-api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your-auth-domain>
REACT_APP_FIREBASE_PROJECT_ID=<your-project-id>
REACT_APP_DATA_CONNECT_URL=<your-data-connect-endpoint>
```

#### Cloud Functions (`.env.local`)
```env
DATABASE_URL=<postgresql-connection-string>
```

---

## 8. 非機能要件

### 8.1. パフォーマンス
- **ページ読み込み**: 初回3秒以内、2回目以降1秒以内（キャッシュ利用）
- **スコア入力レスポンス**: 300ms以内
- **集計処理**: 試合終了後30秒以内に完了

### 8.2. セキュリティ
- **認証**: Firebase Authenticationによる安全な認証
- **SQLインジェクション対策**: Data Connectのパラメータ化クエリを使用
- **XSS対策**: Reactの自動エスケープ機能を活用
- **CSRF対策**: Firebase SDKのトークン検証

### 8.3. 可用性
- **稼働率**: 99.9%（Firebaseの保証に準拠）
- **バックアップ**: PostgreSQLの自動バックアップ（日次）

### 8.4. CI/CDパイプライン

**参照**: `/docs/CICDtest.md`

#### ビルド＆静的解析フェーズ（Pushごと）
- **ビルド成功確認**（必須）
  - React: `npm run build`
  - Functions: `npm run build`
- **コード品質チェック（Lint）**（必須）
  - ESLint実行
  - TypeScript型チェック
- **単体テスト**（必須）
  - React: Jest + React Testing Library
  - Functions: Jest

#### 結合・E2Eテストフェーズ（Pull Request作成時）
- **結合テスト**（推奨）
  - Data Connect クエリテスト
  - Cloud Functions統合テスト
- **E2Eテスト**（推奨）
  - Playwright によるブラウザ自動化テスト
  - 主要ユーザーフローのテスト
    - ログイン → スタメン登録 → スコア入力 → 試合終了

#### GitHub Actions設定例
```yaml
# .github/workflows/ci.yml
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

      # Reactビルド＆テスト
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

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

### 8.5. セキュリティスキャン

**参照**: `/docs/CICDtest.md`

#### 脆弱性スキャン（SAST）
- **ツール**: CodeQL（GitHub Advanced Security）
- **検出対象**:
  - SQLインジェクション
  - XSS
  - パスワード・APIキーのハードコード
  - 不適切な認証処理

#### 依存関係スキャン（SCA）
- **ツール**: npm audit, Dependabot
- **実行タイミング**: Pushごと、週次
- **対応**:
  - Critical/High脆弱性は即座に対応
  - 自動PRによる依存関係更新

#### 実装例（GitHub Actions）
```yaml
# .github/workflows/security.yml
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

      - name: Initialize CodeQL
        uses: github/codeql-action/init@v2
        with:
          languages: javascript, typescript

      - name: Perform CodeQL Analysis
        uses: github/codeql-action/analyze@v2
```

---

## 9. FinOps（コスト管理）

**参照**: `/docs/FinOps.md`

### 9.1. コスト管理の原則

#### 核心となる課題
クラウドサービスは複数チーム・複数プロジェクトで共有されるため、「誰が」「何の目的で」「どれだけ」リソースを使っているかが不明瞭になりがち。これにより、無駄なコストが放置される「ブラックボックス」状態に陥る。

#### 解決策：利用状況の帰属（Usage Attribution）
すべてのリソースに**標準化されたタグ（ラベル）**を付与し、コストの「持ち主」を明確にする。

### 9.2. リソースタグ付け戦略

#### 必須タグ
すべてのFirebaseリソースに以下のタグを付与：

| タグキー | 説明 | 例 |
|---------|------|-----|
| **team** | 担当チーム | `baseball-ops`, `dev-team` |
| **project** | プロジェクト名 | `playlink`, `scoreboard` |
| **env** | 環境 | `production`, `staging`, `development` |
| **owner** | 責任者メールアドレス | `manager@example.com` |
| **cost-center** | コストセンター | `product`, `marketing` |

#### 実装例（Terraformでのリソース定義）
```hcl
resource "google_firebase_project" "playlink" {
  project = var.project_id

  labels = {
    team        = "baseball-ops"
    project     = "playlink"
    env         = "production"
    owner       = "manager-example-com"
    cost-center = "product"
  }
}
```

### 9.3. コスト可視化とモニタリング

#### Firebase使用量の監視
- **Firebaseコンソール** > 使用量とお支払い
  - Data Connect: 月間クエリ数、ストレージ使用量
  - Cloud Functions: 呼び出し回数、実行時間
  - Authentication: アクティブユーザー数

#### 予算アラート設定
```bash
# Google Cloud Budgets API
gcloud billing budgets create \
  --billing-account=<BILLING_ACCOUNT_ID> \
  --display-name="PlayLink Production Budget" \
  --budget-amount=10000JPY \
  --threshold-rule=percent=50 \
  --threshold-rule=percent=90 \
  --threshold-rule=percent=100
```

#### コスト最適化チェックリスト
- [ ] 本番環境以外のリソースは業務時間外に停止
- [ ] 終了したプロジェクトのリソースを削除
- [ ] Data Connectのクエリを最適化（N+1問題の解消）
- [ ] Cloud Functionsのメモリ設定を最適化
- [ ] 不要なログの保存期間を短縮

### 9.4. Firebase無料枠の管理

| サービス | 無料枠 | 超過時の対策 |
|---------|-------|------------|
| **Data Connect** | 月間10GBまで | クエリの最適化、キャッシュ活用 |
| **Cloud Functions** | 月間200万回呼び出し | 不要な関数呼び出しの削減 |
| **Authentication** | 無制限（MAU課金） | - |
| **Hosting** | 10GB/月転送 | CDN最適化、画像圧縮 |

#### コスト削減施策
1. **開発環境でのエミュレータ活用**
   - Firebase Emulators を使用して本番リソースを消費しない
2. **クエリの最適化**
   - 不要なフィールドを取得しない
   - ページネーション実装（limit使用）
3. **Cloud Functionsの最適化**
   - タイムアウト設定を適切に
   - メモリ割り当てを最小限に

### 9.5. 期待される成果

タグ付けとモニタリングの徹底により：
1. **可視化（Visibility）**: どのチーム・プロジェクトでコストが発生しているか把握
2. **最適化（Optimization）**: 無駄なリソースを特定・削減
3. **説明責任（Accountability）**: 各チームがコスト意識を持つ

**目標**: Wix社の事例に倣い、コスト50%削減を目指す

---

## 10. 今後の拡張案

### Phase 2
- [ ] モバイルアプリ化（React Native）
- [ ] プッシュ通知機能
- [ ] チャット機能（Firebase Realtime Database）

### Phase 3
- [ ] 動画解析AI連携（打撃フォーム分析）
- [ ] 他チームとの試合調整機能
- [ ] リーグ戦管理機能

---

**以上、プレイリンク設計仕様書 v1.0**
