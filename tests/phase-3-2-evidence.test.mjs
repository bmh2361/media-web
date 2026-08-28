import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  customerOutcomeTags,
  caseMaturityStates,
  defineCaseEvidence,
  evidenceCapabilities,
  commercialProjectTypes,
  projectFormats,
  proofTypes,
  trustDimensions,
  validateCaseEvidence,
  validateEvidenceRegister
} from "../content/evidence/case-evidence.ts";

const root = new URL("../", import.meta.url);
const source = async (path) => readFile(new URL(path, root), "utf8");

const record = () => ({
  identity: {
    caseId: "case-001",
    slug: "verified-event-case",
    maturityState: "NAMED_PUBLIC",
    language: ["en"],
    publicTitle: { en: "Verified event case" },
    internalTitle: "Verified event case",
    clientName: "Example Client",
    clientVisibility: "named",
    projectDate: "2026",
    location: "London",
    country: "United Kingdom",
    projectType: "Industry Event",
    industry: "Technology"
  },
  commercialObjective: {
    clientObjective: { en: "Document a credible UK industry event." },
    businessContext: { en: "A UK event for international stakeholders." },
    commercialProblem: { en: "The activity needed credible evidence." },
    desiredOutcome: { en: "Reusable stakeholder content." },
    primaryOutcomes: ["Industry Presence"]
  },
  projectActivity: {
    ukActivity: { en: "A live industry event in London." },
    engagementFormat: ["Industry Event"],
    participants: [],
    institutions: [],
    events: [
      {
        internalName: "Example Event",
        publicName: "Example Event",
        city: "London",
        country: "United Kingdom",
        eventContext: "Industry event",
        boothLaunchActivationScope: null,
        staffing: null,
        talent: null,
        creator: null,
        executiveContent: null,
        photography: "Event photography",
        video: null,
        stakeholderContent: "Event images",
        chinaFacingOutputs: null,
        clientFacingDeliverables: "Approved image selection"
      }
    ],
    talent: [],
    creators: [],
    experts: [],
    venues: [],
    productionElements: ["Photography"]
  },
  venusBridgeRole: {
    venusRole: { en: "Event documentation." },
    scope: { en: "Photography." },
    coordinationRole: {},
    productionRole: { en: "Photography and image delivery." },
    relationshipRole: {},
    whatWeDidNotDo: { en: "No claim of event ownership." }
  },
  outputs: {
    deliverables: [{ en: "Approved event images." }],
    contentOutputs: [{ en: "Event images." }],
    eventOutputs: [],
    relationshipOutputs: [],
    brandAssets: []
  },
  capabilityMapping: {
    capabilities: ["Industry Presence & Events", "Creative Production & Brand Assets"],
    commercialProjectTypes: ["UK Industry Presence Project"]
  },
  evidenceGovernance: {
    evidenceLevel: "A_DIRECT_VERIFIED",
    proofTypes: ["VISUAL"],
    trustDimensions: ["EXECUTION"],
    verificationNotes: ["Owner evidence checked."]
  },
  rightsAndClaims: {
    clientNameApproved: "approved",
    clientLogoApproved: "not-required",
    institutionNameApproved: "not-required",
    institutionLogoApproved: "not-required",
    participantNameApproved: "not-required",
    participantImageApproved: "not-required",
    creatorIdentityApproved: "not-required",
    venueIdentityApproved: "not-required",
    eventNameApproved: "approved",
    mediaRightsApproved: "approved",
    casePublicationApproved: "approved",
    approvedPublicWording: { en: "Approved narrow wording." },
    claimRestrictions: ["No event ownership claim."],
    verificationNotes: [],
    ownerApprovalStatus: "approved",
    relationshipLevel: "none",
    institutionRole: null,
    participantRole: null,
    formalAgreement: "not-required",
    logoPermission: "not-required",
    approvedInstitutionWording: null,
    creatorRelationshipType: "none"
  },
  media: {
    heroMedia: [
      {
        assetId: "hero",
        filename: "hero.jpg",
        kind: "image",
        evidentialFunction: "Shows the live event context.",
        rightsStatus: "approved",
        publicUseStatus: "approved"
      }
    ],
    galleryMedia: [],
    video: [],
    documents: [],
    pressEvidence: [],
    screenshots: [],
    eventEvidence: [],
    supportingAssets: []
  },
  conversionRole: {
    homepageProofEligible: false,
    selectedWorkEligible: false,
    capabilityProofEligible: true,
    programmeProofEligible: true,
    workIndexEligible: true,
    dedicatedCaseStudyEligible: true,
    contactPreCTAEligible: false,
    archiveOnly: false
  },
  evidenceStrength: {
    heroEvidence: false,
    coreEvidence: true,
    supportingEvidence: false,
    visualEvidence: false,
    archive: false
  }
});

