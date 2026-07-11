import type { LocalisedString } from "@/content/types";

const l = (en: string, zh: string): LocalisedString => ({ en, zh });
type ServiceProof = {
  eyebrow: LocalisedString;
  title: LocalisedString;
  clientProblem: LocalisedString;
  capabilities: LocalisedString;
  deliverables: LocalisedString;
  dependencies: LocalisedString;
  approvals: LocalisedString;
  frameBridge: LocalisedString;
  client: LocalisedString;
  nextStep: LocalisedString;
  relatedModels: LocalisedString;
};

export const serviceProof: Record<"commercial" | "talent" | "research" | "events" | "agency", ServiceProof> =
  {
    commercial: {
      eyebrow: l("From campaign brief to delivery formats", "从广告需求到交付规格"),
      title: l("Set decisions before the shoot day.", "在拍摄日前明确关键决策。"),
      clientProblem: l(
        "A campaign needs stills and motion that can be planned against channels, not retrofitted after the shoot.",
        "广告项目需要在拍摄前按渠道规划图片与视频，而非拍摄后再补救。"
      ),
      capabilities: l(
        "Casting criteria, location options, shot order, crew coordination and format planning.",
        "选角标准、场地备选、镜头顺序、团队协调与规格规划。"
      ),
      deliverables: l(
        "Approved shot list, masters, 4:5 and 9:16 crops, edit selects and file handoff.",
        "获批镜头清单、主文件、4:5 与 9:16 裁切、剪辑精选及文件交接。"
      ),
      dependencies: l(
        "Location access, talent availability, product readiness and production schedule.",
        "场地进场、人才档期、产品准备与制作排期。"
      ),
      approvals: l(
        "Creative references, casting, styling, rights, retouching and final asset selection.",
        "创意参考、选角、造型、使用权、修图及最终素材筛选。"
      ),
      frameBridge: l(
        "Coordinates the production route and maintains the review and handoff plan.",
        "统筹制作路径并维护审核与交付计划。"
      ),
      client: l(
        "Confirms campaign claims, brand references, budget, rights and final usage.",
        "确认广告表述、品牌参考、预算、使用权和最终用途。"
      ),
      nextStep: l(
        "Share audience, channels, dates and required formats.",
        "提供受众、渠道、日期和所需规格。"
      ),
      relatedModels: l(
        "Fashion seasonal campaign; jewellery editorial production.",
        "时尚季节广告；珠宝编辑式制作。"
      )
    },
    talent: {
      eyebrow: l("From casting criteria to private shortlist", "从选角标准到私密候选名单"),
      title: l("Match people to the brief before availability is checked.", "先按需求匹配人选，再核对档期。"),
      clientProblem: l(
        "A team needs suitable on-camera people without treating a public page as a live roster.",
        "团队需要匹配合适的镜头前人才，而非将公开页面视作实时人才库。"
      ),
      capabilities: l(
        "Casting criteria, shortlist coordination, availability checks, usage planning and booking interfaces.",
        "选角标准、候选协调、档期核对、使用规划与预订接口。"
      ),
      deliverables: l(
        "Private shortlist, availability view, usage matrix and agreed booking route.",
        "私密候选名单、档期概览、使用权矩阵与约定预订路径。"
      ),
      dependencies: l(
        "Brief clarity, talent availability, territory, channel, duration and exclusivity.",
        "需求清晰度、人才档期、地区、渠道、期限和排他性。"
      ),
      approvals: l(
        "Client selection, usage scope, rates, contracts and publication permissions.",
        "客户人选确认、使用范围、费用、合同及发布许可。"
      ),
      frameBridge: l(
        "Coordinates matching, communication and the booking handoff.",
        "统筹匹配、沟通与预订交接。"
      ),
      client: l("Confirms intended use, approvals and booking decision.", "确认预期用途、审核与预订决定。"),
      nextStep: l(
        "Share audience, role, date, location and usage requirements.",
        "提供受众、角色、日期、地点和使用要求。"
      ),
      relatedModels: l(
        "Beauty creator content sprint; fashion seasonal campaign.",
        "美妆创作者内容短周期；时尚季节广告。"
      )
    },
    research: {
      eyebrow: l("From technical subject to public communication", "从技术主题到公众传播"),
      title: l(
        "Keep access, accuracy and publication routes distinct.",
        "区分资源准入、技术准确性与发布路径。"
      ),
      clientProblem: l(
        "A technical subject needs a public explanation without assuming access, endorsement or approved claims.",
        "技术主题需要面向公众的说明，但不能假定资源准入、机构背书或表述获批。"
      ),
      capabilities: l(
        "Expert identification, interview structure, technical briefing, roundtable format and communication planning.",
        "专家识别、访谈结构、技术简报、圆桌形式与传播规划。"
      ),
      deliverables: l(
        "Contributor shortlist, reviewed interview outline, approval-aware schedule and public-facing asset plan.",
        "参与者候选名单、经审核的访谈提纲、兼顾审批的排期及公众传播素材方案。"
      ),
      dependencies: l(
        "Institutional fit, contributor availability, confidentiality and technical review.",
        "机构匹配度、参与者档期、保密要求与技术审核。"
      ),
      approvals: l(
        "Access, interview answers, intellectual property, public claims and publication.",
        "准入、访谈回答、知识产权、公开表述与发布。"
      ),
      frameBridge: l(
        "Coordinates the brief, contributor interfaces and production route.",
        "统筹项目需求、参与者接口与制作路径。"
      ),
      client: l(
        "Supplies the technical context, review owners and publication boundary.",
        "提供技术背景、审核负责人和发布边界。"
      ),
      nextStep: l(
        "Share the subject, audience, desired format and approval owners.",
        "提供主题、受众、预期形式及审核负责人。"
      ),
      relatedModels: l("AI product explanation for a UK audience.", "面向英国受众的 AI 产品说明内容。")
    },
    events: {
      eyebrow: l("From event objective to live delivery", "从活动目标到现场执行"),
      title: l("Connect the audience journey to the supplier plan.", "让观众动线与供应商方案衔接。"),
      clientProblem: l(
        "A live programme needs one route for audience, speakers, stage, AV, media capture and post-event use.",
        "现场活动需要一条统一路径串联受众、嘉宾、舞台、视听、媒体采集与会后使用。"
      ),
      capabilities: l(
        "Format planning, venue feasibility, run-of-show, supplier coordination and content capture.",
        "形式规划、场地可行性、现场流程、供应商协调与内容采集。"
      ),
      deliverables: l(
        "Event plan, responsibility matrix, run-of-show, capture list and post-event handoff.",
        "活动方案、责任矩阵、现场流程、采集清单与会后交接包。"
      ),
      dependencies: l(
        "Venue access, speaker participation, supplier availability, technical rehearsal and safety requirements.",
        "场地进场、嘉宾参与、供应商档期、技术彩排与安全要求。"
      ),
      approvals: l(
        "Public claims, stage content, speaker participation, filming permissions and final selects.",
        "公开表述、舞台内容、嘉宾参与、拍摄许可与最终精选素材。"
      ),
      frameBridge: l(
        "Coordinates feasibility, interfaces and the delivery plan across parties.",
        "统筹可行性、多方接口与执行计划。"
      ),
      client: l(
        "Owns the event objective, public message, budget and approval chain.",
        "负责活动目标、公开信息、预算和审核链路。"
      ),
      nextStep: l(
        "Share the audience, venue status, date, format and required outputs.",
        "提供受众、场地状态、日期、活动形式和所需交付。"
      ),
      relatedModels: l(
        "London entertainment event media plan; automotive launch and presenter support.",
        "伦敦娱乐活动传播执行方案；汽车发布与主持人支持方案。"
      )
    },
    agency: {
      eyebrow: l("From UK feasibility to white-label handoff", "从英国本地可行性到白标交付"),
      title: l(
        "Preserve agency ownership while making local delivery traceable.",
        "在保留代理主导权的同时，让本地执行可追溯。"
      ),
      clientProblem: l(
        "An agency needs UK production capacity without moving the end-client relationship or approval control.",
        "代理需要英国本地制作能力，同时不能转移终端客户关系或审核控制权。"
      ),
      capabilities: l(
        "Local feasibility, supplier coordination, production interfaces, version control and handoff structure.",
        "本地可行性、供应商协调、制作接口、版本管理与交接结构。"
      ),
      deliverables: l(
        "Feasibility response, supplier plan, review versions, delivery index and release notes.",
        "可行性反馈、供应商方案、审核版本、交付索引和发布说明。"
      ),
      dependencies: l(
        "Agency brief, end-client approval path, confidentiality terms, supplier availability and timeline.",
        "代理需求、终端客户审核路径、保密条款、供应商档期与时间线。"
      ),
      approvals: l(
        "The agency retains strategy, end-client communication and final approval.",
        "代理保留策略主导、终端客户沟通与最终审批权。"
      ),
      frameBridge: l(
        "Works through agreed agency interfaces and provides UK delivery coordination.",
        "通过约定的代理接口提供英国本地执行统筹。"
      ),
      client: l(
        "The agency provides the brief, review route and client-facing decisions.",
        "代理提供需求、审核路径及面向客户的决策。"
      ),
      nextStep: l(
        "Share a confidential brief, delivery date and required local scope.",
        "提供保密需求、交付日期及所需本地执行范围。"
      ),
      relatedModels: l(
        "London entertainment event media plan; jewellery editorial production.",
        "伦敦娱乐活动传播执行方案；珠宝编辑式制作方案。"
      )
    }
  };
