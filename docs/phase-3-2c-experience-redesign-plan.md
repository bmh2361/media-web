# Phase 3.2C Experience Redesign Plan

This plan was completed before production UI changes.

## Home

**Current problem:** one Changan hero and three automotive early-proof cards narrow perception; outcome and capability sections read like strategy slides; internal proof language is visible.  
**Proposed experience:** editorial four-scene hero, four-project activity rail, outcome-to-media interaction, capability previews and a more cinematic selected-work rhythm within the existing eight sections.  
**Media strategy:** balance Changan, robotics, interview/people, creator product, CATL, Teal and London film.  
**Layout strategy:** text/media hero; horizontally clipped rail on desktop and snap rail on mobile; outcome list paired with one stable media stage.  
**Interaction strategy:** slow desktop hero with manual controls; keyboard/touch outcome selection; all content visible without interaction.  
**Copy changes:** retain strategic hero; replace “Proof before explanation” and evidence/governance headings.  
**Proof changes:** move from three automotive cases to a launch/technology-energy/talent/creative mix.  
**Mobile strategy:** static technology hero, one intentional horizontal rail only, stacked outcomes.  
**Performance:** preload first hero only; lazy-load all other scenes; use existing derivatives.

## Capabilities

**Current problem:** four repeated left-title/right-content sections; internal proof-type labels; technology, creators and output range are visually thin.  
**Proposed experience:** interactive index plus four distinct grammars: institutional report, industry visual chapters, creator campaign wall and production output sequence.  
**Media strategy:** text-only institutional; Changan/CATL/Leapmotor/robotics/design talk for Industry; creator/product/fashion frames for People; film/interview/event/beauty output for Production.  
**Layout strategy:** each chapter uses a different grid and rhythm while keeping shared spacing, type and palette.  
**Interaction strategy:** index anchors; industry sequence; campaign wall; no unnecessary sticky system on mobile.  
**Copy changes:** client possibility language; no “Visual Proof” or “Process Proof” headings.  
**Proof changes:** evidence remains precise; capability media is never promoted to named case evidence.  
**Mobile strategy:** natural scroll, restrained media count, no repeated carousels.  
**Performance:** lazy-load chapter media; derivative sizes match display roles.

## Work

**Current problem:** black template hero and evidence-tier groups make Work feel like an internal register.  
**Proposed experience:** visual-first mosaic, up to four featured projects, then a curated supporting selection.  
**Media strategy:** named public projects only; Changan, CATL, Teal and London film lead.  
**Layout strategy:** asymmetric hero mosaic, alternating feature rows, compact supporting grid.  
**Interaction strategy:** direct project links; no heavy filtering unless future volume requires it.  
**Copy changes:** remove Execution Cases, Capability Evidence, Proves, Precise Roles and Visible Evidence from primary display.  
**Proof changes:** project role/location/year remain; proof tiers stay internal.  
**Mobile strategy:** stable crops and clear tap targets; no dense metadata.  
**Performance:** first mosaic image priority only; remaining work media lazy.

## Case study

**Current problem:** all cases share one 16:8 hero; fashion/talent crops are unsuitable; role/output blocks repeat; Evidence Boundary reads like governance.  
**Proposed experience:** adaptive cinematic or portrait editorial hero followed by Context, Venus Bridge Role, What We Delivered, Capabilities and visual narrative.  
**Media strategy:** choose hero layout from governed orientation/project family; keep protected subjects/logos/text.  
**Layout strategy:** project-specific hero proportions within a consistent narrative system.  
**Interaction strategy:** next-project transition and relevant conversation CTA.  
**Copy changes:** remove internal boundary heading and duplicated outputs.  
**Proof changes:** no new claims; schema continues to fail closed.  
**Mobile strategy:** portrait heroes remain portrait; wide projects retain context with contain/4:3 treatment.  
**Performance:** existing derivatives and gallery lazy loading.

## About

**Current problem:** repeats Home’s project system and ends in governance language; little humanity.  
**Proposed experience:** Why We Exist, Built Between Two Commercial Worlds, What We Bring, How We Operate and CTA.  
**Media strategy:** real UK location production and technology environment; no stock or invented team portrait.  
**Layout strategy:** editorial manifesto with asymmetric working-scene composition.  
**Interaction strategy:** reading-led; restrained reveals only.  
**Copy changes:** remove “fragmented landscape” and “credible boundary” as major public frames.  
**Proof changes:** supported London delivery, bilingual coordination, real environments and production only.  
**Mobile strategy:** concise paragraphs and full-width contextual images.  
**Performance:** two below-fold capability images, lazy loaded.

## Contact

**Current problem:** repeats the generic black hero grammar and can feel like a form application.  
**Proposed experience:** direct conversation headline flowing into a calm, low-friction form.  
**Media strategy:** none.  
**Layout strategy:** shorter hero, expectation-setting side note, generous but purposeful form rhythm.  
**Interaction strategy:** clear focus, inline errors, success confirmation and keyboard completion.  
**Copy changes:** “Tell us what you want to make happen in the UK.”  
**Proof changes:** none; trust comes from clarity.  
**Mobile strategy:** single column, large controls, no decorative obstruction.  
**Performance:** no page media; minimise client work beyond the form.

## Implementation sequence and verification

1. Add only the media role metadata needed by the selected assets; validate rights and crops.
2. Build shared editorial media/hero primitives without replacing the brand system.
3. Implement Home while preserving exactly eight major sections.
4. Implement four distinct Capabilities chapters and empty-safe Selected Engagements infrastructure.
5. Redesign Work and adaptive cases with named public projects only.
6. Refocus About and polish Contact.
7. Validate EN/ZH at 1440, 1280, 768 and 390 px; verify keyboard, touch and reduced motion.
8. Run TypeScript, lint, unit, build, content/claim/media/rights, routes, redirects, accessibility, performance and console checks.
