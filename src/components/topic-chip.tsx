import Link from "next/link";

export function TopicChip({ label, href, active }: { label: string; href?: string; active?: boolean }) {
  const cls = `inline-flex items-center rounded-full px-3 py-1 text-xs font-medium transition-colors ${
    active ? "bg-brand text-white" : "bg-brand-soft text-brand-deep hover:bg-brand hover:text-white"
  }`;
  return href ? (
    <Link href={href} className={cls}>
      {label}
    </Link>
  ) : (
    <span className={cls}>{label}</span>
  );
}
