"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { PortfolioImage } from "@/components/media/PortfolioImage";
import { useHydratedReducedMotion } from "@/components/motion/useHydratedReducedMotion";
import { EditorialScene, type EditorialSceneMedia } from "@/components/sections/phase32c/EditorialScene";
import type { Language } from "@/lib/i18n";

export type HomeHeroScene = EditorialSceneMedia & { label: string; context?: string };

const AUTOPLAY_INTERVAL = 6000;
const TOUCH_RESUME_DELAY = 800;
const SWIPE_THRESHOLD = 44;

export function HomeHeroExperience({ scenes, language }: { scenes: HomeHeroScene[]; language: Language }) {
  const [active, setActive] = useState(0);
  const [timerVersion, setTimerVersion] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [inViewport, setInViewport] = useState(true);
  const [mobileMotionEnabled, setMobileMotionEnabled] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);
  const resumeTimer = useRef<number | null>(null);
  const reducedMotion = useHydratedReducedMotion();
  const scene = scenes[active];
  const autoplayPaused = reducedMotion || hovered || interacting || !pageVisible || !inViewport;

  const resetTimer = () => setTimerVersion((version) => version + 1);
  const goTo = (index: number) => {
    if (!scenes.length) return;
    setActive((index + scenes.length) % scenes.length);
    resetTimer();
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1199px)");
    const update = () => setMobileMotionEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    onVisibilityChange();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setInViewport(entry.isIntersecting && entry.intersectionRatio >= 0.25),
      { threshold: [0, 0.25, 0.5] }
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (autoplayPaused || scenes.length < 2) return;
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % scenes.length);
    }, AUTOPLAY_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [active, autoplayPaused, scenes.length, timerVersion]);

  useEffect(() => {
    const next = scenes[(active + 1) % scenes.length];
    if (!next) return;
    const media = next.media as {
      publicPath: string;
      avifPath?: string;
      mobilePath?: string;
      mobileAvifPath?: string;
    };
    const preload = new window.Image();
    preload.src = window.innerWidth < 768
      ? media.mobileAvifPath ?? media.mobilePath ?? media.publicPath
      : media.avifPath ?? media.publicPath;
  }, [active, scenes]);

  useEffect(() => () => {
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
  }, []);

  const pauseForPointer = () => {
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
    setInteracting(true);
  };

  const resumeAfterPointer = () => {
    if (resumeTimer.current !== null) window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setInteracting(false);
      resetTimer();
    }, TOUCH_RESUME_DELAY);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    goTo(active + (event.key === "ArrowRight" ? 1 : -1));
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if ((event.target as HTMLElement).closest("button")) return;
    pointerStart.current = event.clientX;
    pauseForPointer();
    if (event.pointerType !== "touch") event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (start !== null && Math.abs(event.clientX - start) >= SWIPE_THRESHOLD) {
      goTo(active + (event.clientX < start ? 1 : -1));
    }
    resumeAfterPointer();
  };

  const onPointerCancel = () => {
    pointerStart.current = null;
    resumeAfterPointer();
  };

  if (!scene) return null;

  const transition = reducedMotion
    ? { duration: 0 }
    : { duration: 0.9, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] };

  return (
    <div
      ref={rootRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={language === "zh" ? "项目影像" : "Project imagery"}
      tabIndex={0}
      className="w-full min-w-0 cursor-grab select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-champagne active:cursor-grabbing"
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerCancel}
      onDragStart={(event) => event.preventDefault()}
      style={{ touchAction: "pan-y" }}
      data-phase32c-home-hero
      data-home-media-system
      data-home-media-rail
      data-carousel-active={active}
      data-autoplay-interval={AUTOPLAY_INTERVAL}
      data-autoplay-paused={autoplayPaused || undefined}
    >
      <div
        className="relative aspect-[16/10] w-full overflow-hidden bg-mist"
        onPointerEnter={(event) => { if (event.pointerType === "mouse") setHovered(true); }}
        onPointerLeave={(event) => { if (event.pointerType === "mouse") setHovered(false); }}
        data-home-media-viewport
        data-mobile-reveal
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            key={scene.media.id}
            id={`home-slide-${active + 1}`}
            className="absolute inset-0"
            initial={reducedMotion ? false : { opacity: 0, x: mobileMotionEnabled ? 8 : 0, scale: mobileMotionEnabled ? 1.006 : 1.008 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: mobileMotionEnabled ? -8 : 0, scale: mobileMotionEnabled ? 0.998 : 1 }}
            transition={transition}
            data-home-media-slide={scene.media.id}
            aria-current="true"
          >
            {scene.kind === "portfolio" ? (
              <PortfolioImage
                media={scene.media}
                language={language}
                className="h-full w-full"
                sizes="(min-width:1280px) 48vw, (min-width:1024px) 46vw, 100vw"
                fit="cover"
                mediaRole="hero-landscape"
                priority
              />
            ) : (
              <EditorialScene
                scene={scene}
                language={language}
                className="h-full w-full"
                sizes="(min-width:1024px) 46vw, 100vw"
                fit="cover"
                mediaRole="hero-landscape"
                priority
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-4 grid gap-3 border-t border-pearl/20 pt-4 text-pearl sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-5">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={scene.media.id}
            aria-live="polite"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.45 }}
          >
            <p className="text-[10px] uppercase tracking-editorial text-champagne">
              {String(active + 1).padStart(2, "0")}{scene.context ? ` · ${scene.context}` : ""}
            </p>
            <p className="mt-2 text-sm font-medium uppercase tracking-editorial">{scene.label}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-2 sm:items-start">
          <p className="mr-1 text-xs tabular-nums text-pearl/55 sm:pt-3">
            {String(active + 1).padStart(2, "0")} / {String(scenes.length).padStart(2, "0")}
          </p>
          {scenes.map((item, index) => (
            <button
              key={item.media.id}
              type="button"
              className="group flex size-9 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne"
              aria-label={language === "zh" ? `查看第 ${index + 1} 张影像` : `Show image ${index + 1}`}
              aria-pressed={active === index}
              onClick={() => goTo(index)}
              data-carousel-indicator={index}
            >
              <span
                className={`home-carousel-indicator relative block size-2 overflow-hidden border transition-all duration-300 ${active === index ? "border-champagne bg-champagne" : "border-pearl/35 bg-transparent group-hover:border-pearl/70"}`}
                data-active={active === index || undefined}
                aria-hidden="true"
              >
                {active === index ? <span key={`${active}-${timerVersion}`} className="home-carousel-indicator-progress" /> : null}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
