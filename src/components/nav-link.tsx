"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const SECTIONS = [
  { id: "about", label: "About" },
  { id: "insights", label: "Insights" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

/** Tracks which home-page section is on screen, so the nav can highlight it. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((e): e is HTMLElement => !!e);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
        else if (window.scrollY < 200) setActive(null);
      },
      // a section counts as "current" when it crosses the upper-middle band of the screen
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [enabled]);
  return enabled ? active : null;
}

export function SectionNav({ className, itemClass }: { className: string; itemClass?: string }) {
  const onHome = usePathname() === "/";
  const active = useActiveSection(onHome);
  return (
    <nav className={className} aria-label="Main">
      {SECTIONS.map((s) => {
        const isActive = active === s.id;
        return (
          <Link
            key={s.id}
            href={`/#${s.id}`}
            aria-current={isActive ? "true" : undefined}
            className={`relative text-base font-medium transition-colors ${isActive ? "text-brand" : "text-muted hover:text-ink"} ${itemClass ?? ""}`}
          >
            {s.label}
            <span className={`absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-brand transition-all ${isActive ? "w-full" : "w-0"}`} />
          </Link>
        );
      })}
    </nav>
  );
}
