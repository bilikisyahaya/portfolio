import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="font-display text-7xl font-semibold text-brand/30">404</p>
      <h1 className="mt-4 font-display text-2xl font-semibold">This page doesn&apos;t exist</h1>
      <p className="mt-2 text-muted">It may have been moved, or the link is mistyped.</p>
      <Link href="/" className="mt-8 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-deep">
        Back home
      </Link>
    </div>
  );
}
