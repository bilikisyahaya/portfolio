import Link from "next/link";
import Image from "next/image";
import { ArticleCard } from "@/components/article-card";
import { Band, SectionHeading } from "@/components/band";
import { ArrowUpRight, LinkedInIcon, MailIcon, PinIcon } from "@/components/icons";
import { formatDate, getArticles, getProfile, getProjects, labelForTopic, readingMinutes } from "@/lib/content";

const VALUE = [
  {
    title: "Business understanding",
    body: "A Business Administration background means I start from how the business actually runs: sales, costs, customers and people, and the decision the numbers need to support.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-6"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" /></svg>
    ),
  },
  {
    title: "Analytical thinking",
    body: "I look past what happened to why it happened and what should change next, and I sanity-check every figure before it reaches a decision-maker.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-6"><path d="M3 3v18h18" /><path d="m7 15 4-4 3 3 5-6" /></svg>
    ),
  },
  {
    title: "Clear communication",
    body: "Findings only matter if people act on them. I explain results in plain language, with the context a manager needs to make the call.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-6"><path d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" /><path d="M8 9h8M8 13h5" /></svg>
    ),
  },
];

const ic = "size-5";
const HIGHLIGHT_ICONS: Record<string, React.ReactNode> = {
  event: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={ic} aria-hidden><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>,
  certificate: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={ic} aria-hidden><circle cx="12" cy="9" r="5" /><path d="m8.5 13 -1.5 8 5-3 5 3-1.5-8" /></svg>,
  course: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={ic} aria-hidden><path d="M2 9 12 4l10 5-10 5Z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></svg>,
  award: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={ic} aria-hidden><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0Z" /><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" /></svg>,
};

const TOOLS = [
  { name: "Microsoft Excel", note: "Formulas, calculations, reporting" },
  { name: "SQL", note: "Querying and summarising data" },
  { name: "Power BI", note: "Dashboards and data models" },
  { name: "Python", note: "Automation and analysis" },
];

