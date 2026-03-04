import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCollections } from "@/lib/shop";
import type { Collection } from "@/types";

/* ------------------------------------------------------------------ */
/*  Collection tile                                                    */
/* ------------------------------------------------------------------ */

function CollectionTile({
  collection,
  tall = false,
}: {
  collection: Collection;
  tall?: boolean;
}) {
  return (
    <Link
      href={`/collections/${collection.handle}`}
      className="group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl"
    >
      {/* Image */}
      <div className={`relative w-full ${tall ? "h-[340px] sm:h-[400px]" : "h-[240px] sm:h-[280px]"}`}>
        <SafeImage
          src={collection.image}
          alt={collection.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          fallbackSrc="/images/placeholders/collection-placeholder.svg"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Warm gradient overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* Text overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-white sm:text-xl">
          {collection.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-white/75">
          {collection.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.1em] text-white/80 transition-colors group-hover:text-white">
          Shop now
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={12}
            height={12}
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
        </span>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */

export function FeaturedCollectionsSection() {
  const allCollections = getCollections();

  /* Split into hero pair + rest */
  const hero = allCollections.slice(0, 2);
  const rest = allCollections.slice(2);

  return (
    <section className="py-14 md:py-16">
      <FadeIn>
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Collections"
            title="Shop by category"
            description="Everything your bed needs — from core layers to finishing touches."
          />
          <Link
            href="/collections"
            className="shrink-0 text-sm font-medium text-cocoa transition-colors hover:text-ink"
          >
            View all categories &rarr;
          </Link>
        </div>

        {/* Hero row — 2 large tiles */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {hero.map((c) => (
            <CollectionTile key={c.id} collection={c} tall />
          ))}
        </div>

        {/* Secondary row — remaining tiles in a 2×2 or 4-col grid */}
        {rest.length > 0 && (
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {rest.map((c) => (
              <CollectionTile key={c.id} collection={c} />
            ))}
          </div>
        )}
      </Container>
      </FadeIn>
    </section>
  );
}
