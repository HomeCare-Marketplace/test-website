"use client";

import { useMemo, useState } from "react";

import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/Button";
import { PillToggle } from "@/components/ui/PillToggle";
import { QuantityStepper } from "@/components/ui/QuantityStepper";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types";
import { ProductAccordion } from "./ProductAccordion";
import { ProductImageGallery } from "./ProductImageGallery";
import { ProductTrustStrip } from "./ProductTrustStrip";

/* ------------------------------------------------------------------ */
/*  Tiny helpers                                                       */
/* ------------------------------------------------------------------ */

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

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-px text-cocoa">
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < Math.round(rating)} />
      ))}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-shrink-0 text-cocoa"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

type ProductDetailsClientProps = {
  product: Product;
};

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colorOptions[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizeOptions[0]);
  const [quantity, setQuantity] = useState(1);
  const [feedbackText, setFeedbackText] = useState("");

  const accordionItems = [
    { title: "Description", content: product.description },
    { title: "Material", content: product.material },
    { title: "Care Instructions", content: product.careInstructions },
    { title: "Size Guide", content: product.sizeGuide },
    { title: "Shipping & Returns", content: product.shippingAndReturns },
  ];

  const savings = useMemo(() => {
    if (!product.compareAtPrice) return 0;
    return product.compareAtPrice - product.price;
  }, [product.compareAtPrice, product.price]);

  const hasDiscount = savings > 0;

  const handleAddToCart = () => {
    if (!product.availableForSale) return;

    addItem(
      product,
      {
        color: selectedColor,
        size: selectedSize,
      },
      quantity,
    );

    setFeedbackText(`Added ${quantity} item${quantity > 1 ? "s" : ""} to cart`);
    setTimeout(() => setFeedbackText(""), 3000);
  };

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        {/* ---- Gallery ---- */}
        <ProductImageGallery
          title={product.title}
          images={product.images}
          selectedImage={selectedImage}
          onSelectImage={setSelectedImage}
        />

        {/* ---- Buy-box ---- */}
        <div>
          {/* Eyebrow: product type */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">
            {product.productType}
          </p>

          {/* Title */}
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            {product.title}
          </h1>

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div className="mt-2.5 flex items-center gap-2">
              <Stars rating={product.rating} />
              <span className="text-sm text-stone">
                {product.rating} ({product.reviewCount.toLocaleString()})
              </span>
            </div>
          )}

          {/* Price block */}
          <div className="mt-5 flex items-baseline gap-3">
            <p className={`text-2xl font-semibold ${hasDiscount ? "text-cocoa" : "text-ink"}`}>
              {formatCurrency(product.price)}
            </p>
            {product.compareAtPrice ? (
              <p className="text-base text-stone line-through">
                {formatCurrency(product.compareAtPrice)}
              </p>
            ) : null}
            {hasDiscount && (
              <span className="rounded-full bg-cocoa/10 px-2.5 py-0.5 text-xs font-semibold text-cocoa">
                Save {formatCurrency(savings)}
              </span>
            )}
          </div>

          {/* Summary */}
          <p className="mt-4 text-sm leading-relaxed text-stone">{product.summary}</p>

          {/* ---- Divider ---- */}
          <hr className="my-6 border-oat/60" />

          {/* ---- Variant selectors ---- */}
          <div className="space-y-5">
            <OptionRow
              label="Color"
              value={selectedColor}
              options={product.colorOptions}
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
            <OptionRow
              label="Size"
              value={selectedSize}
              options={product.sizeOptions}
              selected={selectedSize}
              onSelect={setSelectedSize}
            />
          </div>

          {/* ---- Quantity + CTA ---- */}
          <div className="mt-6 space-y-4">
            <div className="flex items-end gap-4">
              <div>
                <label className="text-[13px] font-medium text-ink" htmlFor="qty">
                  Quantity
                </label>
                <QuantityStepper value={quantity} onChange={setQuantity} inputId="qty" />
              </div>

              <Button
                className="flex-1"
                disabled={!product.availableForSale}
                onClick={handleAddToCart}
              >
                {product.availableForSale ? "Add to Cart" : "Preorder"}
                {product.availableForSale && (
                  <span className="ml-1.5 text-white/70">
                    &mdash; {formatCurrency(product.price * quantity)}
                  </span>
                )}
              </Button>
            </div>

            {/* Feedback toast */}
            {feedbackText && (
              <div className="flex items-center gap-2 rounded-lg bg-sand px-3 py-2 motion-safe:animate-fade-in-up">
                <CheckIcon />
                <p className="text-xs font-medium text-cocoa">{feedbackText}</p>
              </div>
            )}
          </div>

          {/* ---- Reassurance strip ---- */}
          <ProductTrustStrip product={product} />

          {/* ---- Highlights ---- */}
          {product.productHighlights.length > 0 && (
            <ul className="mt-5 space-y-2">
              {product.productHighlights.slice(0, 4).map((highlight) => (
                <li key={highlight} className="flex items-start gap-2 text-sm text-stone">
                  <CheckIcon />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          )}

          {/* ---- Accordions ---- */}
          <ProductAccordion items={accordionItems} />
        </div>
      </div>

      {/* ================================================================ */}
      {/*  Mobile sticky CTA bar                                           */}
      {/* ================================================================ */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-oat bg-white/95 p-3 shadow-card backdrop-blur-sm lg:hidden motion-safe:animate-fade-in-up">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-2">
          <div className="min-w-0">
            <p className="truncate text-xs text-stone">
              {selectedColor} / {selectedSize}
            </p>
            <p className="text-sm font-semibold text-ink">
              {formatCurrency(product.price)}
              {hasDiscount && (
                <span className="ml-1.5 text-xs font-normal text-stone line-through">
                  {formatCurrency(product.compareAtPrice!)}
                </span>
              )}
            </p>
          </div>
          <Button
            className="flex-shrink-0 px-6"
            disabled={!product.availableForSale}
            onClick={handleAddToCart}
          >
            {product.availableForSale ? "Add to Cart" : "Preorder"}
          </Button>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Variant option row                                                 */
/* ------------------------------------------------------------------ */

type OptionRowProps = {
  label: string;
  value: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

function OptionRow({ label, value, options, selected, onSelect }: OptionRowProps) {
  return (
    <fieldset>
      <legend className="text-[13px] font-medium text-ink">
        {label}
        <span className="ml-1.5 font-normal text-stone">&mdash; {value}</span>
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <PillToggle
            key={option}
            label={option}
            selected={selected === option}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </fieldset>
  );
}
