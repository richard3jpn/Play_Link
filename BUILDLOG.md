# 🔨 Play_Link ビルドログ

**プロジェクト**: Play_Link（野球クラブ用統合管理アプリ）
**技術スタック**: React + Firebase Data Connect (PostgreSQL) + Cloud Functions

---

## 2025-11-14

### ✅ 完了した作業

#### 1. 設計ドキュメント作成
- **DS.md（設計仕様書）**を作成
  - システムアーキテクチャ定義
  - 完全なデータベース設計（10テーブル）
  - API設計（GraphQL クエリ・ミューテーション）
  - UI/UX設計（LineupBoard、ScoreInput等）
  - 認証・権限設計
  - 自動集計ロジック設計
  - デプロイ・環境設定

#### 2. NEXT_STEPS.md更新
- 旧設計（Firestore）から新設計（PostgreSQL + Data Connect）への移行
- Phase 1〜4の詳細な実装手順を記載
- 開発コマンド早見表を追加
- 参照ドキュメント一覧を整理

#### 3. Data Connect スキーマ実装（Phase 1完了）

**作成ファイル**:

##### `dataconnect/schema/schema.gql`
DS.md 2.2節に基づいて10テーブルを完全実装：
1. `User` - ユーザー情報
2. `Team` - チーム情報
3. `TeamMember` - チームメンバー（中間テーブル）
4. `Player` - 選手名簿
5. `Schedule` - スケジュール
6. `Game` - 試合情報
7. `GameLineup` - スタメン・ベンチ情報
8. `GamePlay` - 一球ごとの記録
9. `PlayerStats` - 選手成績集計（複合主キー: player + season）
10. `Article` - 記事・ブログ

**主な設計ポイント**:
- UUID主キーを使用（`gen_random_uuid()`）
- 外部キー制約でデータ整合性を保証
- `@col`ディレクティブでPostgreSQLカラム名とデータ型を明示
- `@default(expr: "request.time")`でタイムスタンプを自動設定
- `@table(key: [...])`で複合主キーを定義（PlayerStats）

##### `dataconnect/connector/connector.yaml`
- connectorId: `playlink-connector`
- JavaScript SDKの出力先: `../app/src/generated`
- パッケージ名: `@playlink/dataconnect`

##### `dataconnect/connector/queries.gql`
DS.md 3.2節に基づいてクエリを実装：
- **チーム関連**: GetTeamBySlug, GetTeams
- **試合関連**: GetGamesByTeam, GetGameDetail, GetGameLineups, GetGamePlays, GetUpcomingGames
- **選手関連**: GetPlayersByTeam, GetPlayerDetail
- **成績関連**: GetPlayerStats, GetTeamStats
- **記事関連**: GetPublishedArticles, GetArticleDetail, GetAllArticles
- **スケジュール関連**: GetSchedules, GetUpcomingSchedules
- **ユーザー関連**: GetUserProfile, GetTeamMembers

**認証レベル**:
- `@auth(level: PUBLIC)` - 一般公開（HP表示用）
- `@auth(level: USER)` - ログイン必須（管理画面用）

##### `dataconnect/connector/mutations.gql`
DS.md 3.3節に基づいてミューテーションを実装：
- **チーム管理**: CreateTeam, UpdateTeam
- **選手管理**: CreatePlayer, UpdatePlayer, DeactivatePlayer
- **試合管理**: CreateGame, UpdateGame, FinalizeGame, StartGame
- **スタメン登録**: CreateLineupEntry, CreateLineups, UpdateLineup, DeleteLineup
- **スコア入力**: RecordPlay, UpdatePlay, DeletePlay
- **記事管理**: CreateArticle, UpdateArticle, PublishArticle, UnpublishArticle, DeleteArticle
- **スケジュール管理**: CreateSchedule, UpdateSchedule, DeleteSchedule
- **ユーザー管理**: UpdateUserProfile, AddTeamMember, UpdateTeamMemberRole, RemoveTeamMember

#### 4. dataconnect.yaml更新
- `connectorDirs`を`./example`から`./connector`に変更
- PostgreSQL接続設定（CloudSQL: playlink-fdc）
- サービスID: `playlink`
- ロケーション: `us-east4`

---

### 📋 次のステップ（Phase 1継続）

#### 1. Data Connect SDK生成
```bash
cd /home/hiasano/hiasano/myapps/Play_Link
npx firebase dataconnect:sdk:generate --output-dir app/src/generated
```

**生成される内容**:
- TypeScript型定義
- クエリ・ミューテーション関数
- React hooks（useQuery, useMutation）

