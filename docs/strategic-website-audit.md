# Venus Bridge Media Strategic Website Audit

**审计日期：** 2026-07-30  
**审计性质：** 商业战略、品牌定位、服务架构、内容与信息架构、需求创造、信任与转化审计  
**本轮代码边界：** 仅新增本审计文档；未修改 `app`、`components`、`content`、`public`、样式或生产配置。

## Audit basis and limitation

本报告基于以下证据，而不是抽象的 agency 网站模板：

- 全部 App Router 页面和路由结构，包括中英文首页、What We Do 三条路径、四个 Expertise、Work 与项目详情、About、Contact、Services、Industries、Talent、For Agencies、隐私与条款页面。
- `content/information-architecture.ts`、`content/navigation.ts`、`content/pages/*`、`content/market-entry.ts`、`content/portfolio.ts`、Capability Media、机构关系、案例门控、SEO、sitemap、structured data 与 release gate。
- Header、Footer、Hero、Homepage、Work、项目详情、About、Contact、服务与 Expertise 组件。
- Phase 7、Phase 13、Phase 14 的现有浏览器矩阵、响应式 QA、媒体审计和截图。
- Phase 14 记录的 150 个页面/断点检查：0 overflow、0 broken image；Phase 13 记录的 80 个静态页面构建与 84 个核心路由/断点检查。
- 代表性 390、768、1440、1920 截图，包括首页、Work、Enter the UK Market、Entertainment、Technology、About 和 Contact。

运行态限制：**Runtime browser validation unavailable in this audit environment.** 本轮检查时端口 3000 无监听服务；此前普通前台启动可到达 Next.js `Ready`，但进程随审计命令 timeout 终止。按任务约束不再围绕服务器启动排障。视觉与跨端结论采用已有真实浏览器证据，因此该限制不构成战略审计阻断。

---

## Executive Decision

### What the website is today

一个设计完成度较高、真实性治理严谨的 **London bilingual creative production and local delivery company** 网站。它已经不只是摄影作品集，但客户仍会主要把它理解为“能在英国拍摄、做活动、找人才并双语协调的制作公司”。

### What it should become next

一个以中国企业的英国业务问题为入口、以创意与本地执行为核心交付能力的：

> **UK Market Entry, Brand & Local Execution Partner for Chinese Companies**  
> **面向中国企业的英国市场进入、品牌传播与本地执行伙伴**

“Market Entry”是商业入口，不等于自行提供法律、税务、认证、供应链或投资咨询；“Brand & Local Execution”是当前最可信、最有证据的交付核心。

### What it should NOT try to become yet

- 不是 full-service European market-entry consultancy。
- 不是 management consultancy、law firm、tax adviser 或 supply-chain operator。
- 不是 Cambridge / university official partner platform。
- 不是“从注册、合规、渠道、融资到创意全部自营”的跨境平台。
- 不是靠增加服务数量来制造规模感的综合代理商。

### Who the primary customer is

近期主客户应收窄为：

1. 准备在英国测试、发布或建立品牌认知的中国成长型企业和品牌；
2. 已有英国业务动作、但缺少本地品牌、内容、活动或执行团队的中国企业；
3. 服务中国客户、需要英国本地交付台的中国或国际代理机构。

第一决策人通常是 Founder、CEO、Overseas/International Business Director、CMO、Brand/Marketing/PR Director，而不是只负责采购摄影的执行人员。

### What the primary commercial promise is

> 在企业投入大规模英国市场预算之前，帮助它先明确需要解决的问题、选择可行的进入动作，并把品牌、内容、活动与本地执行落地。

这比“我们在英国提供摄影、视频、人才与活动”更接近客户购买原因，也不超出当前真实能力边界。

### What the primary differentiator is

不是“creative”“global”或“high quality”。真正可形成差异化的是：

- 理解中国决策与传播语境，同时在英国组织本地交付；
- 把内容、人才、creator/entertainment、活动和现场执行组织成一条责任清晰的路径；
- 已有中国汽车品牌欧洲/英国发布与本地制作证据；
- 有潜力把高校、研究者和技术生态资源转化为受审核的连接能力。

### What the first conversion should be

首要转化不应默认是 “Start a Project / Send a production brief”，而应是一个低风险、有明确产出的 **UK Market Entry & Launch Diagnostic**：

- 适用对象：准备进入、测试、发布或提升英国认知的中国企业；
- 产出：目标与准备度、优先问题、英国市场动作、所需证据与合作方、90 天可行路线；
- 结果：进入制作、发布、市场测试、内容本地化或 specialist referral；
- 边界：不是法律、税务或监管意见。

---

## Strategic Positioning Ladder

```text
CURRENT
London bilingual creative production & project-delivery company
（真实能力约 Level 2.5；网站表达约 Level 2.5–3）

↓ NEXT 6–12 MONTHS

UK Market Entry, Brand & Local Execution Partner for Chinese Companies
（聚焦英国；以诊断和编排为入口，以内容、发布与本地执行为核心）

↓ LONG TERM

China–UK–Europe Market Expansion Platform
（前提是建立可验证的顾问、机构、渠道、专业伙伴、流程和结果证据）
```

“China–Europe Platform”是长期组织目标，不是现在应该放在 Hero 的现状声明。

## Business Model Website Map

```text
CUSTOMER
中国企业 / 品牌 / 出海团队
↓
BUSINESS PROBLEM
不知道从何开始、当地无人执行、内容不适用、发布风险高、品牌认知低
↓
ENTRY OFFER
UK Entry / Launch / Localisation / Ecosystem Diagnostic
↓
CORE SOLUTION
市场进入编排 + 品牌本地化 + 发布/活动 + 内容系统
↓
EXECUTION CAPABILITY
制作、人才、Creator、采访、活动、展会、现场交付、双语管理
↓
PROOF
汽车发布、展会、英国拍摄、时尚商业制作、娱乐与现场环境
↓
NETWORK / RESOURCE ADVANTAGE
英国本地制作网络 + Creator/Entertainment + 高校/研究/技术连接 + 专业伙伴
↓
CONVERSION
预约诊断 → 确认路线 → 付费试点 → 执行项目 → 长期英国交付
```

---

## 1. Executive Summary

网站已经完成了三项很难但很重要的基础工作：视觉系统成熟、媒体资产可用、Capability Media 与真实案例严格分离。问题不再是“网站是否好看”，而是 **商业入口没有被决定**。

当前首页 Hero 同时面向 brands、agencies、artists、creators、technology companies 和 research teams；核心动词是 create、launch、build a UK presence；主承诺仍是 bilingual production、live delivery 和 market-entry coordination。它看起来包容，但会让高价值企业客户无法判断“这家公司最擅长解决我的哪个问题”。

三条路径中的 `Create` 与 `Launch`有充分视觉与案例支撑；`Enter the UK Market` 有较强的责任边界设计，但缺市场进入方法论、诊断产品、市场知识内容、专业伙伴证据和商业结果。因此它目前是一个 **可信的协调意向**，还不是成熟的 market-entry proposition。

Work 的真实性很强，但项目详情主要证明 visual production scope。案例主动声明不推断 brief、deliverable quantities、reach 和 outcomes，这在事实治理上正确，却意味着页面无法回答 B2B 买家最关心的业务目标、决策难点、执行复杂度和商业价值。

正确升级不是删除 Entertainment、Fashion 或 Celebrity，而是把它们从“作品类型”翻译成 B2B 能力证据；也不是把网站改成咨询公司，而是增加位于制作之前的“问题识别—机会判断—路径选择—低风险试点”层。

## 2. Current Website Diagnosis

### 当前信息逻辑

当前网站接近：

```text
Brand statement
→ Three project routes
→ Selected Work
→ Expertise
→ Why us
→ Process
→ Project brief
```

这是 **service/portfolio-led**，并开始向 objective-led 过渡；尚不是 problem-led、outcome-led 或 demand-generation-led。

### 最有价值的现状

- 三条客户路径比传统摄影/视频服务表更接近客户目标。
- Work 只展示通过门控的真实项目，Capability Media 不进入案例、schema 或 sitemap。
- Market-entry 内容明确把 regulated advice 留给独立专业机构。
- Entertainment 与 Technology 页面能展示广度，同时声明不是 named case study。
- 中英文、响应式、媒体裁切、SEO、structured data 和无障碍基础成熟。

### 最严重的现状

- 首页没有优先说“中国企业进入英国时会遇到什么问题”。
- Hero 的受众过多，近乎把网站全部受众一次列完。
- 英国机会、市场进入风险、低成本测试和需求教育缺席。
- 作品证明“拍过/记录过”，没有系统证明“帮助客户完成了哪一个商业动作”。
- Contact 仍要求用户先知道自己要制作什么；它接不到“我还不知道第一步是什么”的高价值潜客。

## 3. The Fundamental Business Problem

根本问题不是视觉、图片数量或 CTA 数量，而是五个商业层级混在一起：

