import Link from "next/link";

import { footerGroups } from "@/data/navigation";
import { Container } from "@/components/ui/Container";

/* ------------------------------------------------------------------ */
/*  Social icons                                                       */
/* ------------------------------------------------------------------ */

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 0-3.64 19.33c-.1-.82-.18-2.1.04-3l1.33-5.63s-.34-.68-.34-1.68c0-1.58.92-2.76 2.06-2.76.97 0 1.44.73 1.44 1.6 0 .98-.62 2.44-.94 3.8-.27 1.13.56 2.05 1.67 2.05 2 0 3.54-2.11 3.54-5.16 0-2.7-1.94-4.58-4.7-4.58-3.2 0-5.08 2.4-5.08 4.88 0 .97.37 2 .84 2.56.09.11.1.21.08.32l-.32 1.28c-.05.2-.16.24-.38.15-1.42-.66-2.3-2.74-2.3-4.4 0-3.58 2.6-6.87 7.5-6.87 3.94 0 7 2.8 7 6.55 0 3.91-2.47 7.06-5.89 7.06-1.15 0-2.23-.6-2.6-1.3l-.71 2.7c-.26 1-.95 2.24-1.42 3A10 10 0 1 0 12 2z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Payment badge placeholders                                         */
/* ------------------------------------------------------------------ */

const paymentMethods = ["Visa", "Mastercard", "Amex", "PayPal", "Apple Pay"];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function Footer() {
  return (
    <footer className="bg-ink pt-14 pb-8 text-white" aria-label="Footer">
      <Container>
        {/* ---- upper grid: brand + link columns ---- */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block text-xl font-semibold tracking-tight transition-opacity hover:opacity-80"
            >
              Loom&nbsp;&amp;&nbsp;Linen
            </Link>

            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              Premium US home-linen essentials designed for everyday comfort
              and elevated living. Crafted with care, delivered to your door.
            </p>

            {/* Social links */}
            <div className="mt-5 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                {group.title}
              </p>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/75 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ---- bottom bar ---- */}
        <div className="mt-12 flex flex-col items-center gap-5 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
          {/* Copyright */}
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} Loom&nbsp;&amp;&nbsp;Linen.
            All&nbsp;rights&nbsp;reserved.
          </p>

          {/* Payment methods */}
          <div className="flex flex-wrap items-center gap-3">
            {paymentMethods.map((m) => (
              <span
                key={m}
                className="rounded border border-white/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/45"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
