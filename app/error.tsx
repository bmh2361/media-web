"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ErrorBoundary({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const zh = usePathname().startsWith("/zh");
  const prefix = zh ? "/zh" : "/en";
  return (
    <main className="bg-pearl pt-36 text-ink">
      <section className="container-x max-w-3xl pb-28">
        <p className="text-xs uppercase tracking-editorial text-slate">500 · {zh ? "页面暂时不可用" : "PAGE UNAVAILABLE"}</p>
        <h1 className="type-display-page mt-6 max-w-[12ch]">{zh ? "页面暂时无法载入。" : "This page could not load."}</h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-ink/65">
          {zh ? "请重试，或返回首页继续浏览。" : "Please try again, or return home to continue browsing."}
        </p>
        <div className="mt-10 flex flex-wrap gap-5 text-sm font-semibold">
          <button type="button" className="min-h-11 border-b border-ink py-3" onClick={reset}>{zh ? "重试" : "Try again"}</button>
          <Link className="min-h-11 border-b border-ink py-3" href={prefix}>{zh ? "返回首页" : "Return home"}</Link>
          <Link className="min-h-11 border-b border-ink py-3" href={`${prefix}/contact`}>{zh ? "联系 Venus Bridge" : "Contact Venus Bridge"}</Link>
        </div>
      </section>
    </main>
  );
}
