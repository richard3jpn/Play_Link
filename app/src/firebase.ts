// Firebase SDK のインポート
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
import { getDataConnect, connectDataConnectEmulator } from 'firebase/data-connect';
import { connectorConfig } from './generated';

// Firebase設定（環境変数から取得）
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// 環境変数チェック
console.log('🔍 Firebase設定チェック:', {
  apiKey: firebaseConfig.apiKey ? '✓' : '✗',
  projectId: firebaseConfig.projectId,
  appId: firebaseConfig.appId ? '✓' : '✗'
});

// Firebase初期化
const app = initializeApp(firebaseConfig);
console.log('✅ Firebase アプリを初期化しました');

// サービスのインスタンスを取得
export const auth = getAuth(app);
export const functions = getFunctions(app);
export const dataConnect = getDataConnect(app, connectorConfig);

// Analytics（ブラウザ環境かつ本番環境のみ）
export let analytics: ReturnType<typeof getAnalytics> | undefined;
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  try {
    analytics = getAnalytics(app);
    console.log('📊 Analytics を初期化しました');
  } catch (error) {
    console.warn('Analytics の初期化をスキップしました:', error);
  }
}

// エミュレーター接続設定（開発環境のみ）
if (process.env.NODE_ENV === 'development') {
  connectDataConnectEmulator(dataConnect, 'localhost', 9399);
  console.log('🔧 Data Connect エミュレーターに接続しました (localhost:9399)');
}

// デフォルトエクスポート
export default app;