#### 2. スキーマ検証
```bash
# スキーマ差分確認
npx firebase dataconnect:sql:diff

# スキーマ適用（エミュレータ使用時）
npx firebase dataconnect:sql:migrate
```

---

### 🛠️ 技術的な決定事項

#### PostgreSQL型定義の方針
- 文字列カラムには適切なvarchar制限を設定
  - email: varchar(255)
  - name, title: varchar(100)〜varchar(200)
  - slug: varchar(50)
  - role, status, event_type: varchar(20)〜varchar(30)
- テキストフィールドには TEXT型を使用（content, description等）
- 打率など小数点を含む成績には `decimal(4,3)` を使用
- UUID型を全テーブルの主キーとして採用

#### GraphQLスキーマの構造
- 型名はPascalCase（User, Team, GameLineup等）
- テーブル名はsnake_case（`@table(name: "game_lineups")`）
- カラム名もsnake_case（`@col(name: "uniform_number")`）
- リレーションは型参照で定義（`team: Team!`）
- 外部キーは明示的に定義（`team_id: UUID!`）

#### 認証戦略
- 一般公開エリア（HP）: `@auth(level: PUBLIC)`
- 管理画面: `@auth(level: USER)`
- Firebase Authentication UIDをusers.idと紐づけ

---

### ⚠️ 注意事項・制約

#### Data Connectの仕様
- 複合主キーは`@table(key: [...])`で定義
- デフォルト値は`@default(expr: "...")`で設定
- SQL式は文字列として記述（例: `"gen_random_uuid()"`）
- `request.time`でリクエスト時のタイムスタンプを取得可能

#### グローバルインストール禁止
Agent.mdの方針に従い、以下を厳守：
- ❌ `npm install -g ...`
- ❌ `sudo`
- ✅ `npx`ですべて実行

---

### 📁 プロジェクト構造（現在）

```
/home/hiasano/hiasano/myapps/Play_Link/
├── DS.md                        ← 設計仕様書（新規作成）
├── RDD_postgreSQL.md            ← 要件定義書
├── Agent.md                     ← 開発ガイド
├── NEXT_STEPS.md                ← 次回作業手順（更新済み）
├── BUILDLOG.md                  ← このファイル（新規作成）
├── README.md
├── firebase.json
├── .firebaserc
├── dataconnect/
│   ├── dataconnect.yaml         ← 更新（connectorDirs変更）
│   ├── schema/
│   │   └── schema.gql           ← 完全実装（10テーブル）
│   └── connector/               ← 新規作成
│       ├── connector.yaml       ← 新規作成
│       ├── queries.gql          ← 新規作成（全クエリ定義）
│       └── mutations.gql        ← 新規作成（全ミューテーション定義）
├── app/                         ← Reactフロントエンド
│   └── src/
│       └── generated/           ← SDK生成先（未生成）
└── functions/                   ← Cloud Functions
```

---

### 🎯 残りの作業（Phase 2〜4）

#### Phase 2: フロントエンド実装
- [ ] Firebase初期化コード更新
- [ ] カスタムフック作成（useGames, usePlayers等）
- [ ] LineupBoard コンポーネント実装
- [ ] ScoreInput コンポーネント実装
- [ ] ページコンポーネント作成
- [ ] ルーティング設定

#### Phase 3: Cloud Functions実装
- [ ] PostgreSQL接続設定
- [ ] 自動集計ロジック実装（DS.md 6節）
- [ ] トリガー設定（試合終了時）

#### Phase 4: テスト
- [ ] エミュレータ起動
- [ ] 機能テスト
- [ ] スキーママイグレーション確認

---

## 2025-11-14 (続き)

### ✅ CI/CD・FinOps要件の統合

#### 1. docsディレクトリ作成とファイル整理
- **`/docs/`** ディレクトリを新規作成
- **`/setup/CICDtest.md`** → **`/docs/CICDtest.md`** に移動
- **`/setup/FinOps.md`** → **`/docs/FinOps.md`** に移動

**最終的なディレクトリ構成**:
```
/home/hiasano/hiasano/myapps/Play_Link/
├── DS.md                  ← ルート（設計仕様書）
├── RDD_postgreSQL.md      ← ルート（要件定義書）
├── Agent.md               ← ルート（開発ガイド）
├── NEXT_STEPS.md          ← ルート（作業手順）
├── BUILDLOG.md            ← ルート（このファイル）
├── README.md              ← ルート（概要）
└── docs/                  ← 新規作成
    ├── CICDtest.md        ← CI/CDチェックリスト
    └── FinOps.md          ← コスト管理原則
```

