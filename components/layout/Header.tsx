"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { BrandMark } from "@/components/brand/BrandMark";
import { ButtonLink } from "@/components/ui/Button";
import { phase5Navigation } from "@/content/phase5";
import { withLanguage, type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

const navItems = [["home", "/"], ["companies", "/companies"], ["partners", "/partners"], ["work", "/work"], ["how", "/how-we-work"], ["about", "/about"], ["contact", "/contact"]] as const;

export function Header({ language, showWork = true }: { language: Language; showWork?: boolean }) {
  const pathname = usePathname();
  const copy = phase5Navigation[language];
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileCompact, setMobileCompact] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 24);
      setMobileCompact(window.scrollY > 56);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) document.body.dataset.mobileMenuOpen = "true";
    else delete document.body.dataset.mobileMenuOpen;
    if (open) panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.mobileMenuOpen;
    };
  }, [open]);
  useEffect(() => {
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (event.key === "Tab" && open && panelRef.current) {
        const focusable = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleDialogKeys);
    return () => document.removeEventListener("keydown", handleDialogKeys);
  }, [open]);
  const items = navItems.filter(([key]) => key !== "work" || showWork);
  return (
    <header className="fixed inset-x-0 top-0 z-50" data-mobile-compact={mobileCompact || undefined}>
      <div className={cn("border-b text-pearl transition-colors", scrolled || open ? "border-pearl/10 bg-ink/95 backdrop-blur-2xl" : "border-pearl/10 bg-ink/75 backdrop-blur-md")}>
        <div className="mobile-header-row container-x flex h-[76px] items-center justify-between lg:h-[88px]">
          <Link href={withLanguage("/", language)} aria-label="Venus Bridge home" className="inline-flex min-h-11 min-w-11 items-center">
            <BrandMark surface="dark" className="w-9 xl:hidden" priority />
            <BrandLockup variant="header" surface="dark" className="hidden xl:inline-flex" priority />
          </Link>
          <nav className="hidden items-center gap-0 xl:flex" aria-label="Primary navigation">
            {items.map(([key, path]) => {
              const href = withLanguage(path, language);
              const active = key === "home" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
              return <Link key={key} href={href} aria-current={active ? "page" : undefined} className={cn("relative min-h-11 px-3 py-3 text-[14px] text-pearl/65 transition hover:text-pearl after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:bg-champagne after:transition-transform after:duration-300", active ? "text-pearl after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100")}>{copy[key]}</Link>;
            })}
          </nav>
          <div className="hidden items-center gap-3 xl:flex">
            <Suspense fallback={<span className="w-12" />}><LanguageSwitcher language={language} className="border-pearl/20 text-pearl hover:border-champagne hover:text-champagne" /></Suspense>
            <ButtonLink href={withLanguage("/contact", language)} className="border-champagne bg-transparent px-5 py-2 text-pearl hover:bg-champagne hover:text-ink">{copy.cta}</ButtonLink>
          </div>
          <div className="flex items-center gap-2 xl:hidden">
            <Suspense fallback={<span className="w-12" />}><LanguageSwitcher language={language} className="border-pearl/20 px-2 text-xs text-pearl" /></Suspense>
            <button ref={buttonRef} type="button" className="mobile-menu-trigger inline-flex min-h-11 min-w-11 items-center justify-center gap-3 rounded-sm border border-pearl/20 px-3" onClick={() => setOpen((value) => !value)} aria-label={open ? copy.close : copy.menu} aria-expanded={open} aria-controls="mobile-navigation">
              <span className="hidden text-[10px] uppercase tracking-[0.18em] max-[1199px]:inline">{open ? (language === "zh" ? "关闭" : "CLOSE") : (language === "zh" ? "菜单" : "MENU")}</span>
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open ? <motion.div ref={panelRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label={copy.menu} initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: reduced ? 0 : .32, ease: [0.22, 1, 0.36, 1] }} className="mobile-navigation-panel fixed inset-x-0 top-[76px] h-[calc(100dvh-76px)] overflow-y-auto overscroll-contain bg-ink px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-6 text-pearl xl:hidden">
          <motion.nav
            className="grid"
            aria-label="Mobile navigation"
            initial="closed"
            animate="open"
            variants={{ open: { transition: { staggerChildren: reduced ? 0 : 0.045 } } }}
          >
            {items.map(([key, path], index) => {
              const href = withLanguage(path, language);
              const active = key === "home" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <motion.div key={key} variants={{ closed: { opacity: 0, y: 8 }, open: { opacity: 1, y: 0 } }}>
                  <Link href={href} aria-current={active ? "page" : undefined} className="mobile-navigation-link grid min-h-[4.6rem] grid-cols-[2.5rem_1fr_auto] items-center border-b border-pearl/10 py-4 text-2xl font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne min-[1200px]:block min-[1200px]:py-5 min-[1200px]:text-3xl">
                    <span className="text-[10px] tabular-nums text-champagne min-[1200px]:hidden">{String(index + 1).padStart(2, "0")}</span>
                    <span>{copy[key]}</span>
                    <span aria-hidden="true" className="text-sm text-champagne min-[1200px]:hidden">{active ? "■" : "→"}</span>
                  </Link>
                </motion.div>
              );
            })}
          </motion.nav>
          <ButtonLink href={withLanguage("/contact", language)} className="mt-10 w-full bg-champagne text-ink" showArrow>{copy.cta}</ButtonLink>
        </motion.div> : null}
      </AnimatePresence>
    </header>
  );
}
