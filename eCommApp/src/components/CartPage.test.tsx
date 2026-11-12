import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import CartPage from "./CartPage";
import { CartContext, CartItem } from "../context/CartContext";

vi.mock("./Header", () => ({
  default: () => <div data-testid="header">Header</div>,
}));

vi.mock("./Footer", () => ({
  default: () => <div data-testid="footer">Footer</div>,
}));

vi.mock("./CheckoutModal", () => ({
  default: ({
    onConfirm,
    onCancel,
  }: {
    onConfirm: () => void;
    onCancel: () => void;
  }) => (
    <div data-testid="checkout-modal">
      <h2>Are you sure?</h2>
      <p>Do you want to proceed with the checkout?</p>
      <button onClick={onConfirm} data-testid="confirm-checkout">
        Continue Checkout
      </button>
      <button onClick={onCancel} data-testid="cancel-checkout">
        Return to cart
      </button>
    </div>
  ),
}));

const makeItem = (overrides: Partial<CartItem> = {}): CartItem => ({
  id: "1",
  name: "Test Product",
  price: 29.99,
  quantity: 1,
  image: "test-product.jpg",
  reviews: [],
  inStock: true,
  ...overrides,
});

const renderWithCartContext = (cartItems: CartItem[], clearCart = vi.fn()) => {
  const value = {
    cartItems,
    addToCart: vi.fn(),
    clearCart,
  };

  return render(
    <CartContext.Provider value={value}>
      <CartPage />
    </CartContext.Provider>,
  );
};

describe("CartPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("lança erro quando o CartContext não está presente", () => {
    expect(() => render(<CartPage />)).toThrow(
      "CartContext must be used within a CartProvider",
    );
  });

  it("exibe mensagem de carrinho vazio quando não há itens", () => {
    renderWithCartContext([]);

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /checkout/i }),
    ).not.toBeInTheDocument();
  });

  it("renderiza os itens do carrinho e o botão de checkout", () => {
    const items = [
      makeItem({
        id: "1",
        name: "Laptop",
        price: 999.99,
        quantity: 2,
        image: "laptop.jpg",
      }),
      makeItem({
        id: "2",
        name: "Mouse",
        price: 25.5,
        quantity: 1,
        image: "mouse.jpg",
      }),
    ];

    renderWithCartContext(items);

    expect(screen.getByText("Your Cart")).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Mouse")).toBeInTheDocument();
    expect(screen.getByText("Price: $999.99")).toBeInTheDocument();
    expect(screen.getByText("Price: $25.50")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /checkout/i }),
    ).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute(
      "src",
      "products/productImages/laptop.jpg",
    );
    expect(images[1]).toHaveAttribute(
      "src",
      "products/productImages/mouse.jpg",
    );
  });

  it("abre o modal de checkout ao clicar em Checkout", () => {
    renderWithCartContext([
      makeItem({ id: "1", name: "Laptop", price: 999.99, quantity: 1 }),
    ]);

    fireEvent.click(screen.getByRole("button", { name: /checkout/i }));

    expect(screen.getByTestId("checkout-modal")).toBeInTheDocument();
    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(
      screen.getByText("Do you want to proceed with the checkout?"),
    ).toBeInTheDocument();
  });

  it("fecha o modal e não limpa o carrinho ao cancelar o checkout", () => {
    const clearCart = vi.fn();

    renderWithCartContext(
      [makeItem({ id: "1", name: "Laptop", price: 999.99, quantity: 1 })],
      clearCart,
    );

    fireEvent.click(screen.getByRole("button", { name: /checkout/i }));
    fireEvent.click(screen.getByTestId("cancel-checkout"));

    expect(screen.queryByTestId("checkout-modal")).not.toBeInTheDocument();
    expect(clearCart).not.toHaveBeenCalled();
    expect(screen.getByText("Your Cart")).toBeInTheDocument();
  });

  it("processa o pedido ao confirmar o checkout, limpa o carrinho e mostra tela de sucesso", () => {
    const clearCart = vi.fn();
    const items = [
      makeItem({
        id: "1",
        name: "Laptop",
        price: 999.99,
        quantity: 1,
        image: "laptop.jpg",
      }),
      makeItem({
        id: "2",
        name: "Mouse",
        price: 25.5,
        quantity: 2,
        image: "mouse.jpg",
      }),
    ];

    renderWithCartContext(items, clearCart);

    fireEvent.click(screen.getByRole("button", { name: /checkout/i }));
    fireEvent.click(screen.getByTestId("confirm-checkout"));

    expect(clearCart).toHaveBeenCalledTimes(1);
    expect(
      screen.getByText("Your order has been processed!"),
    ).toBeInTheDocument();
    expect(screen.getByText("Laptop")).toBeInTheDocument();
    expect(screen.getByText("Mouse")).toBeInTheDocument();
    expect(screen.getByText("Price: $999.99")).toBeInTheDocument();
    expect(screen.getByText("Price: $25.50")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 1")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 2")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /checkout/i }),
    ).not.toBeInTheDocument();
  });

  it("renderiza Header e Footer em todas as telas", () => {
    renderWithCartContext([
      makeItem({ id: "1", name: "Laptop", price: 999.99, quantity: 1 }),
    ]);

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /checkout/i }));
    fireEvent.click(screen.getByTestId("confirm-checkout"));

    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("não renderiza o carrinho normal após o processamento do pedido", () => {
    const clearCart = vi.fn();
    renderWithCartContext(
      [makeItem({ id: "1", name: "Laptop", price: 50, quantity: 1 })],
      clearCart,
    );

    fireEvent.click(screen.getByRole("button", { name: /checkout/i }));
    fireEvent.click(screen.getByTestId("confirm-checkout"));

    expect(screen.queryByText("Your Cart")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /checkout/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText("Your order has been processed!"),
    ).toBeInTheDocument();
  });

  it("não quebra quando o carrinho contém itens com dados incompletos ou vazios", () => {
    const items = [
      makeItem({
        id: "1",
        name: "Produto sem imagem",
        price: 0,
        quantity: 0,
        image: "",
      }),
      makeItem({
        id: "2",
        name: "Produto com nome longo",
        price: 10.5,
        quantity: 3,
        image: "produto-longo.jpg",
      }),
    ];

    renderWithCartContext(items);

    expect(screen.getByText("Produto sem imagem")).toBeInTheDocument();
    expect(screen.getByText("Produto com nome longo")).toBeInTheDocument();
    expect(screen.getByText("Price: $0.00")).toBeInTheDocument();
    expect(screen.getByText("Price: $10.50")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 0")).toBeInTheDocument();
    expect(screen.getByText("Quantity: 3")).toBeInTheDocument();
  });

  it("não cria múltiplos modais ao abrir o checkout", () => {
    renderWithCartContext([
      makeItem({ id: "1", name: "Laptop", price: 999.99, quantity: 1 }),
    ]);

    fireEvent.click(screen.getByRole("button", { name: /^Checkout$/i }));

    expect(screen.getByTestId("checkout-modal")).toBeInTheDocument();
    expect(screen.getAllByTestId("checkout-modal")).toHaveLength(1);
  });
});
