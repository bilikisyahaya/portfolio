import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EmptyState } from "@/components/empty-state";
import { TopicChip } from "@/components/topic-chip";
import { getProjects, labelForTool } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: "Dashboards and analysis built with Excel, SQL and Power BI.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="mx-auto max-w-5xl px-5 pt-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">Work</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">Projects</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
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
            title="The first project is in progress"
            body="Once a tool clicks, it gets put to work on a real dataset. Dashboards and write-ups will be published here."
          />
        )}
      </div>
    </div>
  );
}
