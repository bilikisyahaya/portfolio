/** Full-width section: the background runs edge to edge, the content stays in the 1152px column. */
export function Band({ id, alt, children }: { id?: string; alt?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={`scroll-mt-20 ${alt ? "border-y border-line/70 bg-surface/60" : ""}`}>
      <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10 lg:py-28">{children}</div>
    </section>
  );
}

/** Short teal rule + small label, then a strong heading. */
export function SectionHeading({ label, title, intro, center }: { label: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-brand ${center ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-brand" />
        {label}
      </p>
      <h2 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted lg:text-xl">{intro}</p>}
    </div>
  );
}
