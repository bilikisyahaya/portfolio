import type { Metadata } from "next";
import Image from "next/image";
import { MarkdocContent } from "@/components/markdoc";
import { getProfile } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const p = await getProfile();
  const { node } = await p.about();
  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-16 lg:px-10 lg:pt-24 md:grid-cols-[1fr_2fr]">
      <aside className="md:sticky md:top-28 md:self-start">
        {p.photo && (
          <div className="relative mb-6 aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-brand-soft">
            <Image src={p.photo} alt={p.name} fill sizes="320px" className="object-cover object-top" />
          </div>
        )}
        <h1 className="font-display text-3xl font-semibold tracking-tight">{p.name}</h1>
        {p.headline && <p className="mt-2 text-brand">{p.headline}</p>}
        {p.location && <p className="mt-1 text-sm text-muted">{p.location}</p>}
        <div className="mt-6 flex flex-col gap-2 text-sm">
          {p.email && <a href={`mailto:${p.email}`} className="font-medium hover:text-brand">{p.email}</a>}
          {p.linkedin && <a href={p.linkedin} target="_blank" rel="noreferrer" className="font-medium hover:text-brand">LinkedIn →</a>}
          {p.cv && (
            <a href={p.cv} className="mt-3 inline-flex w-fit rounded-full bg-brand px-5 py-2.5 font-semibold text-on-brand hover:bg-brand-hover">
              Download CV
            </a>
          )}
        </div>
      </aside>
      <div>
        <MarkdocContent node={node} />
      </div>
    </div>
  );
}