| 层级               | 正确定义                                 | 当前网站表现                                      |
| ------------------ | ---------------------------------------- | ------------------------------------------------- |
| Business problem   | 客户为什么要行动                         | 弱；少量“进入/发布/制作”目标，没有风险与机会      |
| Solution           | 解决问题的组合方式                       | 三条路径已出现，但 Create/Launch/Enter 粒度不一致 |
| Commercial product | 客户第一次可以买什么                     | 缺失；只有 Quick enquiry / Full brief             |
| Service            | 一组可管理的工作流                       | 制作、活动、market-entry coordination 混列        |
| Capability         | 摄影、视频、人才、造型、采访、现场等手段 | 表达最充分，反而主导了认知                        |
| Outcome            | 客户获得的业务变化                       | 几乎没有可验证表达                                |

Photography 不是产品；“UK Brand Content Production”才可能是产品。University introductions 不是 outcome；“为英国创新合作建立一组经过筛选且获准接洽的研究者/机构路径”才是可交付结果。

## 4. Current Positioning

### 用户最可能认为 Venus Bridge Media 是什么

1. London creative production company；
2. bilingual production coordinator；
3. events / launches / photography supplier；
4. 可处理部分 UK market-entry coordination 的 integrated agency。

不太可能在首次访问后认为它是：

- 有明确市场进入方法论的 business partner；
- 能帮助 CEO 判断英国市场机会的 advisory partner；
- 有可信机构与专业伙伴网络的 ecosystem orchestrator。

### 定位歧义的来源

- Hero 把企业、代理、艺人、创作者、科技和科研团队并列，缺少 primary customer。
- “Create, launch and build a UK presence” 横跨制作、活动和市场进入，但没有统一的高层问题。
- 导航的 `What We Do` 与 `Expertise` 清晰，却没有一个“中国企业如何进入英国”的教育入口。
- `Enter the UK Market` 藏在 mega menu 内，与 Create、Launch 并列，未被确立为商业总入口。
- Legacy `/services` 内容仍以 production services、talent、events、market entry/compliance coordination、specialist projects 表达，和新三路径模型存在双重架构。
- Footer/Contact 等多个位置继续强调 production coordination，进一步锁定制作公司认知。

## 5. Desired Positioning

### 推荐近期定位

**UK Market Entry, Brand & Local Execution Partner for Chinese Companies**

中文建议含义：

> 帮助中国企业判断并推进英国市场动作，把品牌传播、内容、发布活动与本地执行连接起来。

### 为什么不是 “China-to-UK Market Entry & Creative Execution Partner”

这个表达也接近事实，但 “creative execution” 容易把品牌、活动、人才与本地协调重新压缩为创意供应商。“Brand & Local Execution”更能覆盖目前的内容、发布、活动、Creator、采访与本地项目管理。

### 为什么必须保留 UK 而不是直接 Europe

现有证据包括 London、UK 和 Munich/Europe 项目，但组织叙事、团队、流程和市场进入内容明显以英国为中心。近期主张 Europe-wide market entry 会让地域能力超过证据。更可信的表达是：

- **Primary operating base:** UK / London；
- **European project experience:** 有具体案例时呈现；
- **Europe expansion:** 按项目和当地专业伙伴能力确认。

## 6. Customer Decision Analysis

企业决策者的真实问题按顺序通常是：

1. 英国是不是值得我们现在进入或测试？
2. 我们的产品、品牌和内容是否适合当地？
3. 最小可行进入动作是什么？
4. 哪些工作必须本地完成？
5. 哪些风险需要专业机构判断？
6. 需要什么预算、时间、内部决策人和证据？
7. 谁能统筹而不是让我管理十个供应商？
8. 这家公司做过类似复杂度的项目吗？
9. 先购买什么，失败成本最低？

当前网站主要从第 4、7、8 问开始回答。第 1、2、3、5、6 问没有形成教育与诊断层，导致它更容易转化“已有明确制作 brief 的客户”，而难以转化“价值更高但问题尚未定义的市场进入客户”。

## 7. Homepage Audit

### Section-by-section decision

| Section             | 当前表达                                                           | 首次理解                    | 已解决                   | 未解决                                                     | 类型               | 决策                   | 原因                                                           |
| ------------------- | ------------------------------------------------------------------ | --------------------------- | ------------------------ | ---------------------------------------------------------- | ------------------ | ---------------------- | -------------------------------------------------------------- |
| Header / Navigation | What We Do、Expertise、Work、About、Contact                        | 一家有多类制作能力的 agency | 快速找服务、行业和作品   | 不知道 market entry 是否主业务；无 insight/diagnostic      | Brand / Conversion | Reposition             | `Enter` 不应只是三级并列项；需让商业入口和证据层有主次         |
| Hero                | “Create, launch and build a UK presence — coordinated from London” | 伦敦双语制作与项目协调公司  | 地点、部分能力和本地交付 | 谁是第一客户、进入英国的核心问题、为什么现在、为什么 Venus | Brand / Conversion | Rewrite                | 5 秒内能答 where/how，不能清楚答 primary who/problem/why us    |
| Hero visual         | Project Routes 抽象制作面板                                        | 高端、有系统的制作组织      | 品牌感与路径感           | 不能提供市场洞察或业务结果证据                             | Brand              | Keep / Recontextualise | 视觉成熟，但应服务新的商业决策主张                             |
| Three Ways We Help  | Create / Launch / Enter                                            | 三类项目可交付              | 比服务清单更目标导向     | 三者不在同一商业层；缺“我该选哪条”的诊断                   | Service            | Reposition / Expand    | 应成为按客户阶段选择的 journey，而不只是三张路由卡             |
| Selected Work       | 真实项目门控                                                       | 谨慎、可信的制作作品        | 证明真实视觉执行         | 不证明业务目标、难点、结果、管理复杂度                     | Proof              | Reposition             | 从“released real work”升级为“Evidence of market action”        |
| Expertise           | Automotive、Fashion、Entertainment、Technology                     | 行业制作经验                | 显示行业与视觉广度       | 未区分有案例行业、能力媒体行业和目标行业                   | Proof / Service    | Keep / Reframe         | 行业页应说明能解决的市场进入/传播问题及证据级别                |
| Why Venus           | bilingual、teams、UK delivery 等四点                               | 可靠本地执行方              | 强调协调与责任           | 多数仍是普通 agency 可声称；缺具体机制与证据               | Trust              | Rewrite / Expand       | 把形容词改成可验证机制、项目复杂度与网络边界                   |
| How We Work         | Brief → feasibility → production → handoff                         | 制作流程清楚                | 降低执行不确定性         | 不包含 opportunity、diagnostic、market test、learning loop | Trust / Service    | Expand                 | 应变成 Decide → Validate → Prepare → Execute → Learn           |
| About + CTA         | London bilingual production company；send brief                    | 有明确项目即可联系          | 对制作客户顺畅           | 未定义问题的决策人被迫填写制作 brief                       | Conversion         | Reposition             | 增加 diagnostic / exploratory route，制作 brief 保留为第二路径 |
| Footer              | 路由、行业、法律、production coordination                          | 标准 agency 收尾            | 可达性与合规             | 没有强化 primary customer、UK focus、能力边界和第一步      | Brand / Trust      | Rewrite                | Footer 应简洁重申定位、地域、专业服务边界和转化入口            |

### Hero 5-second test

| 问题                                | 当前结果                                                   | 判断                               |
| ----------------------------------- | ---------------------------------------------------------- | ---------------------------------- |
| Who are you?                        | London-based bilingual production/project-delivery company | 部分通过                           |
| Who do you help?                    | brands、agencies、artists、creators、technology、research  | 信息存在但过宽，等于没有优先级     |
| Where do you operate?               | London / UK                                                | 通过                               |
| What business problem do you solve? | create、launch、build presence                             | 只是任务类别，不是问题             |
| Why continue scrolling?             | 可选三条项目路径                                           | 有功能性理由，缺商业机会与独特证据 |

一个中国 CEO 可以理解“你们能在英国做东西”，但不能在五秒内明确理解“你们能帮助我降低进入英国的哪类不确定性”。

### Current homepage vs business decision journey

| 应有节点                          | 当前覆盖                         | 结论                       |
| --------------------------------- | -------------------------------- | -------------------------- |
| Who this is for                   | 有，但受众过多                   | 弱                         |
| What problem they have            | 几乎没有                         | 缺失                       |
| Why UK / Europe is an opportunity | 没有                             | 缺失                       |
| What could go wrong               | 只在深层 market-entry 内容有边界 | 首页缺失                   |
| How we help                       | 三条路径                         | 中等                       |
| How we work                       | 有制作流程                       | 中等                       |
| What we can execute               | 很强                             | 强                         |
| What proves it                    | 有真实 Work                      | 视觉强、商业弱             |
| Why us                            | 有四点                           | 一般                       |
| How to start                      | project brief                    | 对已知需求强，对未知需求弱 |

### Homepage Future Logic

这不是视觉线框，而是下一阶段首页必须完成的商业任务：

