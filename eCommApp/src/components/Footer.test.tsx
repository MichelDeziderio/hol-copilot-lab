import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from './Footer';

describe('Footer', () => {
  it('renders the current year and copyright text', () => {
    render(<Footer />);

    expect(screen.getByText(/© 2025 the daily harvest\. all rights reserved\./i)).toBeInTheDocument();
  });
});
