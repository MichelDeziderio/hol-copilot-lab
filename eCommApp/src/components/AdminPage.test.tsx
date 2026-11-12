import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import AdminPage from './AdminPage';

describe('AdminPage', () => {
  it('shows the default inactive sale message', () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/no sale active\./i)).toBeInTheDocument();
  });

  it('applies a valid sale percentage', () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/set sale percent/i), {
      target: { value: '15' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText('All products are 15% off!')).toBeInTheDocument();
  });

  it('shows an error message for invalid input', () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/set sale percent/i), {
      target: { value: 'abc' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a valid number\./i)).toBeInTheDocument();
  });

  it('ends the sale and resets the input to zero', () => {
    render(
      <MemoryRouter>
        <AdminPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/set sale percent/i), {
      target: { value: '25' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    fireEvent.click(screen.getByRole('button', { name: /end sale/i }));

    expect(screen.getByText(/no sale active\./i)).toBeInTheDocument();
    expect(screen.getByLabelText(/set sale percent/i)).toHaveValue('0');
  });
});
