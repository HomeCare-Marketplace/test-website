import { ReactNode } from "react";

import { Container } from "@/components/ui/Container";

type ContentPageProps = {
  title: string;
  intro: string;
  children: ReactNode;
};

export function ContentPage({ title, intro, children }: ContentPageProps) {
  return (
    <section className="section-spacing">
      <Container className="max-w-3xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">Information</p>
        <h1 className="mt-2.5 text-3xl font-semibold tracking-tight text-ink md:text-4xl">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-stone md:text-base md:leading-7">{intro}</p>
        <hr className="mt-8 border-oat" />
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-stone md:text-base md:leading-7 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_p]:mt-2">
          {children}
        </div>
      </Container>
    </section>
  );
}