1. **Hero / Positioning** — 服务谁、进入哪里、解决何种不确定性、当前能执行什么。
2. **The UK decision** — 不是宏观报告；说明企业通常在验证、品牌、发布、本地交付上遇到的四类问题。
3. **Choose your situation** — Exploring the UK / Preparing a launch / Already in market but under-known / Need local delivery。
4. **Low-risk entry offers** — Diagnostic、launch readiness、localisation review 或 market test。
5. **Solution architecture** — Market entry orchestration、Brand & Localisation、Creative Production、Events & Activation、Ecosystem Connection。
6. **Execution system** — 人才、Creator、采访、摄影、视频、活动、现场、双语项目控制。
7. **Evidence by business objective** — 发布、测试、建立认知、在地内容、现场执行；案例作为证据。
8. **Why Venus / operating advantage** — 中国语境 + 英国交付 + 复杂现场 + Creator/Entertainment + 审核型网络。
9. **Industry proof** — 已验证领域优先；目标行业清楚标记。
10. **How uncertainty is reduced** — Scope、responsibility map、specialist boundary、decision gates、learning loop。
11. **University & innovation opportunity** — 小而可信，按资源可用性和批准边界表达。
12. **Two conversion routes** — Book a diagnostic / Send an execution brief。

## 8. Navigation Audit

### Current navigation map

```text
What We Do
├─ Create in the UK
├─ Launch in the UK
└─ Enter the UK Market

Expertise
├─ Automotive
├─ Fashion, Beauty & Apparel
├─ Entertainment & Culture
└─ Technology, AI & Research

Work
About Us
Contact
Start a Project
```

另有 `/services/*`、`/industries/*`、`/talent`、`/for-agencies` 等旧架构路由，形成可见或 SEO 层面的双重服务体系。

### Problems

- Market Entry 没有成为主商业入口。
- What We Do 同时承载 journey 和 services，概念不稳定。
- Expertise 是行业还是能力？目前主要是行业视觉页。
- Services 旧路由与三路径并存，容易造成维护和 SEO 语义分裂。
- 没有 Problems、UK/Europe、Insights/Guides 或 Diagnostic 的需求创造入口。
- 将未来所有能力放进主导航会造成“什么都做”的反效果。

### Recommended future information architecture

近期建议：

```text
How We Help
├─ Explore the UK Market
├─ Launch in the UK
├─ Build UK Brand & Content
├─ Events & Local Activation
└─ Ecosystem Connections

Capabilities
├─ Brand & Localisation
├─ Creative Production
├─ Creator, Talent & Entertainment
├─ Events & Exhibitions
└─ Bilingual Local Delivery

Proof
├─ By business objective
└─ By industry

UK Market Insights
├─ Readiness
├─ Localisation
├─ Launch & Events
└─ University & Innovation

About
Contact

Persistent CTA: Book a UK Diagnostic
Secondary CTA: Send an Execution Brief
```

“Market Entry”是否独立一级，应由下一阶段实际 diagnostic/product 内容是否完成决定；在内容未完成前，不应只增加一个空导航标签。

## 9. Service Architecture Audit

### 对三层服务系统的判断

采用 **Client Problem → Solution → Deliverable** 三层系统比当前“路径 + 行业 + legacy services”更合理，但还必须加入“Evidence”和“Delivery model”，否则只是换名称。

### Layer 1 — Client problems

- 我不知道英国市场第一步做什么；
- 我要在英国发布，但没有本地团队；
- 中国内容在英国不适用；
- 已经进入英国，但品牌认知不足；
- 我要参加展会/活动并形成后续内容；
- 我要连接当地 Creator、人才、专家、研究者或机构；
- 我需要专业服务，但不想自己管理多个供应商。

### Layer 2 — Solutions

1. UK Market Entry Orchestration
2. Brand & Content Localisation
3. Creative & Commercial Production
4. Events, Exhibitions & Activation
5. Creator, Talent & Entertainment
6. University, Research & Innovation Connections
7. Specialist Partner Coordination

### Layer 3 — Capabilities / deliverables

研究、准备度梳理、责任地图、信息包、品牌叙事、本地内容、摄影、视频、采访、Founder content、人才、造型、Creator、活动制作、展会内容、现场管理、双语协调、获准的介绍与转介。

### Future Service Architecture

| Service Category                    | Business Problem                         | Service / Solution                   | Deliverable                                                 | Required Proof                                | Primary CTA               |
| ----------------------------------- | ---------------------------------------- | ------------------------------------ | ----------------------------------------------------------- | --------------------------------------------- | ------------------------- |
| UK Market Entry Orchestration       | 不知道第一步、优先级和责任人             | Entry Diagnostic / readiness mapping | 准备度、问题清单、责任地图、90-day route                    | 诊断方法、负责人、试点结果                    | Book a UK Diagnostic      |
| Brand & Localisation                | 中国叙事和素材不适合英国                 | Brand & Content Localisation         | message/asset gap、local brief、content plan                | UK brand-film/fashion proof + 后续结果        | Review UK Readiness       |
| Creative & Commercial Production    | 本地无人把 brief 转为英国资产            | UK Brand Content Production          | photography、film、interviews、multi-format assets          | 已发布制作项目和 confirmed scope              | Send an Execution Brief   |
| Events, Exhibitions & Activation    | 发布/参展复杂、现场与传播割裂            | Launch / Exhibition Delivery         | run of show、supplier plan、live capture、post-event assets | 汽车发布与展会深案例                          | Plan a UK Launch          |
| Creator, Talent & Entertainment     | 不懂英国人才与文化语境                   | Creator / Talent Campaign Production | fit criteria、shortlist、rights route、content              | 获批 capability proof + named case when ready | Frame a Creator Brief     |
| University & Innovation Connections | 不知道如何把商业问题转成研究连接         | Innovation Connection Review         | problem brief、fit map、approved outreach route             | 关系记录、审批、专家/项目证据                 | Frame an Innovation Brief |
| Specialist Partner Coordination     | 需要法律、税务、认证等输入但不想自行编排 | Professional Services Coordination   | specialist brief、referral、action tracker                  | vetted partner record 与边界                  | Discuss Specialist Needs  |

这个表体现的是“商业问题 → 解决方案 → 交付 → 证据 → 下一步”，而不是把所有 deliverable 都提升为一级服务。

### Capability / Service / Solution / Product / Outcome boundary

| 类型       | 示例                                                | 网站应该如何用                         |
| ---------- | --------------------------------------------------- | -------------------------------------- |
| Capability | Photography、casting、bilingual coordination        | 作为执行手段，不作为一级购买理由       |
| Service    | UK commercial content production                    | 说明工作范围和责任                     |
| Solution   | UK brand launch                                     | 围绕客户问题组合多个服务               |
| Product    | UK Launch Readiness Review                          | 固定适用对象、流程、产出、周期、下一步 |
| Outcome    | 决定 go/no-go；完成本地发布；建立可复用英国内容系统 | 只有有证据时进入案例                   |

## 10. Portfolio Audit

### 结论

Portfolio 视觉质量和事实纪律较好，但仍是按项目/行业浏览的 Gallery。它没有成为业务决策证据系统，因为项目和客户需求之间缺少翻译层。

### Portfolio Reframing Matrix

| Existing Project               | Current Presentation       | What It Actually Proves                                    | Relevant Client Need                                | Future Website Role                                     |
| ------------------------------ | -------------------------- | ---------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------- |
| CATL Open Day 2025             | 活动与品牌内容摄影         | 在欧洲技术/汽车发布环境中处理舞台、演讲者、观众和时效内容  | 中国科技/汽车企业需要欧洲发布内容与现场记录         | Launch proof；需补 brief、现场责任、交付和使用证据      |
| BYD BD11 London launch         | 伦敦车辆发布摄影           | 中国品牌在英国本地发布环境的车辆、场地与观众内容执行       | 英国新品发布、本地团队和媒体资产                    | China-to-UK local execution proof                       |
| Changan European launch        | 欧洲品牌发布视觉制作       | 大型发布现场、车辆 reveal、嘉宾环境与品牌内容              | 欧洲品牌发布与现场内容系统                          | Hero proof for Launch；补执行复杂度与交付               |
| Leapmotor IAA                  | 展会摄影                   | 展台、产品、细节与访客互动的展会内容捕捉                   | 参展品牌需要展期内容和会后传播资产                  | Exhibition readiness / activation proof                 |
| London automotive brand film   | 英国汽车品牌故事影像       | 伦敦地点、采访、车辆移动、英国乡村的本地化叙事制作         | 中国品牌需要英国语境品牌内容                        | Brand localisation + UK production proof                |
| European road & lifestyle      | 道路与生活方式摄影         | 跨地点车辆运动与环境语境                                   | 欧洲 campaign visual assets                         | Production capability proof；不应暗示市场结果           |
| Teal editorial fashion         | 时尚编辑摄影               | 地点、造型、服装、动作和视觉方向                           | 服装品牌需要欧洲视觉语法与 campaign assets          | Fashion localisation / production proof                 |
| Commercial fashion series      | 商业服装影像               | 棚拍与外景、服装形态、造型和传播规格                       | 英国模特、造型和多规格商业内容                      | Capability proof，待客户/目标事实升级                   |
| Creative beauty & makeup       | 美妆人像                   | 妆面、色彩、质感和造型细节控制                             | 美妆品牌需要英国人才与视觉制作                      | Supporting evidence，不宜单独承担 market-entry proof    |
| Entertainment capability media | Selected Visual Experience | Live environment、talent access、creator/editorial capture | Creator campaign、品牌×艺人、现场内容和文化传播     | Capability evidence；未通过门控前不做 named client case |
| Technology capability media    | Selected Visual Experience | 机器人/产品展示、专家与行业内容、展会场景                  | AI 企业需要技术可视化、demo、Founder/expert content | Capability evidence；不声称技术开发或客户关系           |

