import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Header from './Header';

describe('Header', () => {
  it('renders the brand name and navigation links', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText('The Daily Harvest')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /products/i })).toHaveAttribute('href', '/products');
    expect(screen.getByRole('link', { name: /cart/i })).toHaveAttribute('href', '/cart');
    expect(screen.getByRole('button', { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /admin login/i })).toBeInTheDocument();
  });

  it('opens the Contact Us form from the navigation', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /contact us/i }));

    expect(screen.getByRole('dialog', { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
  });
});
