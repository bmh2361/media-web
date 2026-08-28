# Venus Bridge Media — Content and proof diagnosis

Date: 17 July 2026  
Status: repository audit after the About Us and Fashion, Beauty & Apparel implementation.

## Executive finding

The site now explains the offer more clearly than it proves it. Service scope, bilingual coordination and project governance are credible, but the repository contains **no client-approved real case study**. The six Work records are intentionally disclosed concept models. Concert, interview, automotive, fashion, event and agency-support directions mentioned in the brief remain unverified candidates and are not safe to publish as completed work.

The immediate content priority is not more marketing copy. It is a small set of approved evidence packages: one strong production project, one live event project, one interview/technology or professional-content project, plus approved behind-the-scenes team material.

## Audit classification

- **Public visible text:** active navigation, About Us, Industries, service pages, Talent, Work, Contact and Footer use the current Venus Bridge Media brand. `About Us / 关于我们` is now the active label.
- **SEO and structured data:** active metadata is generated per route. About Us and Fashion, Beauty & Apparel now have specific bilingual titles/descriptions and breadcrumb JSON-LD.
- **Routes:** `/about` is retained to avoid URL migration risk. `/industries/fashion-beauty-apparel` is new because no dedicated sector route previously existed.
- **Active content configuration:** `content/pages/*`, `content/navigation.ts`, `content/team.ts`, `content/cases/*`, active parts of `content/site.ts` and `content/media.ts`.
- **Types and release gates:** `content/types.ts`, `content/cases/template.ts`, `content/cases/index.ts`.
- **Media and alt:** all critical media remains placeholder-governed. The previous jewellery industry asset is retained only as a non-critical adjacent-category archive.
- **Tests:** unit and browser contracts now cover About Us, team gating, sector naming and real-case eligibility.
- **Development fixtures:** `public/media/demo/*` and concept media IDs are development aids, not client evidence.
- **Deprecated but retained:** `content/site.ts` still contains unused legacy About, industry and case collections consumed only by dead components such as `CaseStudyGrid` and `IndustryStrip`. They are not public routes and should be removed only in a separately approved cleanup.
- **Internal legacy identifiers:** fields such as `frameBridgeRole` and responsibility keys are non-public schema identifiers. Renaming them is a migration task, not a visible brand correction.

## 1. Homepage

- **Current purpose:** Explain audience, London location, four core capabilities and a route to enquiry.
- **Current content problem:** The value proposition is clear, but the project area still shows disclosed concept scenarios rather than proof.
- **Missing business explanation:** Add one concise line on when Venus Bridge Media acts as lead producer versus local/white-label partner.
- **Missing deliverables:** A representative delivery strip covering stills, short-form video, event capture and organised handoff.
- **Missing proof:** Three approved projects maximum; no client-approved project currently exists in the repository.
- **Best case studies to add:** strongest completed artist/brand production; one event or exhibition; one interview/technology project.
- **Required images or video:** one approved 16:9 production hero, three project covers and optional short muted reel.
- **Required client approval:** client/artist name, role wording, media, likeness, logo and homepage placement.
- **Required data:** project date/location, exact role, final deliverables and one verifiable evidence item.
- **Priority:** P0.
- **Production blocker:** all critical homepage media and portfolio evidence are unapproved.
- **Recommended next action:** complete three case intake forms, then promote only the strongest one to the first viewport below the Hero.

## 2. Services overview

- **Current purpose:** Present four core services and the secondary specialist route.
- **Current content problem:** Good hierarchy, but capability summaries remain similar in tone and lack proof at the decision point.
- **Missing business explanation:** Clarify which service owns production accountability and which services are optional components.
- **Missing deliverables:** Add two or three concrete output examples per service, always qualified by scope.
- **Missing proof:** One approved mini-proof per core service.
- **Best case studies to add:** campaign production, talent/styling, event delivery and anonymised agency support.
- **Required images or video:** approved still or behind-the-scenes frame per service, not generic stock.
- **Required client approval:** role, image rights and any white-label confidentiality boundary.
- **Required data:** typical lead time inputs, approval owners and handoff formats.
- **Priority:** P1.
- **Production blocker:** service Hero assets remain placeholders.
- **Recommended next action:** use approved case snippets, not additional abstract value statements.

