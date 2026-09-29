import Link from "next/link";

export function TopicChip({ label, href, active }: { label: string; href?: string; active?: boolean }) {
  const cls = `inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-xs transition-colors ${
    active ? "border-brand bg-brand text-on-brand" : "border-line text-muted hover:border-brand hover:text-brand"
  }`;
  return href ? <Link href={href} className={cls}>{label}</Link> : <span className={cls}>{label}</span>;
}
