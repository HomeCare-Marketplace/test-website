"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { navItems } from "@/data/navigation";
import { Drawer } from "@/components/ui/Drawer";
import type { NavItem } from "@/types";

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

function HamburgerIcon() {
  return (
    <svg {...iconProps}>
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  );
}

function ChevronRight() {
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
      className="shrink-0 text-stone/60"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg {...iconProps} width={18} height={18}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg {...iconProps} width={18} height={18}>
      <circle cx="12" cy="8" r="4" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared link class — 44 px min tap target                          */
/* ------------------------------------------------------------------ */

const tapLink =
  "flex min-h-[44px] items-center rounded-lg px-2 -mx-2 text-[15px] text-ink/85 transition-colors active:bg-sand/60";

const tapLinkPrimary =
  "flex min-h-[44px] items-center rounded-lg px-2 -mx-2 text-[15px] font-medium text-ink transition-colors active:bg-sand/60";

/* ------------------------------------------------------------------ */
/*  Section renderers                                                  */
/* ------------------------------------------------------------------ */

function Divider() {
  return <div className="my-3 h-px bg-oat/60" aria-hidden="true" />;
}

/** Renders a nav item that has `groups` (mega-menu data). */
function GroupedSection({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <div>
      {/* Section heading link */}
      <Link
        href={item.href}
        className={`${tapLinkPrimary} justify-between`}
        onClick={onNavigate}
      >
        {item.label}
        <ChevronRight />
      </Link>

      {/* Category groups */}
      <div className="mt-1 space-y-4 pl-1">
        {item.groups?.map((group) => (
          <div key={group.title}>
            <p className="mb-1 px-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-stone">
              {group.title}
            </p>
            <ul>
              {group.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={tapLink} onClick={onNavigate}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Highlight links */}
      {item.highlights?.length ? (
        <div className="mt-2 space-y-0 pl-1">
          {item.highlights.map((hl) => (
            <Link
              key={hl.label}
              href={hl.href}
              className="flex min-h-[44px] items-center gap-1.5 rounded-lg px-2 -mx-1 text-[15px] font-medium text-cocoa transition-colors active:bg-sand/60"
              onClick={onNavigate}
            >
              {hl.label}
              <span className="text-cocoa/50" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Renders a nav item that has flat `children`. */
function FlatSection({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  return (
    <div>
      <Link
        href={item.href}
        className={`${tapLinkPrimary} justify-between`}
        onClick={onNavigate}
      >
        {item.label}
        <ChevronRight />
      </Link>
      <ul className="pl-1">
        {item.children?.map((child) => (
          <li key={child.label}>
            <Link href={child.href} className={tapLink} onClick={onNavigate}>
              {child.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        className="-ml-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-sand"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer-panel"
      >
        <HamburgerIcon />
      </button>

      <Drawer
        open={open}
        onClose={close}
        title="Menu"
        labelledById="mobile-nav-drawer-title"
        contentId="mobile-nav-drawer-panel"
        returnFocusRef={triggerRef}
      >
        {/* ---- Primary navigation ---- */}
        <nav aria-label="Mobile navigation">
          {navItems.map((item, i) => {
            const hasMega = Boolean(item.groups?.length);
            const hasFlat = Boolean(item.children?.length);

            return (
              <div key={item.label}>
                {i > 0 && (hasMega || hasFlat) && <Divider />}

                {hasMega ? (
                  <GroupedSection item={item} onNavigate={close} />
                ) : hasFlat ? (
                  <FlatSection item={item} onNavigate={close} />
                ) : (
                  <Link
                    href={item.href}
                    className={tapLinkPrimary}
                    onClick={close}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>

        {/* ---- Utility links (visible only on mobile where header icons hide) ---- */}
        <Divider />
        <div className="flex items-center gap-2">
          <Link
            href="/search"
            className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-oat/80 text-sm text-stone transition-colors active:bg-sand/60"
            onClick={close}
          >
            <SearchIcon />
            Search
          </Link>
          <Link
            href="/contact"
            className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-lg border border-oat/80 text-sm text-stone transition-colors active:bg-sand/60"
            onClick={close}
          >
            <UserIcon />
            Contact
          </Link>
        </div>
      </Drawer>
    </div>
  );
}
