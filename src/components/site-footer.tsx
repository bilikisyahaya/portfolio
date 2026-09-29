import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

type Props = { name: string; email?: string; linkedin?: string | null; github?: string | null };

export function SiteFooter({ name, email, linkedin, github }: Props) {
  const links = [
    linkedin && { label: "LinkedIn", href: linkedin, icon: <LinkedInIcon className="size-4" /> },
    github && { label: "GitHub", href: github, icon: <GitHubIcon className="size-4" /> },
    email && { label: "Email", href: `mailto:${email}`, icon: <MailIcon className="size-4" /> },
  ].filter(Boolean) as { label: string; href: string; icon: React.ReactNode }[];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between lg:px-10">
        <p>© {new Date().getFullYear()} {name}.</p>
        {links.length > 0 && (
          <ul className="flex gap-5">
            {links.map((l) => (
              <li key={l.label}>
                <a href={l.href} aria-label={l.label} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="hover:text-brand">
                  {l.icon}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}
