import Link from "next/link";

import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
};

/* ------------------------------------------------------------------ */
/*  Tiny helpers                                                       */
/* ------------------------------------------------------------------ */

/** Filled star icon (14 × 14). */
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/** Renders a 5-star row + review count. */
function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-px text-cocoa" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} filled={i < Math.round(rating)} />
        ))}
      </div>
      <span className="text-xs text-stone">({count})</span>
    </div>
  );
}

/** Maps a color name to a CSS-safe swatch colour. */
const swatchMap: Record<string, string> = {
  Ivory: "#FFFFF0",
  Sand: "#D2C6B2",
  Slate: "#6B7B8D",
  Cloud: "#F0F0EC",
  Dune: "#C9B99A",
  Olive: "#808060",
  White: "#FFFFFF",
  Navy: "#1F2D3D",
  Stone: "#7B746A",
  Charcoal: "#3C3C3C",
  Blush: "#E8C4C4",
  Sage: "#B2C2A8",
  Oatmeal: "#D8CCBA",
};

function getSwatchColor(name: string): string {
  return swatchMap[name] ?? "#D5CEC6";
}

/* ------------------------------------------------------------------ */
/*  Card component                                                     */
/* ------------------------------------------------------------------ */

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-oat bg-white transition-[box-shadow,transform] duration-300 hover:shadow-card hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      {/* ---- image area ---- */}
      <Link
        href={`/products/${product.handle}`}
        className="relative block aspect-[3/4] overflow-hidden bg-sand/40"
        tabIndex={-1}
        aria-hidden="true"
      >
        <SafeImage
          src={product.images[0]}
          alt={`${product.title} in ${product.colorOptions[0]}`}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          fallbackSrc="/images/placeholders/product-placeholder.svg"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />

        {/* badges — overlaid top-left */}
        {(hasDiscount || product.badges.length > 0 || !product.availableForSale) && (
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {hasDiscount && (
              <span className="rounded-full bg-cocoa px-2.5 py-1 text-[11px] font-semibold text-white">
                Sale
              </span>
            )}
            {product.badges.slice(0, 1).map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur-sm"
              >
                {badge}
              </span>
            ))}
            {!product.availableForSale && (
              <span className="rounded-full bg-oat px-2.5 py-1 text-[11px] font-semibold text-cocoa">
                Preorder
              </span>
            )}
          </div>
        )}
      </Link>

      {/* ---- details ---- */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Product type */}
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-stone">
          {product.productType}
        </p>

        {/* Title */}
        <h3 className="text-[15px] font-semibold leading-snug text-ink">
          <Link
            href={`/products/${product.handle}`}
            className="after:absolute after:inset-0 group-hover:text-cocoa"
          >
            {product.title}
          </Link>
        </h3>

        {/* Rating */}
        {product.reviewCount > 0 && (
          <StarRating rating={product.rating} count={product.reviewCount} />
        )}

        {/* Spacer pushes price to bottom */}
        <div className="mt-auto" />

        {/* Color swatches */}
        {product.colorOptions.length > 1 && (
          <div className="flex items-center gap-1.5">
            {product.colorOptions.map((color) => (
              <span
                key={color}
                title={color}
                className="h-4 w-4 rounded-full border border-oat"
                style={{ backgroundColor: getSwatchColor(color) }}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className={`text-base font-semibold ${hasDiscount ? "text-cocoa" : "text-ink"}`}>
            {formatCurrency(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-stone line-through">
              {formatCurrency(product.compareAtPrice!)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
