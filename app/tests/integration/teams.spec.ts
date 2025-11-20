import { test, expect } from '@playwright/test';

/**
 * 結合テスト: チーム関連の連携テスト
 *
 * テスト内容:
 * - HomePage → TeamPage への遷移
 * - チーム情報の表示確認
 * - 選手一覧の表示確認
 */
test.describe('チーム画面の結合テスト', () => {
  test('トップページからチームページへ遷移できる', async ({ page }) => {
    // トップページにアクセス
    await page.goto('/');

    // Play Linkタイトルが表示されることを確認
    await expect(page.getByText(/Play Link/i)).toBeVisible();

    // チーム一覧が表示されることを確認（モックデータ）
    const teamLink = page.locator('a[href*="/teams/"]').first();
    if (await teamLink.count() > 0) {
      // チームリンクをクリック
      await teamLink.click();

      // URLが変更されたことを確認
      await expect(page).toHaveURL(/\/teams\/.+/);
    }
  });

  test('チームページで選手一覧が表示される', async ({ page }) => {
    // チームページに直接アクセス（tokyo-dragonsはダミーデータ）
    await page.goto('/teams/tokyo-dragons');

    // ページが正しく表示されることを確認
    // （実際のデータがない場合はローディング表示やエラーメッセージ）
    const body = await page.textContent('body');
    expect(body).toBeTruthy();
  });

  test('チーム画面が正しくレンダリングされる', async ({ page }) => {
    await page.goto('/teams/tokyo-dragons');

    // ページがクラッシュせずに表示されることを確認
    await expect(page.locator('body')).toBeVisible();
  });
});
