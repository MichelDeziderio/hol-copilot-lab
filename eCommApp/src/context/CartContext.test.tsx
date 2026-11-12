import { useContext } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CartContext, CartProvider } from './CartContext';
import { Product } from '../types';

const sampleProduct: Product = {
  id: '1',
  name: 'Apple',
  price: 2.5,
  image: 'apple.jpg',
  reviews: [],
  inStock: true,
};

const CartConsumer = () => {
  const { cartItems, addToCart, clearCart } = useContext(CartContext)!;

  return (
    <div>
      <span data-testid="count">{cartItems.length}</span>
      <span data-testid="quantity">{cartItems[0]?.quantity ?? 0}</span>
      <button onClick={() => addToCart(sampleProduct)}>Add item</button>
      <button onClick={() => clearCart()}>Clear cart</button>
    </div>
  );
};

describe('CartContext', () => {
  it('starts with an empty cart', () => {
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>
    );

    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('quantity')).toHaveTextContent('0');
  });

  it('adds a product to the cart and increases quantity on duplicate add', () => {
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add item' }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('quantity')).toHaveTextContent('1');

    fireEvent.click(screen.getByRole('button', { name: 'Add item' }));
    expect(screen.getByTestId('count')).toHaveTextContent('1');
    expect(screen.getByTestId('quantity')).toHaveTextContent('2');
  });

  it('clears the cart', () => {
    render(
      <CartProvider>
        <CartConsumer />
      </CartProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Add item' }));
    fireEvent.click(screen.getByRole('button', { name: 'Clear cart' }));

    expect(screen.getByTestId('count')).toHaveTextContent('0');
    expect(screen.getByTestId('quantity')).toHaveTextContent('0');
  });
});
