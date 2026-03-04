import { ContentPage } from "@/components/ui/ContentPage";

export default function ShippingPage() {
  return (
    <ContentPage
      title="Shipping Policy"
      intro="We ship throughout the United States with quick fulfillment and transparent delivery timelines."
    >
      <h2>Processing</h2>
      <p>Orders are processed within 1-2 business days.</p>
      <h2>Delivery</h2>
      <p>Standard US delivery typically arrives within 3-6 business days.</p>
      <h2>Costs</h2>
      <p>Free standard shipping on orders over $75. Shipping fees are shown at checkout for smaller orders.</p>
    </ContentPage>
  );
}
