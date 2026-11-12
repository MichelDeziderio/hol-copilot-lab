import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import CheckoutModal from './CheckoutModal';

describe('CheckoutModal', () => {
  it('renders the checkout prompt and action buttons', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    render(<CheckoutModal onConfirm={onConfirm} onCancel={onCancel} />);

    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Do you want to proceed with the checkout?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue checkout/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /return to cart/i })).toBeInTheDocument();
  });

  it('calls the confirm and cancel handlers when buttons are clicked', () => {
    const onConfirm = vi.fn();
    const onCancel = vi.fn();

    render(<CheckoutModal onConfirm={onConfirm} onCancel={onCancel} />);

    fireEvent.click(screen.getByRole('button', { name: /continue checkout/i }));
    fireEvent.click(screen.getByRole('button', { name: /return to cart/i }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
