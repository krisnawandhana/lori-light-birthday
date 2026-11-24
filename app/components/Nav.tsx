"use client";

import { useEffect, useRef, useState } from "react";

/*
  R-24: every item here resolves to a section that exists on this page. Lore and
  the social pages are not built yet, so they are absent rather than dead links.
*/
const LINKS = [
  { href: "#about", label: "About" },
  { href: "#content", label: "Content" },
  { href: "#schedule", label: "Schedule" },
  { href: "#find-me", label: "Find me" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // R-32: Escape closes the panel and returns focus to the control that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "border-b border-turquoise/12 bg-abyss/72 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8"
      >
        <a
          href="#top"
          className="group flex min-h-11 items-center gap-2 rounded-sm font-display text-xl tracking-wide text-pearl sm:text-2xl"
        >
          <span className="font-light italic">Lori</span>
          <span className="font-semibold text-turquoise">Light</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative inline-flex min-h-11 items-center rounded-sm px-3 text-sm text-text-secondary transition-colors hover:text-pearl focus-visible:text-pearl"
              >
                {l.label}
                {/* Motif again: the underline sweeps in like a crest, not a bar. */}
                <span className="pointer-events-none absolute inset-x-3 bottom-2 h-px origin-left scale-x-0 bg-linear-to-r from-turquoise to-cyan transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-turquoise/25 text-pearl transition-colors hover:border-turquoise/60 md:hidden"
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-full bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-full bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      <div
        id="mobile-nav"
        ref={panelRef}
        hidden={!open}
        className="border-t border-turquoise/12 bg-abyss/92 backdrop-blur-xl md:hidden"
      >
        <ul className="mx-auto max-w-6xl px-5 py-2 sm:px-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                /* 44px minimum tap target, R-03. */
                className="block rounded-md px-2 py-3.5 text-base text-text-secondary transition-colors hover:text-pearl"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