### Project Type → Business Proof

| Project Type       | Surface Impression | What It Actually Proves                                 | B2B Relevance                                |
| ------------------ | ------------------ | ------------------------------------------------------- | -------------------------------------------- |
| Celebrity          | 拍过明星           | 高敏感人才环境、形象使用、排期与传播语境意识            | 品牌合作、talent activation、内容审批        |
| Concert            | 演唱会摄影         | 低光、大规模现场、不可重来时刻、快速选片                | Live activation、real-time/social content    |
| Influencer         | 达人内容           | 人才匹配、品牌适配、竖版/多平台内容                     | Creator campaign、local audience access      |
| Entertainment      | 娱乐图库           | 文化语境、talent ecosystem、现场与 editorial capability | 品牌文化进入、social amplification           |
| Fashion            | 时尚片             | 欧洲视觉语法、模特、造型、服装细节和 rights             | Campaign localisation、commercial production |
| Commercial shoot   | 好看的照片         | Brief 转译、渠道规格、人才/场地/交付组织                | UK campaign asset production                 |
| Automotive         | 汽车摄影           | 车辆 access、安全、展会/发布、运动和地点协调            | 中国汽车品牌英国/欧洲落地                    |
| Geely-related work | 中国汽车品牌活动   | 若事实获批，可证明中国企业英国本地执行                  | 应以项目事实呈现，不能仅凭品牌可见推断职责   |
| Exhibition         | 展会记录           | 展台、演示、speaker、访客流和快速交付                   | UK/EU exhibition support                     |
| Corporate event    | 活动摄影           | run of show、嘉宾、舞台、现场多方协调                   | Launch、stakeholder event、local delivery    |
| UK production      | 英国外景           | 地点、crew、talent、schedule、双语 handoff              | 降低海外团队管理复杂度                       |

## 11. Case Study Audit

### 距离成熟 B2B case 的差距

当前详情已有：

- 项目名称、类型、行业/路径；
- 部分客户、地点、年份；
- Project context；
- Visual Production Scope；
- 图片；
- Evidence boundary。

普遍缺少：

- Client context 与进入阶段；
- Business objective；
- Challenge / constraints；
- 为什么选择该路线；
- Venus 的责任边界与管理复杂度；
- Confirmed deliverables；
- Local resources coordinated；
- Execution decisions；
- Outcome；
- Business value；
- 证据来源与客户批准范围。

这使案例事实安全，却仍像“有注释的 Gallery”。下一阶段不要先增加更多项目，而应优先把 3–5 个最有商业代表性的项目补成完整 case。

### 案例模板建议

```text
CLIENT SITUATION
→ BUSINESS OBJECTIVE
→ UK / EUROPE CHALLENGE
→ OUR ROLE & BOUNDARY
→ ROUTE CHOSEN
→ LOCAL RESOURCES COORDINATED
→ EXECUTION
→ CONFIRMED DELIVERABLES
→ VERIFIED OUTCOME / LEARNING
→ BUSINESS VALUE
→ CAPABILITIES USED
→ NEXT ACTION
```

没有结果证据时可发布 “Execution Evidence”，但不能伪装成 Outcome Case。

## 12. Demand Creation Audit

### 当前缺失

- **Education Layer：** 几乎没有解释英国进入、发布、本地化和市场测试为何复杂。
- **Insight Layer：** 没有按行业/阶段输出决策框架。
- **Problem Awareness Layer：** 未帮助客户识别中国素材、审批、人才、展会、当地语境等隐藏问题。
- **Opportunity Creation Layer：** 未解释英国如何成为品牌、技术、文化、研究或欧洲扩张节点。
- **Low-risk First Step：** Quick enquiry 是沟通模式，不是一个有产出的产品。

### Demand Creation Matrix

| Customer Situation                           | Hidden Need                                 | What They May Not Realise                                 | Our Potential Entry Point                 | Relevant Capability                         |
| -------------------------------------------- | ------------------------------------------- | --------------------------------------------------------- | ----------------------------------------- | ------------------------------------------- |
| Chinese AI company entering UK               | 技术可信度、本地叙事、Founder visibility    | 产品 demo 不等于英国客户理解；技术声明需审核              | AI UK Entry & Communication Diagnostic    | 技术内容、专家采访、展会、双语协调          |
| Chinese automotive brand launching in Europe | 发布、媒体资产、展会、现场与后续内容一体化  | 现场活动若无内容系统，会失去后续传播价值                  | UK/EU Launch Readiness Review             | 汽车、发布、展会、现场内容                  |
| Chinese fashion brand testing London         | 本地视觉语法、人才、rights、渠道规格        | 中国 campaign assets 可能不适用英国受众和使用场景         | Brand & Content Localisation Review       | 模特、造型、商业制作、Creator               |
| Chinese beauty brand testing UK              | 小规模验证、Creator fit、claim/usage review | 大 campaign 前应测试内容、人才和受众反应                  | UK Market Test Sprint                     | 美妆制作、Creator、短内容                   |
| Chinese manufacturer exploring UK            | 决策优先级、买家/活动/内容准备              | 一开始未必需要完整 launch，而需要 go/no-go 路线           | UK Market Entry Diagnostic                | 责任地图、双语信息、伙伴转介                |
| Already in UK but low awareness              | 清晰的本地品牌叙事和持续内容                | “已注册/有销售”不等于有市场认知                           | UK Brand Presence Review                  | Founder content、campaign、PR/event support |
| Technology company seeking universities      | 问题定义、研究领域、合适连接方式            | Logo 或泛泛引荐没有商业价值；必须有明确合作问题           | University & Innovation Connection Review | Brief framing、expert sourcing、获准介绍    |
| Company attending UK exhibition              | 展前故事、现场 capture、展后 follow-up      | 只订摄影无法形成完整 pipeline                             | Exhibition Readiness & Content Plan       | 展会、speaker、采访、快速交付               |
| Brand planning creator campaign              | 受众、talent fit、usage、disclosure         | follower count 不是品牌适配；付费合作有标识与 rights 问题 | Creator Market Assessment                 | Creator sourcing、内容制作、协调            |

### 推荐的 demand-entry 产品

优先级不是把所有名称上线，而是先验证三个：

1. **UK Market Entry Diagnostic** — 面向“不知道第一步”的企业；
2. **UK Launch Readiness Review** — 面向已有时间表、产品或活动的团队；
3. **Brand & Content Localisation Review** — 面向已有中国内容、准备英国传播的品牌。

第二阶段再验证 Exhibition Readiness、Creator Assessment、University & Innovation Connection。

## 13. China → UK Market Entry Narrative

当前网站有 London、bilingual、UK delivery 和 “Chinese brands planning UK activity”等元素，但尚未形成叙事。推荐叙事不是宏观经济宣传，而是企业行动逻辑：

```text
China-built capability
→ UK market questions
→ local validation and localisation
→ credible UK launch
→ repeatable local presence
→ selective European expansion
```

网站应回答：

- 为什么先从英国做验证、品牌或发布动作；
- 哪些工作不能从中国远程完成；
- 哪些事情应先小规模测试；
- 英国动作如何产生可复用的欧洲内容、关系和经验；
- Venus 在其中负责哪一段，哪些交给客户或专业机构。

不能用“英国是全球门户”之类未经语境支持的宏观口号替代具体决策价值。

## 14. University / Research Opportunity

### 战略判断

高校、研究者和技术生态资源 **有潜力成为比普通 Creative Agency 更强的差异化**，但目前 public institution relationship gate 没有满足可公开记录；页面也正确地不显示空 Logo 栏或官方背书。

### 可商业化的正确方向

| Opportunity                        | 客户问题                        | 可交付                                          | 当前表达                           |
| ---------------------------------- | ------------------------------- | ----------------------------------------------- | ---------------------------------- |
| Research / expert sourcing         | 不知道该找哪类专家              | 问题定义、专家画像、获准 shortlist              | Mention Carefully                  |
| Academic introductions             | 需要针对性研究连接              | 双语 brief、合适性筛选、获准引荐                | Mention Carefully                  |
| Technology scouting                | 需要了解相关研究与技术生态      | scouting brief、公开信息 mapping、专家讨论安排  | Build First                        |
| Industry–academic project framing  | 企业与高校语言/目标不一致       | 项目问题、参与方、责任与审批路线                | Mention Carefully                  |
| Expert roundtables                 | 需要市场教育或 stakeholder 对话 | 主题、嘉宾、流程、内容与活动执行                | Partner-enabled                    |
| Corporate–university events        | 需要合适机构和活动形式          | 获批场地/嘉宾/活动与内容协调                    | Partner-enabled                    |
| Technical validation introductions | 需要独立技术判断                | 引荐合适专家/机构；结论由其提供                 | Partner-enabled；不得称 Venus 验证 |
| R&D collaboration                  | 需要长期科研合作                | 需真实 institution agreements、IP、合规和负责人 | Build First                        |

