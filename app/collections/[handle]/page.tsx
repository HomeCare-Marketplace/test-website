import { notFound } from "next/navigation";

import { CollectionView } from "@/components/collection/CollectionView";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SafeImage } from "@/components/ui/SafeImage";
import { getCollectionByHandle, getProductsByCollectionHandle } from "@/lib/shop";

type CollectionDetailPageProps = {
  params: Promise<{ handle: string }>;
};

export default async function CollectionDetailPage({ params }: CollectionDetailPageProps) {
  const { handle } = await params;
  const collection = getCollectionByHandle(handle);

  if (!collection) notFound();

  const products = getProductsByCollectionHandle(handle);

  return (
    <section className="section-spacing">
      <Container>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Collections", href: "/collections" }, { label: collection.title }]} />

        <div className="relative mt-6 overflow-hidden rounded-2xl border border-oat">
          <SafeImage
            src={collection.image}
            alt={collection.title}
            width={1500}
            height={680}
            fallbackSrc="/images/placeholders/collection-placeholder.svg"
            className="h-64 w-full object-cover md:h-72"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex items-end p-7 md:p-8">
            <div className="max-w-2xl text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.2em]">Collection</p>
              <h1 className="mt-2 text-3xl font-semibold md:text-4xl">{collection.title}</h1>
              <p className="mt-3 text-sm text-white/90 md:text-base">{collection.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <CollectionView products={products} />
        </div>
      </Container>
    </section>
  );
}
