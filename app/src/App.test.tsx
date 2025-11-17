import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

// useTeamsフックをモック化
jest.mock('./hooks/useTeam', () => ({
  useTeams: () => ({
    data: {
      teams: []
    },
    loading: false,
    error: null
  })
}));

// Firebase初期化をモック化（実際のFirebase接続を回避）
jest.mock('./firebase', () => ({}));

describe('App', () => {
  test('renders without crashing', () => {
    // スモークテスト: Appコンポーネントがクラッシュせずにレンダリングされることを確認
    const { container } = render(<App />);
    expect(container.querySelector('.App')).toBeInTheDocument();
  });

  test('renders router', () => {
    // Routerが正しくレンダリングされることを確認
    const { container } = render(<App />);
    const router = container.querySelector('[data-testid="router"]');
    expect(router).toBeInTheDocument();
  });

  test('does not throw errors during rendering', () => {
    // エラーがスローされないことを確認
    expect(() => {
      render(<App />);
    }).not.toThrow();
  });
});
