import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="py-24 md:py-32">
      <Container className="max-w-xl text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">404</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Page not found</h1>
        <p className="mt-4 text-sm leading-relaxed text-stone">The page you requested does not exist or may have moved.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Button href="/">Go Home</Button>
          <Link href="/collections" className="inline-flex items-center gap-1 text-sm font-medium text-ink underline underline-offset-4 transition-colors hover:text-cocoa">
            Browse Collections
          </Link>
        </div>
      </Container>
    </section>
  );
}
