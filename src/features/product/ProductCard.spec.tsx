import { fireEvent, render, screen } from "@testing-library/react";
import { CartContext } from "../../context/cart-context";
import { Product } from "../../types/product.types";
import ProductCard from "./ProductCard";

describe("Product Card", () => {
  const product: Product = {
    id: 1,
    title: "test product",
    price: 9.99,
    category: "electronics",
    description: "lorem ipsum",
    image: "/test",
    rating: {
      count: 100,
      rate: 4,
    },
  };
  it("should render product card with the correct properties", () => {
    render(<ProductCard product={product} />);

    expect(screen.getByText("test product")).toBeVisible();
    expect(screen.getByText("£9.99")).toBeVisible();
    expect(screen.getByTestId("rating")).toBeInTheDocument();

    expect(screen.getByRole("button", { name: "Add to Cart" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Remove" })).toBeVisible();
  });

  it("should fire a dispatch of type add when add to cart button is clicked", () => {
    const dispatchMock = jest.fn();
    const state = {
      category: undefined,
      cart: [],
      quantity: 0,
    };

    const value = { state: state, dispatch: dispatchMock };
    render(
      <CartContext.Provider value={value}>
        <ProductCard product={product} />
      </CartContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(dispatchMock).toHaveBeenCalledWith({
      payload: {
        category: "electronics",
        description: "lorem ipsum",
        id: 1,
        image: "/test",
        price: 9.99,
        rating: { count: 100, rate: 4 },
        title: "test product",
      },
      type: "add",
    });
  });

  it("should fire a dispatch of type remove when remove button is clicked", () => {
    const dispatchMock = jest.fn();
    const state = {
      category: undefined,
      cart: [],
      quantity: 0,
    };

    const value = { state: state, dispatch: dispatchMock };
    render(
      <CartContext.Provider value={value}>
        <ProductCard product={product} />
      </CartContext.Provider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Remove" }));

    expect(dispatchMock).toHaveBeenCalledWith({
      payload: {
        category: "electronics",
        description: "lorem ipsum",
        id: 1,
        image: "/test",
        price: 9.99,
        rating: { count: 100, rate: 4 },
        title: "test product",
      },
      type: "remove",
    });
  });
});
