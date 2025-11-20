import { test, expect } from '@playwright/test';

/**
 * APIテスト: Firebase Data Connect GraphQL API
 *
 * テスト内容:
 * - GraphQL エンドポイントへのアクセス確認
 * - クエリのレスポンス検証
 * - エラーハンドリング確認
 */
test.describe('Data Connect API テスト', () => {
  const DATACONNECT_URL = process.env.DATACONNECT_URL || 'http://localhost:9399';

  test('GraphQLエンドポイントが応答する', async ({ request }) => {
    // シンプルなヘルスチェック
    // Data Connectエミュレータが起動していることを確認
    const response = await request.post(`${DATACONNECT_URL}/graphql`, {
      data: {
        query: `
          query {
            __schema {
              queryType {
                name
              }
            }
          }
        `
      },
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    });

    // エミュレータが起動していない場合はスキップ
    if (response.status() === 404 || response.status() >= 500) {
      test.skip();
      return;
    }

    expect(response.status()).toBe(200);
  });

  test('チーム一覧クエリが正しく動作する', async ({ request }) => {
    const response = await request.post(`${DATACONNECT_URL}/graphql`, {
      data: {
        query: `
          query GetTeams {
            teams {
              id
              name
              slug
            }
          }
        `
      },
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    });

    if (response.status() === 404) {
      test.skip();
      return;
    }

    expect(response.status()).toBe(200);
    const body = await response.json();

    // レスポンスにdataフィールドが含まれることを確認
    expect(body).toHaveProperty('data');
  });

  test('無効なクエリでエラーが返される', async ({ request }) => {
    const response = await request.post(`${DATACONNECT_URL}/graphql`, {
      data: {
        query: `
          query {
            invalidQuery {
              nonExistentField
            }
          }
        `
      },
      headers: {
        'Content-Type': 'application/json',
      },
      failOnStatusCode: false,
    });

    if (response.status() === 404) {
      test.skip();
      return;
    }

    const body = await response.json();

    // エラーが返されることを確認
    expect(body).toHaveProperty('errors');
  });
});
