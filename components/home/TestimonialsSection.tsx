import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

/* ------------------------------------------------------------------ */
/*  Star icon                                                          */
/* ------------------------------------------------------------------ */

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-px text-cocoa" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} filled={i < Math.round(rating)} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Aggregate stats (computed from data)                               */
/* ------------------------------------------------------------------ */

const avgRating =
  Math.round((testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length) * 10) / 10;
const totalReviews = 790; // mock total for storefront display

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function TestimonialsSection() {
  return (
    <section className="bg-sand/50 py-14 md:py-16">
      <FadeIn>
      <Container>
        {/* ---- header with aggregate rating ---- */}
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-stone">
            Customer Reviews
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            Loved by comfort-first homes
          </h2>

          {/* Aggregate star strip */}
          <div className="mt-4 inline-flex items-center gap-2">
            <Stars rating={avgRating} />
            <span className="text-sm font-semibold text-ink">{avgRating}</span>
            <span className="text-sm text-stone">based on {totalReviews.toLocaleString()}+ reviews</span>
          </div>
        </div>

        {/* ---- testimonial cards ---- */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <blockquote
              key={item.id}
              className="relative flex flex-col rounded-2xl border border-oat/60 bg-white p-6 transition-shadow duration-300 hover:shadow-card sm:p-7"
            >
              {/* Decorative quote mark */}
              <span
                className="pointer-events-none select-none text-5xl font-serif leading-none text-oat"
                aria-hidden="true"
              >
                &ldquo;
              </span>

              {/* Stars */}
              <div className="mt-1">
                <Stars rating={item.rating} />
              </div>

              {/* Quote */}
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">
                {item.quote}
              </p>

              {/* Attribution */}
              <footer className="mt-5 border-t border-oat/50 pt-4">
                <p className="text-sm font-semibold text-ink">{item.name}</p>
                <p className="mt-0.5 text-xs text-stone">
                  {item.location}
                  {item.product && (
                    <>
                      {" "}&middot;{" "}
                      <span className="italic">{item.product}</span>
                    </>
                  )}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </Container>
      </FadeIn>
    </section>
  );
}