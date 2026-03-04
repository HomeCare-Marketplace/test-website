import { ContentPage } from "@/components/ui/ContentPage";
import { faqItems } from "@/data/faqs";

export default function FaqPage() {
  return (
    <ContentPage title="Frequently Asked Questions" intro="Quick answers to common shopping, product, and care questions.">
      <div className="divide-y divide-oat/60 border-t border-oat/60">
        {faqItems.map((item, index) => (
          <details key={item.id} className="group" open={index === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-base font-medium text-ink transition-colors hover:text-cocoa [&::-webkit-details-marker]:hidden">
              {item.question}
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-shrink-0 text-stone transition-transform duration-200 group-open:rotate-180"><polyline points="6 9 12 15 18 9" /></svg>
            </summary>
            <p className="pb-4 text-sm leading-relaxed text-stone">{item.answer}</p>
          </details>
        ))}
      </div>
    </ContentPage>
  );
}
