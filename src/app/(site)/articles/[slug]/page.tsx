import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdocContent } from "@/components/markdoc";
import { TopicChip } from "@/components/topic-chip";
import { formatDate, getArticle, getArticles, getProfile, labelForTopic, readingMinutes } from "@/lib/content";

export async function generateStaticParams() {
  return (await getArticles()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata(props: PageProps<"/articles/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const a = await getArticle(slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.summary,
    openGraph: {
      type: "article",
      title: a.title,
      description: a.summary,
      publishedTime: a.publishedDate ?? undefined,
      images: a.cover ? [a.cover] : undefined,
    },
  };
}

export default async function ArticlePage(props: PageProps<"/articles/[slug]">) {
  const { slug } = await props.params;
  const [a, profile, all] = await Promise.all([getArticle(slug), getProfile(), getArticles()]);
  if (!a) notFound();
  const { node } = await a.content();
  const i = all.findIndex((x) => x.slug === slug);
  const newer = i > 0 ? all[i - 1] : null;
  const older = i >= 0 && i < all.length - 1 ? all[i + 1] : null;

  return (
    <article className="pt-14">
      <header className="mx-auto max-w-3xl px-5">
        <Link href="/articles" className="text-sm font-medium text-muted hover:text-brand">
          ← All articles
        </Link>
        <div className="mt-8 flex flex-wrap gap-1.5">
          {a.topics.map((t) => (
            <TopicChip key={t} label={labelForTopic(t)} href={`/articles?topic=${t}`} />
          ))}
        </div>
        <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">{a.title}</h1>
        {a.summary && <p className="mt-5 text-xl leading-relaxed text-muted">{a.summary}</p>}
        <p className="mt-6 text-sm text-muted">
          <span className="font-medium text-ink">{profile.name}</span> · {formatDate(a.publishedDate)} ·{" "}
          {readingMinutes(node)} min read
        </p>
      </header>

      {a.cover && (
        <div className="mx-auto mt-10 max-w-4xl px-5">
          <div className="relative aspect-[16/8] overflow-hidden rounded-2xl border border-line bg-brand-soft">
            <Image src={a.cover} alt="" fill priority sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
          </div>
        </div>
      )}

      <div className="mx-auto mt-10 max-w-3xl px-5">
        <MarkdocContent node={node} />
      </div>

      {(newer || older) && (
        <nav className="mx-auto mt-16 grid max-w-3xl gap-4 px-5 sm:grid-cols-2">
          {older ? (
            <Link href={`/articles/${older.slug}`} className="rounded-2xl border border-line bg-surface p-5 hover:border-brand/50">
              <p className="text-xs uppercase tracking-wider text-muted">Previous</p>
              <p className="mt-1 font-display font-semibold">{older.entry.title}</p>
            </Link>
          ) : <span />}
          {newer && (
            <Link href={`/articles/${newer.slug}`} className="rounded-2xl border border-line bg-surface p-5 text-right hover:border-brand/50">
              <p className="text-xs uppercase tracking-wider text-muted">Next</p>
              <p className="mt-1 font-display font-semibold">{newer.entry.title}</p>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
