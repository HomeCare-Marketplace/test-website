import { notFound } from "next/navigation";

import { ProductDetailsClient } from "@/components/product/ProductDetailsClient";
import { ProductCard } from "@/components/ui/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { getProductByHandle, getRelatedProducts } from "@/lib/shop";

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export default async function ProductsPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const product = getProductByHandle(handle);

  if (!product) notFound();

  const relatedProducts = getRelatedProducts(handle, product.collectionHandles[0]);

  return (
    <section className="section-spacing">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Collections", href: "/collections" },
            { label: product.title },
          ]}
        />

        <div className="mt-6">
          <ProductDetailsClient product={product} />
        </div>

        <div className="mt-20 pb-24 lg:pb-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">Curated for you</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink">You may also like</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
