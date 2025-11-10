#!/bin/bash

# =====================================================
# Play_Link プロジェクト セットアップスクリプト
# Firebase + React + Cloud Functions 環境構築
# =====================================================

set -e  # エラー時に即座に終了

echo "========================================"
echo "Play_Link セットアップを開始します"
echo "========================================"

# カレントディレクトリ確認
PROJECT_ROOT=$(cd "$(dirname "$0")/.." && pwd)
echo "プロジェクトルート: $PROJECT_ROOT"
cd "$PROJECT_ROOT"

# =====================================================
# 1. Node.js バージョン確認
# =====================================================
echo ""
echo "[1/6] Node.js バージョン確認中..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js がインストールされていません"
    echo "   LTS版（v18以上）をインストールしてください: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
echo "✅ Node.js バージョン: $(node -v)"

if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js v18以上を推奨します（現在: v$NODE_VERSION）"
fi

# =====================================================
# 2. Firebase CLI インストール確認
# =====================================================
echo ""
echo "[2/6] Firebase CLI 確認中..."
if ! command -v firebase &> /dev/null; then
    echo "Firebase CLI がインストールされていません"
    echo "ローカルにインストールします..."
    npm install firebase-tools
    echo "✅ Firebase CLI をローカルにインストールしました"
    echo "   実行時は: npx firebase <コマンド>"
else
    echo "✅ Firebase CLI インストール済み: $(firebase --version)"
fi

# =====================================================
# 3. プロジェクト構造作成
# =====================================================
echo ""
echo "[3/6] プロジェクト構造を作成中..."

mkdir -p app/src
mkdir -p functions/src
mkdir -p firestore

echo "✅ プロジェクト構造を作成しました"

# =====================================================
# 4. React アプリケーション作成
# =====================================================
echo ""
echo "[4/6] React アプリケーション作成中..."

if [ ! -d "app/node_modules" ]; then
    echo "create-react-app で React + TypeScript プロジェクトを作成します..."
    npx --yes create-react-app@latest app --template typescript --use-npm
    echo "✅ React アプリケーションを作成しました"
else
    echo "✅ React アプリケーションは既に存在します"
fi

# =====================================================
# 5. Firebase SDK インストール
# =====================================================
echo ""
echo "[5/6] Firebase SDK インストール中..."

cd "$PROJECT_ROOT/app"
npm install firebase

echo "✅ Firebase SDK をインストールしました"

# =====================================================
# 6. Cloud Functions セットアップ
# =====================================================
echo ""
echo "[6/6] Cloud Functions セットアップ中..."

cd "$PROJECT_ROOT"

if [ ! -f "functions/package.json" ]; then
    echo "Cloud Functions の初期設定を作成します..."

    # functions ディレクトリに移動
    cd functions

    # package.json 作成
    npm init -y

    # Firebase Functions SDK インストール
    npm install firebase-admin firebase-functions@latest
    npm install -D typescript @types/node

    # tsconfig.json 作成
    cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "module": "commonjs",
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "outDir": "lib",
    "sourceMap": true,
    "strict": true,
    "target": "es2017"
  },
  "compileOnSave": true,
  "include": ["src"]
}
EOF

    # サンプル関数作成
    mkdir -p src
    cat > src/index.ts << 'EOF'
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

// サンプル関数
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});
EOF

    echo "✅ Cloud Functions をセットアップしました"
else
    echo "✅ Cloud Functions は既に存在します"
fi

# =====================================================
# 完了メッセージ
# =====================================================
cd "$PROJECT_ROOT"

echo ""
echo "========================================"
echo "✅ セットアップが完了しました！"
echo "========================================"
echo ""
echo "次のステップ:"
echo "1. Firebase プロジェクト作成（Firebase Console）"
echo "2. Firebase ログイン: npx firebase login"
echo "3. Firebase 初期化: npx firebase init"
echo "4. 環境変数設定: app/.env ファイルを作成"
echo ""
echo "詳細は setup/SETUP.md を参照してください"
echo ""
