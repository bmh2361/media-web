"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { MediaPlaceholder } from "@/components/media/MediaPlaceholder";
import { ButtonLink } from "@/components/ui/Button";
import { media, serviceMediaSequence } from "@/content/media";
import type { servicesPage } from "@/content/site";
import type { Language } from "@/lib/i18n";
import { withLanguage } from "@/lib/i18n";

type ServicesCopy = (typeof servicesPage)["en"];

export function ServicesStory({
  language,
  copy
}: {
  language: Language;
  copy: ServicesCopy;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const activeService = copy.services[activeIndex] ?? copy.services[0];
  const activeMediaId = serviceMediaSequence[activeIndex] ?? serviceMediaSequence[0];

  return (
    <section className="bg-porcelain">
      <div className="container-x grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <aside className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
          <motion.div
            key={activeService.name}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-lg bg-ink p-6 text-pearl shadow-cinematic"
          >
            <MediaPlaceholder
              id={activeMediaId}
              language={language}
              className="absolute inset-0 rounded-none opacity-80"
              imageClassName="group-hover:scale-100"
              sizes="40vw"
              showCaption={false}
            />
            <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(11,13,16,0.88),rgba(11,13,16,0.32))]" />
            <div className="relative flex min-h-[34rem] flex-col justify-between">
              <span className="text-sm font-semibold text-champagne">0{activeIndex + 1}</span>
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-editorial text-pearl/52">
                  FrameBridge service
                </p>
                <h2 className="text-5xl font-semibold leading-tight tracking-[-0.03em]">
                  {activeService.name}
                </h2>
                <p className="mt-5 max-w-sm border-t border-pearl/20 pt-4 text-sm leading-6 text-pearl/66">
                  {media[activeMediaId].replacementNote[language]}
                </p>
                <div className="mt-8 grid grid-cols-3 gap-2">
                  {copy.services.slice(0, 9).map((service, index) => (
                    <span
                      key={service.name}
                      className={`h-1 rounded-full transition ${
                        index === activeIndex ? "bg-champagne" : "bg-pearl/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </aside>

        <div className="grid gap-8">
          {copy.services.map((service, index) => (
            <motion.article
              key={service.name}
              onViewportEnter={() => setActiveIndex(index)}
              viewport={{ amount: 0.45, margin: "-20% 0px -40% 0px" }}
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-lg border border-ink/10 bg-pearl p-6 shadow-soft transition duration-300 hover:border-champagne md:p-8"
            >
              <div className="lg:hidden">
                <span className="text-sm font-semibold text-slate">0{index + 1}</span>
                <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.02em] text-ink">
                  {service.name}
                </h2>
              </div>
              <p className="mt-0 text-2xl leading-snug text-ink md:text-3xl lg:mt-0">{service.explanation}</p>

              <div className="mt-10 grid gap-7 md:grid-cols-2">
                <InfoGroup title={copy.labels.usefulFor} items={service.usefulFor} />
                <InfoGroup title={copy.labels.deliverables} items={service.deliverables} />
                <InfoGroup title={copy.labels.industries} items={service.industries} />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-editorial text-slate">
                    {copy.labels.caseStudy}
                  </p>
                  <div className="mt-4 rounded-lg border border-ink/10 bg-porcelain p-5">
                    <p className="text-lg font-semibold text-ink">{service.caseStudy}</p>
                    <div className="mt-5 h-24 rounded-md bg-[linear-gradient(135deg,rgba(36,40,48,0.18),rgba(216,199,162,0.42))]" />
                  </div>
                </div>
              </div>

              <ButtonLink href={withLanguage("/contact", language)} showArrow className="mt-10">
                {copy.labels.cta}
              </ButtonLink>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-editorial text-slate">{title}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-full border border-ink/10 bg-white/70 px-3 py-2 text-sm text-ink/68">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
