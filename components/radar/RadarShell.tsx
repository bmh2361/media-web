import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLockup";

export function RadarShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-pearl text-ink">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="border-b border-ink/10">
        <div className="container-x flex flex-wrap items-center justify-between gap-6 py-6">
          <Link href="/en" aria-label="Venus Bridge home">
            <BrandLockup variant="header" surface="light" />
          </Link>
          <nav aria-label="Radar navigation" className="flex flex-wrap gap-6 text-sm">
            <Link href="/radar">Business Radar</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </nav>
        </div>
      </header>
      <main id="main-content" className="container-x max-w-4xl py-16 md:py-24">
        <p className="text-xs uppercase tracking-editorial text-slate">Venus Bridge · Internal research</p>
        <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-6xl">{title}</h1>
        <div className="mt-10 space-y-8 text-base leading-8 text-ink/80 [&_a]:underline [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink [&_li]:mb-2 [&_ul]:list-disc [&_ul]:pl-6">
          {children}
        </div>
      </main>
      <footer className="border-t border-ink/10">
        <div className="container-x flex flex-wrap gap-6 py-8 text-sm">
          <span>© Venus Bridge</span>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <a href="mailto:minghb22@gmail.com">Radar support: minghb22@gmail.com</a>
        </div>
      </footer>
    </div>
  );
}
