import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { TopicChip } from "@/components/topic-chip";
import { getProjects, labelForTool } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "Dashboards and analysis built with Excel, SQL and Power BI.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 lg:px-10 lg:pt-24">
      <p className="font-mono text-sm font-medium text-brand sm:text-base">Selected work</p>
      <h1 className="mt-4 text-5xl font-bold tracking-tight lg:text-6xl">Case studies</h1>
      <p className="mt-5 max-w-2xl text-lg text-muted lg:text-xl">
        Each project starts with a real dataset and a business question, and ends with an answer someone could act on.
      </p>
      <div className="mt-10">
        {projects.length ? (
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`} className="group overflow-hidden rounded-2xl border border-line bg-surface transition-all hover:-translate-y-0.5 hover:border-brand/40">
                <div className="relative aspect-[16/10] bg-brand-soft">
                  {p.entry.cover && <Image src={p.entry.cover} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />}
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold group-hover:text-brand">{p.entry.title}</h2>
                  {p.entry.summary && <p className="mt-2 text-[15px] leading-relaxed text-muted">{p.entry.summary}</p>}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.entry.tools.map((t) => <TopicChip key={t} label={labelForTool(t)} />)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Case studies in progress"
            body="Each case study takes a real business question from raw data to a clear recommendation. The first one will be published here soon."
          />
        )}
      </div>
    </div>
  );
}
