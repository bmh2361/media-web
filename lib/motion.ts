export const editorialEase = [0.22, 1, 0.36, 1] as const;
export const standardDuration = 0.42;
export const slowDuration = 0.8;
export const fastDuration = 0.22;
export const staggerTight = 0.05;
export const staggerStandard = 0.08;
export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
export const springSoft = { type: "spring" as const, stiffness: 120, damping: 24, mass: 0.9 };
export const springSnappy = { type: "spring" as const, stiffness: 220, damping: 26, mass: 0.8 };
export const reducedMotionTransition = { duration: 0.01 } as const;

export const motionTokens = {
  ease: editorialEase,
  duration: standardDuration,
  slow: slowDuration,
  stagger: staggerStandard,
  viewport: viewportOnce,
  spring: springSoft,
  reduced: reducedMotionTransition
} as const;
