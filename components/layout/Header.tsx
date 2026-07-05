"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { megaMenus, navigation, primaryNav, type MegaMenuKey } from "@/content/navigation";
import { withLanguage, type Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "./LanguageSwitcher";

const menuMotion = {
  initial: { opacity: 0, y: -10, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.99 }
};

export function Header({ language }: { language: Language }) {
  const pathname = usePathname();
  const copy = navigation[language];
  const headerRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activeMega, setActiveMega] = useState<MegaMenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<MegaMenuKey | null>("services");

  const closeMenus = () => {
    setActiveMega(null);
    setMobileOpen(false);
  };

  useEffect(() => {
    closeMenus();
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        closeMenus();
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div
        className="border-b border-ink/10 bg-pearl/72 shadow-[0_1px_0_rgba(255,255,255,0.36)_inset] backdrop-blur-2xl"
        onMouseLeave={() => setActiveMega(null)}
      >
        <div className="container-x flex h-16 items-center justify-between">
          <Link href={withLanguage("/", language)} className="text-sm font-semibold tracking-[0.12em] text-ink" onClick={closeMenus}>
            {copy.logo}
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
            {primaryNav.map((item) => {
              const href = withLanguage(item.href, language);
              const isActive = pathname === href || (item.href !== "/" && pathname.startsWith(href));

              if ("mega" in item) {
                const megaKey = item.mega;
                return (
                  <button
                    type="button"
                    key={item.key}
                    onMouseEnter={() => setActiveMega(megaKey)}
                    onClick={() => setActiveMega((current) => (current === megaKey ? null : megaKey))}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-ink/64 transition hover:bg-ink/[0.04] hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/45",
                      (isActive || activeMega === megaKey) && "bg-ink/[0.05] text-ink"
                    )}
                    aria-expanded={activeMega === megaKey}
                  >
                    {item.label[language]}
                    <ChevronDown size={14} className={cn("transition", activeMega === megaKey && "rotate-180")} />
                  </button>
                );
              }

              return (
                <Link
                  key={item.key}
                  href={href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm text-ink/64 transition hover:bg-ink/[0.04] hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/45",
                    isActive && "bg-ink/[0.05] text-ink"
                  )}
                >
                  {item.label[language]}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher language={language} />
            <ButtonLink href={withLanguage("/contact", language)} className="px-4 py-2">
              {copy.cta}
            </ButtonLink>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-ink/10 bg-pearl/50 transition hover:border-blue lg:hidden"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={mobileOpen ? copy.closeMenu : copy.mobileMenu}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {activeMega ? (
            <MegaMenu
              key={activeMega}
              menuKey={activeMega}
              language={language}
              onClose={() => setActiveMega(null)}
            />
          ) : null}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] overflow-y-auto border-t border-pearl/10 bg-ink/96 px-5 py-6 text-pearl shadow-cinematic backdrop-blur-2xl lg:hidden"
          >
            <nav className="grid gap-2" aria-label="Mobile navigation">
              {primaryNav.map((item) => {
                const href = withLanguage(item.href, language);

                if ("mega" in item) {
                  const megaKey = item.mega;
                  const expanded = mobileAccordion === megaKey;

                  return (
                    <div key={item.key} className="border-b border-pearl/10 py-2">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between py-3 text-left text-2xl font-semibold"
                        onClick={() => setMobileAccordion(expanded ? null : megaKey)}
                        aria-expanded={expanded}
                      >
                        {item.label[language]}
                        <ChevronDown size={18} className={cn("transition", expanded && "rotate-180")} />
                      </button>
                      <AnimatePresence initial={false}>
                        {expanded ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: prefersReducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="grid gap-3 pb-4 pt-1">
                              {megaMenus[megaKey].items.map((megaItem) => (
                                <Link
                                  key={megaItem.title.en}
                                  href={href}
                                  className="rounded-lg border border-pearl/10 bg-pearl/[0.04] p-4"
                                  onClick={closeMenus}
                                >
                                  <span className="block text-base font-semibold">{megaItem.title[language]}</span>
                                  <span className="mt-1 block text-sm leading-5 text-pearl/56">{megaItem.description[language]}</span>
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.key}
                    href={href}
                    onClick={closeMenus}
                    className="border-b border-pearl/10 py-5 text-2xl font-semibold"
                  >
                    {item.label[language]}
                  </Link>
                );
              })}
            </nav>
            <div className="mt-8 flex items-center justify-between">
              <LanguageSwitcher
                language={language}
                className="border-pearl/20 text-pearl hover:border-blue hover:text-blue"
              />
              <ButtonLink href={withLanguage("/contact", language)} className="bg-pearl px-5 py-3 text-ink hover:bg-champagne">
                {copy.cta}
              </ButtonLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function MegaMenu({
  menuKey,
  language,
  onClose
}: {
  menuKey: MegaMenuKey;
  language: Language;
  onClose: () => void;
}) {
  const menu = megaMenus[menuKey];
  const copy = navigation[language];
  const parent = primaryNav.find((item) => "mega" in item && item.mega === menuKey);
  const parentHref = withLanguage(parent?.href ?? "/", language);

  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      {...menuMotion}
      transition={{ duration: prefersReducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 top-16 hidden lg:block"
    >
      <div className="container-x pt-3">
        <div className="overflow-hidden rounded-lg border border-pearl/10 bg-ink/88 text-pearl shadow-cinematic backdrop-blur-2xl">
          <div className="grid gap-px bg-pearl/10 lg:grid-cols-[1fr_21rem]">
            <div className="bg-ink/82 p-7">
              <p className="text-xs font-semibold uppercase tracking-editorial text-champagne">{menu.eyebrow[language]}</p>
              <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {menu.items.map((item) => (
                  <Link
                    key={item.title.en}
                    href={parentHref}
                    onClick={onClose}
                    className="group rounded-lg border border-pearl/0 p-4 transition duration-300 hover:border-pearl/10 hover:bg-pearl/[0.06]"
                  >
                    <span className="block text-sm font-semibold text-pearl transition group-hover:text-champagne">
                      {item.title[language]}
                    </span>
                    <span className="mt-2 block text-sm leading-5 text-pearl/52">{item.description[language]}</span>
                  </Link>
                ))}
              </div>
            </div>
            <aside className="bg-[radial-gradient(circle_at_80%_10%,rgba(111,183,255,0.22),transparent_16rem),linear-gradient(155deg,rgba(251,250,247,0.1),rgba(216,199,162,0.04))] p-7">
              <div className="flex h-full min-h-72 flex-col justify-between rounded-lg border border-pearl/12 bg-pearl/[0.05] p-6">
                <div>
                  <p className="text-2xl font-semibold leading-tight">{copy.megaCtaTitle}</p>
                  <p className="mt-4 text-sm leading-6 text-pearl/62">{copy.megaCtaText}</p>
                </div>
                <Link
                  href={withLanguage("/contact", language)}
                  onClick={onClose}
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-pearl px-5 py-3 text-sm font-semibold text-ink transition hover:bg-champagne"
                >
                  {copy.megaCtaButton}
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
