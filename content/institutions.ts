import relationships from "@/content/institution-relationships.json";

export type InstitutionRelationship = {
  institutionId: string;
  institutionName: string;
  logoFile: string;
  relationshipType: string;
  publicWordingEn: string;
  publicWordingZh: string;
  logoUseApproved: boolean;
  approvalEvidence: string;
  public: boolean;
};

export const publicInstitutionRelationships = (relationships as InstitutionRelationship[]).filter(
  (item) =>
    item.logoUseApproved === true &&
    item.public === true &&
    item.publicWordingEn.trim().length > 0 &&
    item.publicWordingZh.trim().length > 0 &&
    item.relationshipType.trim().length > 0 &&
    item.approvalEvidence.trim().length > 0
);
