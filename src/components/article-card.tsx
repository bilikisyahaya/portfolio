import Link from "next/link";
import Image from "next/image";
import { TopicChip } from "./topic-chip";

type Props = {
  href: string;
  title: string;
  summary: string;
  date: string;
  minutes?: number;
  chips: string[];
  cover?: string | null;
};

export function ArticleCard({ href, title, summary, date, minutes, chips, cover }: Props) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_12px_32px_-18px_rgba(14,124,102,0.45)]">
      {cover && (
        <div className="relative aspect-[16/9] overflow-hidden bg-brand-soft">
          <Image src={cover} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted">
          {date}
          {minutes ? ` · ${minutes} min read` : ""}
        </p>
        <h3 className="font-display text-xl font-semibold leading-snug tracking-tight">
          <Link href={href} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        {summary && <p className="text-[15px] leading-relaxed text-muted">{summary}</p>}
        {chips.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {chips.map((c) => (
              <TopicChip key={c} label={c} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
