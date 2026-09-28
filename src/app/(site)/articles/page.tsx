import type { Metadata } from "next";
import { ArticleCard } from "@/components/article-card";
import { EmptyState } from "@/components/empty-state";
import { TopicChip } from "@/components/topic-chip";
import { formatDate, getArticles, labelForTopic, readingMinutes } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles",
  description: "Notes and lessons from learning Excel, SQL and Power BI.",
};

export default async function ArticlesPage(props: PageProps<"/articles">) {
  const { topic } = await props.searchParams;
  const active = typeof topic === "string" ? topic : undefined;
  const all = await getArticles();
  const topics = [...new Set(all.flatMap((a) => a.entry.topics))];
  const shown = active ? all.filter((a) => a.entry.topics.includes(active)) : all;
  const items = await Promise.all(
    shown.map(async (a) => ({ ...a, minutes: readingMinutes((await a.entry.content()).node) })),
  );

  return (
    <div className="mx-auto max-w-5xl px-5 pt-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">Writing</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Articles</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        What I&apos;m learning about business intelligence, written down as I go.
      </p>

      {topics.length > 1 && (
        <div className="mt-8 flex flex-wrap gap-2">
          <TopicChip label="All" href="/articles" active={!active} />
          {topics.map((t) => (
            <TopicChip key={t} label={labelForTopic(t)} href={`/articles?topic=${t}`} active={active === t} />
          ))}
        </div>
      )}

      <div className="mt-10">
        {items.length ? (
          <div className="grid gap-5 md:grid-cols-2">
            {items.map((a) => (
              <ArticleCard
                key={a.slug}
                href={`/articles/${a.slug}`}
                title={a.entry.title}
                summary={a.entry.summary}
                date={formatDate(a.entry.publishedDate)}
                minutes={a.minutes}
                chips={a.entry.topics.map(labelForTopic)}
                cover={a.entry.cover}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title={active ? `Nothing on ${labelForTopic(active)} yet` : "No articles yet"}
            body="New writing will show up here as soon as it's published."
          />
        )}
      </div>
    </div>
  );
}
