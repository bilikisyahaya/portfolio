import Link from "next/link";
import Image from "next/image";
import { ArticleCard } from "@/components/article-card";
import { EmptyState } from "@/components/empty-state";
import { formatDate, getArticles, getProfile, getProjects, labelForTopic, readingMinutes } from "@/lib/content";

const PATH = [
  { topic: "excel", step: "01", title: "Excel", blurb: "Cleaning data, formulas, pivot tables and the habits that make a spreadsheet trustworthy." },
  { topic: "sql", step: "02", title: "SQL", blurb: "Asking questions of real databases: filtering, joining and summarising tables." },
  { topic: "power-bi", step: "03", title: "Power BI", blurb: "Modelling data and turning it into dashboards that someone can make a decision from." },
];

export default async function Home() {
  const [profile, articles, projects] = await Promise.all([getProfile(), getArticles(), getProjects()]);
  const latest = articles.slice(0, 3);
  const withMinutes = await Promise.all(
    latest.map(async (a) => ({ ...a, minutes: readingMinutes((await a.entry.content()).node) })),
  );
  const countFor = (topic: string) => articles.filter((a) => a.entry.topics.includes(topic)).length;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-brand-soft blur-3xl" />
        <div className="pointer-events-none absolute -left-24 top-40 size-72 rounded-full bg-accent-soft blur-3xl" />
        <div className="relative mx-auto grid max-w-5xl items-center gap-12 px-5 pb-20 pt-16 md:grid-cols-[1.35fr_1fr] md:pt-24">
          <div>
            {profile.currentlyLearning && (
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-muted">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                Currently learning: <span className="text-ink">{profile.currentlyLearning}</span>
              </p>
            )}
            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">
              {profile.name}
            </h1>
            {profile.headline && (
              <p className="mt-4 font-display text-xl text-brand sm:text-2xl">{profile.headline}</p>
            )}
            {profile.intro && <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.intro}</p>}
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/articles" className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-brand-deep">
                Read my articles
              </Link>
              <Link href="/about" className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold transition-colors hover:border-brand hover:text-brand">
                About me
              </Link>
            </div>
          </div>

          {/* Portrait, or a small chart as a nod to the field until a photo is added */}
          <div className="relative mx-auto w-full max-w-xs">
            {profile.photo ? (
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line bg-brand-soft shadow-[0_24px_60px_-30px_rgba(23,33,43,0.45)]">
                <Image src={profile.photo} alt={profile.name} fill priority sizes="320px" className="object-cover" />
              </div>
            ) : (
              <div className="rounded-[2rem] border border-line bg-surface p-7 shadow-[0_24px_60px_-30px_rgba(23,33,43,0.35)]">
                <p className="text-xs font-medium uppercase tracking-wider text-muted">Learning progress</p>
                <div className="mt-6 flex h-40 items-end gap-3">
                  {[38, 55, 47, 72, 64, 90].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t-md bg-brand/85" style={{ height: `${h}%`, opacity: 0.45 + i * 0.1 }} />
                  ))}
                </div>
                <div className="mt-3 h-px bg-line" />
                <p className="mt-4 font-display text-lg font-semibold">One step at a time.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Learning path */}
      <section className="mx-auto max-w-5xl px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">The path</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">From spreadsheets to dashboards</h2>
          </div>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {PATH.map((p) => {
            const n = countFor(p.topic);
            return (
              <Link key={p.topic} href={`/articles?topic=${p.topic}`} className="group rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-brand/50">
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-semibold text-brand/30 transition-colors group-hover:text-brand">{p.step}</span>
                  <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-muted">
                    {n} {n === 1 ? "article" : "articles"}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.blurb}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Latest writing */}
      <section className="mx-auto mt-24 max-w-5xl px-5">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Writing</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">Latest articles</h2>
          </div>
          {articles.length > 3 && (
            <Link href="/articles" className="text-sm font-semibold text-brand hover:text-brand-deep">
              All articles →
            </Link>
          )}
        </div>
        <div className="mt-8">
          {withMinutes.length ? (
            <div className="grid gap-5 md:grid-cols-3">
              {withMinutes.map((a) => (
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
            <EmptyState title="The first article is on its way" body="Notes from the journey into business intelligence will appear here." />
          )}
        </div>
      </section>

      {/* Projects teaser */}
      <section className="mx-auto mt-24 max-w-5xl px-5">
        <div className="overflow-hidden rounded-3xl bg-ink px-8 py-12 text-white md:px-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Projects</p>
          <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold tracking-tight">
            {projects.length ? "Dashboards and analysis I've built" : "Dashboards are coming"}
          </h2>
          <p className="mt-3 max-w-xl text-white/70">
            {projects.length
              ? "Real datasets, real questions, and what the numbers said."
              : "As each tool clicks, it gets put to work on a real dataset. The first project will be published here."}
          </p>
          <Link href="/projects" className="mt-7 inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brand-soft">
            {projects.length ? "See projects" : "Follow along"}
          </Link>
        </div>
      </section>
    </>
  );
}
