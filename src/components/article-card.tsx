import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "./icons";

type Props = { href: string; title: string; summary: string; date: string; minutes?: number; chips: string[]; cover?: string | null };

export function ArticleCard({ href, title, summary, date, minutes, chips, cover }: Props) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:-translate-y-1 hover:border-brand/50">
      {cover && (
        <div className="relative aspect-[16/9] overflow-hidden bg-brand-soft">
          <Image src={cover} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold leading-snug tracking-tight">
            <Link href={href} className="after:absolute after:inset-0 group-hover:text-brand">{title}</Link>
          </h3>
          <ArrowUpRight className="mt-1 size-4 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" />
        </div>
        {summary && <p className="mt-3 leading-relaxed text-muted">{summary}</p>}
        <div className="mt-auto pt-6">
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {chips.map((c) => (
                <span key={c} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-muted">{c}</span>
              ))}
            </div>
          )}
          <p className="mt-4 font-mono text-xs text-muted">
            {date}{minutes ? ` · ${minutes} min read` : ""}
          </p>
        </div>
      </div>
    </article>
  );
}
