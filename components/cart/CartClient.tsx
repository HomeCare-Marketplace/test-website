"use client";

import Link from "next/link";

import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency } from "@/lib/format";
export function CartClient() {
  const { lines, subtotalFormatted, updateQuantity, removeItem, count } = useCart();

  if (lines.length === 0) {
    return (
      <div className="rounded-2xl border border-oat bg-sand/60 px-8 py-14 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-stone/60" aria-hidden="true"><circle cx={8} cy={21} r={1}/><circle cx={19} cy={21} r={1}/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
        <h2 className="mt-5 text-2xl font-semibold text-ink">Your cart is empty</h2>
        <p className="mt-2 text-sm leading-relaxed text-stone">Browse our premium bedding collections to add your first item.</p>
        <p className="mt-2 text-xs text-stone">Free US shipping over $75 &bull; 30-night comfort guarantee</p>
        <Button href="/collections" className="mt-6">
          Shop Collections
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        <p className="text-sm text-stone" aria-live="polite">
          {count} item{count === 1 ? "" : "s"} in cart
        </p>
        {lines.map((line) => (
          <article key={line.id} className="grid gap-4 rounded-2xl border border-oat p-4 sm:grid-cols-[120px_1fr_auto]">
            <SafeImage
              src={line.product.images[0]}
              alt={line.product.title}
              width={240}
              height={240}
              fallbackSrc="/images/placeholders/product-placeholder.svg"
              className="h-28 w-full rounded-xl object-cover"
            />

            <div>
              <Link href={`/products/${line.product.handle}`} className="text-base font-medium text-ink hover:underline">
                {line.product.title}
              </Link>
              <p className="mt-1 text-xs text-stone">Color: {line.selectedOptions.color} · Size: {line.selectedOptions.size}</p>
              <p className="mt-1 text-sm text-stone">{line.product.shortDescription}</p>
              <p className="mt-2 text-sm font-semibold text-ink">{formatCurrency(line.product.price)}</p>
            </div>

            <div className="flex flex-col items-end gap-2">
              <QuantityStepper
                value={line.quantity}
                inputId={`cart-qty-${line.id}`}
                onChange={(next) => updateQuantity(line.id, next)}
              />

              <button
                type="button"
                className="text-xs text-stone underline"
                onClick={() => removeItem(line.id)}
                aria-label={`Remove ${line.product.title} from cart`}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>

      <aside className="h-fit rounded-2xl border border-oat bg-sand/60 p-6">
        <h2 className="text-lg font-semibold text-ink">Order Summary</h2>
        <hr className="mt-3 border-oat" />
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-stone">Subtotal</span>
          <span className="font-semibold text-ink">{subtotalFormatted}</span>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-stone">Shipping and taxes are calculated at checkout.</p>
        <Button className="mt-5 w-full" disabled>
          Checkout Coming Soon
        </Button>
        <p className="mt-3 text-center text-[11px] text-stone">Free US shipping over $75</p>
      </aside>
    </div>
  );
}
