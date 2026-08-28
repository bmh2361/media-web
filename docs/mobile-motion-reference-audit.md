# Mobile motion reference audit

Research completed 26 August 2026. The audit focused on reusable interaction principles, touch behavior, reduced motion, and production constraints. No third-party source code was copied. All implementation in Venus Bridge was written independently against the existing stack.

## 1. Motion

- Project / repository: Motion (`motiondivision/motion`)
- URL: https://github.com/motiondivision/motion
- Licence: MIT
- What is useful: Production-tested entrance, presence, gesture, reduced-motion, and scroll-linked primitives.
- Mobile pattern: Restrained transforms and opacity with viewport-aware activation.
- Technology: React, JavaScript, Web Animations API.
- Performance implications: Transform/opacity paths are efficient; broad client imports still affect route bundles.
- Applicable to Venus Bridge: YES
- Pattern worth adapting: Existing `framer-motion` primitives, centralized timings, and reduced-motion branches.

## 2. React Intersection Observer

- Project / repository: `thebuilder/react-intersection-observer`
- URL: https://github.com/thebuilder/react-intersection-observer
- Licence: MIT
- What is useful: Reused observers, threshold/root-margin patterns, and no-render callback strategies.
- Mobile pattern: Activate a section when it crosses a narrow viewport reading band.
- Technology: Native Intersection Observer with React bindings.
- Performance implications: Event-driven and materially cheaper than permanent scroll RAF loops.
- Applicable to Venus Bridge: YES
- Pattern worth adapting: Native observers for section progress and one-shot media reveals; no package added.

## 3. Next View Transitions

- Project / repository: `shuding/next-view-transitions`
- URL: https://github.com/shuding/next-view-transitions
- Licence: MIT
- What is useful: Progressive route continuity for the Next.js App Router.
- Mobile pattern: Fast page-level crossfades without a blocking loader.
- Technology: View Transitions API and Next.js.
- Performance implications: Small visual cost, but behavior depends on browser support and framework integration.
- Applicable to Venus Bridge: PARTIAL
- Pattern worth adapting: Progressive enhancement philosophy. The existing short Motion page fade was retained instead of adding a package.

## 4. Next.js View Transitions guide

- Project / repository: `vercel/next.js` view-transitions guide
- URL: https://github.com/vercel/next.js/blob/canary/docs/01-app/02-guides/view-transitions.mdx
- Licence: MIT repository
- What is useful: Direction, shared-element continuity, and explicit fallback behavior.
- Mobile pattern: Short asymmetric enter/exit transitions that do not delay navigation.
- Technology: React ViewTransition and Next.js App Router.
- Performance implications: Native transitions are efficient but the documented integration targets newer framework capabilities than this Next.js 15 project.
- Applicable to Venus Bridge: PARTIAL
- Pattern worth adapting: Keep route motion short and optional; do not make content depend on transition support.

## 5. next-transition-router

- Project / repository: `ismamz/next-transition-router`
- URL: https://github.com/ismamz/next-transition-router
- Licence: MIT
- What is useful: App Router transition lifecycle and navigation-safe cleanup.
- Mobile pattern: Overlap a subtle exit with route readiness instead of showing a loader.
- Technology: Next.js, Motion or GSAP.
- Performance implications: Adds another routing abstraction and animation coordination path.
- Applicable to Venus Bridge: PARTIAL
- Pattern worth adapting: Navigation must remain immediate. Package adoption was rejected because the existing page transition already meets the need.

## 6. SSGOI

- Project / repository: `meursyphus/ssgoi`
- URL: https://github.com/meursyphus/ssgoi
- Licence: MIT
- What is useful: Mobile-aware route transition vocabulary and Safari consideration.
- Mobile pattern: Directional continuity for list-to-detail movement.
- Technology: Cross-framework view-transition library.
- Performance implications: Additional runtime and transition architecture.
- Applicable to Venus Bridge: PARTIAL
- Pattern worth adapting: Direction should communicate hierarchy; elaborate mobile app-style transitions were not adopted.

