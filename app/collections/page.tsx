import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/SafeImage";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getCollectionsGrouped, getFeaturedCollections } from "@/lib/shop";

export default function CollectionsPage() {
  const featuredCollections = getFeaturedCollections();
  const groupedCollections = getCollectionsGrouped();
  const groupOrder: Array<keyof typeof groupedCollections> = ["Sheets", "Layers", "Protection", "Accessories"];

  return (
    <section className="section-spacing">
      <Container>
        <div className="rounded-2xl border border-oat bg-sand p-8 md:p-10">
          <SectionHeading
            eyebrow="Collections"
            title="Shop premium bedding and home-linen collections"
            description="Explore curated categories built around comfort, layering, and bedroom essentials for modern US homes."
          />
        </div>

        <div className="mt-10">
          <SectionHeading
            eyebrow="Featured"
            title="Most-loved collection highlights"
            description="Start with our bestselling categories and discover elevated essentials."
          />

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            {featuredCollections.map((collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.handle}`}
                className="group overflow-hidden rounded-2xl border border-oat bg-white"
              >
                <div className="relative">
                  <SafeImage
                    src={collection.image}
                    alt={collection.title}
                    width={1200}
                    height={820}
                    fallbackSrc="/images/placeholders/collection-placeholder.svg"
                    className="h-64 w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <p className="text-xs uppercase tracking-[0.2em]">Featured</p>
                    <h2 className="mt-1 text-2xl font-semibold">{collection.title}</h2>
                  </div>
                </div>
                <p className="p-5 text-sm text-stone">{collection.description}</p>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 space-y-10">
          {groupOrder.map((groupName) => {
            const groupCollections = groupedCollections[groupName] ?? [];

            if (groupCollections.length === 0) return null;

            return (
              <section key={groupName}>
                <h3 className="text-2xl font-semibold text-ink">{groupName}</h3>
                <div className="mt-5 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {groupCollections.map((collection) => (
                    <Link key={collection.id} href={`/collections/${collection.handle}`} className="group rounded-2xl border border-oat p-3">
                      <div className="overflow-hidden rounded-xl">
                        <SafeImage
                          src={collection.image}
                          alt={collection.title}
                          width={900}
                          height={700}
                          fallbackSrc="/images/placeholders/collection-placeholder.svg"
                          className="h-52 w-full object-cover transition duration-300 group-hover:scale-105"
                        />
                      </div>
                      <h4 className="mt-4 text-lg font-semibold text-ink">{collection.title}</h4>
                      <p className="mt-1 text-sm text-stone">{collection.description}</p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-oat bg-white p-6 text-sm text-stone">
          Looking for specific fabric, size, or product type? Enter any collection to use advanced filters for color,
          material, availability, and more.
        </div>
      </Container>
    </section>
  );
}
