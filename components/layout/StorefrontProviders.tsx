"use client";

import { ReactNode } from "react";

import { CartProvider } from "@/components/cart/CartProvider";

export function StorefrontProviders({ children }: { children: ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}
