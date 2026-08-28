"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import { publicTeamMembers, type TeamMember } from "@/content/team";
import type { Language } from "@/lib/i18n";

function displayName(member: TeamMember, language: Language) {
  return language === "zh" && member.displayNameZh ? member.displayNameZh : member.name;
}

function Portrait({ member, language }: { member: TeamMember; language: Language }) {
  return (
    <div
      className="relative aspect-[4/5] overflow-hidden border border-ink/10 bg-mist"
      data-portrait-frame
      data-mobile-reveal
    >
      <Image
        src={member.image}
        alt={member.imageAlt[language]}
        fill
        sizes="(min-width: 1024px) 29vw, (min-width: 768px) 46vw, 100vw"
        className="object-cover transition-transform duration-500 ease-editorial group-hover:scale-[1.015]"
        style={{ objectPosition: `${member.focalPoint.x}% ${member.focalPoint.y}%` }}
      />
    </div>
  );
}

function ProfileDetails({ member, language }: { member: TeamMember; language: Language }) {
  const zh = language === "zh";
  return (
    <div className="grid gap-8 border-t border-ink/15 pt-6 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <p className="text-xs uppercase tracking-editorial text-champagne">
          {zh ? "负责领域" : "WHAT THEY LEAD"}
        </p>
        <p className="mt-4 text-xl leading-8 text-ink">{member.projectResponsibility?.[language]}</p>
      </div>
      <div className="lg:col-span-5 lg:col-start-6">
        <p className="text-ink/42 text-xs uppercase tracking-editorial">{zh ? "项目价值" : "CLIENT VALUE"}</p>
        <p className="text-ink/66 mt-4 text-base leading-7">{member.clientValue?.[language]}</p>
      </div>
      <div className="lg:col-span-2 lg:col-start-11">
        <p className="text-ink/42 text-xs uppercase tracking-editorial">
          {zh ? "带来的能力" : "WHAT THIS ENABLES"}
        </p>
        <ul className="mt-4 border-t border-ink/15">
          {member.expertise?.map((item) => (
            <li key={item[language]} className="text-ink/62 border-b border-ink/15 py-3 text-sm leading-5">
              {item[language]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TeamProfileIndex({ language }: { language: Language }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [railIndex, setRailIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useHydratedReducedMotion();
  const activeMember = activeIndex === null ? null : publicTeamMembers[activeIndex];
  const leadershipCount = publicTeamMembers.filter((member) => member.featured).length;
  const coreCount = publicTeamMembers.length - leadershipCount;
  const coreRemainder = coreCount % 3;

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || !window.matchMedia("(max-width: 767px)").matches) return;
    const cards = Array.from(rail.querySelectorAll<HTMLElement>("[data-team-member]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!current) return;
        const index = cards.indexOf(current.target as HTMLElement);
        if (index >= 0) setRailIndex(index);
      },
      { root: rail, threshold: [0.52, 0.72] }
    );
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const moveToMember = (index: number) => {
    const card = railRef.current?.querySelectorAll<HTMLElement>("[data-team-member]")[index];
    card?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "center"
    });
    setRailIndex(index);
  };

  return (
    <div>
      <div
        ref={railRef}
        className="grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-6 lg:gap-x-7 lg:gap-y-14"
        data-team-grid
        data-team-rail
      >
        {publicTeamMembers.map((member, index) => {
          const active = activeIndex === index;
          const leadership = member.featured === true;
          const coreIndex = index - leadershipCount;
          const fillsTwoCardFinalRow = !leadership && coreRemainder === 2 && coreIndex >= coreCount - 2;
          return (
            <article
              key={member.slug}
              className={`group md:col-span-1 ${leadership || fillsTwoCardFinalRow ? "lg:col-span-3" : "lg:col-span-2"}`}
              data-team-member={member.slug}
              data-team-tier={leadership ? "leadership" : "core"}
              data-rail-active={railIndex === index || undefined}
            >
              <button
                type="button"
                className="w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne"
                aria-expanded={active}
                onClick={() => setActiveIndex(active ? null : index)}
              >
                <Portrait member={member} language={language} />
                <div className="border-b border-ink/15 pb-5 pt-5" data-team-copy>
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-2xl font-medium tracking-[-0.025em]">
                      {displayName(member, language)}
                    </h3>
                    <span className={`mt-1 text-xs ${active ? "text-champagne" : "text-ink/34"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-medium leading-6 text-ink">{member.role?.[language]}</p>
                  <p className="text-sm leading-6 text-ink/70">{member.specialism?.[language]}</p>
                  <p className="text-ink/72 mt-5 text-base leading-7">{member.contribution[language]}</p>
                  <p className="text-ink/58 mt-4 text-sm leading-6">{member.expertiseSummary[language]}</p>
                  <p className="mt-5 border-l border-champagne/70 pl-4 text-xs leading-5 text-ink/65">
                    {member.credential[language]}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-editorial text-champagne">
                    {active
                      ? language === "zh"
                        ? "已展开"
                        : "DETAILS OPEN"
                      : language === "zh"
                        ? "查看职责"
                        : "VIEW RESPONSIBILITY"}
                    <span aria-hidden="true">{active ? "−" : "+"}</span>
                  </span>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {active ? (
                  <motion.div
                    key={member.slug}
                    className="overflow-hidden pt-6 md:hidden"
                    initial={reducedMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={
                      reducedMotion ? { duration: 0 } : { duration: 0.38, ease: [0.22, 1, 0.36, 1] }
                    }
                  >
                    <ProfileDetails member={member} language={language} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </div>

      <nav className="team-mobile-progress" aria-label={language === "zh" ? "团队成员" : "Team members"}>
        <span aria-hidden="true">
          {String(railIndex + 1).padStart(2, "0")} / {String(publicTeamMembers.length).padStart(2, "0")}
        </span>
        <span className="team-mobile-progress__markers">
          {publicTeamMembers.map((member, index) => (
            <button
              key={member.slug}
              type="button"
              aria-label={
                language === "zh"
                  ? `查看${displayName(member, language)}`
                  : `View ${displayName(member, language)}`
              }
              aria-current={railIndex === index ? "true" : undefined}
              onClick={() => moveToMember(index)}
            >
              <span />
            </button>
          ))}
        </span>
      </nav>

      <AnimatePresence mode="wait" initial={false}>
        {activeMember ? (
          <motion.div
            key={activeMember.slug}
            className="mt-14 hidden md:block lg:mt-20"
            aria-live="polite"
            initial={reducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 flex items-baseline justify-between gap-6">
              <p className="text-2xl font-medium tracking-[-0.025em]">
                {displayName(activeMember, language)}
              </p>
              <p className="text-ink/38 text-xs uppercase tracking-editorial">
                {language === "zh" ? "项目职责详情" : "DELIVERY PROFILE"}
              </p>
            </div>
            <ProfileDetails member={activeMember} language={language} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
