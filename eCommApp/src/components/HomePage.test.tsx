import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the welcome message and product promotion text', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/welcome to the the daily harvest!/i)).toBeInTheDocument();
    expect(screen.getByText(/check out our products page for some great deals./i)).toBeInTheDocument();
  });
});
