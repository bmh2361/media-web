export const durations = {
  instant: 0.01,
  micro: 0.16,
  control: 0.22,
  fast: 0.34,
  component: 0.48,
  media: 0.56,
  route: 0.28,
  section: 0.72,
  opening: 0.64
} as const;

export const easings = {
  editorial: [0.22, 1, 0.36, 1],
  curtain: [0.76, 0, 0.24, 1],
  standard: [0.4, 0, 0.2, 1],
  precise: [0.25, 0.1, 0.25, 1]
} as const;

export const springs = {
  pointer: { stiffness: 420, damping: 38, mass: 0.45 },
  magnetic: { stiffness: 360, damping: 30, mass: 0.55 },
  panel: { stiffness: 220, damping: 28, mass: 0.75 }
} as const;

export const distances = { micro: 6, small: 12, medium: 24, hero: 36, section: 56 } as const;
export const stagger = { tight: 0.045, standard: 0.08, editorial: 0.12, cta: 0.055 } as const;
export const thresholds = { enter: 0.12, chapter: 0.42, media: 0.18 } as const;
export const limits = {
  parallaxDesktop: 18,
  parallaxMobile: 0,
  pointer: 10,
  blur: 8,
  scale: 1.045,
  mobileScale: 1.018,
  minimumOpacity: 0.22
} as const;
export const viewport = { once: true, amount: thresholds.enter, margin: "0px 0px -14% 0px" } as const;
export const reducedMotion = {
  duration: durations.instant,
  distance: 0,
  scale: 1,
  parallax: 0
} as const;
export const mobileMotion = {
  durations: {
    micro: durations.micro,
    standard: durations.fast,
    editorial: durations.section,
    cinematic: 0.9
  },
  easing: easings.editorial,
  revealDistance: 18,
  stagger: stagger.tight,
  stickyOffset: 64,
  touchScale: 0.99,
  sticky: true,
  pointer: false,
  parallax: limits.parallaxMobile,
  scale: limits.mobileScale,
  maxDuration: 0.9
} as const;
export const mediaTransition = {
  duration: durations.media,
  ease: easings.editorial,
  scale: limits.scale
} as const;
export const routeTransition = { duration: durations.route, ease: easings.curtain } as const;
export const motionSystem = {
  durations,
  easings,
  springs,
  distances,
  stagger,
  thresholds,
  limits,
  viewport,
  reducedMotion,
  mobileMotion,
  mediaTransition,
  routeTransition
} as const;
