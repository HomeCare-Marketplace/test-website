type ProductAccordionItem = {
  title: string;
  content: string;
};

type ProductAccordionProps = {
  items: ProductAccordionItem[];
};

export function ProductAccordion({ items }: ProductAccordionProps) {
  return (
    <div className="mt-8 divide-y divide-oat/60 border-t border-oat/60">
      {items.map((item, index) => (
        <details key={item.title} className="group" open={index === 0}>
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-sm font-medium text-ink transition-colors hover:text-cocoa [&::-webkit-details-marker]:hidden">
            {item.title}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="flex-shrink-0 text-stone transition-transform duration-200 group-open:rotate-180"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </summary>
          <p className="pb-4 text-sm leading-relaxed text-stone">{item.content}</p>
        </details>
      ))}
    </div>
  );
}
