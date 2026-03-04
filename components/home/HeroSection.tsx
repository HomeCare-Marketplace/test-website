import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/SafeImage";
import { siteImages } from "@/data/siteImages";

/* ------------------------------------------------------------------ */
/*  Tiny trust indicators shown beneath the CTA                        */
/* ------------------------------------------------------------------ */
const heroBadges = [
  { icon: "🚚", text: "Free shipping $75+" },
  { icon: "🌙", text: "30-night guarantee" },
  { icon: "✦", text: "Premium materials" },
] as const;

/* ------------------------------------------------------------------ */

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      {/* ---- background image ---- */}
      <div className="absolute inset-0">
        <SafeImage
          src={siteImages.hero.home}
          alt=""
          fill
          sizes="100vw"
          fallbackSrc={siteImages.placeholders.hero}
          className="object-cover object-center"
          priority
        />
        {/* gradient overlay — warm dark sweep from bottom for text legibility */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/40 to-ink/10"
          aria-hidden="true"
        />
      </div>

      {/* ---- content ---- */}
      <div className="relative flex min-h-[520px] items-end sm:min-h-[560px] md:min-h-[600px] lg:min-h-[640px]">
        <Container className="pb-10 pt-32 sm:pb-12 md:pb-14 lg:pb-16">
          <div className="max-w-2xl motion-safe:animate-fade-in">
            {/* Kicker */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
              Premium Home Linen
            </p>

            {/* Headline */}
            <h1 className="mt-3 text-[clamp(1.75rem,5vw,3.25rem)] font-semibold leading-[1.15] tracking-tight text-white">
              Better sleep starts with beautifully made bedding.
            </h1>

            {/* Subheading */}
            <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/75 sm:text-base">
              Elevated sheet sets, duvet covers, comforters &amp; bedroom essentials — crafted for lasting comfort and timeless style.
            </p>

            {/* CTAs */}
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
              <Link
                href="/collections"
                className="inline-flex h-12 items-center justify-center rounded-full bg-white px-7 text-sm font-semibold text-ink shadow-card transition-colors hover:bg-oat focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Shop Collections
              </Link>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/40 px-7 text-sm font-medium text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-ink"
              >
                Our Story
              </Link>
            </div>

            {/* Trust badges */}
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 sm:mt-8">
              {heroBadges.map((badge) => (
                <li
                  key={badge.text}
                  className="flex items-center gap-1.5 text-[12px] tracking-wide text-white/60"
                >
                  <span aria-hidden="true" className="text-[13px]">{badge.icon}</span>
                  {badge.text}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </div>
    </section>
  );
}
