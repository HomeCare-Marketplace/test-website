"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/ui/ProductCard";
import type { Product } from "@/types";

type SearchClientProps = {
  products: Product[];
};

export function SearchClient({ products }: SearchClientProps) {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc" | "rating">("relevance");

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    const filtered = value
      ? products.filter((product) => {
          return (
            product.title.toLowerCase().includes(value) ||
            product.shortDescription.toLowerCase().includes(value) ||
            product.collectionHandles.join(" ").toLowerCase().includes(value)
          );
        })
      : products;

    if (sortBy === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") return [...filtered].sort((a, b) => b.rating - a.rating);

    return filtered;
  }, [products, query, sortBy]);

  const hasSearchText = query.trim().length > 0;

  return (
    <div>
      <label htmlFor="search-input" className="sr-only">
        Search products
      </label>
      <input
        id="search-input"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search sheets, duvet covers, comforters..."
        className="field-input"
      />

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-b border-oat pb-3">
        <p className="text-sm text-stone" aria-live="polite">
          {results.length} product{results.length === 1 ? "" : "s"}{hasSearchText ? " found" : ""}
        </p>
        <div className="flex items-center gap-2">
          <label htmlFor="search-sort" className="text-xs text-stone">
            Sort by
          </label>
          <select
            id="search-sort"
            className="field-select"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as "relevance" | "price-asc" | "price-desc" | "rating")}
          >
            <option value="relevance">Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-oat bg-sand p-8 text-center">
          <h2 className="text-xl font-semibold text-ink">No results found</h2>
          <p className="mt-2 text-sm text-stone">
            {hasSearchText
              ? "Try a different term like “sheets”, “duvet”, or “pillowcases”."
              : "Start with a product type, color, or material to browse results."}
          </p>
          {hasSearchText ? (
            <p className="mt-2 text-xs text-stone">Tip: try broad terms first, then sort by price or rating.</p>
          ) : null}
        </div>
      )}
    </div>
  );
}