#### 2. DS.mdの更新

**追加セクション**:
- **8.4. CI/CDパイプライン**
  - ビルド＆静的解析フェーズ（Push毎）
  - 結合・E2Eテストフェーズ（PR作成時）
  - GitHub Actions設定例
- **8.5. セキュリティスキャン**
  - 脆弱性スキャン（SAST）: CodeQL
  - 依存関係スキャン（SCA）: npm audit, Dependabot
  - GitHub Actions実装例
- **9. FinOps（コスト管理）** ← 新規セクション
  - 9.1. コスト管理の原則（利用状況の帰属）
  - 9.2. リソースタグ付け戦略（team, project, env, owner, cost-center）
  - 9.3. コスト可視化とモニタリング
  - 9.4. Firebase無料枠の管理
  - 9.5. 期待される成果（コスト50%削減目標）
- **10. 今後の拡張案** ← セクション番号を繰り下げ

#### 3. Agent.mdの更新

**追加セクション**:
- **17. CI/CDベストプラクティス**
  - 17.1. GitHub Actions設定
  - 17.2. テスト戦略（優先順位）
  - 17.3. デプロイ戦略（ブランチ戦略、デプロイフロー）
- **18. FinOps原則（コスト管理）**
  - 18.1. コスト管理の基本（利用状況の帰属）
  - 18.2. Firebase無料枠の管理
  - 18.3. コスト最適化チェックリスト
  - 18.4. コスト監視（予算アラート設定）

#### 4. NEXT_STEPS.mdの更新

**追加セクション**:
- **Phase 5: CI/CDセットアップ（推奨）**
  - ステップ5-1: GitHub Actions設定（`.github/workflows/ci.yml`）
  - ステップ5-2: セキュリティスキャン設定（`.github/workflows/security.yml`）
  - ステップ5-3: E2Eテスト設定（Playwright）
- **Phase 6: FinOps設定（推奨）**
  - ステップ6-1: リソースタグ付け（Firebase Console）
  - ステップ6-2: コスト監視設定（予算アラート）
  - ステップ6-3: 開発環境でエミュレータ徹底
  - ステップ6-4: コスト最適化チェック

---

### 🎯 統合の意図

#### CI/CD要件の統合目的
- **品質保証**: ビルド、Lint、単体テストを自動化
- **セキュリティ**: 脆弱性スキャンを定期実行
- **開発効率**: PR作成時にE2Eテストで主要フローを自動検証

#### FinOps要件の統合目的
- **コスト可視化**: リソースタグ付けでコストの持ち主を明確化
- **コスト最適化**: 無駄なリソースを特定・削減
- **予算管理**: Firebase無料枠の適切な管理と予算アラート設定

**参照ドキュメント**:
- CI/CD: `/docs/CICDtest.md`
- FinOps: `/docs/FinOps.md`

---

### 📊 実装の優先順位（全体）

#### 最優先（Phase 1〜4）
1. ✅ Data Connect スキーマ実装
2. ✅ GraphQL クエリ・ミューテーション定義
3. React コンポーネント実装
4. Cloud Functions（自動集計ロジック）
5. エミュレータでのテスト

#### 推奨（Phase 5〜6）
6. CI/CDセットアップ
   - GitHub Actions（ビルド、Lint、テスト）
   - セキュリティスキャン（npm audit、CodeQL）
7. FinOps設定
   - リソースタグ付け
   - コスト監視・予算アラート

---

## 2025-11-14 (Phase 1 - SDK生成完了)

### ✅ 完了した作業

#### 1. スキーマ・クエリ・ミューテーションのcamelCase修正

**問題点**:
- 初期スキーマがsnake_case（`display_name`, `team_id`等）で記述されていた
- Data ConnectはcamelCase（`displayName`, `teamId`）を要求
- SDK生成時に大量のバリデーションエラーが発生

**修正内容**:

##### `dataconnect/schema/schema.gql`
- すべてのフィールド名をcamelCaseに変更
  - `display_name` → `displayName`
  - `avatar_url` → `avatarUrl`
  - `uniform_number` → `uniformNumber`
  - `is_active` → `isActive`
  - 等、約40箇所のフィールド名を修正
- UUID生成式を修正: `gen_random_uuid()` → `uuidV4()`
- リレーションフィールドから不正な`@col`ディレクティブを削除
  - 例: `linkedGame: Game @col(name: "linked_game_id")` → `linkedGame: Game`

