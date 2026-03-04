type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">{eyebrow}</p> : null}
      <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-sm leading-7 text-stone md:text-base">{description}</p> : null}
    </div>
  );
}
