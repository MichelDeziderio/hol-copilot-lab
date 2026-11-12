import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ContactUsModal from './ContactUsModal';

describe('ContactUsModal', () => {
  it('shows a confirmation and clears the form after submission', () => {
    render(<ContactUsModal onClose={vi.fn()} />);

    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), {
      target: { value: 'Alex' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /email address/i }), {
      target: { value: 'alex@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(screen.getByRole('heading', { name: 'Thank you for your message' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: /name/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: /email address/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: /message/i })).not.toBeInTheDocument();
  });

  it('closes when the Continue button is clicked', () => {
    const onClose = vi.fn();
    render(<ContactUsModal onClose={onClose} />);

    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), {
      target: { value: 'Alex' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /email address/i }), {
      target: { value: 'alex@example.com' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
      target: { value: 'Hello' },
    });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(onClose).toHaveBeenCalledOnce();
  });
});
