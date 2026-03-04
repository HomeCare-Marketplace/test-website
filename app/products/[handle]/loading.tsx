import { Container } from "@/components/ui/Container";

export default function ProductLoading() {
  return (
    <section className="section-spacing" aria-busy="true" aria-live="polite">
      <Container>
        <div className="animate-pulse grid gap-10 lg:grid-cols-2">
          <div className="h-[560px] rounded-2xl bg-oat" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 rounded bg-oat" />
            <div className="h-4 w-1/3 rounded bg-oat" />
            <div className="h-6 w-1/2 rounded bg-oat" />
            <div className="h-20 rounded bg-oat" />
            <div className="h-12 rounded-full bg-oat" />
          </div>
        </div>
      </Container>
    </section>
  );
}
