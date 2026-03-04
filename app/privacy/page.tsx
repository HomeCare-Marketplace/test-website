import { ContentPage } from "@/components/ui/ContentPage";

export default function PrivacyPage() {
  return (
    <ContentPage
      title="Privacy Policy"
      intro="This reference storefront outlines how customer information may be collected and handled."
    >
      <h2>Information we collect</h2>
      <p>Contact information, order details, and browsing behavior needed to provide shopping functionality.</p>
      <h2>How we use information</h2>
      <p>To fulfill orders, improve product experiences, and provide customer support.</p>
      <h2>Your choices</h2>
      <p>You can request access, correction, or deletion of personal data by contacting our support team.</p>
    </ContentPage>
  );
}
