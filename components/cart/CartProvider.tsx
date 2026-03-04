"use client";

import { createContext, ReactNode, useContext, useMemo, useReducer } from "react";

import { formatCurrency } from "@/lib/format";
import type { CartLine, CartSelectedOptions, Product } from "@/types";

type CartState = {
  lines: CartLine[];
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  subtotalFormatted: string;
  addItem: (product: Product, selectedOptions: CartSelectedOptions, quantity?: number) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  removeItem: (lineId: string) => void;
  clearCart: () => void;
};

type CartAction =
  | { type: "add"; payload: { product: Product; selectedOptions: CartSelectedOptions; quantity: number } }
  | { type: "update"; payload: { lineId: string; quantity: number } }
  | { type: "remove"; payload: { lineId: string } }
  | { type: "clear" };

const CartContext = createContext<CartContextValue | null>(null);

function getLineId(productId: string, selectedOptions: CartSelectedOptions) {
  return `${productId}:${selectedOptions.color}:${selectedOptions.size}`;
}

function cartReducer(state: CartState, action: CartAction): CartState {
  if (action.type === "add") {
    const { product, selectedOptions, quantity } = action.payload;
    const lineId = getLineId(product.id, selectedOptions);
    const existing = state.lines.find((line) => line.id === lineId);

    if (existing) {
      return {
        lines: state.lines.map((line) =>
          line.id === lineId ? { ...line, quantity: line.quantity + quantity } : line,
        ),
      };
    }

    return {
      lines: [
        ...state.lines,
        {
          id: lineId,
          product,
          quantity,
          selectedOptions,
        },
      ],
    };
  }

  if (action.type === "update") {
    return {
      lines: state.lines.map((line) =>
        line.id === action.payload.lineId
          ? { ...line, quantity: Math.max(1, action.payload.quantity) }
          : line,
      ),
    };
  }

  if (action.type === "remove") {
    return {
      lines: state.lines.filter((line) => line.id !== action.payload.lineId),
    };
  }

  return { lines: [] };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { lines: [] });

  const value = useMemo<CartContextValue>(() => {
    const count = state.lines.reduce((sum, line) => sum + line.quantity, 0);
    const subtotal = state.lines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

    return {
      lines: state.lines,
      count,
      subtotal,
      subtotalFormatted: formatCurrency(subtotal),
      addItem: (product, selectedOptions, quantity = 1) =>
        dispatch({
          type: "add",
          payload: { product, selectedOptions, quantity: Math.max(1, quantity) },
        }),
      updateQuantity: (lineId, quantity) =>
        dispatch({ type: "update", payload: { lineId, quantity } }),
      removeItem: (lineId) => dispatch({ type: "remove", payload: { lineId } }),
      clearCart: () => dispatch({ type: "clear" }),
    };
  }, [state.lines]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
