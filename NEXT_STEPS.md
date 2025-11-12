# 🎯 Play_Link 次回作業内容

**作成日**: 2025-11-10
**プロジェクト**: Play_Link（野球クラブ用統合管理アプリ）

---

## ✅ 今日完了したこと（2025-11-10）

### 1. プロジェクト設計
- ✅ RDD.md（要件定義書）作成
- ✅ Agent.md（AI Agent向け開発ガイド）作成
- ✅ README.md（プロジェクト概要）作成

### 2. 開発環境構築
- ✅ setupディレクトリ作成
  - setup.sh（自動セットアップスクリプト）
  - SETUP.md（セットアップ手順書）

### 3. Firebase環境構築
- ✅ Firebaseプロジェクト作成（PlayLink）
- ✅ Webアプリ登録
- ✅ Firebase SDK設定
  - app/.env（環境変数）
  - app/src/firebase.ts（Firebase初期化コード）
- ✅ Firestore Database作成（テストモード）
- ✅ Authentication有効化
  - メール/パスワード認証
  - Google認証
- ✅ Firebase CLI ログイン
- ✅ Firebase プロジェクト初期化（firebase init）
  - Firestore設定
  - Cloud Functions設定（TypeScript）
  - Hosting設定

### 4. React環境構築
- ✅ create-react-app でプロジェクト作成
- ✅ Firebase SDK インストール
- ✅ 開発サーバー起動確認（http://localhost:3000）

---

## 📋 次回やること

### ステップ1: プロジェクト構造の準備

#### 1-1. ディレクトリ構成作成
```bash
cd /home/hiasano/hiasano/myapps/Play_Link/app/src

# ディレクトリ作成
mkdir -p components pages services types utils hooks
```

**作成するディレクトリ:**
- `components/` - UIコンポーネント
- `pages/` - ページコンポーネント
- `services/` - Firebase連携サービス
- `types/` - TypeScript型定義
- `utils/` - ユーティリティ関数
- `hooks/` - カスタムフック

#### 1-2. React Router のインストール
```bash
cd app
npm install react-router-dom
npm install -D @types/react-router-dom
```

---

### ステップ2: 基本ページの作成

#### 2-1. ページコンポーネント作成

**作成するファイル:**

1. **`app/src/pages/Home.tsx`**（トップページ）
   - お知らせ表示
   - 次回試合予定
   - 最新試合結果

2. **`app/src/pages/Login.tsx`**（ログインページ）
   - メール/パスワードログイン
   - Googleログイン

3. **`app/src/pages/Dashboard.tsx`**（管理画面トップ）
   - ログイン後のホーム画面
   - スケジュール概要
   - お知らせ一覧

4. **`app/src/pages/NotFound.tsx`**（404ページ）

#### 2-2. ルーティング設定

**`app/src/App.tsx`** を編集：
```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

### ステップ3: Firebase認証の実装

#### 3-1. 認証サービス作成

**`app/src/services/authService.ts`**
```typescript
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { auth } from '../firebase';

// メール/パスワードでログイン
export const loginWithEmail = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// メール/パスワードで新規登録
export const registerWithEmail = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Googleでログイン
export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return await signInWithPopup(auth, provider);
};

// ログアウト
export const logout = async () => {
  return await signOut(auth);
};
```

#### 3-2. 認証状態管理（Context）

**`app/src/contexts/AuthContext.tsx`** を作成
- ログイン状態を管理
- 全コンポーネントからアクセス可能

---

### ステップ4: Firestoreデータ操作

#### 4-1. データサービス作成

**`app/src/services/firestoreService.ts`**
```typescript
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

// チーム作成
export const createTeam = async (teamName: string) => {
  const docRef = await addDoc(collection(db, 'teams'), {
    name: teamName,
    createdAt: new Date(),
  });
  return docRef.id;
};

// チーム一覧取得
export const getTeams = async () => {
  const querySnapshot = await getDocs(collection(db, 'teams'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};
```

---

### ステップ5: 基本的なUIスタイリング

#### 5-1. CSSモジュールまたはTailwind CSS導入

**オプション1: CSS Modules（推奨 - 追加設定不要）**
```css
/* app/src/pages/Home.module.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
```

**オプション2: Tailwind CSS**
```bash
cd app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 📚 参考ファイル

### 開発に必要なドキュメント

| ファイル | 内容 | パス |
|---------|------|------|
| **RDD.md** | 要件定義書（全機能仕様） | `/home/hiasano/hiasano/myapps/Play_Link/RDD.md` |
| **Agent.md** | 開発ガイド（コマンド・実装方法） | `/home/hiasano/hiasano/myapps/Play_Link/Agent.md` |
| **SETUP.md** | セットアップ手順 | `/home/hiasano/hiasano/myapps/Play_Link/setup/SETUP.md` |
| **README.md** | プロジェクト概要 | `/home/hiasano/hiasano/myapps/Play_Link/README.md` |

### 設定ファイル

| ファイル | 内容 |
|---------|------|
| **app/.env** | Firebase設定（APIキーなど）|
| **app/src/firebase.ts** | Firebase初期化コード |
| **firebase.json** | Firebase設定ファイル |
| **firestore/firestore.rules** | Firestoreセキュリティルール |

---

## 🔧 開発サーバーの起動方法

### フロントエンド（React）
```bash
cd /home/hiasano/hiasano/myapps/Play_Link/app
npm start
```
→ http://localhost:3000

### Firebaseエミュレータ
```bash
cd /home/hiasano/hiasano/myapps/Play_Link
npx firebase emulators:start
```
→ http://localhost:4050 (エミュレータUI)

---

## ⚠️ 重要な注意事項

### 1. 環境変数の管理
- `.env` ファイルは絶対にGitにコミットしない
- 既に `.gitignore` に追加済み

### 2. 開発サーバー停止
バックグラウンドで動作中の場合：
```bash
# プロセスID確認
ps aux | grep "react-scripts"

# 停止
kill <プロセスID>
```

### 3. Firebase無料枠
- Firestoreは1日50,000読み取りまで無料
- 開発中は無料枠で十分
- 使用量は Firebase Console で確認可能

---

## 📊 開発の進め方

### 推奨の順序

1. **基本構造の作成**（ステップ1-2）
   - ディレクトリ構成
   - ルーティング設定
   - 基本ページ作成

2. **認証機能の実装**（ステップ3）
   - ログイン/ログアウト
   - 認証状態管理

3. **データ操作の実装**（ステップ4）
   - Firestore CRUD操作
   - チーム管理機能

4. **UIの整備**（ステップ5）
   - スタイリング
   - レスポンシブ対応

5. **機能拡張**
   - RDD.mdの各機能を順次実装
   - スコアブック機能
   - 選手管理機能
   - など

---

## 🚀 次回作業開始時のコマンド

```bash
# 1. プロジェクトディレクトリに移動
cd /home/hiasano/hiasano/myapps/Play_Link

# 2. このファイルを確認
cat NEXT_STEPS.md

# 3. 開発サーバー起動
cd app
npm start

# 4. 開発開始！
```

---

## 💡 Tips

- **Agent.md を参照**: Firebase操作のサンプルコードが豊富
- **RDD.md を確認**: 実装すべき機能の詳細仕様
- **小さく始める**: まずはシンプルな機能から実装
- **頻繁にコミット**: 動作確認できたらGitコミット

---

**次回も頑張りましょう！ 🎉**
