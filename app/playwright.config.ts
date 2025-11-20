import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright設定
 *
 * テスト種別:
 * - E2Eテスト: tests/e2e/
 * - 結合テスト: tests/integration/
 * - APIテスト: tests/api/
 */
export default defineConfig({
  testDir: './tests',

  // テストタイムアウト
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },

  // 並列実行設定
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // レポート設定
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    process.env.CI ? ['github'] : ['list']
  ],

  use: {
    // ベースURL (開発サーバー)
    baseURL: 'http://localhost:3000',

    // トレース設定
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    // ブラウザ設定
    headless: !!process.env.CI,
  },

  // プロジェクト設定（複数ブラウザテスト）
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // 開発サーバー設定
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