##### `dataconnect/connector/queries.gql`
- すべてのフィールド名をcamelCaseに統一（360行全面書き直し）
- フィルター演算子を修正:
  - `_eq` → `eq`
  - `_in` → `in`
  - `_gte` → `ge` (greater or equal)
  - `_lte` → `le` (less or equal)
- `order_by` → `orderBy`
- テーブル名を修正:
  - `game_lineups` → `gameLineups`
  - `game_plays` → `gamePlays`
  - `player_stats` → `playerStats`
  - `team_members` → `teamMembers`
- 複合主キークエリを修正:
  - `playerStats(where: {...})` → `playerStats(key: { playerId: $playerId, season: $season })`

##### `dataconnect/connector/mutations.gql`
- すべてのフィールド名をcamelCaseに統一（416行全面書き直し）
- Input型名を修正:
  - `GameLineupInsert` → `GameLineup_Data`
- ミューテーション操作名を修正:
  - `game_lineup_insert` → `gameLineup_insert`
  - `game_play_insert` → `gamePlay_insert`
  - `team_member_insert` → `teamMember_insert`
- ミューテーションの戻り値を簡素化（Key型のサブフィールドクエリ制約に対応）

##### `dataconnect/connector/connector.yaml`
- 不要なSDK設定を削除（`kotlinSdk: {}`, `swiftSdk: {}`）
- JavaScript SDKのみを生成するように設定
- outputDirの相対パスを修正: `../app/src/generated` → `../../app/src/generated`

#### 2. Data Connect SDK生成成功

**実行コマンド**:
```bash
cd /home/hiasano/hiasano/myapps/Play_Link
npx firebase dataconnect:sdk:generate
```

**生成結果**:
```
✔  dataconnect: Successfully Generated SDKs for services: playlink
```

**生成されたファイル** (`/home/hiasano/hiasano/myapps/Play_Link/app/src/generated/`):
- `index.d.ts` (46,481 bytes) - TypeScript型定義
- `esm/index.esm.js` (19,080 bytes) - ES Modules版
- `esm/package.json` (17 bytes)
- `index.cjs.js` (21,759 bytes) - CommonJS版
- `package.json` (647 bytes)
- `README.md` (214,457 bytes) - 使用方法ドキュメント
- `.guides/config.json` (236 bytes)
- `.guides/usage.md` (2,148 bytes)
- `.guides/setup.md` (583 bytes)

---

### 🛠️ 技術的な決定事項（追加）

#### Data Connect命名規則
- **GraphQLフィールド名**: camelCase必須
- **PostgreSQLカラム名**: `@col(name: "...")`で明示的にsnake_caseを指定可能
- **フィルター演算子**: アンダースコアなし（`eq`, `ne`, `gt`, `ge`, `lt`, `le`, `in`）
- **複合主キークエリ**: `where`句ではなく`key`句を使用

#### SDK生成の注意点
- `connectorId`はケバブケース（`playlink-connector`）
- JavaScript SDKのみ生成する場合、他のSDK設定（kotlin, swift）は記述しない
- `outputDir`はconnectorディレクトリからの相対パスで指定

---

### 📋 次のステップ（Phase 2: フロントエンド実装）

#### 1. Firebase初期化コード更新
```bash
# app/src/lib/firebase.ts を作成
```

#### 2. カスタムフック作成
- `useGames` - 試合データ取得
- `usePlayers` - 選手データ取得
- `useTeam` - チーム情報取得

#### 3. コンポーネント実装
- `LineupBoard` - スタメン登録UI
- `ScoreInput` - スコア入力UI
- `GameList` - 試合一覧表示

---

## 2025-11-14 (Phase 2 - フロントエンド実装完了)

### ✅ 完了した作業

#### 1. Firebase初期化コード更新

**`app/src/firebase.ts`**:
- Firestoreインポートを削除
- Data Connect SDKをインポート
- `getDataConnect()`でData Connectインスタンスを作成
- 生成されたSDKの`connectorConfig`を使用

#### 2. カスタムフック実装

**`app/src/hooks/useTeam.ts`**:
- `useTeamBySlug` - スラッグでチーム情報取得
- `useTeams` - チーム一覧取得
- `useCreateTeam` - チーム作成
- `useUpdateTeam` - チーム更新

**`app/src/hooks/usePlayers.ts`**:
- `usePlayersByTeam` - チームの選手一覧取得
- `usePlayerDetail` - 選手詳細取得
- `useCreatePlayer` - 選手作成
- `useUpdatePlayer` - 選手更新
- `useDeactivatePlayer` - 選手無効化（論理削除）

