"use client";

import { useEffect, useRef, useState } from "react";
import type { NavEntry } from "@/lib/copy";

const hrefFor = (name: string) =>
  ({
    Investors: "#property-types",
    Residents: "#residents",
    "LCAM Training": "#lcam",
    Resources: "#resources",
    Associations: "#property-types",
    About: "#leadership",
    FAQ: "#faq",
    "Switching managers": "#switch",
    "Portal login": "#residents",
    "Maintenance request": "#residents",
    "Estoppel request": "#residents",
    "Leadership and team": "#leadership",
    Insights: "#resources",
  })[name] ?? "#";

export default function SiteNav({
  logo,
  menu,
  cta,
  menuOpen,
  menuClose,
  phone,
}: {
  logo: React.ReactNode;
  menu: NavEntry[];
  cta: string;
  menuOpen: string;
  menuClose: string;
  phone: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [panelTop, setPanelTop] = useState(72);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenMenu(null);
      if (mobile) {
        setMobile(false);
        toggleRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [mobile]);

  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobile]);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      className={`sticky top-0 z-50 border-b border-hairline bg-paper transition-shadow duration-200 ${
        scrolled ? "shadow-[0_6px_20px_color-mix(in_srgb,var(--ink-maroon)_8%,transparent)]" : ""
      }`}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-6">
        <a href="#top" className="flex min-h-11 items-center" aria-label="Prestigious Property Management Services, home">
          {logo}
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {menu.map((entry) => (
            <li
              key={entry.label}
              className="relative"
              onMouseEnter={() => entry.items.length && setOpenMenu(entry.label)}
              onMouseLeave={() => setOpenMenu(null)}
            >
              {entry.items.length ? (
                <>
                  <button
                    type="button"
                    aria-expanded={openMenu === entry.label}
                    aria-controls={`menu-${entry.label}`}
                    onClick={() => setOpenMenu(openMenu === entry.label ? null : entry.label)}
                    className="min-h-11 px-3 text-[15px] hover:text-brand-maroon"
                  >
                    {entry.label}
                  </button>
                  <ul
                    id={`menu-${entry.label}`}
                    hidden={openMenu !== entry.label}
                    className="absolute left-0 top-full min-w-[240px] border border-hairline bg-paper py-2 shadow-[0_12px_32px_color-mix(in_srgb,var(--ink-maroon)_12%,transparent)]"
                  >
                    {entry.items.map((item) => (
                      <li key={item}>
                        <a href={hrefFor(item)} className="block px-4 py-2.5 text-[15px] hover:bg-cream">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a href={hrefFor(entry.label)} className="flex min-h-11 items-center px-3 text-[15px] hover:text-brand-maroon">
                  {entry.label}
                </a>
              )}
            </li>
          ))}
        </ul>

        <a href="#proposal" className="btn btn-primary hidden lg:inline-flex">
          {cta}
        </a>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={mobile}
          aria-controls="mobile-menu"
          onClick={() => {
            // The resident strip may still be in view, so start the panel under the nav's real position.
            setPanelTop(navRef.current?.getBoundingClientRect().bottom ?? 72);
            setMobile(!mobile);
          }}
          className="t-label flex min-h-11 min-w-11 items-center justify-end lg:hidden"
        >
          {mobile ? menuClose : menuOpen}
        </button>
      </div>

      {mobile && (
        <div id="mobile-menu" style={{ top: panelTop }} className="fixed inset-x-0 bottom-0 z-50 overflow-y-auto bg-paper lg:hidden">
          <ul className="wrap py-6">
            {menu.map((entry) => (
              <li key={entry.label} className="border-b border-hairline py-4">
                <a href={hrefFor(entry.label)} onClick={() => setMobile(false)} className="t-h3 flex min-h-11 items-center">
                  {entry.label}
                </a>
                {entry.items.length > 0 && (
                  <ul className="mt-1">
                    {entry.items.map((item) => (
                      <li key={item}>
                        <a href={hrefFor(item)} onClick={() => setMobile(false)} className="t-body flex min-h-11 items-center text-text-muted">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="pt-6">
              <a href="#proposal" onClick={() => setMobile(false)} className="btn btn-primary w-full">
                {cta}
              </a>
              <a href={`tel:${phone.replace(/\D/g, "")}`} className="t-body mt-4 flex min-h-11 items-center justify-center">
                {phone}
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
