import { SearchClient } from "@/components/search/SearchClient";
import { Container } from "@/components/ui/Container";
import { getProducts } from "@/lib/shop";

export default function SearchPage() {
  const products = getProducts();

  return (
    <section className="section-spacing">
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">Catalogue</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Search</h1>
        <p className="mt-2 text-sm text-stone">Find products by type, material, or collection.</p>

        <div className="mt-6">
          <SearchClient products={products} />
        </div>
      </Container>
    </section>
  );
}