## 7. next-page-transitions

- Project / repository: `illinois/next-page-transitions`
- URL: https://github.com/illinois/next-page-transitions
- Licence: MIT
- What is useful: A small, explicit transition contract.
- Mobile pattern: Quick fade/translation between pages.
- Technology: React and earlier Next.js routing architecture.
- Performance implications: Lightweight, but not aligned with the current App Router.
- Applicable to Venus Bridge: NO
- Pattern worth adapting: Keep page transitions comprehensible and brief; no code or dependency adopted.

## 8. Lenis

- Project / repository: `darkroomengineering/lenis`
- URL: https://github.com/darkroomengineering/lenis
- Licence: MIT
- What is useful: Careful treatment of scroll synchronization and device input.
- Mobile pattern: Smooth scroll coordination for cinematic sites.
- Technology: JavaScript scroll interpolation.
- Performance implications: Introduces continuous scroll work and can alter native expectations.
- Applicable to Venus Bridge: NO
- Pattern worth adapting: None. Native scrolling was deliberately preserved and no scroll interception was added.

## 9. Radix Primitives

- Project / repository: `radix-ui/primitives`
- URL: https://github.com/radix-ui/primitives
- Licence: MIT
- What is useful: Dialog disclosure semantics, focus containment, Escape handling, and focus restoration.
- Mobile pattern: Full-screen navigation that remains keyboard and screen-reader operable.
- Technology: React accessibility primitives.
- Performance implications: Full package adoption was unnecessary for one existing menu.
- Applicable to Venus Bridge: YES
- Pattern worth adapting: `aria-expanded`, dialog labeling, Escape dismissal, scroll lock, and opener focus restoration; implemented locally.

## 10. Ariakit

- Project / repository: `ariakit/ariakit`
- URL: https://github.com/ariakit/ariakit
- Licence: MIT
- What is useful: Detailed focus behavior, inert/modal tradeoffs, Safari focus handling, and disclosure cleanup.
- Mobile pattern: Progressive menu reveal without losing document semantics.
- Technology: Accessible React component primitives.
- Performance implications: No need to add a full component library to the current design system.
- Applicable to Venus Bridge: YES
- Pattern worth adapting: Preserve logical focus order and return focus to the menu trigger.

## 11. Motion Primitives

- Project / repository: `ibelick/motion-primitives`
- URL: https://github.com/ibelick/motion-primitives
- Licence: MIT
- What is useful: Small composable motion patterns and staged text/media hierarchy.
- Mobile pattern: One meaningful animated state per component rather than decorative continuous motion.
- Technology: React and Motion.
- Performance implications: Vendoring many primitives would expand surface area and visual density.
- Applicable to Venus Bridge: PARTIAL
- Pattern worth adapting: Independent, minimal section progress and reveal patterns; no component copied.

## 12. GSAP React guidance

- Project / repository: `greensock/gsap-skills`
- URL: https://github.com/greensock/gsap-skills
- Licence: MIT for the guidance repository
- What is useful: Scoped animation lifecycle, cleanup, and avoiding React/SSR conflicts.
- Mobile pattern: Short pinned narratives and scroll-triggered sequences.
- Technology: GSAP, ScrollTrigger, React.
- Performance implications: Adding GSAP beside Motion would create two animation architectures and additional bundle cost.
- Applicable to Venus Bridge: NO
- Pattern worth adapting: Cleanup discipline only. GSAP was not installed.

## Adopted reference principles

1. Use Intersection Observer reading bands instead of permanent RAF loops.
2. Use short sticky context, never scroll-jacking.
3. Keep navigation focus-safe, dismissible, and immediate.
4. Animate transform, opacity, and restrained clip paths.
5. Let reduced-motion users receive the complete layout without hidden content.
6. Preserve native scrolling and avoid a second animation stack.
