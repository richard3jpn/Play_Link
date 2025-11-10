# プロジェクト README（AI Agent 実行用）

このフォルダ（README だけがある階層）で **AI Agent** に本ドキュメントを読ませ、ユーザが別途渡す「RDD.md(作りたいアプリの説明)」をもとに **React アプリ（TypeScript）** を 0 から自動生成します。

## 基本設定
- **生成先ディレクトリ名**: `app`
- **作成方法**: create-react-app（TypeScript、npx 方式推奨）
- **グローバルインストールや sudo は使わないでください。ホーム配下の設定も変更しないでください。**
- **作業ログは BUILDLOG.md に残してください。ユーザ要求は app-spec.md に保存してください。**

> 重要方針: **ユーザ環境を汚さない**（グローバルインストール禁止・ホーム配下の設定ファイルに変更禁止・sudo 使用禁止）。すべて **現在のプロジェクト配下だけ** で完結させてください。

---

## 1. ゴール
- ユーザの要求に沿った React アプリを、**create-react-app（CRA） + TypeScript** で生成し、初回起動可能な状態で引き渡す。
- 依存関係は **ローカル** にのみインストールし、他プロジェクトへ影響を与えない。
- 実装内容・判断は本フォルダ直下の `BUILDLOG.md` に時系列で簡潔に記録する（コマンド、生成物、採用方針など）。

---

## 2. 想定入力（ユーザから）
- 「作りたいアプリの説明」テキスト（この README と同じ階層でプロンプトとして与えられる）
- 例）機能一覧、対象ユーザ、ページ構成、優先順位、期限、非機能要件（パフォーマンス・アクセシビリティなど）

Agent は、受け取った説明を `app-spec.md` に保存（コピー）し、以降の設計・実装の出発点とする。

---

## 3. 実行前チェック（Agent のやること）
1. **作業ディレクトリを固定**: 現在のフォルダをルートとし、生成物は `./app`（もしくは指示に応じたフォルダ名）以下に作る。
2. **禁止事項を遵守**:
   - `npm i -g ...` / `yarn global add ...` / `pnpm add -g ...` の禁止
   - `sudo` の禁止
   - `~/.zshrc`、`~/.bashrc`、`~/.npmrc` などホーム配下の編集禁止
   - OS やシェルのグローバル設定変更禁止
3. **Node バージョン**: LTS 相当（例: 20 〜 22 系）を想定。必要に応じて `engines` を `package.json` に定義するが、**グローバルなバージョンマネージャの設定変更はしない**。
4. **ログ**: `BUILDLOG.md` を新規作成し、以降のコマンドと結果要約を逐次追記。

---

## 4. プロジェクト生成（2 つの安全パターン）
> どちらのパターンでも**グローバルインストールは不要**で、実行はこのフォルダ内で完結します。

### パターン A: `npx` を使う（推奨）
```bash
# 1) CRA を使って TypeScript テンプレートで新規作成
npx --yes create-react-app@latest app --template typescript --use-npm

# 2) 作成プロジェクトに移動
cd app

# 3) 開発サーバ起動（確認）
npm start
```

### パターン B: `npm init` / `yarn create` / `pnpm dlx` を使う
> ユーザ環境を汚さず、**ローカル実行のみ**で使うこと。
```bash
# npm init（内部的には npx と同様の挙動）
npm init react-app@latest app -- --template typescript --use-npm

# あるいは Yarn（グローバル導入不要の 'create' サブコマンド）
yarn create react-app app --template typescript

# あるいは pnpm（グローバル導入不要の dlx）
pnpm dlx create-react-app@latest app --template typescript
```

> 備考: `--use-npm` を付与すると Yarn 検出時でも npm を使用します。パッケージマネージャは **npm を既定** としてください（環境差異を避けるため）。

---

## 5. 直後のセットアップ（最小構成）
作成された `app` ディレクトリ内で、以下を順に実施:

1. **Git 初期化**（このフォルダ内のみ）
   ```bash
   git init && git add . && git commit -m "chore: bootstrap CRA (TypeScript)"
   ```
2. **Linter / Formatter**（ローカル devDependencies のみ）
   ```bash
   npm i -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin
   ```
   - `.eslintrc.json` と `.prettierrc`、`.editorconfig` を作成
   - `package.json` にスクリプトを追加
     ```json
     {
       "scripts": {
         "lint": "eslint \"src/**/*.{ts,tsx}\"",
         "format": "prettier --write ."
       }
     }
     ```
