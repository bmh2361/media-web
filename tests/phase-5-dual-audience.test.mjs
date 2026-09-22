import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const read = (file) => fs.readFileSync(file, "utf8");

test("Phase 5 exposes the required dual-audience navigation", () => {
  const navigation = read("content/phase5.ts");
  for (const label of [
    "Home",
    "For Chinese Companies",
    "For UK & European Partners",
    "Case Studies",
    "Services",
    "Contact",
    "Discuss a UK Project"
  ])
    assert.match(navigation, new RegExp(label));
  for (const route of ["app/[lang]/companies/page.tsx", "app/[lang]/partners/page.tsx"])
    assert.equal(fs.existsSync(route), true);
});

test("homepage routes audiences through technology focus, evidence and team credibility", () => {
  const home = read("components/sections/Phase5Homepage.tsx");
  const order = [
    'data-phase5-section="hero"',
    'id="priority-areas"',
    "<SelectedCommercialExperience ",
    "PEOPLE & RESPONSIBILITY"
  ];
  assert.doesNotMatch(home, /<Situations|<Engagements|<CommercialProcess/);
  assert.match(home, /withLanguage\("\/companies"/);
  assert.match(home, /withLanguage\("\/partners"/);
  let cursor = -1;
  for (const section of order) {
    const next = home.indexOf(section);
    assert.ok(next > cursor, section + " must follow the previous section");
    cursor = next;
  }
});

test("capabilities is secondary and redirects to Services", () => {
  const redirects = read("public/_redirects");
  assert.match(redirects, /\/en\/capabilities \/en\/services 308/);
  assert.match(redirects, /\/zh\/capabilities \/zh\/services 308/);
  assert.match(read("app/[lang]/capabilities/page.tsx"), /redirect\(withLanguage\("\/services"/);
});

test("partner claims fail closed and contact uses direct static channels", () => {
  const collaborators = read("content/collaborators.ts");
  assert.match(collaborators, /export const collaborators: CollaboratorRecord\[\] = \[\]/);
  assert.match(collaborators, /publicDisplayPermission && item\.relationshipStatus !== "D-target-only"/);
  const contact = read("components/sections/ContactExperience.tsx");
  assert.match(contact, /data-contact-delivery="direct-only"/);
  assert.match(contact, /company\.contactMethods\.wechat/);
  assert.match(contact, /mailto:\$\{CONTACT_EMAIL\}/);
  assert.doesNotMatch(contact, /<form|fetch\(/);
});

test("Work uses filters over the published dataset and keeps institutional evidence fail-closed", () => {
  const work = read("components/sections/PortfolioWork.tsx");
  const index = read("components/sections/CommercialCaseIndex.tsx");
  const portfolio = read("content/portfolio.ts");
  assert.match(work, /publishedPortfolioProjects/);
  for (const category of [
    "market-presence",
    "industry-credibility",
    "institutional-talent",
    "brand-evidence"
  ])
    assert.match(portfolio, new RegExp(category));
  assert.match(index, /No projects are currently listed in this category/);
  assert.match(portfolio, /filter\(isPublishedPortfolioProject\)/);
  assert.doesNotMatch(work, /universityTalentCases|commercial-evidence/);
  const cases = read("content/commercial-evidence.ts");
  for (const slug of [
    "cambridge-student-community-cultural-programme",
    "uk-university-talent-engagement-programme",
    "london-university-community-activation"
  ])
    assert.match(cases, new RegExp(slug));
  assert.match(cases, /institutionalRelationshipLevel/);
  assert.match(cases, /mediaStatus/);
});
