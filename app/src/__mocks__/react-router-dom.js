const React = require('react');

module.exports = {
  BrowserRouter: ({ children }) =>
    React.createElement('div', { 'data-testid': 'router' }, children),
  Routes: ({ children }) =>
    React.createElement('div', { 'data-testid': 'routes' }, children),
  Route: () => null,
  Link: ({ children, to }) =>
    React.createElement('a', { href: to }, children),
  useParams: () => ({}),
  useNavigate: () => jest.fn(),
  useLocation: () => ({ pathname: '/' }),
};
