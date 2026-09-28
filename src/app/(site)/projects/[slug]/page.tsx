import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MarkdocContent } from "@/components/markdoc";
import { TopicChip } from "@/components/topic-chip";
import { formatDate, getProject, getProjects, labelForTool } from "@/lib/content";

export async function generateStaticParams() {
  return (await getProjects()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = await getProject(slug);
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const p = await getProject(slug);
  if (!p) notFound();
  const { node } = await p.content();
  return (
    <article className="pt-14">
      <header className="mx-auto max-w-3xl px-5">
        <Link href="/projects" className="text-sm font-medium text-muted hover:text-brand">← All projects</Link>
        <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl">{p.title}</h1>
        {p.summary && <p className="mt-5 text-xl leading-relaxed text-muted">{p.summary}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
          {p.tools.map((t) => <TopicChip key={t} label={labelForTool(t)} />)}
          {p.publishedDate && <span className="ml-1">· {formatDate(p.publishedDate)}</span>}
        </div>
      </header>
      {p.dashboardEmbed && (
        <div className="mx-auto mt-10 max-w-5xl px-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
            <iframe src={p.dashboardEmbed} title={`${p.title} dashboard`} className="absolute inset-0 size-full" allowFullScreen loading="lazy" />
          </div>
        </div>
      )}
      <div className="mx-auto mt-10 max-w-3xl px-5">
        <MarkdocContent node={node} />
        {p.repoOrFile && (
          <p className="mt-8">
            <a href={p.repoOrFile} target="_blank" rel="noreferrer" className="font-semibold text-brand hover:text-brand-deep">
              View the dataset and files →
            </a>
          </p>
        )}
      </div>
    </article>
  );
}
