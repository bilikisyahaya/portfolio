import Link from "next/link";
import { NavLink } from "./nav-link";

export function SiteHeader({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <header className="sticky top-0 z-20 border-b border-line/70 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3.5">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-brand font-display text-sm font-semibold text-white transition-transform group-hover:scale-105">
            {initials}
          </span>
          <span className="hidden font-display text-lg font-semibold tracking-tight sm:inline">
            {name}
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <NavLink href="/articles">Articles</NavLink>
          <NavLink href="/projects">Projects</NavLink>
          <NavLink href="/about">About</NavLink>
        </nav>
      </div>
    </header>
  );
}
