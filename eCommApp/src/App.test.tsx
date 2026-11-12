import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('./components/HomePage', () => ({
  default: () => <div>Home page mock</div>,
}));

vi.mock('./components/ProductsPage', () => ({
  default: () => <div>Products page mock</div>,
}));

vi.mock('./components/LoginPage', () => ({
  default: () => <div>Login page mock</div>,
}));

vi.mock('./components/AdminPage', () => ({
  default: () => <div>Admin page mock</div>,
}));

vi.mock('./components/CartPage', () => ({
  default: () => <div>Cart page mock</div>,
}));

import App from './App';

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([
    ['/', 'Home page mock'],
    ['/products', 'Products page mock'],
    ['/login', 'Login page mock'],
    ['/admin', 'Admin page mock'],
    ['/cart', 'Cart page mock'],
  ])('renders the %s route', (route, expectedText) => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
