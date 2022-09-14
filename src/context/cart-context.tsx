import React, { createContext, useContext, useReducer } from "react";
import { CartProduct, CategoryNames, Product } from "../types/product.types";

type Action =
  | { type: "add"; payload: Product }
  | { type: "remove"; payload: Product }
  | { type: "update-category"; payload: CategoryNames };

interface CartState {
  category: CategoryNames | undefined;
  cart: Array<CartProduct>;
  quantity: number;
}

interface CartProviderProps {
  children: React.ReactNode;
}

//Exporting for testing purposes
export const CartContext = createContext<
  { state: CartState; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const cartReducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case "update-category":
      return { ...state, category: action.payload };
    case "add":
      const itemAddIndex = state.cart.findIndex(
        (x) => x.id === action.payload.id
      );
      let newArr;
      if (itemAddIndex === -1) {
        newArr = [...state.cart, { ...action.payload, quantity: 1 }];
      } else {
        newArr = state.cart.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        });
      }
      const quantity = newArr.reduce((acc, product) => {
        return acc + product.quantity;
      }, 0);
      return { ...state, cart: newArr, quantity: quantity };
    case "remove":
      const product = state.cart.find((x) => x.id === action.payload.id);
      if (!product) {
        return state;
      } else {
        let newArr;
        if (product.quantity > 1) {
          newArr = state.cart.map((product) => {
            if (product.id === action.payload.id) {
              return { ...product, quantity: product.quantity - 1 };
            }
            return product;
          });
        } else {
          newArr = state.cart.filter((x) => x.id !== action.payload.id);
        }

        const quantity = newArr.reduce((acc, product) => {
          return acc + product.quantity;
        }, 0);

        return { ...state, cart: newArr, quantity: quantity };
      }
    default:
      return state;
  }
};

export const useCartContext = ():
  | { state: CartState; dispatch: React.Dispatch<Action> }
  | undefined => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, {
    category: undefined,
    cart: [],
    quantity: 0,
  });

  const value = { state, dispatch };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
