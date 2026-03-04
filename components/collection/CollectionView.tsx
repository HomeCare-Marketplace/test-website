"use client";

import { useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { ProductCard } from "@/components/ui/ProductCard";
import { Drawer } from "@/components/ui/Drawer";
import { PillToggle } from "@/components/ui/PillToggle";
import type { Product } from "@/types";

/* ------------------------------------------------------------------ */
/*  Static option data                                                 */
/* ------------------------------------------------------------------ */

type CollectionViewProps = {
  products: Product[];
};

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
] as const;

const priceOptions = [
  { label: "Under $60", value: "0-59" },
  { label: "$60 – $99", value: "60-99" },
  { label: "$100 – $149", value: "100-149" },
  { label: "$150+", value: "150-up" },
] as const;

const availabilityOptions = [
  { label: "In stock", value: "in-stock" },
  { label: "Preorder", value: "preorder" },
] as const;

type SortValue = (typeof sortOptions)[number]["value"];
type PriceValue = (typeof priceOptions)[number]["value"];
type AvailabilityValue = (typeof availabilityOptions)[number]["value"];

/* ------------------------------------------------------------------ */
/*  Param helpers                                                      */
/* ------------------------------------------------------------------ */

function getSortValue(value: string): SortValue {
  return sortOptions.some((option) => option.value === value) ? (value as SortValue) : "featured";
}

function getPriceValue(value: string | null): PriceValue | null {
  if (!value) return null;
  return priceOptions.some((option) => option.value === value) ? (value as PriceValue) : null;
}

function getAvailabilityValue(value: string | null): AvailabilityValue | null {
  if (!value) return null;
  return availabilityOptions.some((option) => option.value === value) ? (value as AvailabilityValue) : null;
}

function matchesPrice(productPrice: number, priceValue: PriceValue | null) {
  if (!priceValue) return true;
  if (priceValue === "0-59") return productPrice <= 59;
  if (priceValue === "60-99") return productPrice >= 60 && productPrice <= 99;
  if (priceValue === "100-149") return productPrice >= 100 && productPrice <= 149;
  return productPrice >= 150;
}

/* ------------------------------------------------------------------ */
/*  SVG icons                                                          */
/* ------------------------------------------------------------------ */

function FilterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="8" y1="12" x2="20" y2="12" />
      <line x1="12" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
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
      className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function CollectionView({ products }: CollectionViewProps) {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const mobileFiltersTriggerRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /* ---- Read URL params ---- */
  const selectedSize = searchParams.get("size");
  const selectedColor = searchParams.get("color");
  const selectedMaterial = searchParams.get("material");
  const selectedType = searchParams.get("type");
  const selectedPrice = getPriceValue(searchParams.get("price"));
  const selectedAvailability = getAvailabilityValue(searchParams.get("availability"));
  const sortBy = getSortValue(searchParams.get("sort") ?? "featured");

  /* ---- Derive facets from products ---- */
  const colors = useMemo(() => Array.from(new Set(products.flatMap((p) => p.colorOptions))), [products]);
  const sizes = useMemo(() => Array.from(new Set(products.flatMap((p) => p.sizeOptions))), [products]);
  const materials = useMemo(() => Array.from(new Set(products.map((p) => p.material))), [products]);
  const productTypes = useMemo(() => Array.from(new Set(products.map((p) => p.productType))), [products]);

  /* ---- URL helpers ---- */
  const updateParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(searchParams.toString());

    if (!value) {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    if (key !== "sort" && !next.get("sort")) {
      next.set("sort", "featured");
    }

    router.replace(next.toString() ? `${pathname}?${next.toString()}` : pathname, { scroll: false });
  };

  const clearAllFilters = () => {
    const next = new URLSearchParams(searchParams.toString());
    ["size", "color", "material", "price", "availability", "type"].forEach((key) => next.delete(key));
    router.replace(next.toString() ? `${pathname}?${next.toString()}` : pathname, { scroll: false });
  };

  /* ---- Filter & sort ---- */
  const filtered = useMemo(() => {
    const visible = products.filter((product) => {
      const sizePass = selectedSize ? product.sizeOptions.includes(selectedSize) : true;
      const colorPass = selectedColor ? product.colorOptions.includes(selectedColor) : true;
      const materialPass = selectedMaterial ? product.material === selectedMaterial : true;
      const typePass = selectedType ? product.productType === selectedType : true;
      const pricePass = matchesPrice(product.price, selectedPrice);
      const availabilityPass =
        selectedAvailability === "in-stock"
          ? product.availableForSale
          : selectedAvailability === "preorder"
            ? !product.availableForSale
            : true;

      return sizePass && colorPass && materialPass && typePass && pricePass && availabilityPass;
    });

    if (sortBy === "price-asc") return [...visible].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...visible].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") return [...visible].sort((a, b) => b.rating - a.rating);

    return visible;
  }, [products, selectedAvailability, selectedColor, selectedMaterial, selectedPrice, selectedSize, selectedType, sortBy]);

  /* ---- Active-filter chips ---- */
  const activeChips = [
    selectedSize ? { key: "size", label: `Size: ${selectedSize}` } : null,
    selectedColor ? { key: "color", label: `Color: ${selectedColor}` } : null,
    selectedMaterial ? { key: "material", label: `Material: ${selectedMaterial}` } : null,
    selectedType ? { key: "type", label: `Type: ${selectedType}` } : null,
    selectedPrice ? { key: "price", label: `Price: ${priceOptions.find((option) => option.value === selectedPrice)?.label}` } : null,
    selectedAvailability
      ? { key: "availability", label: `${availabilityOptions.find((option) => option.value === selectedAvailability)?.label}` }
      : null,
  ].filter((chip): chip is { key: string; label: string } => Boolean(chip));

  const hasActiveFilters = activeChips.length > 0;

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-10">
      {/* ================================================================ */}
      {/*  Desktop sidebar filters                                         */}
      {/* ================================================================ */}
      <aside className="hidden lg:block">
        <div className="sticky top-28">
          <FilterPanel
            colors={colors}
            sizes={sizes}
            materials={materials}
            productTypes={productTypes}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            selectedMaterial={selectedMaterial}
            selectedType={selectedType}
            selectedPrice={selectedPrice}
            selectedAvailability={selectedAvailability}
            onColorChange={(value) => updateParam("color", value)}
            onSizeChange={(value) => updateParam("size", value)}
            onMaterialChange={(value) => updateParam("material", value)}
            onTypeChange={(value) => updateParam("type", value)}
            onPriceChange={(value) => updateParam("price", value)}
            onAvailabilityChange={(value) => updateParam("availability", value)}
            onClear={clearAllFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </aside>

      {/* ================================================================ */}
      {/*  Product grid area                                               */}
      {/* ================================================================ */}
      <div>
        {/* ---- toolbar: mobile filter btn + count + sort ---- */}
        <div className="flex items-center justify-between gap-3 border-b border-oat/60 pb-3">
          <div className="flex items-center gap-3">
            <button
              ref={mobileFiltersTriggerRef}
              type="button"
              className="inline-flex items-center gap-1.5 rounded-full border border-oat px-3.5 py-2 text-sm font-medium text-ink transition-colors hover:border-stone lg:hidden"
              onClick={() => setShowMobileFilters(true)}
              aria-expanded={showMobileFilters}
              aria-controls="collection-filters-panel"
            >
              <FilterIcon />
              Filters
              {hasActiveFilters && (
                <span className="ml-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-cocoa px-1 text-[10px] font-semibold text-white">
                  {activeChips.length}
                </span>
              )}
            </button>

            <p className="text-sm text-stone">
              <span className="font-medium text-ink">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "product" : "products"}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="hidden text-sm text-stone sm:inline">
              Sort by
            </label>
            <select
              id="sort-by"
              className="field-select min-w-[140px] text-sm"
              value={sortBy}
              onChange={(event) => updateParam("sort", getSortValue(event.target.value))}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ---- active-filter chips ---- */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <button
                key={chip.key}
                type="button"
                className="inline-flex items-center gap-1 rounded-full border border-oat bg-sand/60 px-3 py-1 text-xs font-medium text-cocoa transition-colors hover:border-cocoa/40"
                onClick={() => updateParam(chip.key, null)}
                aria-label={`Remove filter ${chip.label}`}
              >
                {chip.label}
                <span aria-hidden="true" className="text-stone">&times;</span>
              </button>
            ))}
            <button
              type="button"
              className="text-xs font-medium text-stone underline underline-offset-2 transition-colors hover:text-ink"
              onClick={clearAllFilters}
            >
              Clear all
            </button>
          </div>
        )}

        {/* ---- product grid ---- */}
        <div className={`${hasActiveFilters ? "mt-5" : "mt-5"} grid gap-4 grid-cols-2 lg:grid-cols-3`}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* ---- empty state ---- */}
        {filtered.length === 0 && (
          <div className="mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-stone">No products match your current filters.</p>
            <button
              type="button"
              className="text-sm font-medium text-cocoa underline underline-offset-2 hover:text-ink"
              onClick={clearAllFilters}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* ================================================================ */}
      {/*  Mobile filter drawer                                            */}
      {/* ================================================================ */}
      <Drawer
        open={showMobileFilters}
        onClose={() => setShowMobileFilters(false)}
        title="Filters"
        labelledById="collection-filters-title"
        contentId="collection-filters-panel"
        returnFocusRef={mobileFiltersTriggerRef}
      >
        <FilterPanel
          colors={colors}
          sizes={sizes}
          materials={materials}
          productTypes={productTypes}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          selectedMaterial={selectedMaterial}
          selectedType={selectedType}
          selectedPrice={selectedPrice}
          selectedAvailability={selectedAvailability}
          onColorChange={(value) => updateParam("color", value)}
          onSizeChange={(value) => updateParam("size", value)}
          onMaterialChange={(value) => updateParam("material", value)}
          onTypeChange={(value) => updateParam("type", value)}
          onPriceChange={(value) => updateParam("price", value)}
          onAvailabilityChange={(value) => updateParam("availability", value)}
          onClear={clearAllFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </Drawer>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Collapsible filter section                                         */
/* ------------------------------------------------------------------ */

function FilterSection({
  title,
  defaultOpen = true,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <fieldset className="border-b border-oat/50 pb-5">
      <button
        type="button"
        className="flex w-full items-center justify-between py-1 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <legend className="text-[13px] font-semibold text-ink">{title}</legend>
        <ChevronIcon open={open} />
      </button>
      {open && <div className="mt-3 flex flex-wrap gap-1.5">{children}</div>}
    </fieldset>
  );
}

/* ------------------------------------------------------------------ */
/*  Filter panel                                                       */
/* ------------------------------------------------------------------ */

type FilterPanelProps = {
  colors: string[];
  sizes: string[];
  materials: string[];
  productTypes: string[];
  selectedColor: string | null;
  selectedSize: string | null;
  selectedMaterial: string | null;
  selectedType: string | null;
  selectedPrice: PriceValue | null;
  selectedAvailability: AvailabilityValue | null;
  onColorChange: (value: string | null) => void;
  onSizeChange: (value: string | null) => void;
  onMaterialChange: (value: string | null) => void;
  onTypeChange: (value: string | null) => void;
  onPriceChange: (value: PriceValue | null) => void;
  onAvailabilityChange: (value: AvailabilityValue | null) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
};

function FilterPanel({
  colors,
  sizes,
  materials,
  productTypes,
  selectedColor,
  selectedSize,
  selectedMaterial,
  selectedType,
  selectedPrice,
  selectedAvailability,
  onColorChange,
  onSizeChange,
  onMaterialChange,
  onTypeChange,
  onPriceChange,
  onAvailabilityChange,
  onClear,
  hasActiveFilters,
}: FilterPanelProps) {
  return (
    <div className="space-y-5">
      <FilterSection title="Color">
        {colors.map((color) => (
          <PillToggle
            key={color}
            label={color}
            size="sm"
            selected={selectedColor === color}
            onClick={() => onColorChange(selectedColor === color ? null : color)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Size">
        {sizes.map((size) => (
          <PillToggle
            key={size}
            label={size}
            size="sm"
            selected={selectedSize === size}
            onClick={() => onSizeChange(selectedSize === size ? null : size)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Material">
        {materials.map((material) => (
          <PillToggle
            key={material}
            label={material}
            size="sm"
            selected={selectedMaterial === material}
            onClick={() => onMaterialChange(selectedMaterial === material ? null : material)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price">
        {priceOptions.map((price) => (
          <PillToggle
            key={price.value}
            label={price.label}
            size="sm"
            selected={selectedPrice === price.value}
            onClick={() => onPriceChange(selectedPrice === price.value ? null : price.value)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Availability" defaultOpen={false}>
        {availabilityOptions.map((option) => (
          <PillToggle
            key={option.value}
            label={option.label}
            size="sm"
            selected={selectedAvailability === option.value}
            onClick={() => onAvailabilityChange(selectedAvailability === option.value ? null : option.value)}
          />
        ))}
      </FilterSection>

      {productTypes.length > 1 && (
        <FilterSection title="Product Type" defaultOpen={false}>
          {productTypes.map((type) => (
            <PillToggle
              key={type}
              label={type}
              size="sm"
              selected={selectedType === type}
              onClick={() => onTypeChange(selectedType === type ? null : type)}
            />
          ))}
        </FilterSection>
      )}

      {hasActiveFilters && (
        <button
          type="button"
          className="w-full rounded-full border border-oat py-2 text-sm font-medium text-ink transition-colors hover:border-stone"
          onClick={onClear}
        >
          Clear all filters
        </button>
      )}
    </div>
  );
}