### 绝对边界

- 不使用 “Official Cambridge Partner”“University-backed”“合作院校”等默认措辞。
- 不用大面积 Logo 墙暗示整体背书。
- 每个关系必须有 relationship type、公开措辞、logo permission、approval evidence 和 public flag。
- Venus 可以组织问题、brief、活动与沟通，但不能替代科研结论、技术验证、IP/合同或机构审批。

## 15. Resource & Network Advantage

### 真正可能形成 Differentiator

1. China-facing bilingual project control 与英国本地交付结合；
2. 汽车/科技发布、展会和现场环境的真实执行证据；
3. Entertainment / Creator / Talent / Fashion 资源与商业制作结合；
4. University / research / innovation 连接的潜在资源；
5. 把专业机构、制作团队、人才和客户决策统一到责任地图的 orchestration 能力。

### 普通 agency 也能说的内容

- Creative thinking；
- Global perspective；
- High-quality content；
- Professional team；
- Storytelling；
- Flexible network；
- End-to-end service。

这些词若没有机制、项目或结果支持，竞争对手替换 Logo 后仍可使用，不应作为核心文案。

### Industry readiness

| Industry                          | Current Proof Level                                    | Website Role Now                                             | What Is Missing                               |
| --------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------- |
| Automotive / Mobility             | Strong named project proof                             | 主推行业；承担 China-to-UK/EU launch 与 local execution 证据 | 商业目标、完整职责、交付和结果                |
| Fashion / Beauty / Apparel        | Strong visual production proof，较少客户事实           | 主推制作与 localisation 能力，不夸市场成果                   | named clients、brief、usage、campaign outcome |
| Entertainment / Culture / Creator | Strong capability media，case facts 不完整             | 保留为差异化执行能力与 cultural access                       | client/campaign facts、rights、business use   |
| Technology / AI                   | Medium capability proof，少量汽车科技活动关联          | 目标行业 + 技术传播能力                                      | 独立科技客户案例、brief、result               |
| Events / Exhibitions              | Strong cross-industry execution proof                  | 作为解决方案和能力，不必另成泛行业                           | 现场职责、供应商范围、post-event value        |
| Manufacturing                     | Target market only                                     | 只在问题/洞察中出现，不做“经验行业”                          | 案例、行业专家、channel/market proof          |
| Professional Services             | No meaningful delivery proof                           | 暂不作为行业主推                                             | 客户案例、专业内容与受监管边界                |
| Education / Research              | Potential resource, no public institution relationship | 小型机会模块，Mention Carefully                              | 获批关系、项目、负责人、结果                  |
| Luxury / Consumer                 | Adjacent visual capability                             | 可通过相关案例标签出现                                       | 明确客户、英国测试/launch案例                 |

## 16. Trust Architecture

### 当前 trust signal

- 9 个公开 PortfolioProject，包含 4 个公开汽车品牌名；
- 真实地点、年份和有限 scope；
- 媒体使用和案例 release gate；
- Capability / case 分离；
- London / UK operating context；
- 双语页面和可见流程；
- 合规与 specialist boundary；
- 无虚构机构 Logo、团队照或伙伴关系。

### 最大信任缺口，按商业影响排序

1. **Market-entry competence proof** — 目前证明执行，不证明市场判断、路线设计或学习结果；
2. **Detailed business cases** — 缺 objective、challenge、deliverables、outcomes、business value；
3. **Named accountable people** — About 以品牌和角色为主，可信但缺可验证负责人；
4. **Partner operating system** — 有边界，没有已审核伙伴类型、选择标准和协作机制的公开证据；
5. **Industry knowledge / insight** — 看得到项目，看不到持续积累的方法与判断；
6. **Client voice / repeatability** — testimonials 不是第一优先；先补事实、职责和结果，再补获批评价。

不应先做 Logo 墙来掩盖这些缺口。

## 17. Conversion Audit

当前主要 CTA：

- Start a UK Project；
- Choose a Project Route；
- Explore Route；
- Start a Project；
- Send a Project Brief；
- Quick Enquiry / Full Project Brief；
- Discuss a Related Brief。

这些 CTA 都假设访客已经知道要做什么。Contact Hero 更明确要求 “Tell us what you need to create in the UK”，把未知需求直接压回制作 brief。

### 推荐双轨转化

| 访客状态                   | 主 CTA                        | 承诺                                              |
| -------------------------- | ----------------------------- | ------------------------------------------------- |
| 需求尚未定义               | Book a UK Diagnostic          | 明确优先问题、风险、路线和第一步                  |
| 已有 launch / market plan  | Review Launch Readiness       | 检查时间、责任、内容、当地依赖和 specialist needs |
| 已有明确执行 brief         | Send an Execution Brief       | 评估 scope、资源、时间和报价                      |
| 代理机构                   | Request UK Production Support | 白标/本地交付需求梳理                             |
| University / research need | Frame an Innovation Brief     | 先判断问题和 fit，再谈引荐                        |

每个 CTA 都应说明“你会得到什么”，而不只是邀请联系。

## 18. Content Audit

### 过少

- UK market opportunity 与进入决策；
- target customer 的真实情境；
- market test、localisation、launch readiness；
- 本地执行如何降低风险；
- Partner-enabled capability 如何运作；
- 客户/项目 outcome 和 learning；
- 团队负责人与经验；
- 可持续 insight 内容。

### 重复

- production、local execution、bilingual coordination 在多页重复，但缺新的信息增量；
- What We Do、Services 和旧 site content 存在多套相近服务分类；
- Expertise 页大量 capability list 与服务页重叠。

### 漂亮但商业价值有限

- “Real production experience released through the case gate”对治理重要，但它把内部发布机制放在客户价值之前；
- 大量 “selected visual experience” 边界声明必要，却不能替代项目目标；
- “one route across language, teams and UK delivery”可用，但若不解释具体 route 仍属 generic。

### Copy 规则

以下词只有在后面紧跟具体机制或证据时才保留：global、creative、bridge、innovation、storytelling、network、end-to-end。

示例：

- 弱：`Global creative partner`。
- 强：`A bilingual UK delivery route for Chinese teams coordinating local content, launches and specialist workstreams.`

## 19. Visual / Layout Audit

### 优点

- 黑、象牙白、香槟金体系一致，具有高端 B2B 感；
- Header、Hero、editorial typography、留白和图片节奏成熟；
- 390 与 1440 的 Hero 断行清楚；
- 既有 QA 证明 320–1920 无横向溢出；
- Entertainment 采用不对称竖图 Hero，避免强裁；
- Technology 视觉以机器人和产品展示为主；
- About 在无真实团队图时仍保持完成度。

### 战略问题

- 高级感有时先于信息：大 Hero 和大留白延后了“问题—机会—证据”；
- 首页抽象 project-routes 视觉强调系统感，却没有建立中国企业市场进入认知；
- Enter the UK Market Hero 使用人物外景图，画面无法客观证明 market-entry planning，且容易被理解为影视/演员制作；
- Work 首屏和筛选仍把用户带入视觉分类，而不是业务目标；
- 过多 capability photography 会把品牌拉回 production-company category。

### 结论

视觉系统无需推倒重来。下一阶段应先改变信息优先级，再让现有视觉系统承载新的商业叙事；继续先调图片、动画或高级感，会放大错误定位。

## 20. Media Audit

### 当前媒体认知

- Automotive / event 媒体是最强 B2B proof；
- Fashion / beauty 显示制作质量，但如果缺商业 context，容易像 photographer portfolio；
- Entertainment Hero 很强，但单独观看会强化 artist production company 认知；
- Technology 图片证明技术内容呈现，不证明技术、研究或 AI 开发能力；
- Enter 页媒体与市场进入概念弱相关；
- About 的无人物降级方案是正确的。

### 推荐媒体配比原则

- 首页先展示 business situations：发布、展会、产品 demo、采访、英国现场，而不是连续人物近景；
- Entertainment 保留强作品，但旁边必须解释 audience、live environment、talent coordination、turnaround 和 commercial use；
- Fashion 媒体旁边解释 model/styling/rights/localisation/channel deliverables；
- University/Research 没有真实媒体和关系记录时，使用方法论与责任图，不用随机会议图。

## 21. Mobile Audit

现有 QA 说明 320、360、375、390、430、768、1024、1280、1440、1920 的 overflow、H1、main、alt、菜单、语言切换、broken images 均通过。移动端视觉不是当前 P0 问题。

战略层面仍有三点：

- 390 Hero 在首屏连续列出宽泛受众和两个 project CTA，用户需要较长滚动才看到商业结构；
- 移动端没有 hover 帮助，卡片标题必须直接表达问题和收益；
- 未来 diagnostic 入口必须在首屏或紧随首屏，不能只留在长页面末端。

## 22. Capability Truth Framework

### Truth levels

