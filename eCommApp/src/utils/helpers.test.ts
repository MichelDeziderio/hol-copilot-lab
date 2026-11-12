import { describe, expect, it } from 'vitest';
import { calculateTotal, formatPrice, validateEmail } from './helpers';

describe('helpers', () => {
  it('formats prices in USD', () => {
    expect(formatPrice(12.5)).toBe('$12.50');
    expect(formatPrice(0)).toBe('$0.00');
  });

  it('calculates total from item prices and quantities', () => {
    expect(
      calculateTotal([
        { price: 10, quantity: 2 },
        { price: 5.5, quantity: 3 },
      ])
    ).toBe(10 * 2 + 5.5 * 3);

    expect(calculateTotal([])).toBe(0);
  });

  it('validates email addresses', () => {
    expect(validateEmail('user@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
    expect(validateEmail('')).toBe(false);
    expect(validateEmail('test@domain')).toBe(false);
  });
});
