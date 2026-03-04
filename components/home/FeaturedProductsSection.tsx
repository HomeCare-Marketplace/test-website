import Link from "next/link";

import { ProductCard } from "@/components/ui/ProductCard";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFeaturedProducts } from "@/lib/shop";

export function FeaturedProductsSection() {
  const products = getFeaturedProducts();

  return (
    <section className="bg-sand/40 py-14 md:py-16">
      <FadeIn>
      <Container>
        {/* ---- header row ---- */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Bestsellers"
            title="Customer favorites"
            description="Our most-loved bedding, chosen by thousands for comfort and quality."
          />
          <Link
            href="/collections"
            className="shrink-0 text-sm font-medium text-cocoa transition-colors hover:text-ink"
          >
            Shop all products &rarr;
          </Link>
        </div>

        {/* ---- product grid ---- */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
      </FadeIn>
    </section>
  );
}