| Level                                           | 定义                                                 | 网站处理                    |
| ----------------------------------------------- | ---------------------------------------------------- | --------------------------- |
| Level 1 — Delivered in-house / directly managed | 已有可验证项目、职责和交付                           | Promote Now                 |
| Level 2 — Delivered with specialist partners    | Venus 组织，专业方承担其受监管/专业交付              | Partner-enabled，并公开边界 |
| Level 3 — Advisory / coordination               | 可梳理需求、信息、责任、供应商与时间，不代替专业结论 | Mention Carefully           |
| Level 4 — Developing capability                 | 有资源意向或潜力，但没有稳定流程、伙伴和案例         | Build First / Do Not Claim  |

### Capability Matrix

| Capability                        | Existing Proof                               | Current Ability                    | Partner Needed                            | Website Status                        | Future Potential     |
| --------------------------------- | -------------------------------------------- | ---------------------------------- | ----------------------------------------- | ------------------------------------- | -------------------- |
| UK creative production            | 汽车、时尚、品牌片、Capability Media         | 直接统筹内容制作                   | 按规模补 crew/supplier                    | Promote Now                           | 高                   |
| Photography / video / interviews  | 多项目与媒体                                 | 直接交付或管理                     | 专项 crew 视 brief                        | Promote Now                           | 高                   |
| Events / launches / exhibitions   | CATL、BYD、Changan、Leapmotor                | 现场内容与部分执行协调             | 场地、AV、安全等                          | Promote Now，精确 scope               | 高                   |
| Talent / models / styling         | Fashion 与 capability proof                  | 按项目筛选和制作协调               | agents、HMU、styling                      | Promote Now，subject to availability  | 高                   |
| Creator / entertainment content   | Capability Media、现场经验                   | 内容与现场制作                     | talent rights/agents/platform specialists | Mention Carefully                     | 高                   |
| Brand localisation                | UK locations、fashion、automotive brand film | 视觉与内容适配                     | 市场研究/linguistic/claims specialists    | Promote Now for content；策略需补证据 | 高                   |
| Bilingual project coordination    | 全站流程与 China-facing定位                  | 项目沟通、brief、handoff           | 无/按项目                                 | Promote Now                           | 高                   |
| UK market-entry diagnostic        | 内容和责任地图已有基础                       | 可做项目框架，不足以证明成熟方法论 | 行业与专业输入                            | Build First                           | 很高                 |
| Market research / validation      | 无公开方法和结果                             | 只能初步 desk research/brief       | research specialist                       | Mention Carefully / Build First       | 高                   |
| PR / media relations              | 活动内容但缺媒体结果                         | 可生产素材，不等于 PR 成果         | PR partner                                | Partner-enabled                       | 中高                 |
| Business introductions            | 无公开关系与结果                             | 可按 fit 组织介绍                  | 已审核网络                                | Mention Carefully                     | 高                   |
| University / expert introductions | 有潜在资源，公开关系为空                     | 定义问题、协调获准连接             | institutions/experts                      | Mention Carefully                     | 很高                 |
| Research collaboration            | 无完整案例                                   | 不应声称成熟交付                   | university, IP/legal, PI                  | Build First                           | 高                   |
| Technical validation              | 无资格与案例                                 | 仅可引荐，不可出结论               | qualified experts/labs                    | Partner-enabled                       | 中高                 |
| Legal / tax / accounting          | 明确排除直接建议                             | brief 与转介协调                   | regulated professionals                   | Partner-enabled                       | 必需支撑，非核心卖点 |
| Compliance / certification        | 无直接资质                                   | 信息组织与转介                     | qualified specialists                     | Partner-enabled                       | 必需支撑             |
| Company setup / immigration       | 无直接资质                                   | 不直接交付                         | ACSP/legal/immigration advisers           | Do Not Claim                          | 低至中               |
| Supply chain / warehousing        | 无证据                                       | 无成熟能力                         | operators                                 | Do Not Claim / Later                  | 潜在但远期           |
| Distribution / channel sales      | 无证据                                       | 无成熟能力                         | distributors/BD specialists               | Build First / Later                   | 长期重要             |
| Recruitment / local team          | 无证据                                       | 无成熟能力                         | recruiters/EOR/legal                      | Do Not Claim                          | 中                   |
| Investment ecosystem              | 无公开证据，涉及 promotion 风险              | 仅可在合规路线下组织活动           | authorised/legal specialists              | Do Not Claim publicly as service      | 中                   |

## 23. NOW / NEXT / LATER Capability Map

| Capability                            | Stage |  Confidence | Proof                        | Delivery Model                 | Website Treatment          |
| ------------------------------------- | ----- | ----------: | ---------------------------- | ------------------------------ | -------------------------- |
| Commercial photography / film         | NOW   |        High | 多个公开项目                 | Direct / managed crew          | 核心执行能力               |
| UK local production                   | NOW   |        High | London/UK 项目               | Direct coordination            | 核心差异化                 |
| Launch/event/exhibition content       | NOW   |        High | 汽车发布与 IAA               | Direct + suppliers             | 核心解决方案               |
| Talent/models/styling                 | NOW   | Medium–High | Fashion/capability media     | Direct coordination + agents   | 明确 availability/usage    |
| Creator/entertainment production      | NOW   |      Medium | Capability media，少命名案例 | Direct + rights holders        | 作为能力证据，不夸客户关系 |
| Founder/expert/technology content     | NOW   |      Medium | Capability media             | Production delivery            | 不声称技术咨询             |
| Brand content localisation            | NOW   |      Medium | 英国品牌片与本地制作         | Creative production            | 先聚焦内容本地化           |
| Bilingual project control             | NOW   |        High | 全流程和定位                 | Direct                         | Promote Now                |
| Market-entry responsibility mapping   | NEXT  |      Medium | 内容架构已有                 | Advisory/coordination          | 先产品化和试点             |
| UK market/launch diagnostic           | NEXT  |      Medium | 无完整案例                   | Direct framework + specialists | Build First；完成后主推    |
| Market test sprint                    | NEXT  |      Medium | 制作基础强，验证方法弱       | Hybrid                         | 小范围 pilot               |
| Creator market assessment             | NEXT  |      Medium | Creator能力有，research弱    | Hybrid                         | 作为 diagnostic 子产品     |
| University introductions              | NEXT  |  Low–Medium | 潜在资源，公开关系空         | Coordination, approval-based   | Mention Carefully          |
| Expert roundtables                    | NEXT  |      Medium | 活动+专家内容可组合          | Partner-enabled                | 试点后推广                 |
| PR/media relations                    | NEXT  |  Low–Medium | 内容有，媒体结果无           | PR partner                     | Partner-enabled            |
| Business partner introductions        | NEXT  |         Low | 无公开 proof                 | Vetted referral                | 建系统后再提               |
| Legal/tax/accounting coordination     | NEXT  |      Medium | 边界与 gate 已有             | Regulated partner delivers     | 支撑层，不做一级核心       |
| Compliance/certification coordination | NEXT  |  Low–Medium | 无 partner proof             | Specialist partner             | Mention only after vetting |
| Research collaboration                | LATER |         Low | 无案例/机构记录              | Institution-led                | Build First                |
| Technology scouting                   | LATER |         Low | 无方法/结果                  | Research specialist + network  | 先建立能力                 |
| Distribution/channel development      | LATER |         Low | 无证据                       | Commercial partners            | Do Not Claim               |
| Supply chain/warehousing              | LATER |         Low | 无证据                       | Operators                      | Do Not Claim               |
| Recruitment/local team setup          | LATER |         Low | 无证据                       | Recruiter/EOR/legal            | Do Not Claim               |
| Investment/fundraising                | LATER |         Low | 无证据且监管风险             | Authorised specialists         | Do Not Claim               |
| Full European market entry            | LATER |         Low | UK之外体系不足               | Country partners               | 长期路线，不作现状承诺     |

## 24. Customer Journey Analysis

| Journey                    | 首先需要看到                                      | 信任形成点                            | 需求扩展点                                        | 何时看 Proof     | 当前能否完成                   |
| -------------------------- | ------------------------------------------------- | ------------------------------------- | ------------------------------------------------- | ---------------- | ------------------------------ |
| A 中国 AI 公司进入英国     | UK fit、technical communication、demo/Founder路径 | 技术内容 + 专家/展会执行 + 明确边界   | 发现还需要 localisation、launch、expert ecosystem | 在明确进入路线后 | 部分；有科技视觉，无市场判断   |
| B 中国汽车品牌进入英国     | 发布/展会/本地团队与案例                          | BYD、Changan、CATL、Leapmotor         | 发现活动前后还需内容系统和本地化                  | 很早             | 相对最强；缺 business outcomes |
| C 中国服装品牌进入欧洲     | 本地视觉、人才、rights、market test               | Fashion制作与 UK network              | 发现 creator/localisation/launch需求              | 在看到测试方案后 | 部分；像作品集，缺 market test |
| D 中国美妆品牌测试英国     | 小预算验证、Creator fit、claim/usage              | Beauty production + transparent scope | 从拍摄扩展到 audience test                        | 在 diagnostic 后 | 较弱；目前只有视觉能力         |
| E 中国制造企业首次考虑英国 | why/when/how、低风险第一步                        | 清晰 diagnostic、专业边界、负责人     | 识别研究、内容、展会、伙伴需求                    | 较后             | 不能；缺教育与 entry product   |
| F 已进入英国但认知低       | diagnosis of awareness / content gap              | 本地内容、Founder、活动与持续交付证据 | 发现品牌叙事和内容系统问题                        | 中段             | 部分；执行强，诊断弱           |
| G 科技公司找高校科研资源   | fit、流程、审批、可交付边界                       | 获准关系、负责人、专家匹配机制        | 从介绍扩展到 roundtable/project framing           | 关系和方法之后   | 目前不能完整完成；应谨慎提及   |