**`app/src/hooks/useGames.ts`**:
- `useGamesByTeam` - 試合一覧取得
- `useGameDetail` - 試合詳細取得
- `useGameLineups` - スタメン情報取得
- `useGamePlays` - プレイ記録取得
- `useUpcomingGames` - 次回の試合予定取得
- `useCreateGame` - 試合作成
- `useUpdateGame` - 試合更新
- `useFinalizeGame` - 試合終了
- `useStartGame` - 試合開始

#### 3. コンポーネント実装

**`app/src/components/LineupBoard.tsx`** (約250行):
- スタメン登録ボード
- 1-9番の打順に選手を配置
- 守備位置の指定
- 選手の追加・削除・更新機能
- ベンチメンバー表示
- readOnlyモード対応（試合終了後）

**主な機能**:
```typescript
- handleAssignPlayer() - 選手を打順に配置
- handleRemovePlayer() - 選手を打順から削除
- handleUpdatePosition() - 守備位置を更新
```

**`app/src/components/ScoreInput.tsx`** (約300行):
- スコア入力UI
- イニング・表裏の選択
- 打者・投手の選択
- プレイ種別・結果の入力
- RBI（打点）・得点の記録
- プレイ履歴表示
- readOnlyモード対応

**主な機能**:
```typescript
- handleRecordPlay() - プレイ記録を追加
- handleDeletePlay() - プレイ記録を削除
```

#### 4. ページコンポーネント実装

**`app/src/pages/HomePage.tsx`**:
- チーム一覧表示
- チームカードにロゴと説明を表示
- チームページへのリンク

**`app/src/pages/TeamPage.tsx`**:
- チーム情報表示（ロゴ、名前、説明）
- ナビゲーション（試合一覧、選手名簿、成績、記事）
- 次回の試合予定表示（最大5件）
- 試合カード表示（日付、対戦相手、会場、ステータス）

**`app/src/pages/GamePage.tsx`**:
- 試合詳細情報表示
- タブ切り替え（スタメン / スコア）
- LineupBoardコンポーネント統合
- ScoreInputコンポーネント統合
- 試合ステータスバッジ（試合前/進行中/終了）
- 最終スコア表示（試合終了時）
- 試合映像リンク表示

#### 5. ルーティング設定

**`app/src/App.tsx`**:
```typescript
<Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/teams/:teamSlug" element={<TeamPage />} />
  <Route path="/teams/:teamSlug/games/:gameId" element={<GamePage />} />
</Routes>
```

---

### 📁 プロジェクト構造（Phase 2完了後）

```
/home/hiasano/hiasano/myapps/Play_Link/app/src/
├── firebase.ts                      ← 更新（Data Connect対応）
├── App.tsx                          ← 更新（ルーティング設定）
├── hooks/                           ← 新規作成
│   ├── useTeam.ts                   ← チーム関連フック
│   ├── usePlayers.ts                ← 選手関連フック
│   └── useGames.ts                  ← 試合関連フック
├── components/                      ← 新規作成
│   ├── LineupBoard.tsx              ← スタメン登録ボード
│   └── ScoreInput.tsx               ← スコア入力UI
├── pages/                           ← 新規作成
│   ├── HomePage.tsx                 ← トップページ
│   ├── TeamPage.tsx                 ← チームページ
│   └── GamePage.tsx                 ← 試合詳細ページ
└── generated/                       ← SDK生成（Phase 1）
    ├── index.d.ts
    ├── esm/
    └── ...
```

---

### 🛠️ 実装の特徴

#### TypeScript型安全性
- 生成されたSDKの型定義を完全活用
- すべてのコンポーネントでPropsの型定義
- カスタムフックで適切な型推論

#### React Hooks活用
- `useQuery`でデータ取得
- `useMutation`でデータ更新
- カスタムフックで再利用性を向上

#### コンポーネント設計
- Propsで柔軟性を確保（readOnlyモード等）
- 状態管理はuseStateで局所的に管理
- イベントハンドラーで適切なエラー処理

---

### 📋 次のステップ（Phase 3: Cloud Functions）

#### 1. 自動集計ロジック実装
```bash
cd /home/hiasano/hiasano/myapps/Play_Link/functions
```

#### 2. 成績集計関数
- `aggregatePlayerStats` - 選手成績自動集計
- トリガー: 試合終了時（FinalizeGame mutation）

#### 3. デプロイ設定
```bash
npm run deploy
```

---

**次回作業開始時**: Phase 3（Cloud Functions実装）から継続
