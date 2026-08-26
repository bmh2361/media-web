"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const zh = usePathname().startsWith("/zh");
  const prefix = zh ? "/zh" : "/en";
  return (
    <section className="bg-pearl pt-36 text-ink">
      <div className="container-x max-w-3xl pb-28">
        <p className="text-xs uppercase tracking-editorial text-slate">404 · {zh ? "页面不存在" : "PAGE NOT FOUND"}</p>
        <h1 className="type-display-page mt-6 max-w-[12ch]">{zh ? "此页面当前不可用。" : "This page is not available."}</h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-ink/65">
          {zh ? "页面地址可能已经变更，或该内容不再公开。" : "The address may have changed, or the page may no longer be public."}
        </p>
        <div className="mt-10 flex flex-wrap gap-5 text-sm font-semibold">
          <Link className="min-h-11 border-b border-ink py-3" href={prefix}>{zh ? "返回首页" : "Return home"}</Link>
          <Link className="min-h-11 border-b border-ink py-3" href={`${prefix}/work`}>{zh ? "查看案例研究" : "View Case Studies"}</Link>
          <Link className="min-h-11 border-b border-ink py-3" href={`${prefix}/contact`}>{zh ? "联系 Venus Bridge" : "Contact Venus Bridge"}</Link>
          <Link className="min-h-11 border-b border-ink py-3" href={zh ? "/en" : "/zh"}>{zh ? "English" : "中文首页"}</Link>
        </div>
      </div>
    </section>
  );
}
