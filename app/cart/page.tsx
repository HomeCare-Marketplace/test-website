import { CartClient } from "@/components/cart/CartClient";
import { Container } from "@/components/ui/Container";

export default function CartPage() {
  return (
    <section className="section-spacing">
      <Container>
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">Shopping bag</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Your Cart</h1>
        <p className="mt-2 text-sm text-stone">Review your items before checkout.</p>

        <div className="mt-8">
          <CartClient />
        </div>
      </Container>
    </section>
  );
}