## 25. Proposed Future Information Architecture

### 页面职责

- **Homepage：** 做商业分类与导流，不承担全部服务解释。
- **UK Market Entry：** 解释客户阶段、问题、诊断、责任边界、伙伴协同。
- **Solutions：** 按 business problem 组织，不按制作工种。
- **Capabilities：** 说明真正执行手段和证据。
- **Proof：** 按 business objective 为主、industry 为辅。
- **Insights：** 需求教育与判断框架。
- **About：** 负责人、运作模式、UK/China fluency、network governance。
- **Contact：** diagnostic 与 execution 两条入口。

### URL 原则

- 保留有价值的现有路径并通过内容迁移/redirect 统一；
- 不让 `/services`、`/what-we-do`、`/industries` 和 `/expertise` 长期表达四套分类；
- Capability Media 保持非案例路由；
- Institution relationship 未通过 gate 时不生成公开页面；
- Insights 必须有真实内容计划后再进入主导航。

## 26. Commercial Productisation Opportunities

| Product concept                           | 适用客户               | 固定产出                                                | 降低的风险               | 商业优先级        |
| ----------------------------------------- | ---------------------- | ------------------------------------------------------- | ------------------------ | ----------------- |
| UK Market Entry Diagnostic                | 尚未确定第一步         | readiness、priority map、90-day route、specialist needs | 避免过早大投入           | P0 product design |
| UK Launch Readiness Review                | 已有产品/时间表        | launch dependencies、content/event plan、risk owners    | 避免本地依赖遗漏         | P0/P1             |
| Brand & Content Localisation Review       | 已有中国素材           | message/content gap、asset reuse、new production brief  | 避免内容水土不服         | P1                |
| UK Market Test Sprint                     | 美妆、时尚、消费、科技 | 小规模内容/活动/受众测试与 learning report              | 降低首次进入成本         | P1 pilot          |
| Exhibition Readiness & Content System     | 准备参展               | pre/live/post plan、speaker/interview/content list      | 避免展会只剩现场照片     | P1                |
| UK Brand Launch Sprint                    | 准备正式发布           | 叙事、内容、活动、本地执行路线                          | 降低多供应商复杂度       | P1                |
| Creator Market Assessment                 | 需要英国 Creator       | audience、fit、usage、disclosure、shortlist route       | 避免只按粉丝量采购       | P2                |
| University & Innovation Connection Review | 有明确技术/研究问题    | problem brief、fit map、approved outreach route         | 避免泛泛引荐和 Logo 思维 | P2，先建关系治理  |

产品化的价值在于：客户买到的是一个可判断的第一步，而不是无限范围的“咨询”或一长串制作工种。

## 27. Strategic Moat Analysis

### 有潜力形成 Moat

- **Cross-border operating fluency：** 中国内部决策方式 + 英国供应与传播环境；
- **Repeatable orchestration：** 将客户、制作、人才、场地、活动、专业方和审批放进同一责任系统；
- **Execution evidence：** 中国汽车品牌在英国/欧洲的发布、展会与内容；
- **Cultural/creator access：** Entertainment、Talent、Fashion 能力可为中国品牌进入当地文化语境服务；
- **University/innovation access：** 只有在关系、审批、项目和结果积累后才成为真正壁垒；
- **Accumulated market learning：** 需要通过 diagnostic、case 和 insight 持续沉淀，目前尚未形成。

### Hybrid model 的机会

市场进入顾问常缺执行，制作公司常缺商业判断。Venus 可占据“先定义可行市场动作，再组织本地品牌与执行”的中间层。

### Hybrid model 的风险

如果每项都作为自营能力宣传，客户会认为“什么都做，所以什么都不专业”。避免方式是：

- 一个清晰入口；
- 三至五个核心解决方案；
- 明确 Direct / Partner-enabled / Not provided；
- 用案例证明每项；
- 不把伙伴能力并入 Venus 自有能力。

## 28. Risk Analysis

| Risk                               | 发生方式                                              | 影响                                    | 控制                                   |
| ---------------------------------- | ----------------------------------------------------- | --------------------------------------- | -------------------------------------- |
| Positioning overreach              | 直接称 China-Europe platform / full-service entry     | 信任下降、专业风险                      | 采用近期定位与 NOW/NEXT/LATER          |
| Capability overclaim               | 把 legal/tax/compliance/technical validation 写成自营 | 法律与声誉风险                          | Partner-enabled wording + release gate |
| University endorsement implication | Logo、Cambridge 名称或模糊“合作院校”                  | 关系与声誉风险                          | 每机构单独证据、措辞和许可             |
| Portfolio misinterpretation        | 可见品牌/艺人被当作客户或完整职责                     | 版权、关系与信任风险                    | 保持 capability/case gate              |
| Entertainment dominates category   | 首页过多明星/人物近景                                 | 企业客户误判为 entertainment production | 重新建立 B2B context，不删除资产       |
| Consulting theatre                 | 大量模型与术语，无负责人/方法/成果                    | 看起来空泛                              | 先做付费试点和案例                     |
| IA sprawl                          | 把每项新能力加入导航                                  | 理解成本上升                            | Problem-led hierarchy                  |
| Proof stagnation                   | 继续增加图片，不补项目事实                            | 转化不增长                              | 优先 3–5 个深案例                      |
| Europe overextension               | 用少量 Munich 项目声称欧洲网络                        | 区域承诺超证据                          | UK-first，Europe project-specific      |

## 29. Website Maturity Score

| Dimension                    | Score / 10 | Evidence-based reason                               |
| ---------------------------- | ---------: | --------------------------------------------------- |
| Brand Clarity                |          6 | 视觉与 London bilingual清楚；primary customer不清楚 |
| Market Positioning           |          4 | production明确，market-entry差异化未成立            |
| B2B Credibility              |          6 | 真实门控强；业务结果与负责人弱                      |
| China → UK Relevance         |          5 | China-facing和UK存在；缺完整决策叙事                |
| Service Clarity              |          5 | 三路径有进步；legacy services与层级混淆             |
| Demand Creation              |          2 | 无系统教育、问题意识和低风险产品                    |
| Portfolio Quality            |          8 | 图片、分类和真实性较强                              |
| Portfolio Business Relevance |          4 | 未翻译为客户需求和商业价值                          |
| Case Study Quality           |          4 | context/scope有；objective/challenge/outcome缺      |
| Trust                        |          5 | 诚实边界强；团队、伙伴、结果、观点不足              |
| Differentiation              |          5 | 双语本地执行有基础；尚未产品化                      |
| Information Architecture     |          6 | 新架构清楚；新旧体系并存                            |
| Conversion                   |          4 | brief路径可用；未知需求无入口                       |
| Commercialisation            |          3 | 无明确 entry offer、产品或价值阶梯                  |
| Scalability                  |          5 | 数据与门控系统可扩展；商业模型未定                  |
| Content Strategy             |          4 | 页面内容完整；缺 insights 与 demand system          |
| Visual Strategy              |          8 | 成熟、响应式稳定；尚未完全服务新叙事                |
| Future-readiness             |          6 | 技术/内容底座强；能力与伙伴证据不足                 |

**综合商业成熟度：5.1/10。**

### 阶段判断

- **当前真实阶段：** Level 2 — Creative Service Company，部分接近 Level 3。
- **网站表现阶段：** Level 2.5 — Creative Production + Integrated Delivery Agency。
- **近期合理阶段：** Level 3.5 — Market-entry-led Integrated Agency / Local Execution Partner。
- **不应现在声称：** Level 4 完整 Market Entry Partner，更不应声称 Level 5–6 Platform。

## 30. Gap Analysis

```text
CURRENT STATE
Strong production portfolio + local delivery + truth gates

缺：
market-entry method / entry products / business cases / insights /
named accountable people / vetted partner system / verified outcomes

↓

NEAR-TERM POSITION
UK Market Entry, Brand & Local Execution Partner for Chinese Companies

需要：
3 个 entry products / 3–5 个深案例 / partner governance /
China→UK insight layer / dual conversion / explicit capability truth

↓

LONG-TERM POSITION
China–UK–Europe Market Expansion Platform

还需要：
multi-country operating partners / institutional relationships /
channel and commercial-development proof / research collaboration /
repeatable outcomes / senior advisers / governance / infrastructure
```

## 31. Critical Priorities

### Critical Issues

