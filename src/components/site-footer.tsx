type Props = { name: string; email?: string; linkedin?: string | null; github?: string | null };

export function SiteFooter({ name, email, linkedin, github }: Props) {
  const links = [
    email && { label: "Email", href: `mailto:${email}` },
    linkedin && { label: "LinkedIn", href: linkedin },
    github && { label: "GitHub", href: github },
  ].filter(Boolean) as { label: string; href: string }[];
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {name}. Learning in public.
        </p>
        {links.length > 0 && (
          <ul className="flex gap-5">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-brand" target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
