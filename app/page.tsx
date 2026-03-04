import { FeaturedCollectionsSection } from "@/components/home/FeaturedCollectionsSection";
import { FeaturedProductsSection } from "@/components/home/FeaturedProductsSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PromoAndEditorialSection } from "@/components/home/PromoAndEditorialSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { TrustStrip } from "@/components/home/TrustStrip";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedCollectionsSection />
      <FeaturedProductsSection />
      <TrustStrip />
      <PromoAndEditorialSection />
      <TestimonialsSection />
    </>
  );
}