test("Phase 3.2 uses controlled frozen taxonomies", () => {
  assert.equal(evidenceCapabilities.length, 4);
  assert.equal(commercialProjectTypes.length, 4);
  assert.equal(customerOutcomeTags.length, 10);
  assert.ok(projectFormats.length <= 15);
  assert.deepEqual(proofTypes, ["VISUAL", "RELATIONSHIP", "PROCESS"]);
  assert.deepEqual(caseMaturityStates, ["PRIVATE", "ANONYMOUS_PUBLIC", "NAMED_PUBLIC", "FEATURED"]);
  assert.deepEqual(trustDimensions, ["ACCESS", "ORCHESTRATION", "EXECUTION"]);
  assert.doesNotThrow(() => defineCaseEvidence(record()));
});

test("public evidence fails closed on level, rights and owner approval", () => {
  const unsafe = record();
  unsafe.evidenceGovernance.evidenceLevel = "C_OPERATING_CAPABILITY_NO_PUBLIC_CASE";
  unsafe.rightsAndClaims.casePublicationApproved = "unknown";
  unsafe.rightsAndClaims.mediaRightsApproved = "unknown";
  unsafe.rightsAndClaims.ownerApprovalStatus = "pending";
  const errors = validateCaseEvidence(unsafe).join("\n");
  assert.match(errors, /Level C or D evidence cannot receive a public case placement/);
  assert.match(errors, /case publication approval/);
  assert.match(errors, /approved media rights/);
  assert.match(errors, /owner approval/);
});

test("institution and creator relationship claims require exact evidence", () => {
  const unsafe = record();
  unsafe.rightsAndClaims.relationshipLevel = "university-formal-collaboration";
  unsafe.rightsAndClaims.formalAgreement = "unknown";
  unsafe.rightsAndClaims.institutionNameApproved = "approved";
  unsafe.rightsAndClaims.creatorIdentityApproved = "approved";
  unsafe.rightsAndClaims.creatorRelationshipType = "unknown";
  const errors = validateCaseEvidence(unsafe).join("\n");
  assert.match(errors, /approved institution name requires its exact role/);
  assert.match(errors, /approved institution name requires approved institution wording/);
  assert.match(errors, /formal university collaboration requires an approved formal agreement/);
  assert.match(errors, /approved creator identity requires the relationship type/);
});

test("evidence register enforces homepage capacity and unique identity", () => {
  const records = Array.from({ length: 5 }, (_, index) => {
    const item = record();
    item.identity.caseId = `case-00${index}`;
    item.identity.slug = `case-${index}`;
    item.conversionRole.homepageProofEligible = true;
    return item;
  });
  assert.match(validateEvidenceRegister(records).join("\n"), /Homepage Early Proof is limited to four/);
  records[1].identity.caseId = records[0].identity.caseId;
  assert.match(validateEvidenceRegister(records).join("\n"), /duplicate case IDs/);
});

test("maturity states block private placement and unsafe anonymous disclosure", () => {
  const privateRecord = record();
  privateRecord.identity.maturityState = "PRIVATE";
  assert.match(
    validateCaseEvidence(privateRecord).join("\n"),
    /private evidence cannot receive a public placement/
  );

  const anonymousRecord = record();
  anonymousRecord.identity.maturityState = "ANONYMOUS_PUBLIC";
  anonymousRecord.identity.clientVisibility = "anonymised";
  anonymousRecord.identity.clientName = null;
  anonymousRecord.projectActivity.participants.push({
    internalName: "Restricted Expert",
    publicName: "Named Expert",
    role: "Expert",
    identityType: "expert",
    relationshipType: "not-applicable"
  });
  assert.match(
    validateCaseEvidence(anonymousRecord).join("\n"),
    /cannot expose participant or institution names/
  );
});

test("Phase 3.2A reports and intake template cover required governance", async () => {
  const paths = [
    "docs/phase-3-2-case-schema.md",
    "docs/phase-3-2-case-placement-system.md",
    "docs/phase-3-2-case-scoring.md",
    "docs/phase-3-2-owner-case-intake-template.md",
    "docs/phase-3-2-evidence-register.md",
    "docs/phase-3-2-proof-gap-analysis.md",
    "docs/phase-3-2-evidence-flywheel.md"
  ];
  for (const path of paths) assert.ok((await source(path)).length > 500, `${path} is incomplete`);
  const intake = await source("docs/phase-3-2-owner-case-intake-template.md");
  for (const field of [
    "PROJECT NAME:",
    "CLIENT OBJECTIVE:",
    "VENUS BRIDGE ROLE:",
    "PUBLICATION RIGHTS:",
    "APPROVED PUBLIC WORDING:",
    "OWNER'S VIEW OF IMPORTANCE:"
  ])
    assert.match(intake, new RegExp(field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
});

test("Phase 3.2A evidence infrastructure is not imported by public routes", async () => {
  const publicFiles = [
    "components/sections/Phase3Homepage.tsx",
    "components/sections/Phase3Capabilities.tsx",
    "components/sections/PortfolioWork.tsx",
    "components/sections/PortfolioProjectDetail.tsx",
    "app/sitemap.ts"
  ];
  for (const path of publicFiles) assert.doesNotMatch(await source(path), /content\/evidence\/case-evidence/);
});