## 3. Creative & Commercial Production

- **Current purpose:** Explain campaign, photography, film, interview and social production.
- **Current content problem:** Scope is concrete, but the page cannot yet prove shoot quality or delivered formats.
- **Missing business explanation:** State whether creative direction, production, capture and post-production were each included in example work.
- **Missing deliverables:** real counts and formats from an approved project; do not imply every project includes retouching or editing.
- **Missing proof:** approved campaign, concert media or founder-interview case.
- **Best case studies to add:** artist concert imagery; two-camera 4K founder interview; fashion/apparel campaign.
- **Required images or video:** call sheet-safe BTS, final stills, frame grabs, delivery contact sheet.
- **Required client approval:** artist/talent likeness, venue, customer name, music and final output rights.
- **Required data:** crew role, cameras/audio only if accurate, shoot date, edit scope, channels and delivery timing.
- **Priority:** P0.
- **Production blocker:** production Hero and case evidence are unapproved.
- **Recommended next action:** onboard the interview project first if it has the cleanest rights chain.

## 4. Talent, Casting & Styling

- **Current purpose:** Explain private matching of models, actors, presenters, makeup, hair and styling resources.
- **Current content problem:** The category list is detailed, but it can read like a live roster without approved role examples.
- **Missing business explanation:** Explain shortlist confidentiality, booking interface, usage negotiation and who contracts talent.
- **Missing deliverables:** approved shortlist format, usage matrix, styling plan and call information examples.
- **Missing proof:** presenter, casting, makeup/hair or wardrobe coordination from a completed B2B project.
- **Best case studies to add:** event presenter; apparel casting/styling; artist makeup/hair only if the commercial context is publishable.
- **Required images or video:** approved working portraits or BTS; never publish private talent sheets.
- **Required client approval:** talent, agent, client and photographer permissions; usage territory/duration.
- **Required data:** role, number of people, booking responsibility, usage and whether collaborators were freelance/project-based.
- **Priority:** P1.
- **Production blocker:** no approved public talent profiles or talent case media.
- **Recommended next action:** create one anonymised role-led proof before considering named talent.

## 5. Events, PR & Exhibitions

- **Current purpose:** Explain feasibility, venue/supplier coordination, live delivery and content capture.
- **Current content problem:** Operational language is credible, but scale and actual responsibility are unproven.
- **Missing business explanation:** Separate event production, media documentation, presenter/interview and PR support responsibilities.
- **Missing deliverables:** run-of-show, capture list, event selects, highlight edit and handoff examples.
- **Missing proof:** completed concert, brand event, exhibition or PR interview project.
- **Best case studies to add:** London artist concert; completed brand launch; completed exhibition media assignment.
- **Required images or video:** stage/venue wide, crew-at-work, interview frame, approved final social output.
- **Required client approval:** organiser, venue, artist/speaker, attendee and logo permissions.
- **Required data:** event date, audience description without unsupported numbers, exact role and turnaround.
- **Priority:** P0.
- **Production blocker:** event Hero and all candidate event evidence are unapproved.
- **Recommended next action:** verify which event was actually delivered versus quoted, then intake only completed work.

## 6. UK Production & Agency Support

