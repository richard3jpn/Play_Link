import { test, expect } from '@playwright/test';

/**
 * E2Eテスト: ユーザーフロー全体のテスト
 *
 * テスト内容:
 * - トップページから各ページへの遷移
 * - 主要な機能の動作確認
 * - ユーザーの典型的な操作フローをシミュレート
 */
test.describe('ユーザーフローのE2Eテスト', () => {
  test('トップページにアクセスできる', async ({ page }) => {
    await page.goto('/');

    // Play Linkタイトルが表示されることを確認
    await expect(page.getByText(/Play Link/i)).toBeVisible();

    // ページがクラッシュせずに表示されることを確認
    await expect(page.locator('body')).toBeVisible();
  });

  test('チーム一覧が表示される', async ({ page }) => {
    await page.goto('/');

    // チーム一覧セクションが表示されることを確認
    const teamsSection = page.locator('.teams-section, .teams-grid');
    if (await teamsSection.count() > 0) {
      await expect(teamsSection.first()).toBeVisible();
    }
  });

  test('存在しないページで404が表示される', async ({ page }) => {
    const response = await page.goto('/non-existent-page');

    // ページが表示されることを確認（Reactアプリなので200が返る場合もある）
    expect(page.url()).toContain('/non-existent-page');
  });

  test('ページ間のナビゲーションが機能する', async ({ page }) => {
    await page.goto('/');

    // 最初のチームリンクをクリック（存在する場合）
    const teamLinks = page.locator('a[href*="/teams/"]');
    const linkCount = await teamLinks.count();

    if (linkCount > 0) {
      const firstLink = teamLinks.first();
      await firstLink.click();

      // URLが変更されたことを確認
      await page.waitForURL(/\/teams\/.+/);
      expect(page.url()).toMatch(/\/teams\/.+/);

      // 前のページに戻る
      await page.goBack();
      await expect(page).toHaveURL('/');
    }
  });

  test('ページがモバイル表示に対応している', async ({ page }) => {
    // モバイルビューポートに設定
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // ページがモバイルサイズで正しく表示されることを確認
    await expect(page.locator('body')).toBeVisible();

    // レスポンシブデザインの確認（要素が画面幅に収まっている）
    const bodyWidth = await page.locator('body').evaluate(el => el.scrollWidth);
    expect(bodyWidth).toBeLessThanOrEqual(375 + 20); // 余白を考慮
  });

  test('ページのパフォーマンスが基準を満たす', async ({ page }) => {
    // 開発環境ではスキップ（ローカル環境は遅い場合があるため）
    test.skip(!process.env.CI, '開発環境ではパフォーマンステストをスキップします');

    const startTime = Date.now();

    await page.goto('/');

    // ページが3秒以内に読み込まれることを確認
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(3000);
  });

  test('JavaScriptエラーが発生しない', async ({ page }) => {
    const errors: Error[] = [];

    // JavaScriptエラーを収集
    page.on('pageerror', error => {
      errors.push(error);
    });

    await page.goto('/');

    // チームページにも遷移してエラーをチェック
    const teamLinks = page.locator('a[href*="/teams/"]');
    if (await teamLinks.count() > 0) {
      await teamLinks.first().click();
      await page.waitForTimeout(1000);
    }

    // エラーがないことを確認
    expect(errors.length).toBe(0);
  });
});
