import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SafeImage } from "@/components/ui/SafeImage";
import { siteImages } from "@/data/siteImages";

export function PromoAndEditorialSection() {
  return (
    <section className="py-14 md:py-16">
      <FadeIn>
      <Container className="space-y-5">
        {/* ============================================================ */}
        {/*  Promo banner — full-width image with overlay CTA            */}
        {/* ============================================================ */}
        <div className="relative isolate overflow-hidden rounded-2xl">
          {/* Background image */}
          <div className="relative aspect-[16/7] sm:aspect-[21/9] lg:aspect-[3/1]">
            <SafeImage
              src={siteImages.hero.promoEditorial}
              alt="Layered neutral bedding with soft natural light"
              fill
              sizes="100vw"
              fallbackSrc={siteImages.placeholders.hero}
              className="object-cover object-center"
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/40 to-transparent"
              aria-hidden="true"
            />
          </div>

          {/* Text content */}
          <div className="absolute inset-0 flex items-center">
            <div className="w-full px-6 sm:px-10 lg:px-12">
              <div className="max-w-md">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70">
                  Seasonal Offer
                </p>
                <h2 className="mt-2 text-2xl font-semibold leading-snug text-white sm:text-3xl lg:text-4xl">
                  Refresh your bedroom for spring.
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">
                  Up to 25% off selected sheet sets and duvet covers — for a limited time.
                </p>
                <Link
                  href="/collections"
                  className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-ink shadow-card transition-colors hover:bg-oat focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink sm:mt-6"
                >
                  Shop Seasonal Picks
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/*  Editorial story — image + text side-by-side                 */}
        {/* ============================================================ */}
        <div className="grid overflow-hidden rounded-2xl border border-oat/60 bg-sand/30 md:grid-cols-2">
          {/* Image */}
          <div className="relative aspect-[4/3] md:aspect-auto">
            <SafeImage
              src={siteImages.hero.promoEditorial}
              alt="Styled bedroom with layered linen bedding"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              fallbackSrc={siteImages.placeholders.hero}
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center px-6 py-8 sm:px-8 sm:py-10 md:px-10 lg:px-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">
              The Loom &amp; Linen Edit
            </p>
            <h3 className="mt-3 text-xl font-semibold leading-snug text-ink sm:text-2xl">
              How to build a hotel-inspired bed at home.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone sm:text-[15px]">
              Learn the layering techniques, fabric pairings, and finishing touches that transform an everyday bed
              into a calm, premium retreat — no interior designer required.
            </p>
            <div className="mt-6">
              <Link
                href="/about"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-cocoa transition-colors hover:text-ink"
              >
                Read the guide
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
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Container>
      </FadeIn>
    </section>
  );
}