- **Current purpose:** Offer feasibility, local crew/supplier coordination and white-label delivery.
- **Current content problem:** Strong operating model, but no approved anonymised agency example demonstrates the handoff.
- **Missing business explanation:** State client ownership, review interfaces, confidentiality and supplier/payment responsibility for each engagement.
- **Missing deliverables:** feasibility memo, supplier plan, version index, release notes and handoff structure.
- **Missing proof:** a real anonymised UK execution project for a Chinese agency or PR team.
- **Best case studies to add:** white-label local production; venue/crew coordination; overseas creative executed in the UK.
- **Required images or video:** rights-cleared BTS that does not reveal the end client; diagrams may support but cannot replace evidence.
- **Required client approval:** agency permission, end-client boundary and NDA review.
- **Required data:** location, time window, project team, exact responsibilities and delivered files.
- **Priority:** P0.
- **Production blocker:** no approved anonymous case and agency Hero is placeholder.
- **Recommended next action:** request written permission for an anonymised operational case.

## 7. Specialist & Innovation Projects

- **Current purpose:** Present technical interviews, research communication and specialist event work as a secondary capability.
- **Current content problem:** It correctly avoids institutional claims but lacks a concrete completed communication example.
- **Missing business explanation:** Clarify review ownership, technical fact-checking and the limits of Venus Bridge Media's subject expertise.
- **Missing deliverables:** interview outline, reviewed explainer, product demo and conference asset examples.
- **Missing proof:** AI product explanation, founder/expert interview or technical event content.
- **Best case studies to add:** two-camera founder interview; approved AI product demo; expert panel capture.
- **Required images or video:** interview frame, audio setup, approved demo footage and published output capture.
- **Required client approval:** technical claims, speaker, institution, product and publication permissions.
- **Required data:** subject, review owner, content purpose, channels, final edits and evidence URL.
- **Priority:** P1.
- **Production blocker:** specialist Hero is placeholder and candidate status is unknown.
- **Recommended next action:** prioritise an interview project with a simple, verifiable approval chain.

## 8. Industries overview

- **Current purpose:** Show how production requirements vary by sector.
- **Current content problem:** Five non-fashion sectors remain concise overview sections rather than full decision pages.
- **Missing business explanation:** Add client inputs and scope boundaries for automotive, technology, events/culture and consumer work.
- **Missing deliverables:** sector-specific examples beyond two-item lists.
- **Missing proof:** one approved case mapped to each promoted sector; do not create empty sector pages without evidence.
- **Best case studies to add:** apparel campaign, automotive event, technology interview, live event and consumer product production.
- **Required images or video:** one approved sector image per promoted category.
- **Required client approval:** client/category, media, product, venue and claims approval.
- **Required data:** sector, audience, channels, location, role and deliverables.
- **Priority:** P1.
- **Production blocker:** six remaining critical industry assets are placeholders.
- **Recommended next action:** add dedicated routes only when content depth or proof justifies them.

## 9. Fashion, Beauty & Apparel

- **Current purpose:** Explain London campaigns, lookbooks, e-commerce/social production, casting and styling.
- **Current content problem:** The new page is operationally complete but evidence-free.
- **Missing business explanation:** Add a real example showing how model, makeup, hair, wardrobe, location and formats were coordinated.
- **Missing deliverables:** confirmed image/video counts and edits from a completed B2B project.
- **Missing proof:** approved clothing, beauty or fashion brand project; personal consumer photography is not sufficient.
- **Best case studies to add:** apparel lookbook; beauty launch content; brand campaign with casting/styling.
- **Required images or video:** campaign hero, BTS, horizontal/vertical outputs and approved contact sheet.
- **Required client approval:** brand, model, makeup/hair/stylist, location and usage rights.
- **Required data:** collection/product list, market, channels, territories, date and agreed scope.
- **Priority:** P0.
- **Production blocker:** no approved B2B case; current industry images are placeholders.
- **Recommended next action:** classify available imagery as B2B, artist-related or consumer work before selecting any public proof.

## 10. Automotive

