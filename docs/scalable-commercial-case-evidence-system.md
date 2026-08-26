# Scalable Commercial Case Evidence System

Date: 21 August 2026  
Status: Implemented and production-build verified

## Executive outcome

Venus Bridge Media remains positioned as a **Cross-Border Collaboration & Market Presence Partner**. The implementation changes how evidence is governed and explored; it does not change the strategic category. One canonical, bilingual case collection now controls homepage selection, archive order and filtering, detail routes, related evidence, metadata, Open Graph imagery, static generation and sitemap inclusion.

The system is deliberately evidence-rich but visually restrained. Homepage image density is lower, Work is a table-led archive, and case detail pages explain the commercial objective and Venus Bridge responsibility before visual production. Unverified institutional and talent records remain outside the published collection.

## System architecture

- `content/portfolio.ts` is the canonical case source and owns classification, commercial objective, publication state, evidence state, media state, archive order, homepage selection and related-case relationships.
- `publishedPortfolioProjects` is the fail-closed public collection. Publication requires `published`, verified evidence, website/media/copyright approval, client approval and legal approval.
- `homepagePortfolioProjects` derives from that public collection; the homepage does not maintain a second list of case slugs.
- `CommercialCaseIndex` is shared by homepage and Work. It provides real links, current-result numbering, filters, focus/hover selection, reduced-motion behaviour, a stable desktop preview and no mobile preview.
- Detail routes use published-only static parameters and lookup. Related evidence is resolved from explicit relationships first, then category affinity.
- The sitemap and case metadata consume the published collection only. Each case has a distinct title, description and approved case image where available.

## Commercial hierarchy

The archive taxonomy is:

1. Market Presence
2. Industry Credibility
3. Institutional & Talent
4. Brand Evidence

Institutional & Talent is structurally ready but intentionally empty on the public archive until evidence and permission checks pass. The interface explains that boundary instead of presenting speculative records or placeholder cards.

## Quality verification

- Responsive matrix: 1440, 1280, 1024, 768, 430 and 375 pixels.
- Languages: English and Chinese.
- Pages at every required breakpoint: homepage, Work, BYD detail and London Automotive Brand Story Film detail.
- Interaction checks: filter counts, true link targets, fixed desktop preview, hover selection, keyboard focus selection, mobile preview removal and institutional empty state.
- Detail checks: 01–08 commercial narrative, related links, image bounds and empty-media fallback.
- Automated checks: TypeScript, ESLint, Node contract suite, production build and production-mode Playwright suite.

## Final delivery report

1. **Strategic positioning changed:** NO

2. **Canonical Case System:** IMPLEMENTED

3. **Homepage Selected Case Index:** IMPLEMENTED

4. **Work Archive:** IMPLEMENTED

5. **Individual Case Routes:** IMPLEMENTED

6. **Hover Preview:** IMPLEMENTED

7. **Commercial Filters:** IMPLEMENTED

8. **Existing strong cases migrated:** 9

9. **Weak / demoted cases:** UK Editorial Brand Asset Series, International Apparel Campaign Assets and UK Beauty & Talent Content remain supporting Brand Evidence and are not homepage-selected. Unverified Cambridge / UK university / London university programme records were removed from public case presentation.

10. **University / Talent architecture:** READY

11. **Homepage image density:** REDUCED

12. **Photography-company perception:** 2/10

13. **Event-agency perception:** 2/10

14. **Cross-border commercial clarity:** 9.5/10

15. **Case discoverability:** 9.5/10

16. **Scalability:** 9.5/10

17. **English:** PASS

18. **Chinese:** PASS

19. **Desktop:** PASS

20. **Tablet:** PASS

21. **Mobile:** PASS

22. **Keyboard accessibility:** PASS

23. **Reduced motion:** PASS

24. **SEO:** PASS

25. **Sitemap:** PASS

26. **TypeScript:** PASS

27. **Lint:** PASS

28. **Tests:** Node suite: 114 passed / 0 failed / 11 explicit historical skips. Production-mode Playwright suite: 82 passed / 0 failed / 44 project-specific skips.

29. **Production build:** PASS

30. **Files changed:**
    - `content/portfolio.ts`
    - `components/sections/CommercialCaseIndex.tsx`
    - `components/sections/PortfolioWork.tsx`
    - `components/sections/PortfolioProjectDetail.tsx`
    - `components/sections/Phase5Homepage.tsx`
    - `components/sections/Phase5AudiencePages.tsx`
    - `app/[lang]/work/page.tsx`
    - `app/[lang]/work/[slug]/page.tsx`
    - `app/[lang]/about/page.tsx`
    - `app/sitemap.ts`
    - `lib/seo.ts`
    - `scripts/validate-release.mjs`
    - current unit and Playwright contract files under `tests/` and `e2e/`

31. **New case data files:** No parallel case file was created. The existing canonical `content/portfolio.ts` was upgraded so the architecture retains one source of truth. `content/commercial-evidence.ts` remains a non-public future-evidence register and is not imported by Work.

32. **New case routes/components:** `components/sections/CommercialCaseIndex.tsx`; the existing localized `/[lang]/work` and `/[lang]/work/[slug]` routes were upgraded to canonical published-only behaviour.

33. **Remaining human evidence required:**
    - Exact institution identity and approved public wording for each university/talent programme.
    - Written publication permission for institution names, participant identities, logos and relationship descriptions.
    - Confirmed dates, locations, programme scope, Venus Bridge responsibility and public outputs.
    - Client-approved commercial-use and continued-value statements where currently absent.
    - Any measured outcomes must be supplied and approved before publication; none are inferred by this system.

34. **Report:** `/docs/scalable-commercial-case-evidence-system.md`

## Governance decision

A future case should be published only when it helps a prospective client identify a relevant business situation and understand Venus Bridge's evidenced responsibility. Records that mainly demonstrate photography, event coverage, production craft or access to people remain supporting evidence until a verified commercial context and role boundary are available.
