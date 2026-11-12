import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ReviewModal from './ReviewModal';
import { Product } from '../types';

const product: Product = {
  id: '1',
  name: 'Apple',
  price: 2.99,
  reviews: [
    { author: 'Alice', comment: 'Great fruit', date: '2024-01-01T00:00:00.000Z' },
  ],
  inStock: true,
};

describe('ReviewModal', () => {
  it('returns null when no product is provided', () => {
    const { container } = render(
      <ReviewModal product={null} onClose={vi.fn()} onSubmit={vi.fn()} />
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders existing reviews and empty state when there are no reviews', () => {
    const { rerender } = render(
      <ReviewModal product={product} onClose={vi.fn()} onSubmit={vi.fn()} />
    );

    expect(screen.getByText('Reviews for Apple')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Great fruit')).toBeInTheDocument();

    rerender(
      <ReviewModal product={{ ...product, reviews: [] }} onClose={vi.fn()} onSubmit={vi.fn()} />
    );

    expect(screen.getByText('No reviews yet.')).toBeInTheDocument();
  });

  it('calls onSubmit with the new review data', () => {
    const onSubmit = vi.fn();

    render(<ReviewModal product={product} onClose={vi.fn()} onSubmit={onSubmit} />);

    fireEvent.change(screen.getByPlaceholderText('Your name'), {
      target: { value: 'Bob' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your review'), {
      target: { value: 'Excellent quality' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      author: 'Bob',
      comment: 'Excellent quality',
    });
    expect(onSubmit.mock.calls[0][0].date).toBeTruthy();
  });

  it('calls onClose when the close button or backdrop is clicked', () => {
    const onClose = vi.fn();

    render(<ReviewModal product={product} onClose={onClose} onSubmit={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(onClose).toHaveBeenCalledTimes(1);

    fireEvent.click(screen.getByText('Reviews for Apple').closest('.modal-backdrop')!);
    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
