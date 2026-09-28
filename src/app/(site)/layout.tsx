import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getProfile } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const p = await getProfile();
  return (
    <>
      <SiteHeader name={p.name} />
      <main className="flex-1">{children}</main>
      <SiteFooter name={p.name} email={p.email} linkedin={p.linkedin} github={p.github} />
    </>
  );
}
