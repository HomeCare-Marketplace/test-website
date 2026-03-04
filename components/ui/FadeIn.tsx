"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type FadeInProps = {
  children: ReactNode;
  /** Extra Tailwind / CSS classes forwarded to the wrapper. */
  className?: string;
  /** Delay in ms before the transition begins (useful for stagger). */
  delay?: number;
};

/**
 * Lightweight viewport-triggered reveal wrapper.
 *
 * Uses IntersectionObserver to fade + slide children into view once.
 * Respects `prefers-reduced-motion` — reduced-motion users see content
 * immediately with no animation.
 */
export function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Instantly reveal for reduced-motion users */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "none" : "translateY(16px)",
        transition: `opacity 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 700ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
