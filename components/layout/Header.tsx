import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { DesktopNav } from "@/components/navigation/DesktopNav";
import { HeaderCartLink } from "@/components/layout/HeaderCartLink";
import { MobileNavDrawer } from "@/components/navigation/MobileNavDrawer";

/* ------------------------------------------------------------------ */
/*  Inline SVG icon helpers — keeps the header self-contained          */
/* ------------------------------------------------------------------ */
const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

function SearchIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */

/** Shared classes for the round icon buttons in the utility area. */
const utilityBtnClass =
  "inline-flex items-center justify-center rounded-full p-2 text-ink/70 transition-colors hover:bg-sand hover:text-ink";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      {/* thin warm accent line */}
      <div className="h-[2px] bg-gradient-to-r from-oat via-cocoa/20 to-oat" aria-hidden="true" />

      <Container className="grid h-14 grid-cols-[auto_1fr_auto] items-center gap-3 sm:h-16 lg:h-[68px]">
        {/* ---- left: mobile menu + logo ---- */}
        <div className="flex items-center gap-3">
          <MobileNavDrawer />

          <Link
            href="/"
            className="whitespace-nowrap text-[17px] font-semibold uppercase tracking-[0.15em] text-ink transition-colors hover:text-cocoa sm:text-lg"
            aria-label="Loom and Linen home"
          >
            Loom &amp; Linen
          </Link>
        </div>

        {/* ---- center: desktop navigation ---- */}
        <div className="hidden justify-center lg:flex">
          <DesktopNav />
        </div>

        {/* ---- right: utility icons ---- */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          <Link
            href="/search"
            className={`${utilityBtnClass} hidden sm:inline-flex`}
            aria-label="Search products"
          >
            <SearchIcon />
          </Link>

          <Link
            href="/contact"
            className={`${utilityBtnClass} hidden sm:inline-flex`}
            aria-label="Account"
          >
            <UserIcon />
          </Link>

          <HeaderCartLink />
        </div>
      </Container>

      {/* bottom border */}
      <div className="h-px bg-oat/60" aria-hidden="true" />
    </header>
  );
}