- **Current purpose:** Describe vehicle access, presenter, event and location coordination.
- **Current content problem:** Goodwood and automotive directions are only possibilities; execution status is not recorded.
- **Missing business explanation:** Separate event hosting, livestream, video capture, client hospitality and logistics roles.
- **Missing deliverables:** presenter scripts, live segments, exterior/interior content, social edits and event documentation where actually delivered.
- **Missing proof:** a completed automotive brand/event project with permission.
- **Best case studies to add:** completed Goodwood-type assignment, automotive launch or approved presenter/road content.
- **Required images or video:** vehicle/event access, presenter frame and final published content.
- **Required client approval:** brand/logo, vehicle, venue/event, presenter and music/broadcast rights.
- **Required data:** completed versus quoted status, client type, exact role, date, location and outputs.
- **Priority:** P0 for diagnosis, P2 for a dedicated page.
- **Production blocker:** status and rights are unconfirmed; automotive media is placeholder.
- **Recommended next action:** obtain a written status table before using any brand or Goodwood reference.

## 11. Technology & AI

- **Current purpose:** Explain reviewed product, demo and interview content.
- **Current content problem:** The site has a concept model but no verified client/product evidence.
- **Missing business explanation:** Show the review route for claims, demo accuracy and confidential information.
- **Missing deliverables:** reviewed long interview, short cuts, demo film and exhibition assets.
- **Missing proof:** completed AI/product interview, founder content or technical event.
- **Best case studies to add:** founder interview; AI product explanation; expert panel.
- **Required images or video:** interview setup, product/demo frames and published output evidence.
- **Required client approval:** product claims, spokesperson, company name/logo and publication.
- **Required data:** target audience, review owner, versions, channels and verified outcome.
- **Priority:** P1.
- **Production blocker:** no approved real record.
- **Recommended next action:** intake the two-camera interview direction and verify editing/delivery scope.

## 12. Events / Culture / Entertainment

- **Current purpose:** Cover concerts, cultural programmes, public events and rapid media capture.
- **Current content problem:** Current Work content is a concept plan; it must not imply the named artist or official status.
- **Missing business explanation:** Define whether the role was official media, supplier, independent coverage or event execution.
- **Missing deliverables:** confirmed stills, video, interview, social selects and turnaround.
- **Missing proof:** completed artist concert or cultural event with publication permission.
- **Best case studies to add:** artist concert imagery; cultural launch; press/interview programme.
- **Required images or video:** approved stage, backstage, audience and final output; audience privacy considered.
- **Required client approval:** artist/management, promoter, venue, attendees and music rights.
- **Required data:** exact official relationship, event/date, role, team and delivered outputs.
- **Priority:** P0.
- **Production blocker:** official status and all rights are unconfirmed.
- **Recommended next action:** do not name an artist until management approval and role evidence are stored.

## 13. About Us

- **Current purpose:** Explain identity, legal relationship, audience, responsibilities, working model and team structure.
- **Current content problem:** The rebuilt page is complete at company level, but named leadership and visual team proof remain intentionally absent.
- **Missing business explanation:** Founder rationale only after an approved first-person statement is supplied.
- **Missing deliverables:** no further generic deliverables are required; representative proof points would strengthen the page.
- **Missing proof:** one or two approved project proof points and authentic team-at-work material.
- **Best case studies to add:** one production and one local-execution proof, referenced briefly rather than shown as a portfolio grid.
- **Required images or video:** real coordination, set, backstage, makeup/styling or production-prep images.
- **Required client approval:** team image consent, client/venue rights and named-member public approval.
- **Required data:** name, title, relationship, bio, languages, location and responsibilities for each public member.
- **Priority:** P0 for team data, P1 for proof.
- **Production blocker:** no named member profile or team photography is approved.
- **Recommended next action:** complete the team template; publish role-only cards until approval is complete.

## 14. Production Scenarios / Work

