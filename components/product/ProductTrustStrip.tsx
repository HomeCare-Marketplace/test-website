import type { Product } from "@/types";

type ProductTrustStripProps = {
  product: Product;
};

const reassuranceItems = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M15 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.684-.949V8a1 1 0 0 1 1-1h1.382a1 1 0 0 1 .894.553l1.448 2.894A1 1 0 0 0 19.882 11H21a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-1" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></svg>
    ),
    text: "Free US shipping over $75",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
    ),
    text: "30-night comfort guarantee",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></svg>
    ),
    text: "Secure checkout",
  },
];

export function ProductTrustStrip({ product }: ProductTrustStripProps) {
  return (
    <div className="mt-6 rounded-xl border border-oat bg-sand/50 p-4">
      {product.shippingAndReturns && (
        <p className="mb-3 text-sm leading-relaxed text-stone">{product.shippingAndReturns}</p>
      )}
      <ul className="space-y-2">
        {reassuranceItems.map((item) => (
          <li key={item.text} className="flex items-center gap-2.5 text-sm text-ink">
            <span className="flex-shrink-0 text-cocoa">{item.icon}</span>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