export default async function Home() {
  const [p, articles, projects] = await Promise.all([getProfile(), getArticles(), getProjects()]);
  const latest = await Promise.all(
    articles.slice(0, 3).map(async (a) => ({ ...a, minutes: readingMinutes((await a.entry.content()).node) })),
  );

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-40 -top-48 size-[40rem] rounded-full bg-brand/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 top-64 size-[26rem] rounded-full bg-accent/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.35fr_1fr] lg:px-10 lg:pb-32 lg:pt-24">
          <div>
            <p className="inline-flex items-center gap-2.5 rounded-full border border-brand/30 bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand">
              <span className="size-2 rounded-full bg-brand" />
              Open to junior BI &amp; data analyst roles
            </p>
            <h1 className="mt-7 text-5xl font-bold leading-[1.04] tracking-tight sm:text-6xl xl:text-7xl">{p.name}</h1>
            {p.headline && <p className="mt-5 text-2xl font-semibold text-brand sm:text-[1.75rem]">{p.headline}</p>}
            <p className="mt-7 max-w-2xl text-xl leading-relaxed text-ink/90 lg:text-2xl lg:leading-relaxed">
              I turn business questions into clear, data-driven answers.
            </p>
            {p.intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{p.intro}</p>}
            {p.location && (
              <p className="mt-6 flex items-center gap-2 text-muted"><PinIcon /> {p.location}</p>
            )}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="#contact" className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 font-semibold text-on-brand transition-colors hover:bg-brand-hover">
                <MailIcon /> Contact me
              </Link>
              <Link href="#insights" className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface px-6 py-3.5 font-semibold transition-colors hover:border-brand hover:text-brand">
                Read my insights <ArrowUpRight />
              </Link>
              {p.linkedin && (
                <a href={p.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-[3.1rem] place-items-center rounded-lg border border-line bg-surface text-muted hover:border-brand hover:text-brand">
                  <LinkedInIcon />
                </a>
              )}
            </div>
          </div>

          {p.photo && (
            <div className="relative mx-auto w-full max-w-sm lg:mr-0">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-brand/30 via-transparent to-accent/20 blur-2xl" />
              {/* Light mode: a white mount, soft teal shadow and a small lift, so the photo's
                  grey studio backdrop doesn't look dull against the pale page. */}
              <div className="relative rounded-[1.75rem] bg-white p-2 shadow-[0_30px_60px_-30px_rgba(10,127,106,0.35)] ring-1 ring-line dark:bg-transparent dark:p-0 dark:shadow-2xl dark:shadow-black/30 dark:ring-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.35rem] border border-line bg-surface dark:rounded-3xl">
                  <Image src={p.photo} alt={p.name} fill priority sizes="(min-width: 1024px) 384px, 90vw" className="object-cover object-top brightness-[1.07] saturate-[1.06] dark:brightness-100 dark:saturate-100" />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── What I bring ─────────────────────────────────── */}
      <Band id="about" alt>
        <SectionHeading
          label="What I bring"
          title="Business sense, backed by data"
          intro="Analysts are valuable when they understand the business behind the numbers. That is where I start."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {VALUE.map((v) => (
            <div key={v.title} className="rounded-2xl border border-line bg-paper p-8">
              <span className="grid size-12 place-items-center rounded-xl bg-brand/10 text-brand">{v.icon}</span>
              <h3 className="mt-6 text-xl font-bold tracking-tight">{v.title}</h3>
              <p className="mt-3 text-[1.05rem] leading-relaxed text-muted">{v.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-line bg-paper p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Tools</p>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLS.map((t) => (
              <li key={t.name} className="rounded-xl border border-line bg-surface px-5 py-4">
                <p className="font-semibold">{t.name}</p>
                <p className="mt-1 text-sm text-muted">{t.note}</p>
              </li>
            ))}
          </ul>
        </div>
        {p.highlights.length > 0 && (
          <div className="mt-6 rounded-2xl border border-line bg-paper p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-muted">Highlights</p>
            <ul className={`mt-5 grid gap-4 ${p.highlights.length > 1 ? "md:grid-cols-2" : ""}`}>
              {p.highlights.map((h) => {
                const inner = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">{HIGHLIGHT_ICONS[h.kind]}</span>
                    <div>
                      <p className="text-lg font-semibold leading-snug">
                        {h.title}
                        {h.role && <span className="font-normal text-muted"> · {h.role}</span>}
                      </p>
                      {h.detail && <p className="mt-1 leading-relaxed text-muted">{h.detail}</p>}
                      {h.date && <p className="mt-2 text-sm font-medium text-brand">{h.date}</p>}
                    </div>
                  </>
                );
                return (
                  <li key={h.title}>
                    {h.url ? (
                      <a href={h.url} target="_blank" rel="noreferrer" className="flex gap-4 rounded-xl border border-line bg-surface p-5 transition-colors hover:border-brand/50">{inner}</a>
                    ) : (
                      <div className="flex gap-4 rounded-xl border border-line bg-surface p-5">{inner}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        )}
        <Link href="/about" className="mt-8 inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-hover">
          More about me <ArrowUpRight />
        </Link>
      </Band>

      {/* ── Insights ─────────────────────────────────────── */}
      <Band id="insights">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="Insights" title="Writing on data and business" intro="Practical notes on analysis, reporting and the questions behind the numbers." />
          <Link href="/articles" className="inline-flex items-center gap-1.5 font-semibold text-brand hover:text-brand-hover">
            All articles <ArrowUpRight />
          </Link>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latest.map((a) => (
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
      </Band>

      {/* ── Selected work ────────────────────────────────── */}
      <Band id="work" alt>
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
          <SectionHeading
            label="Selected work"
            title={projects.length ? "Case studies" : "Case studies in progress"}
            intro={
              projects.length
                ? "Real datasets and business questions, from raw data to a recommendation."
                : "Analyses built on real, public business data, each one taking a question from raw data to a clear recommendation. The first case study will be published here soon."
            }
          />
          <div className="lg:text-right">
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-lg border border-line bg-paper px-6 py-3.5 font-semibold transition-colors hover:border-brand hover:text-brand">
              {projects.length ? "View all work" : "See what's coming"} <ArrowUpRight />
            </Link>
          </div>
        </div>
      </Band>

      {/* ── Contact ──────────────────────────────────────── */}
      <Band id="contact">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-8 py-14 text-center sm:px-14">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-brand/10 blur-3xl" />
          <div className="relative">
            <SectionHeading center label="Contact" title="Let's work together" />
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted lg:text-xl">
              I&apos;m open to junior business intelligence and data analyst roles, internships and project work. If you have a question you think data could answer, I&apos;d be glad to hear from you.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {p.email && (
                <a href={`mailto:${p.email}`} className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 font-semibold text-on-brand hover:bg-brand-hover">
                  <MailIcon /> {p.email}
                </a>
              )}
              {p.linkedin && (
                <a href={p.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-line bg-paper px-6 py-3.5 font-semibold hover:border-brand hover:text-brand">
                  <LinkedInIcon /> LinkedIn
                </a>
              )}
              {!p.email && !p.linkedin && (
                <Link href="/about" className="inline-flex items-center gap-2 rounded-lg bg-brand px-6 py-3.5 font-semibold text-on-brand hover:bg-brand-hover">
                  About me <ArrowUpRight />
                </Link>
              )}
            </div>
          </div>
        </div>
      </Band>
    </>
  );
}
