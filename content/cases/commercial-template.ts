import type { Language } from "@/lib/i18n";

// Optional evidence for future real engagements. Empty fields stay unpublished.
// A source may be an internal record; it must never be rendered as a public link.
export type CommercialEvidence = {
  text: Record<Language, string>;
  evidenceSource: string;
  verified: boolean;
  approvedForPublic: boolean;
};

export const commercialEvidenceLabels = {
  objective: { en: "Market objective", zh: "市场目标" },
  localRequirement: { en: "Local requirement", zh: "本地需求" },
  stakeholderLogic: { en: "Target stakeholder and audience logic", zh: "目标机构与受众依据" },
  assumptions: { en: "Initial assumptions", zh: "初始假设" },
  venusWork: { en: "Venus Bridge work", zh: "Venus Bridge 实际工作" },
  conversations: { en: "Actual stakeholder conversations", zh: "实际沟通记录" },
  responseStatus: { en: "Response status", zh: "回应状态" },
  meetingStatus: { en: "Meeting status", zh: "会议状态" },
  pilotDiscussion: { en: "Pilot discussion", zh: "试点讨论" },
  feedback: { en: "Feedback", zh: "反馈" },
  nextStep: { en: "Next commercial step", zh: "下一项商业行动" },
  followUp: { en: "Commercial follow-up", zh: "商业跟进" },
  outcome: { en: "Evidenced outcome", zh: "有证据支持的结果" }
} as const;

export type CommercialProgress = Partial<Record<keyof typeof commercialEvidenceLabels, CommercialEvidence>>;

export function publicCommercialEvidence(progress?: CommercialProgress) {
  return (Object.keys(commercialEvidenceLabels) as Array<keyof CommercialProgress>).flatMap((key) => {
    const record = progress?.[key];
    if (
      !record?.verified ||
      !record.approvedForPublic ||
      !record.evidenceSource.trim() ||
      !record.text.en.trim() ||
      !record.text.zh.trim()
    )
      return [];
    return [{ key, label: commercialEvidenceLabels[key], text: record.text }];
  });
}
