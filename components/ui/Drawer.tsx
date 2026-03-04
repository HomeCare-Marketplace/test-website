"use client";

import { ReactNode, RefObject, useEffect, useRef } from "react";

type DrawerProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  labelledById: string;
  contentId?: string;
  returnFocusRef?: RefObject<HTMLElement | null>;
};

const focusableSelector =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** X icon for the close button. */
function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export function Drawer({
  open,
  title,
  onClose,
  children,
  labelledById,
  contentId,
  returnFocusRef,
}: DrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const returnFocusElement = returnFocusRef?.current;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleEscAndTrap = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>(focusableSelector));
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      }
    };

    window.addEventListener("keydown", handleEscAndTrap);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscAndTrap);
      returnFocusElement?.focus();
    };
  }, [onClose, open, returnFocusRef]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none"}`}
      role="dialog"
      aria-modal={open || undefined}
      aria-labelledby={labelledById}
      aria-hidden={!open || undefined}
      inert={!open || undefined}
    >
      {/* Scrim / overlay */}
      <button
        type="button"
        className={`absolute inset-0 bg-ink/30 backdrop-blur-[2px] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="Close drawer overlay"
        tabIndex={open ? 0 : -1}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id={contentId}
        className={`relative flex h-full w-[300px] max-w-[85%] flex-col bg-white shadow-card transition-transform duration-300 ease-out motion-reduce:transition-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ---- header ---- */}
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-oat/60 px-5">
          <p id={labelledById} className="text-sm font-semibold uppercase tracking-[0.1em] text-ink">
            {title}
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            className="-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full text-stone transition-colors hover:bg-sand hover:text-ink"
            onClick={onClose}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* ---- scrollable content ---- */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
          {children}
        </div>
      </div>
    </div>
  );
}
