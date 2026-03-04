"use client";

import Link from "next/link";

import { useCart } from "@/components/cart/CartProvider";

export function HeaderCartLink() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center rounded-full p-2 text-ink/70 transition-colors hover:bg-sand hover:text-ink"
      aria-label={`Shopping bag, ${count} ${count === 1 ? "item" : "items"}`}
    >
      {/* Shopping-bag icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      {/* Count badge */}
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-cocoa px-1 text-[10px] font-semibold leading-none text-white motion-safe:animate-badge-pop">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
