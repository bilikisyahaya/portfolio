import Link from "next/link";
import { SectionNav } from "./nav-link";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({ name }: { name: string }) {
  const initials = name.split(/\s+/).filter(Boolean).map((w) => w[0]).slice(0, 2).join("");
  return (
    <header className="sticky top-0 z-30 border-b border-line/80 bg-paper/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-brand text-[15px] font-bold tracking-tight text-on-brand">{initials}</span>
          <span className="text-lg font-bold tracking-tight">{name}</span>
        </Link>
        <div className="flex items-center gap-8">
          <SectionNav className="hidden items-center gap-8 md:flex" />
          <ThemeToggle />
        </div>
      </div>
      {/* phones: a row of section links under the bar */}
      <SectionNav className="flex gap-7 overflow-x-auto border-t border-line/60 px-6 py-2.5 md:hidden" />
    </header>
  );
}