3. **ルーティング**（`react-router-dom` v6 以降）
   ```bash
   npm i react-router-dom
   ```
   - `src/main.tsx` / `src/index.tsx` に `BrowserRouter` を適用
   - `src/routes` 配下にページを分割
4. **絶対インポート / パスエイリアス**
   - `tsconfig.json` に `baseUrl: "src"` を設定（または `paths` を設定）
5. **環境変数**
   - CRA では `REACT_APP_` プレフィックスのみ参照可。
   - `.env.example` を作成し、**機密値は入れず**にキーだけ定義（`.env` は `.gitignore` 済みの想定）。
6. **アクセシビリティ/国際化の下準備**
   - 主要コンポーネントに `aria-*` を付与
   - 文言は `src/locales` へ分離可能な設計にしておく

---

## 6. アプリ実装の進め方（要求からコードへ）
1. `app-spec.md` へ要求を転記 → **機能一覧 / 画面 / 状態 / API** を見出しで整理
2. **スコープ確定**: MVP（初回引き渡し）に含める/含めないを `BUILDLOG.md` に明記
3. **ページ雛形**: Home / NotFound をまず作成し、Router を接続
4. **設計**: コンポーネント分割・型（`types/`）・状態管理（まずは React hooks + Context）
5. **ダミーデータ / API 層**: `services/` にフェイク実装（後から実 API に差し替え）
6. **UI**: シンプルな CSS（CRA の CSS Modules or plain CSS）。外部 UI ライブラリは**最小限**
7. **テスト**: CRA 付属の Jest + React Testing Library を使用。代表的ユースケースを 1〜2 本追加
8. **ビルドテスト**: `npm run build` で本番ビルドが正常に完了することを確認
9. **手動確認**: `npm start` で最小動作を担保
10. **コミット**: 意味単位で小さくコミット（`feat: ...` / `fix: ...` / `chore: ...`）

---

## 7. 必須検証手順（完成前に必ず実行）
1. **ビルドテスト**: `cd app && npm run build` で本番ビルドが正常に完了することを確認
2. **開発サーバー起動**: `cd app && npm start` でアプリケーションが正常に起動することを確認
3. **Lintチェック**: `cd app && npm run lint` でコード品質に問題がないことを確認
4. **基本機能テスト**: 作成したアプリケーションの主要機能が動作することを手動確認

## 8. 期待される成果物
- `app/` ディレクトリ（起動可能な React アプリ）
- `app-spec.md`（要求の写し + 抽出した要件）
- `BUILDLOG.md`（時系列ログ: コマンド/判断/差分メモ）
- ESLint/Prettier 設定、`README.app.md`（利用者向け起動手順）

---

## 9. DO / DON'T（品質と安全のガイド）
**DO**
- ローカルのみで完結するコマンドを使用（`npx`, `npm init`, `pnpm dlx`, `yarn create`）
- ロックファイル（`package-lock.json`）をコミット
- 依存追加・スクリプト変更は `BUILDLOG.md` に都度記録

**DON'T**
- グローバルインストール（`-g`）や `sudo` の使用
- ホーム配下や他プロジェクトの設定変更
- 秘密情報のコミット（`.env` の直コミット禁止）

---

## 10. `README.app.md` の雛形（自動生成して配置）
```md
# アプリ名

## 開発
npm start

## Lint / Format
npm run lint
npm run format

## テスト
npm test

## 本番ビルド
npm run build
```

---

## 11. トラブルシュート
- **ポート競合**: `npm start` でポートが使用中 → 別ポートを選択
- **Node バージョン差異**: ビルドエラー時は LTS 範囲へ切替（ただしグローバル設定変更は禁止。CI やエディタでの切替はプロジェクト単位で）
- **依存競合**: 追加ライブラリは最小限に抑え、競合時は代替案を `BUILDLOG.md` に記録
- **ビルドエラー**: `npm run build` でエラーが発生した場合、TypeScriptエラーや依存関係の問題を確認
- **起動エラー**: `npm start` でエラーが発生した場合、appディレクトリに移動してから実行
- **ESLintエラー**: `npm run lint` でコード品質をチェックし、必要に応じて修正

---

# 付録: 生成コマンド早見表
- npx: `npx --yes create-react-app@latest app --template typescript --use-npm`
- npm init: `npm init react-app@latest app -- --template typescript --use-npm`
- yarn: `yarn create react-app app --template typescript`
- pnpm: `pnpm dlx create-react-app@latest app --template typescript`

---




