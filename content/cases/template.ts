import type { CaseStudy } from "@/content/types";

/** Keeps future verified case records on the same contract as concept models. */
export function defineCaseStudy(caseStudy: CaseStudy): CaseStudy {
  if (
    caseStudy.publicStatus === "public" &&
    (caseStudy.deliveryStatus !== "completed" ||
      !caseStudy.clientApproval ||
      !caseStudy.mediaRightsApproved ||
      !caseStudy.legalApproved ||
      !caseStudy.evidence.some((record) => record.verified && record.approvedForPublic))
  )
    throw new Error(`${caseStudy.slug}: public cases require completed delivery and approved evidence.`);
  if (
    ["in-progress", "lead", "completed-awaiting-approval"].includes(caseStudy.deliveryStatus) &&
    caseStudy.publicStatus === "public"
  )
    throw new Error(`${caseStudy.slug}: incomplete or awaiting-approval work cannot be public.`);
  if (caseStudy.status === "verified") {
    if (!caseStudy.realProject)
      throw new Error(`${caseStudy.slug}: verified projects must be real projects.`);
    if (caseStudy.mediaApproval !== "approved")
      throw new Error(`${caseStudy.slug}: verified projects require approved project media.`);
    if (!caseStudy.projectDate || /placeholder|tbc|unknown/i.test(caseStudy.projectDate))
      throw new Error(`${caseStudy.slug}: verified projects require a confirmed project date.`);
    if (caseStudy.publicDisclosurePermission !== "approved")
      throw new Error(`${caseStudy.slug}: verified projects require public disclosure permission.`);
    if (!["client-approved", "publicly-verifiable"].includes(caseStudy.evidenceState))
      throw new Error(`${caseStudy.slug}: verified projects require approved outcome evidence.`);
  }
  if (caseStudy.status === "anonymised") {
    if (caseStudy.clientDisplayName)
      throw new Error(`${caseStudy.slug}: anonymised projects cannot expose a client display name.`);
    if (caseStudy.clientNameDisclosure !== "anonymised")
      throw new Error(`${caseStudy.slug}: anonymised projects must use anonymised client disclosure.`);
  }
  if (caseStudy.status === "confidential" && caseStudy.clientNameDisclosure !== "withheld")
    throw new Error(`${caseStudy.slug}: confidential projects must withhold the client name.`);
  if (caseStudy.status === "concept") {
    if (caseStudy.realProject) throw new Error(`${caseStudy.slug}: concept projects cannot be marked real.`);
    if (!caseStudy.disclosure?.en || !caseStudy.disclosure.zh)
      throw new Error(`${caseStudy.slug}: concept projects require bilingual public disclosure.`);
    if (caseStudy.publicDisclosurePermission !== "not-required")
      throw new Error(`${caseStudy.slug}: concept projects do not use client disclosure permission.`);
    if (caseStudy.deliveryStatus !== "concept" || caseStudy.publicStatus !== "hidden")
      throw new Error(`${caseStudy.slug}: concept projects must remain hidden from the real portfolio.`);
  }
  return caseStudy;
}
