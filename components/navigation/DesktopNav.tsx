import Link from "next/link";

import { navItems } from "@/data/navigation";
import type { NavItem } from "@/types";

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

/** Arrow icon used on highlight links. */
function ArrowRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="transition-transform group-hover/hl:translate-x-0.5"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

/** Full-width mega-menu panel for items with `groups`. */
function MegaMenuPanel({ item }: { item: NavItem }) {
  return (
    <div
      className="invisible absolute left-1/2 top-full z-30 w-[540px] -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none"
      role="menu"
    >
      <div className="rounded-xl border border-oat/80 bg-white p-6 shadow-card">
        <div className="flex gap-10">
          {/* ---- category columns ---- */}
          {item.groups?.map((group) => (
            <div key={group.title} className="min-w-[160px]">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone">
                {group.title}
              </p>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="block text-sm text-ink/80 transition-colors hover:text-cocoa"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* ---- highlight links column ---- */}
          {item.highlights?.length ? (
            <div className="flex min-w-[140px] flex-col justify-end border-l border-oat/60 pl-8">
              {item.highlights.map((hl) => (
                <Link
                  key={hl.label}
                  href={hl.href}
                  className="group/hl mb-2 flex items-center gap-1.5 text-sm font-medium text-cocoa transition-colors hover:text-ink"
                >
                  {hl.label}
                  <ArrowRight />
                </Link>
              ))}

              <Link
                href={item.href}
                className="mt-3 text-xs font-medium text-stone transition-colors hover:text-ink"
              >
                View all →
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/** Simple dropdown for items with flat `children`. */
function SimpleDropdown({ item }: { item: NavItem }) {
  return (
    <div
      className="invisible absolute left-1/2 top-full z-30 -translate-x-1/2 translate-y-1 pt-3 opacity-0 transition-all duration-200 ease-out group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 motion-reduce:transition-none"
      role="menu"
    >
      <div className="w-56 rounded-xl border border-oat/80 bg-white p-4 shadow-card">
        <ul className="space-y-2">
          {item.children?.map((child) => (
            <li key={child.label}>
              <Link
                href={child.href}
                className="block text-sm text-ink/80 transition-colors hover:text-cocoa"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function DesktopNav() {
  return (
    <nav aria-label="Main navigation" className="hidden lg:block">
      <ul className="flex items-center gap-7 text-[13px]">
        {navItems.map((item) => {
          const hasMega = Boolean(item.groups?.length);
          const hasSimple = Boolean(item.children?.length);

          return (
            <li key={item.label} className="group relative">
              <Link
                href={item.href}
                className="relative py-1 font-medium tracking-wide text-ink transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-cocoa after:transition-all after:duration-200 hover:text-cocoa group-hover:after:w-full"
                aria-haspopup={hasMega || hasSimple ? "menu" : undefined}
              >
                {item.label}
              </Link>

              {hasMega && <MegaMenuPanel item={item} />}
              {!hasMega && hasSimple && <SimpleDropdown item={item} />}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
