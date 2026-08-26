export type CollaboratorType = "university-research" | "industry-organisation" | "event-exhibition" | "business-professional-services" | "media-editorial" | "creator-talent" | "venue" | "creative-production" | "other";
export type RelationshipStatus = "A-formal-delivered" | "B-project-collaboration" | "C-project-based-capability" | "D-target-only";
export type CollaboratorRecord = {
  id: string;
  type: CollaboratorType;
  geography: string[];
  sectors: string[];
  expertise: string[];
  relationshipStatus: RelationshipStatus;
  projectHistory: string[];
  publicDisplayPermission: boolean;
  logoPermission: boolean;
  preferredProjectTypes: string[];
  notes?: string;
};

// Internal knowledge structure only. Records are added after relationship type and permissions are verified.
export const collaborators: CollaboratorRecord[] = [];
export const publicCollaborators = collaborators.filter((item) => item.publicDisplayPermission && item.relationshipStatus !== "D-target-only");