- **Current purpose:** Demonstrate how six hypothetical UK briefs can be structured.
- **Current content problem:** All six records are concepts. They are useful planning content but cannot prove completed delivery.
- **Missing business explanation:** When portfolio mode is eventually enabled, clearly separate case evidence from scenario education.
- **Missing deliverables:** real deliverables only after project intake; current concept outputs remain illustrative.
- **Missing proof:** at least one completed, approved case with full brief, role, deliverables and evidence.
- **Best case studies to add:** concert/event; founder interview; apparel campaign; anonymised agency delivery.
- **Required images or video:** approved case media with project mapping and rights record.
- **Required client approval:** client, media, legal and publication approval.
- **Required data:** all fields in the case intake document plus evidence record.
- **Priority:** P0.
- **Production blocker:** portfolio eligibility returns false for every current record.
- **Recommended next action:** keep `PUBLIC_WORK_MODE=scenarios` or `hidden`; never set `portfolio` to make concepts look real.

## 15. Contact

- **Current purpose:** Capture quick enquiries and structured full briefs.
- **Current content problem:** Strong form coverage, but users may not understand which materials to attach or link before starting.
- **Missing business explanation:** Add a short pre-form note listing useful references, product lists and approval contacts.
- **Missing deliverables:** form already captures formats and adaptive service needs; no public promise should be added.
- **Missing proof:** not required; a small confidentiality/process assurance may help.
- **Best case studies to add:** none. Contact should focus on conversion, not a portfolio wall.
- **Required images or video:** none required; an approved working image is optional.
- **Required client approval:** privacy/legal review of added fields and retention.
- **Required data:** production delivery endpoint, allowed origins and public contact channels.
- **Priority:** P1.
- **Production blocker:** real delivery endpoint, distributed rate limiter and live verification remain unconfigured.
- **Recommended next action:** validate a production webhook and complete the existing contact release checklist.

## 16. Footer and legal pages

- **Current purpose:** Provide navigation, trading-name disclosure, privacy and terms.
- **Current content problem:** Trading relationship is accurate, but statutory company fields are deliberately absent.
- **Missing business explanation:** none beyond confirmed legal identity and contact route.
- **Missing deliverables:** not applicable.
- **Missing proof:** legal review and public company-detail confirmation.
- **Best case studies to add:** none.
- **Required images or video:** none.
- **Required client approval:** legal counsel/company owner approval.
- **Required data:** Vivian Adventure Ltd legal name, company number, registered office, effective dates and approved contact details.
- **Priority:** P0 before production.
- **Production blocker:** production validator correctly fails without these factual fields and confirmations.
- **Recommended next action:** complete legal configuration; never substitute Venus Bridge Media Ltd.

## Content that must not go live now

- Any artist name, official-concert claim or concert media without management/promoter permission.
- Goodwood, automotive brand or travel-group claims that are only quoted, proposed or not evidenced as delivered.
- Founder name, biography, image or Person structured data before explicit approval.
- Consumer makeup/photography presented as a B2B brand campaign.
- Client logos, metrics, testimonials or outcomes without a stored source and publication approval.
- Demo media, placeholders, concept diagrams or AI-generated people presented as real staff or client work.

## Phase 10 addendum — UK market entry and roadshows

- **Current capability evidence:** The repository supports production, talent, events, bilingual coordination and UK local delivery, but contains no verified company-formation, legal, tax, ACSP, trade mark, product-compliance or FCA partner record.
- **Public wording risk:** No guarantee of registration, banking, market access or compliance was found. Existing specialist copy already uses approval-aware language and is now governed by one responsibility boundary.
- **Minimum viable public state:** `coordination` only—requirements gathering, document organisation, timelines, referrals, claims/evidence workflow, launch communications and roadshow production.
- **Must not go live as partnered:** Partner names/logos, professional-team claims, regulated advice, filing claims, financial-promotion approval or completed market-entry/roadshow case claims.
- **Missing proof:** Verified partners, independent legal review, secure sensitive-document process, referral/data-sharing terms, professional insurance, completed project evidence, client disclosure and approved media.
- **Next action:** Complete the market-entry content-required and partner-requirements templates; keep production validation fail closed until the evidence is supplied.
