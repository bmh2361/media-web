import type { LocalisedString } from "@/content/types";

const l = (en: string, zh: string): LocalisedString => ({ en, zh });

export type ResponsibilityOwner =
  | "framebridge"
  | "client"
  | "venue"
  | "speakerPartner"
  | "supplier"
  | "agency";
export type ResponsibilityRow = {
  scope: LocalisedString;
  owners: Partial<Record<ResponsibilityOwner, "R" | "A" | "C">>;
};

export const eventResponsibilityRows: ResponsibilityRow[] = [
  {
    scope: l("Event format and delivery plan", "活动形式与执行计划"),
    owners: { framebridge: "R", client: "A", venue: "C", speakerPartner: "C", supplier: "C" }
  },
  {
    scope: l("Venue feasibility and access", "场地可行性与进场安排"),
    owners: { framebridge: "C", client: "A", venue: "R", speakerPartner: "C", supplier: "C" }
  },
  {
    scope: l("Supplier and technical coordination", "供应商与技术协调"),
    owners: { framebridge: "R", client: "A", venue: "C", supplier: "R" }
  },
  {
    scope: l("Speaker and partner coordination", "嘉宾与合作方协调"),
    owners: { framebridge: "R", client: "A", venue: "C", speakerPartner: "R", supplier: "C" }
  },
  {
    scope: l("Live delivery and content handoff", "现场执行与内容交接"),
    owners: { framebridge: "R", client: "A", venue: "C", speakerPartner: "C", supplier: "R" }
  }
];

export const agencyResponsibilityRows: Array<{ scope: LocalisedString; owner: LocalisedString }> = [
  { scope: l("Strategy ownership", "策略主导"), owner: l("Agency", "代理方") },
  { scope: l("Client communication", "客户沟通"), owner: l("Agency", "代理方") },
  { scope: l("UK feasibility", "英国本地可行性"), owner: l("FrameBridge", "FrameBridge") },
  { scope: l("Casting and local suppliers", "选角与本地供应商"), owner: l("FrameBridge", "FrameBridge") },
  { scope: l("Production delivery", "制作执行"), owner: l("FrameBridge", "FrameBridge") },
  { scope: l("Agency review", "代理审核"), owner: l("Agency", "代理方") },
  { scope: l("Final handoff", "最终交接"), owner: l("FrameBridge", "FrameBridge") }
];
