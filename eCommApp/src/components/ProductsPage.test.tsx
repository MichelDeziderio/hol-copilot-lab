import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ProductsPage from './ProductsPage';
import { CartContext } from '../context/CartContext';

const productData = {
  'apple.json': {
    id: 'apple',
    name: 'Apple',
    price: 2.99,
    description: 'Fresh apple',
    image: 'apple.jpg',
    reviews: [],
    inStock: true,
  },
  'grapes.json': {
    id: 'grapes',
    name: 'Grapes',
    price: 3.5,
    description: 'Sweet grapes',
    image: 'grapes.jpg',
    reviews: [],
    inStock: false,
  },
  'orange.json': {
    id: 'orange',
    name: 'Orange',
    price: 1.99,
    description: 'Citrus orange',
    image: 'orange.jpg',
    reviews: [],
    inStock: true,
  },
  'pear.json': {
    id: 'pear',
    name: 'Pear',
    price: 2.25,
    description: 'Juicy pear',
    image: 'pear.jpg',
    reviews: [],
    inStock: true,
  },
};

const renderProductsPage = (addToCart = vi.fn()) =>
  render(
    <MemoryRouter>
      <CartContext.Provider value={{ cartItems: [], addToCart, clearCart: vi.fn() }}>
        <ProductsPage />
      </CartContext.Provider>
    </MemoryRouter>
  );

describe('ProductsPage', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn((input: string | URL | Request) => {
        const file = String(input).split('/').pop();
        const product = productData[file as keyof typeof productData];

        return Promise.resolve({
          ok: true,
          json: async () => product,
        });
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('renders the loading state while products are being fetched', () => {
    let resolveFetch: (value: unknown) => void;
    const deferred = new Promise((resolve) => {
      resolveFetch = resolve;
    });

    vi.stubGlobal(
      'fetch',
      vi.fn(() => deferred as Promise<Response>)
    );

    renderProductsPage();

    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
    resolveFetch!(Promise.resolve({ ok: true, json: async () => productData['apple.json'] }));
  });

  it('loads products and renders their cards', async () => {
    renderProductsPage();

    await waitFor(() => expect(screen.getByText('Apple')).toBeInTheDocument());
    expect(screen.getByText('Our Products')).toBeInTheDocument();
    expect(screen.getByText('Grapes')).toBeInTheDocument();
    expect(screen.getByText('$2.99')).toBeInTheDocument();
    expect(screen.getAllByRole('img')).toHaveLength(4);
  });

  it('adds a product to the cart when the button is clicked', async () => {
    const addToCart = vi.fn();
    renderProductsPage(addToCart);

    await waitFor(() => expect(screen.getByText('Apple')).toBeInTheDocument());
    fireEvent.click(screen.getAllByRole('button', { name: /add to cart/i })[0]);

    expect(addToCart).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Apple',
        price: 2.99,
      })
    );
  });

  it('disables the add-to-cart action for out-of-stock items', async () => {
    renderProductsPage();

    await waitFor(() => expect(screen.getByText('Grapes')).toBeInTheDocument());

    const grapesButton = screen.getAllByRole('button', { name: /out of stock/i })[0];
    expect(grapesButton).toBeDisabled();
  });

  it('opens the review modal and submits a new review', async () => {
    renderProductsPage();

    await waitFor(() => expect(screen.getByText('Apple')).toBeInTheDocument());
    fireEvent.click(screen.getAllByRole('img')[0]);

    expect(screen.getByText('Reviews for Apple')).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText('Your name'), {
      target: { value: 'Maria' },
    });
    fireEvent.change(screen.getByPlaceholderText('Your review'), {
      target: { value: 'Very fresh' },
    });
    fireEvent.click(screen.getByRole('button', { name: /^Submit$/i }));

    await waitFor(() => expect(screen.getByText('Maria')).toBeInTheDocument());
    expect(screen.getByText('Very fresh')).toBeInTheDocument();
  });

  it('handles failed product fetches without crashing', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false })
    );

    renderProductsPage();

    await waitFor(() => expect(screen.getByText('Our Products')).toBeInTheDocument());
    expect(screen.queryByText('Apple')).not.toBeInTheDocument();
  });
});
