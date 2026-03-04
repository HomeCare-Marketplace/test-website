import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { Button } from "@/components/ui/Button";

export function NewsletterSection() {
  return (
    <section className="border-y border-oat bg-sand py-12 md:py-14">
      <FadeIn>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">Newsletter</p>
            <h2 className="mt-2.5 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
              Comfort notes, early access &amp; seasonal offers.
            </h2>
            <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-stone">
              Join our email list for curated bedroom inspiration, product launches, and exclusive promotions.
            </p>
          </div>

          <form className="flex flex-col gap-3 sm:flex-row" aria-label="Newsletter signup">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Enter your email"
              className="field-input"
            />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </Container>
      </FadeIn>
    </section>
  );
}
