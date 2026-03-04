import { Container } from "@/components/ui/Container";

export default function CollectionLoading() {
  return (
    <section className="section-spacing" aria-busy="true" aria-live="polite">
      <Container>
        <div className="animate-pulse space-y-6">
          <div className="h-64 rounded-2xl bg-oat" />
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="surface-card h-96 p-3">
                <div className="h-64 rounded-xl bg-oat" />
                <div className="mt-4 h-5 w-2/3 rounded bg-oat" />
                <div className="mt-2 h-4 w-full rounded bg-oat" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