| Priority    | Problem                                | Evidence                                              | Business Impact                    | Recommended Direction                                 |
| ----------- | -------------------------------------- | ----------------------------------------------------- | ---------------------------------- | ----------------------------------------------------- |
| P0 Critical | 没有唯一商业入口                       | Hero 同时面向六类受众；三路径并列                     | 高价值客户无法快速判断相关性       | 确立中国企业 UK entry/brand/local execution 主定位    |
| P0 Critical | Demand Creation 缺失                   | 无 UK opportunity、problem awareness、diagnostic      | 只能接到已知制作需求               | 设计 3 个低风险 entry offers 和教育路径               |
| P0 Critical | Proof 只证明制作                       | Work 明确强调 visual-production scope，outcome 未提供 | 不能支持 market-entry partner 定位 | 优先重建 3–5 个 B2B Evidence Cases                    |
| P1 High     | Capability / solution / product 混淆   | 路径、services、expertise 多套分类                    | 看似能力多，购买路径不清           | 统一三层服务架构与 delivery model                     |
| P1 High     | Market-entry 承诺超过公开证据          | 有责任边界，无 method/partner/outcome                 | 易被视为新增文案而非成熟服务       | 先试点 diagnostic，再扩大主张                         |
| P1 High     | 信任缺负责人和伙伴系统                 | About 无真实人物；机构关系未达发布 gate               | 企业决策人难判断谁负责             | 逐步补 accountable people、partner criteria、evidence |
| P2 Medium   | Entertainment/Fashion context 仍偏作品 | 强人物和 editorial 视觉                               | 企业客户误判为摄影/艺人公司        | 用业务能力标签和 use case 重构                        |
| P2 Medium   | 新旧 IA 并存                           | `/services`、`/what-we-do`、`expertise`、`industries` | SEO、维护与理解分裂                | 下一阶段做 content migration map                      |
| P2 Medium   | Contact 只接制作 brief                 | “Tell us what you need to create”                     | 未定义问题的客户流失               | Diagnostic / execution 双路径                         |
| P3 Low      | Runtime audit 环境不可持续             | localhost 无持续监听                                  | 不影响本轮战略结论                 | 下一阶段在稳定预览环境复核                            |

### Priority Roadmap

#### P0 — Must Fix Before More Visual Work

1. 由管理层确认 primary customer、UK-first地域和不服务边界；
2. 确认近期定位与一句 primary commercial promise；
3. 设计 UK Market Entry Diagnostic、Launch Readiness、Localisation Review；
4. 选择 3–5 个案例补充 business facts；
5. 建立 Capability Truth owner 和发布审批流程。

为什么不应继续先优化视觉：视觉已经 8/10、跨端稳定；商业定位与需求创造只有 2–4/10。继续优化图片与动画只会更高质量地传达“我们是一家制作公司”。

#### P1 — Commercial Architecture

- 统一 Problem → Solution → Capability → Proof → CTA；
- 决定旧 Services/Industries 与新路径的迁移；
- 设计双轨转化与 qualification；
- 明确 direct、partner-enabled、not provided。

#### P2 — Content / Proof System

- 补 3–5 个深案例；
- 将 Entertainment、Fashion、Automotive、Exhibition 重写为 business proof；
- 补真实负责人、bio、责任；
- 建 partner vetting 和 institution relationship records。

#### P3 — Demand Generation

- 发布英国进入、发布、本地化、展会、Creator、University 的问题型内容；
- 每篇内容导向一个 entry offer；
- 从 diagnostic 项目中沉淀匿名 benchmark、checklist 和 learning。

#### P4 — Future Capability Expansion

- 经试点验证后扩展 university/innovation、PR、business introductions；
- 只有在有稳定伙伴和结果后再扩展专业服务协调；
- 多国交付、渠道、供应链、招聘、投资均属于后续能力建设，而非网站先行。

## 32. What NOT To Do

- 不要现在宣传 full-service European market entry。
- 不要把 legal、tax、compliance、certification、company setup 写成 Venus 自营成熟服务。
- 不要把 supply chain、warehousing、distribution、recruitment、investment 放入一级导航。
- 不要删除或边缘化 Entertainment、Celebrity、Concert、Influencer、Fashion。
- 不要把网站视觉改成传统 management consultancy 模板；执行能力是差异化的一部分。
- 不要建立几十项 services 的 mega menu。
- 不要继续增加 Portfolio 数量却不增加 business context。
- 不要用随机会议图、高校 Logo 或 Cambridge 名称制造研究可信度。
- 不要把 Capability Media 变成 Case Study。
- 不要以品牌可见、人物可见推断客户、职责、官方合作或成果。
- 不要把 Partner-enabled capability 写成 “we deliver”。
- 不要用 “global / creative / bridge / innovation / storytelling” 代替具体机制。
- 不要把所有客户类型放进 Hero。
- 不要在商业架构未定前继续大规模图片、动画或页面视觉优化。

## 33. Recommended Strategic Direction

### 最终建议

Venus Bridge Media 近期不应从 Production Company 跳到 Management Consultancy，而应沿着自身证据最强的路径向上移动一层：

> 从“客户告诉我们要拍什么，我们在英国完成”  
> 升级为“客户告诉我们想在英国实现什么，我们先帮助确定可行路径，再组织品牌、内容、发布与本地执行”。

核心商业入口是 **UK market entry / launch uncertainty**；核心交付仍是 **brand, content, events and local execution**；专业服务、高校与商业连接是经过审核的支撑网络；Europe 是有项目证据时的扩展，而不是无限地域承诺。

### 新的网站逻辑模型

```text
VISITOR
中国企业决策人
↓
PROBLEM
不知道第一步 / 本地无人 / 内容失配 / 发布复杂 / 认知不足
↓
OPPORTUNITY
先以英国市场测试、发布、内容或生态连接建立可验证起点
↓
SOLUTION
Diagnostic + entry route + brand/local execution plan
↓
CAPABILITY
制作、人才、Creator、活动、采访、展会、双语协调
↓
PROOF
按 business objective 组织的真实案例
↓
TRUST
负责人、流程、边界、伙伴治理、机构许可、结果证据
↓
NEXT STEP
Book a diagnostic / Send an execution brief
```

当前网站从 Capability 开始，经过 Proof 到 Project Brief；未来必须补齐前半段的 Problem、Opportunity 和低风险 Solution，同时增强后半段的 business proof 和 trust。

---

## The 10 Questions That Matter Most

### 1. 网站现在到底让客户觉得我们是什么公司？

一家伦敦本地、中英双语、擅长创意制作、人才、活动和现场交付的 production/integrated agency；不是成熟的市场进入顾问或 China–Europe platform。

### 2. 为什么一个中国企业现在应该联系我们？

当它需要在英国制作本地内容、做发布/展会/活动、组织人才与 Creator，或需要一个双语团队把中国 brief 转化为英国本地执行时，Venus 已有真实相关证据。对于纯市场研究、法律、合规、渠道或供应链问题，目前不应承诺独立解决。

### 3. 我们当前最强的三项真实竞争优势是什么？

1. 中国语境与英国本地交付之间的双语项目控制；
2. 汽车、科技发布、展会和复杂现场的实际视觉执行；
3. Entertainment、Creator、Talent、Fashion 与商业内容制作的跨界能力。

### 4. 网站现在最大的三个商业问题是什么？

1. 没有唯一 primary customer 与 business problem；
2. 没有 demand creation 和低风险 entry product；
3. Portfolio 缺业务目标、执行难点、结果和商业价值。

### 5. 为什么当前 Portfolio 无法充分转化 B2B 客户？

它证明图片真实且制作质量高，却很少证明客户为什么行动、Venus 解决了什么复杂问题、交付如何被使用、产生了什么可验证价值。买家能欣赏作品，但难以推断购买理由。

### 6. Entertainment / Celebrity / Fashion 作品应该如何继续保留但重新定位？

保留强视觉，并把它们标记为 audience-facing content、talent coordination、creator ecosystem、live environment、fast-turnaround delivery、European visual localisation 和 rights-aware production 的证据；不要称艺人为客户或把画面变成团队/关系背书。

### 7. 哪些新能力最值得加入网站？

先加入并验证 UK Market Entry Diagnostic、Launch Readiness、Brand & Content Localisation、Market Test、Exhibition Readiness；随后再发展 Creator Assessment、University/Innovation brief framing 和 vetted specialist coordination。

### 8. 哪些能力现在绝对不应该直接宣传？

Venus 自营的法律、税务、会计、认证、移民、公司注册、技术验证、供应链、仓储、分销、招聘、投资服务；正式高校背书；full-service Europe market entry。

### 9. 网站近期最合理的 Positioning 应该是什么？

**UK Market Entry, Brand & Local Execution Partner for Chinese Companies.**  
它以市场进入问题为入口，但只承诺目前可证明的品牌、内容、发布与本地执行，并把专业事项清楚留给合资格伙伴。

### 10. 如果只能重新设计 Homepage，新的 Homepage 应该完成什么商业任务？

让一个中国企业决策人在一次访问中完成：认出自己的英国问题 → 理解机会和风险 → 选择低风险第一步 → 看到 Venus 的解决路径与真实执行证据 → 理解边界和差异化 → 预约 diagnostic 或提交执行 brief。
