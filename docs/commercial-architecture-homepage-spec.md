# Phase 1 — Commercial Architecture & Homepage Reconstruction Specification

**Company:** Venus Bridge Media  
**Date:** 2026-07-30  
**Purpose:** 决定下一阶段网站的商业操作系统与首页内容架构  
**Source of truth:** `docs/strategic-website-audit.md`  
**Production boundary:** 本文件是 Specification；本阶段未修改生产代码、导航、文案、媒体或样式。

---

## Final decisions at a glance

| Decision                 | Final choice                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| Recommended positioning  | **UK Brand, Launch & Local Execution Partner for Chinese Companies**                                         |
| Supporting positioning   | **Helping Chinese companies turn UK ambitions into credible launches, local content and reliable delivery.** |
| Primary customer         | 已决定探索或推进英国市场、但缺少英国本地品牌、发布与执行能力的中国成长型企业决策团队                         |
| Homepage commercial goal | 让目标客户识别自身英国阶段，理解被低估的风险，并选择一个可信、低风险的下一步                                 |
| Primary CTA              | **Book a 20-minute UK Fit Call**                                                                             |
| Secondary CTA            | **Send an Execution Brief**                                                                                  |
| Customer situations      | Exploring the UK / Preparing a UK Launch / Building UK Presence / Ready for Local Delivery                   |
| Phase 1 products         | UK Market Entry Diagnostic / UK Launch Readiness Review / Brand & Content Localisation Review                |
| Main proof logic         | 按 Business Objective 排序；行业为第二筛选维度；媒体类型不作为主分类                                         |
| Main navigation          | How We Help / Solutions / Proof / Industries / Insights / About + persistent CTA                             |
| Geographic claim         | **UK-first; Europe-capable on a project-specific basis**                                                     |

---

## 1. Executive Decision

Venus 当前最可信的升级不是从 Production Company 直接跳到 Market Entry Consultancy，而是成为一个 **execution-led strategy-to-delivery layer**：

```text
客户的英国意图
→ 明确下一步和责任
→ 连接合适的英国资源
→ 完成品牌、发布与本地执行
→ 总结学习，决定下一步
```

因此，本阶段修正上一轮定位风险：

- **Market Entry 是客户问题和商业入口**；
- **Brand, Launch & Local Execution 是当前身份和可证明交付**；
- Diagnostic、validation、research、university connection 和 specialist orchestration 是要通过试点逐步建立的前端能力；
- 法律、税务、监管、认证、供应链、渠道、招聘和投资不并入 Venus 直接能力。

首页的任务不再是展示“我们会什么”，而是让客户完成：

```text
识别自己的阶段
→ 发现被低估的问题
→ 理解 Venus 能负责的部分
→ 看到相关证据
→ 选择 Fit Call 或 Execution Brief
```

## 2. Positioning Decision

### Evaluation criteria

用户要求的六个维度均采用 1–10 分：

- **Truth:** 与当前已证明能力的吻合度；
- **Differentiation:** 相比普通 production/creative agency 的区分度；
- **Commercial value:** 对企业决策人的价值强度；
- **Buyer understanding:** 五秒内是否容易理解；
- **Future scalability:** 能否向更高价值能力扩展；
- **Evidence / overclaim risk:** 高分表示证据适配好、夸大风险低。

### Required directions comparison

| Direction                                                   | Clarity | Truth | Differentiation | Commercial Value | Scalability | Evidence Fit | Overall |
| ----------------------------------------------------------- | ------: | ----: | --------------: | ---------------: | ----------: | -----------: | ------: |
| A. UK Market Entry, Brand & Local Execution Partner         |       7 |     5 |               9 |                9 |           9 |            4 |     7.2 |
| B. UK Brand, Launch & Local Execution Partner               |       9 |     9 |               8 |                8 |           8 |            9 | **8.5** |
| C. Helping Chinese companies build their presence in the UK |       9 |     8 |               5 |                8 |           9 |            8 |     7.8 |
| D. UK Strategy-to-Execution Partner for Chinese Companies   |       7 |     6 |               9 |                9 |           9 |            5 |     7.5 |
| E. China-to-UK Launch & Production Partner                  |       9 |     9 |               7 |                8 |           6 |            9 |     8.0 |

### Hero Positioning Workshop

#### Direction A

**Positioning:** UK Market Entry, Brand & Local Execution Partner for Chinese Companies  
**Hero headline:** Enter the UK with a clearer route and one local delivery partner.  
**Supporting sentence:** We help Chinese teams frame their UK priorities, coordinate specialist needs and deliver brand, launch and production work locally.  
**Primary audience:** 中国企业 Founder、Overseas Director、CMO。  
**What it implies:** Venus 已具备 market-entry 判断、协调和执行全链路。  
**Advantage:** 商业价值高、差异化强、可自然承接 diagnostic。  
**Risk:** 当前 research、method、partner ecosystem 和 outcomes 不足，会构成身份夸大。  
**Evidence fit:** Brand/launch/execution 强，market-entry strategy 弱。  
**Long-term scalability:** 很高，但应作为未来方向而非当前 Hero。

#### Direction B — Primary

**Positioning:** UK Brand, Launch & Local Execution Partner for Chinese Companies  
**Hero headline:** Build your UK brand, launch locally and deliver through one accountable team.  
**Supporting sentence:** Venus Bridge Media connects Chinese business context with UK content, events, talent and on-the-ground production.  
**Primary audience:** 已决定探索或推进英国市场、但缺本地品牌与执行能力的中国企业。  
**What it implies:** Venus 对品牌内容、launch 和 local delivery 负责；前端 advisory 有明确边界。  
**Advantage:** 与现有证据最吻合，仍比 production company 更具商业价值。  
**Risk:** 若 Brand 不解释为本地传播与内容，可能被误解为 branding agency。  
**Evidence fit:** Automotive launches、UK brand film、events、fashion、talent 和 bilingual delivery 均支持。  
**Long-term scalability:** 可向 readiness、localisation、diagnostic 与 network orchestration 扩展。

#### Direction C — Backup

**Positioning:** Helping Chinese companies build their presence in the UK  
**Hero headline:** Build a more credible presence in the UK.  
**Supporting sentence:** From local content and launches to events, talent and bilingual delivery, we help Chinese teams make their UK plans visible and executable.  
**Primary audience:** 从 Explore 到 Build Presence 的广泛中国企业。  
**What it implies:** 提供结果导向的广义英国支持，但不定义公司类别。  
**Advantage:** 易懂、诚实、未来扩展空间大。  
**Risk:** 差异化弱；“presence”过于宽泛，可能隐藏真实执行优势。  
**Evidence fit:** 与本地内容/launch相符，但缺完整 presence outcomes。  
**Long-term scalability:** 高；适合作 supporting promise，不足以独立承担类别定位。

#### Direction D

**Positioning:** UK Strategy-to-Execution Partner for Chinese Companies  
**Hero headline:** Turn UK decisions into local action.  
**Supporting sentence:** We help define the practical next step, connect the required UK resources and lead local brand and launch delivery.  
**Primary audience:** CEO、Founder、International Business leaders。  
**What it implies:** Venus 具备成熟 strategy 与 execution 双能力。  
**Advantage:** 最准确描述长期空白位置，差异化和价值很高。  
**Risk:** 当前 strategy credentials、people、method 与 cases 不足，易成为 consultancy theatre。  
**Evidence fit:** Execution 强；strategy 仅 developing。  
**Long-term scalability:** 很高；应作为 operating model，而非当前身份。

#### Direction E

**Positioning:** China-to-UK Launch & Production Partner  
**Hero headline:** Launch and produce in the UK with a China-ready local team.  
**Supporting sentence:** Bilingual planning, content, events, talent and on-site delivery for Chinese brands and their agencies.  
**Primary audience:** 已有明确 launch 或 production brief 的品牌和代理。  
**What it implies:** 可靠 launch/production specialist。  
**Advantage:** 清楚、可信、与当前证据高度匹配。  
**Risk:** 把公司长期锁定在供应商层，无法有效承接 Explore/Build需求。  
**Evidence fit:** 很高。  
**Long-term scalability:** 中等；适合作 execution landing page，不作总定位。

### Why Direction A is not the primary identity yet

“Market Entry Partner”通常暗示可重复的 market research、entry strategy、validation、partner ecosystem 和 market-entry outcomes。当前公开证据主要是制作、发布、展会、人才、内容与双语执行。直接使用 A 会让品牌承诺领先组织能力。

### Why Direction B wins

- `Brand` 覆盖本地化内容、Founder/creator content、长期认知建设；
- `Launch` 对应汽车发布、展会、活动等最强真实证据；
- `Local Execution` 对应英国本地制作、人才、场地、crew 与双语交付；
- 它让未来 Diagnostic 成为前端产品，而不是强行把公司包装成咨询机构；
- 三个词分别对应商业结果、关键时刻和执行机制，不是摄影/视频工种清单。

### Primary Positioning

> **UK Brand, Launch & Local Execution Partner for Chinese Companies**

### Supporting Positioning

> **Helping Chinese companies turn UK ambitions into credible launches, local content and reliable delivery.**

### Backup positioning

> **Helping Chinese companies build their presence in the UK.**

Backup 只在研究显示 “Brand, Launch & Local Execution” 对目标客户仍过于 agency-like 时使用；当前不与 Primary 并列发布。

## 3. Primary Customer

### One primary group

> **已决定探索或推进英国市场、但缺少英国本地品牌、发布与执行能力的中国成长型企业决策团队。**

典型决策人：

- Founder / CEO；
- Overseas / International Business Director；
- CMO / Brand / Marketing / PR Director；
- UK launch 或 European expansion 项目负责人。

### Qualification characteristics

- 有明确产品、品牌、技术或组织主体；
- 对英国至少已有探索意图，而非完全泛泛了解；
- 未来 3–12 个月可能有市场测试、发布、展会、内容或本地执行动作；
- 需要中国语境与英国资源之间的项目控制；
- 愿意先通过结构化 review/diagnostic 减少不确定性。

### Secondary audiences

- 服务中国客户、需要英国 production desk 的代理机构；
- 已有英国办公室但缺品牌与内容系统的中国企业；
- 艺人、文化组织和 international teams。

Secondary audiences 不进入 Primary Hero 定位；通过专门 landing page、Proof 和 SEO 获取。

## 4. Core Customer Problem

客户购买的不是摄影、活动或“market entry”这个标签，而是：

> **降低在陌生市场做错决定、选错资源和重复投入的风险。**

核心不确定性：

1. 英国是否值得现在进入或测试；
2. 第一笔预算应该投入哪里；
3. 中国叙事、素材和人才是否适合英国；
4. 发布、展会、Creator、PR 与内容如何形成一条路径；
5. 哪些事情必须本地执行；
6. 哪些事项需要独立专业机构；
7. 谁统一管理责任、时间、审核和供应商；
8. 第一次行动后如何判断继续、调整或停止。

### Supplier-to-Customer Language Matrix

| Supplier Language        | Customer Language                                       | Business Problem                             | Better Website Expression                        |
| ------------------------ | ------------------------------------------------------- | -------------------------------------------- | ------------------------------------------------ |
| Photography              | “我们需要适合英国传播的商业影像。”                      | 现有图片没有英国语境或渠道规格               | UK campaign and launch imagery                   |
| Video                    | “我们要把产品、Founder 或品牌讲清楚。”                  | 信息复杂、素材不适合本地受众                 | Brand, product and founder content               |
| Models                   | “我们需要符合品牌和英国受众的人。”                      | 选角、档期、rights 和 representation 不清    | UK talent for approved campaign use              |
| Talent                   | “我们需要合适的出镜者、主持人或表演者。”                | 人选与角色、使用范围不匹配                   | Project-specific talent coordination             |
| Events                   | “我们要在英国完成一个可信的发布或 stakeholder moment。” | 场地、流程、内容和供应商割裂                 | UK launch and live activation                    |
| Exhibition               | “参展之后要留下内容、关系和后续动作。”                  | 把展会当成单日摄影任务                       | Exhibition readiness and content system          |
| Influencer               | “我们需要能影响目标受众的本地内容伙伴。”                | 只按粉丝量选择，忽略 fit、rights、disclosure | Creator fit and campaign production              |
| Creator                  | “我们需要平台原生、有人感的英国内容。”                  | 品牌内容与平台文化脱节                       | UK creator content and coordination              |
| Market Research          | “我们不知道第一笔英国预算应投在哪里。”                  | 缺判断所需信息和优先级                       | Evidence gaps and UK decision priorities         |
| Localisation             | “中国内容在英国为什么不起作用？”                        | 信息、视觉、文化、格式和人才失配             | Brand & Content Localisation Review              |
| University introductions | “谁能帮助我们理解或连接这个技术问题？”                  | 泛泛引荐没有 fit 和审批                      | Approved expert and innovation connections       |
| PR                       | “发布后怎样获得可信传播？”                              | PR、claims、media assets 和内容责任不清      | PR-ready launch content and partner coordination |
| Market Entry             | “我们进入英国第一步应该做什么？”                        | 不确定性过高、行动顺序不清                   | UK readiness and next-step diagnostic            |
| Production               | “谁能把英国 brief 可靠地落地？”                         | 需要管理 crew、location、talent、schedule    | One accountable UK delivery route                |
| Bilingual coordination   | “谁能避免中国团队和英国供应方之间的信息损耗？”          | 责任、审核和决策跨语言断裂                   | China-ready UK project control                   |

## 5. Venus Strategic Position

### Recommended strategic position

```text
Consultancy
擅长研究与建议，通常不执行

        [ VENUS OPPORTUNITY ]
        Execution-led strategy-to-delivery layer
        明确下一步 → 连接资源 → 本地交付

Creative / Production Agency
擅长执行，但客户必须先知道自己要什么
```

### Why this position has market value

- 企业不想先聘一家公司做抽象战略，再自行管理活动、内容、人才和供应商；
- 普通制作公司只能响应 brief，无法帮助未定义需求的决策人；
- Venus 可以把“下一步应该做什么”连接到“谁在英国完成、怎样完成”；
- 付费 review/diagnostic 可降低第一次购买风险，并自然产生执行项目。

### Why Venus can move toward it

- 已有真实 UK/Europe 制作、发布和展会证据；
- 有双语项目控制与 London operating context；
- 有 automotive、fashion、entertainment、creator、technology 内容广度；
- Market-entry 内容已有责任边界和 specialist referral 思维；
- 现有 case/capability gate 可防止咨询能力被夸大。

### What must be added

- 明确的 commercial owner；
- 结构化方法、模板、访谈问题和产出标准；
- 3–5 个受控付费试点；
- 客户决策和结果证据；
- vetted specialist network；
- 真实 people、insight 与复盘体系。

### Anti-sprawl rule

Venus 只占据三件事：

1. **Define the practical UK next step**；
2. **Connect the required local resources**；
3. **Lead brand, launch and local execution within agreed scope**。

任何不服务这三件事的能力，不进入核心架构。

### Anti-consulting-theatre rule

在没有负责人、方法、模板、试点和证据前，不使用：

- proprietary methodology；
- market intelligence platform；
- full GTM strategy；
- market-entry experts；
- proven validation framework。

## 6. Decision → Connection → Execution Model

### Long-term operating model

```text
UNDERSTAND
识别目标、阶段、限制和未知
↓
DEFINE
定义问题、优先级、责任与成功判断
↓
VALIDATE
通过 research、review 或小规模试点验证关键假设
↓
CONNECT
连接 crew、talent、creator、venue、expert 或 specialist
↓
PLAN
建立 scope、timeline、approval、budget 和 handoff
↓
EXECUTE
完成品牌内容、发布、活动和英国本地交付
↓
LEARN
记录结果、证据和下一步
```

### Current truth

| Stage      | Current maturity | Website treatment                   |
| ---------- | ---------------- | ----------------------------------- |
| Understand | Developing       | 可描述 discovery，不称成熟 research |
| Define     | Developing       | 通过产品试点建立                    |
| Validate   | Developing       | 只在有明确测试设计时承诺            |
| Connect    | Medium           | 按项目、可用性和审批表达            |
| Plan       | Strong           | 现有生产与活动流程支持              |
| Execute    | Strong           | 作为核心身份                        |
| Learn      | Weak             | 必须加入项目复盘和案例数据          |

长期模型成立，但当前更准确的 operating statement 是：

> **Define → Connect → Plan → Execute**，并通过试点逐步补齐 Understand、Validate 和 Learn。

## 7. Customer Situation Architecture

### Final model: four stages

| Situation                   | Customer language                   | Trigger           | Primary need                            | Venus entry                        | Overlap control      |
| --------------------------- | ----------------------------------- | ----------------- | --------------------------------------- | ---------------------------------- | -------------------- |
| 01 Exploring the UK         | “我们考虑英国，但不知道第一步。”    | 内部开始讨论英国  | 方向、准备度、优先问题                  | Fit Call → Market Entry Diagnostic | 未确定 launch/brief  |
| 02 Preparing a UK Launch    | “我们已有产品、日期、展会或活动。”  | 已决定行动        | readiness、timeline、local dependencies | Launch Readiness Review            | 有明确 launch moment |
| 03 Building UK Presence     | “我们已在英国，但品牌认知不足。”    | 已有市场活动/实体 | localisation、持续内容、campaign        | Localisation Review                | 不是一次性 launch    |
| 04 Ready for Local Delivery | “战略和 brief 已定，只缺英国执行。” | scope 基本明确    | production、talent、event、crew         | Execution Brief                    | 不需要前置 advisory  |

### Why four, not three or five

- Explore、Launch、Build、Execute 分别对应决策、关键时刻、持续认知和明确交付；
- 它们能映射现有三路径，同时解决 `Enter`、`Create`、`Launch`不在同一层的问题；
- 四个状态可自然触发三个商业产品和一个直接 execution route；
- 不另设 University 或 Specialist 为第五状态，因为它们是横向资源层。

### Navigation suitability

四个状态适合 `How We Help` 页面和首页第二屏；不应全部成为一级导航。

## 8. Commercial Product Architecture

### Phase 1 maximum: three

| Product                             | Customer situation  | Status                             | Commercial role                           | Execution conversion                                  |
| ----------------------------------- | ------------------- | ---------------------------------- | ----------------------------------------- | ----------------------------------------------------- |
| UK Market Entry Diagnostic          | Exploring           | **BUILD FIRST → controlled pilot** | 定义问题与第一步                          | market test、localisation、launch、specialist brief   |
| UK Launch Readiness Review          | Preparing to Launch | **PILOT FIRST**                    | 最接近现有 launch 能力的 advisory product | event、exhibition、content、talent、local delivery    |
| Brand & Content Localisation Review | Building Presence   | **PILOT FIRST**                    | 把现有制作升级为问题解决                  | campaign、film、photography、creator、Founder content |

`Ready for Local Delivery` 不需要第四个产品；它直接进入 Execution Brief。

### Status meaning

- **READY NOW:** 有负责人、方法、模板、案例、边界和定价；
- **PILOT FIRST:** 交付基础存在，但要通过 3 个受控项目校准方法、产出和价格；
- **BUILD FIRST:** 缺关键方法/负责人/证据，先内部完成最小产品，再试点。

当前没有一个产品应在网站上标记为“proven methodology”。

## 9. Entry Product Specifications

### Product 01 — UK Market Entry Diagnostic

**Status:** BUILD FIRST → three controlled paid pilots

**Who it is for**

- 有明确产品/品牌/技术；
- 正在评估英国；
- 未来 3–12 个月可能行动；
- 尚未确定先研究、测试、参展、发布还是做内容。

**Trigger**

董事会/Founder 提出英国机会；收到英国询盘；准备融资/国际化；计划展会；已有代理但缺本地路线。

**Questions answered**

1. 当前目标和英国假设是什么？
2. 哪些信息足以决定下一步，哪些仍未知？
3. 最小可行行动是什么？
4. 哪些工作由 Venus、客户或 specialist 负责？
5. 90 天内应做什么、不应做什么？

**Inputs needed**

- 公司、产品与目标；
- 当前市场与英国假设；
- 时间、预算区间、内部负责人；
- 已有研究、素材、活动或合作方；
- regulatory/claims/import/data 等已知依赖。

**Process**

1. 20 分钟 Fit Call；
2. 资料 checklist 与 scope confirmation；
3. 60–90 分钟 stakeholder workshop；
4. 限定范围 desk/context review；
5. responsibility/dependency mapping；
6. recommendation session。

**Deliverables**

- Current situation summary；
- assumptions and evidence gaps；
- decision priorities；
- 90-day action route；
- direct / partner / client responsibility map；
- recommended first execution brief；
- go / pause / investigate decisions。

**Duration model**

2–3 周；固定 workshop 数量和资料范围。不是无限期咨询。

**What it is NOT**

- 法律、税务、监管、认证或投资意见；
- 完整统计型市场研究；
- 销售预测；
- 保证渠道、合作方、客户或高校连接；
- Europe-wide GTM strategy。

**Possible next steps**

Launch Review、Localisation Review、小规模 market test、execution brief、独立 specialist brief 或停止投入。

**How it converts**

Diagnostic 只在明确问题后形成单独 execution proposal；不能用免费 diagnostic 变相售卖制作。

**Evidence needed before public launch**

- named owner；
- workshop guide；
- evidence/assumption template；
- responsibility map；
- 90-day route template；
- 3 个 pilot feedback 与修订记录；
- scope/terms、data handling 和 specialist disclaimer；
- 定价与 qualification rules。

**Charging model**

免费 20 分钟 Fit Call；Diagnostic 应收费。试点可采用受控 introductory fixed fee，但不应免费，以避免吸引无购买意图的泛咨询。

### Product 02 — UK Launch Readiness Review

**Status:** PILOT FIRST；三个产品中最接近可变现

**Who it is for**

已有 product、launch date、event、exhibition、campaign 或 stakeholder moment 的中国团队。

**Questions answered**

- 品牌叙事与英国受众是否对齐？
- 需要哪些 launch assets、采访与 post-event content？
- venue、AV、crew、talent、creator、speaker、PR、supplier 和 approval 是否有 owner？
- 哪些 specialist dependency 会影响 timeline？
- launch 后怎样形成持续内容而不是一次性活动？

**Review modules**

| Module             | Review question                            | Output              |
| ------------------ | ------------------------------------------ | ------------------- |
| Brand              | UK audience 能否理解 launch proposition    | message gaps        |
| Content            | pre/live/post assets 是否完整              | content matrix      |
| Event / Exhibition | format、venue、run of show、guest flow     | readiness checklist |
| Creator / Talent   | fit、availability、usage、approval         | dependency list     |
| PR                 | PR owner、claims、media assets 是否明确    | PR handoff brief    |
| Production         | crew、equipment、location、delivery        | production route    |
| Suppliers          | 谁负责、何时锁定                           | responsibility map  |
| Timeline           | decision gates 与 critical path            | launch timeline     |
| Approval           | brand、talent、legal、claims、music/rights | approval route      |
| Specialist         | legal/regulatory/tax/data 等               | referral needs      |

**Inputs**

Launch brief、date、venue/status、product material、stakeholder list、existing content、approval owners、budget range。

**Process and duration**

5–10 个工作日；kick-off、document review、dependency workshop、readiness report、decision call。

**Deliverables**

- red/amber/green readiness map；
- critical dependencies；
- launch content system；
- local supplier/crew requirement；
- responsibility and approval matrix；
- execution scope recommendation。

**What it is NOT**

PR guarantee、audience guarantee、legal approval、event safety certification 或 media buying。

**Why it is easiest to monetise**

Venus 已有 automotive launch、exhibition、event、content 和 on-site proof；Review 直接把已有 production judgment 前移，而不是凭空创造咨询能力。

**Evidence required**

一个可复用 checklist、明确 owner、2–3 个 retrospective calibration、3 个 pilot、scope/price、launch outcome evidence。

**Charging model**

固定费用；若进入大型 execution，可选择抵扣一小部分，但不能全部免费，否则产品会退化成售前 proposal。

### Product 03 — Brand & Content Localisation Review

**Status:** PILOT FIRST

**Who it is for**

已有中国官网、campaign、视频、社媒、Founder content、产品资料或 brand deck，准备英国传播的企业。

**Questions answered**

- 核心信息对英国受众是否清楚；
- 哪些资产可复用、需适配或必须重做；
- 视觉、文化、格式、人才和渠道有什么 gap；
- 是否存在 Founder、expert、creator 或 local proof 机会；
- 新制作应解决什么，而不是“再拍一组图”。

**Review dimensions**

| Dimension           | Review focus                                         |
| ------------------- | ---------------------------------------------------- |
| Message gap         | proposition、proof、tone、claims                     |
| Visual gap          | UK context、product clarity、brand consistency       |
| Cultural gap        | references、symbols、behaviour、audience expectation |
| Format gap          | website、social、vertical、event、press、sales use   |
| Talent gap          | model/presenter/creator fit、representation、usage   |
| Creator opportunity | audience role、format、disclosure、rights            |
| Founder visibility  | authority、interview、long/short-form use            |
| Asset reuse         | keep / adapt / retire / create                       |
| New production      | priority brief、location、crew、deliverables         |

**Inputs**

限定数量的现有资产、目标受众、渠道、launch plan、brand guidelines、claims owner、usage history。

**Process and duration**

7–10 个工作日；asset intake、review、alignment workshop、gap map、production recommendation。

**Deliverables**

- UK content readiness scorecard；
- keep/adapt/create asset map；
- message and format gaps；
- priority production brief；
- talent/creator opportunity map；
- 60–90 day content recommendation。

**What it is NOT**

完整 rebrand、legal claims review、translation-only service、consumer research 或 guaranteed performance strategy。

**Natural execution conversion**

- UK campaign photography/film；
- Founder/expert interviews；
- models、styling 与 local casting；
- creator content；
- product demonstration；
- launch/event assets；
- ongoing UK content system。

**Evidence required**

review rubric、asset intake limit、owner、before/after examples、3 pilots、usage/rights boundary、approved case。

**Charging model**

固定费用；若执行项目成立，Review 的 priority brief 直接成为 proposal input，但 Review 本身保持独立价值。

## 10. Solution Architecture

```text
LEVEL 1 — CUSTOMER SITUATION
Explore / Launch / Build / Execute

↓

LEVEL 2 — SOLUTION
Market Exploration
Brand & Localisation
Launch & Activation
Creative Production
Creator & Talent
Innovation & Knowledge Connections
Local Delivery

↓

LEVEL 3 — CAPABILITY
Photography / Film / Interviews / Models / Casting / Styling /
Creators / Events / Exhibitions / Locations / Crew / Bilingual PM

↓

LEVEL 4 — SPECIALIST SUPPORT
Legal / Tax / Accounting / Regulatory / Certification / PR /
Company setup / Immigration / Logistics / Distribution
```

### Architecture rules

- Level 1 决定入口；
- Level 2 决定购买的 solution；
- Level 3 解释 Venus 如何执行；
- Level 4 只在实际依赖时出现，并明确由独立专业方负责；
- Photography 不与 Market Exploration 处于同一导航层；
- University connection 是横向 solution/network，不是“University Services”。

## 11. Capability Architecture

| Solution                           | Customer outcome             | Core capabilities                                            | Proof required                        | Commercial status |
| ---------------------------------- | ---------------------------- | ------------------------------------------------------------ | ------------------------------------- | ----------------- |
| Market Exploration                 | 明确下一步和依赖             | discovery、brief framing、context review、responsibility map | pilot diagnostic                      | Developing        |
| Brand & Localisation               | 形成适合英国的内容路线       | message/asset review、creative direction、production         | brand film、fashion + pilot results   | Pilot             |
| Launch & Activation                | 准备并完成可信 launch        | event/exhibition planning、content、interviews、on-site      | automotive launch cases               | Core              |
| Creative Production                | 获得可使用的英国资产         | photography、film、interviews、post-production               | published projects                    | Core              |
| Creator & Talent                   | 获得适合品牌和渠道的人才内容 | casting、styling、creator coordination、usage awareness      | capability media + future named cases | Supporting        |
| Innovation & Knowledge Connections | 把技术问题转成合适连接       | problem framing、expert sourcing、roundtable production      | approved relationships and pilots     | Developing        |
| Local Delivery                     | 减少多供应商管理             | crew、locations、suppliers、schedule、bilingual PM           | UK projects and process               | Core              |

## 12. Specialist Network Architecture

### Recommended concept

使用 **Vetted Specialist Network** 或 **Specialist Coordination**。不使用“全生态服务平台”，不暗示所有 partner 已经存在。

### Operating principle

Venus 负责把客户问题转成清晰 brief、协调信息和时间、记录决定；专业判断、正式申报和受监管工作由客户聘任的合资格机构负责。

| Specialist Area        | Why Client Needs It                           | Venus Role                               | Specialist Role               | Website Status                |
| ---------------------- | --------------------------------------------- | ---------------------------------------- | ----------------------------- | ----------------------------- |
| Legal                  | contracts、claims、IP、commercial structure   | prepare brief、coordinate                | legal advice and documents    | Partner-enabled after vetting |
| Tax                    | VAT、corporate tax、cross-border implications | information checklist、referral          | tax advice/filing             | Partner-enabled after vetting |
| Accounting             | bookkeeping、accounts、financial controls     | coordination only                        | accounting delivery           | Mention when required         |
| Regulatory             | sector rules、promotions、data/product issues | dependency mapping                       | formal interpretation/advice  | Partner-enabled               |
| Certification          | product/testing requirements                  | capture requirement、coordinate          | certification/testing         | Partner-enabled               |
| Company setup          | incorporation/ACSP/identity                   | organise questions                       | formal setup and filings      | Mention carefully             |
| Immigration            | visas、work permissions                       | scheduling dependency only               | immigration advice            | Do Not Claim                  |
| PR                     | media strategy/relations                      | content and event coordination           | PR strategy/media relations   | Partner-enabled after proof   |
| Distribution           | channel access and commercial terms           | future brief/orchestration               | distributor/BD execution      | Later                         |
| Logistics              | shipment/event/product movement               | event dependency coordination            | logistics execution           | Mention only per project      |
| Supply chain           | sourcing, warehousing, fulfilment             | no current direct role                   | operators                     | Do Not Claim                  |
| Recruitment            | local hiring/team                             | no current direct role                   | recruiter/EOR/legal           | Later / Do Not Claim          |
| Investment / financing | fundraising, promotions                       | event production only after lawful route | authorised/qualified advisers | Do Not Claim                  |

### Publication gate

任何 partner category 公开前必须有：owner、selection criteria、qualification/insurance check、data/referral terms、conflict process、public wording、evidence 和 review date。

## 13. University / Innovation Architecture

### Recommended concept

> **Innovation & Knowledge Connections**

这比 University Services 更接近客户问题，也避免把机构名称变成背书。

### Customer-problem model

| Customer need               | Venus potential role                          | Required partner/institution role         | Current status    |
| --------------------------- | --------------------------------------------- | ----------------------------------------- | ----------------- |
| Need technical expertise    | define expert profile、source and coordinate  | expert gives opinion                      | Mention carefully |
| Need academic collaboration | frame problem and fit                         | institution approves relationship/project | Build first       |
| Need researchers            | brief and approved introduction               | researcher decides participation          | Mention carefully |
| Need R&D connections        | ecosystem mapping brief                       | institution/legal/IP owners               | Build first       |
| Need expert speakers        | topic、speaker coordination、event production | expert participation and claims           | Partner-enabled   |
| Need roundtable             | format、invite route、production/content      | approved experts/institutions             | Pilot first       |
| Need technology scouting    | define scope、coordinate specialist           | research/scouting specialist              | Build first       |
| Need innovation event       | event and content delivery                    | host/experts approve                      | Partner-enabled   |

### Moat path

```text
明确客户技术问题
→ 记录 researcher/expert fit
→ 获准连接
→ 形成活动或项目
→ 记录结果和关系边界
→ 建立可重复的领域知识图谱
```

### Truth controls

- 当前 institution relationship public gate 为空，不渲染 Logo；
- 不使用 Cambridge Partnership、Official University Network、University-backed；
- 不保证 access、funding、validation 或 collaboration；
- 每次连接都要有 problem fit、consent、public wording 和 evidence。

## 14. Portfolio → Proof Architecture

### Primary proof categories

1. **Launch & Exhibition Delivery**
2. **UK Brand & Local Content**
3. **Automotive & Technology Communication**
4. **Creator, Talent & Cultural Production**
5. **Live Event Execution**
6. **Commercial Fashion & Beauty Production**

Local Production 作为跨类别 proof attribute，不另建一个塞满所有项目的分类。

### Existing work remap

| Existing Project                 | Business Situation  | Business Objective                    | Capability Proven                                        | What We Can Claim                      | What We Cannot Claim                       | Future Website Role           |
| -------------------------------- | ------------------- | ------------------------------------- | -------------------------------------------------------- | -------------------------------------- | ------------------------------------------ | ----------------------------- |
| Changan European Brand Launch    | Preparing to Launch | 欧洲品牌发布视觉与现场内容            | automotive launch capture、stage/guest environment       | 已确认的项目、地点、视觉 scope         | campaign result、完整 event ownership      | Tier 2 flagship launch proof  |
| CATL Open Day Munich             | Preparing to Launch | 技术/汽车发布与 stakeholder content   | speaker、stage、audience、event capture                  | 已确认 photography/content scope       | PR result、business outcome                | Tier 2 technology/event proof |
| BYD BD11 London                  | Preparing to Launch | 伦敦车辆展示/发布内容                 | UK local event documentation                             | London、vehicle/venue/audience capture | 完整 launch management、sales impact       | Tier 2 China-to-UK proof      |
| Leapmotor IAA                    | Preparing to Launch | 展会现场品牌与产品内容                | exhibition floor、vehicle、visitor interaction           | 已确认 exhibition photography          | stand strategy、lead generation            | Tier 2 exhibition proof       |
| London Automotive Brand Film     | Building Presence   | 英国语境品牌故事内容                  | London location、interview、vehicle/lifestyle production | UK visual production scope             | brand strategy、market impact              | Tier 2 localisation proof     |
| European Road & Lifestyle        | Building Presence   | 欧洲环境车辆内容                      | movement/location photography                            | approved visual scope                  | market-entry outcome、named client         | Tier 2/3 supporting proof     |
| Teal Editorial Fashion           | Building Presence   | 欧洲视觉语法的 fashion assets         | location、styling、fashion photography                   | approved production experience         | client/campaign outcome                    | Tier 3 until facts supplied   |
| Commercial Fashion & Apparel     | Building Presence   | commercial apparel content            | studio/location、garment、styling                        | capability and imagery                 | named client/result                        | Tier 3                        |
| Creative Beauty & Makeup         | Building Presence   | beauty visual production              | makeup、colour、texture、portrait                        | capability and imagery                 | brand campaign/result                      | Tier 3                        |
| Entertainment / Celebrity media  | Launch / Build      | audience-facing cultural content      | talent-facing、live/editorial production                 | approved capability media              | client/artist representation/official role | Tier 3                        |
| Concert / live performance media | Preparing to Launch | live and time-critical content        | low-light、live environment、fast selects                | approved capability media              | official tour/client/outcome               | Tier 3                        |
| Influencer / Creator media       | Building Presence   | creator-facing brand content          | talent/format/production context                         | approved capability media              | campaign client/reach/result               | Tier 3                        |
| Technology / AI media            | Launch / Build      | product demo、expert/industry content | technical visual communication                           | approved capability media              | tech development、client、validation       | Tier 3                        |
| Geely-related work               | To be confirmed     | potential China-to-UK local execution | unknown until facts supplied                             | nothing public beyond approved facts   | client, role, result inferred from brand   | Hold outside Proof until gate |

## 15. Entertainment-to-Business Translation

| Work type     | Surface impression | What it proves                                               | Value to Chinese company               | Website expression                                |
| ------------- | ------------------ | ------------------------------------------------------------ | -------------------------------------- | ------------------------------------------------- |
| Concert       | 演唱会照片         | live access、low light、time-critical capture、fast delivery | launch/live event 与社媒时效           | Live environment & rapid content delivery         |
| Celebrity     | 拍过明星           | sensitive talent environment、schedule、usage awareness      | 品牌×艺人、talent-facing production    | Talent-facing production; no representation claim |
| Influencer    | 达人内容           | creator fit、platform format、audience-facing content        | 英国 Creator campaign                  | Creator content production and coordination       |
| Entertainment | 娱乐图库           | cultural context、talent、live/editorial range               | 进入当地文化语境与 amplification       | Cultural and audience-facing production           |
| Fashion       | 时尚作品           | European visual language、styling、talent、rights            | visual localisation 与 campaign assets | European campaign production                      |
| Beauty        | 妆面人像           | detail、colour、makeup、portrait control                     | beauty launch/local content            | Beauty content and talent production              |

Entertainment 不降级，也不在 Hero 独占品牌认知。它作为差异化 capability proof，必须紧邻商业用途和真实性边界。

## 16. Case Study Tier System

### Tier definitions

| Tier                         | Required facts                                                                   | Can claim                               | Cannot claim                                |
| ---------------------------- | -------------------------------------------------------------------------------- | --------------------------------------- | ------------------------------------------- |
| Tier 1 — Strategic Case      | Client、objective、challenge、role、execution、outcome、business value、approval | verified business story and outcome     | unverified metrics or implied wider role    |
| Tier 2 — Execution Case      | Client/context、scope、execution、deliverables、location/date、approval          | confirmed delivery complexity and scope | business impact without evidence            |
| Tier 3 — Capability Evidence | approved imagery、environment、objective description、no inferred relationship   | production capability                   | client relationship、official role、outcome |

### Current allocation

| Project / collection                             | Current tier               | Upgrade target                  |
| ------------------------------------------------ | -------------------------- | ------------------------------- |
| Changan Launch                                   | Tier 2                     | Tier 1                          |
| CATL Open Day                                    | Tier 2                     | Tier 1                          |
| BYD BD11 London                                  | Tier 2                     | Tier 1 or richer Tier 2         |
| Leapmotor IAA                                    | Tier 2                     | richer Tier 2                   |
| London Automotive Brand Film                     | Tier 2                     | Tier 1                          |
| European Road & Lifestyle                        | Tier 2, some facts limited | richer Tier 2                   |
| Teal Editorial Fashion                           | Tier 3                     | Tier 2                          |
| Commercial Fashion                               | Tier 3                     | Tier 2                          |
| Beauty / Makeup                                  | Tier 3                     | Tier 2                          |
| Entertainment / Creator / Technology collections | Tier 3                     | named case only after full gate |
| Geely-related material                           | Hold                       | Tier decided after facts        |

### Priority B2B deep-case evidence requests

| Priority project                          | Missing facts                                                                                               | Questions to ask client/team                                                                                                                  | Evidence needed                                                                   | Potential business story                                                                         | Strategic importance                                               |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| London Automotive Brand Story Film        | client objective、brief、audience、deliverables、approval route、usage、result                              | Why was UK chosen? What had to be local? What exactly did Venus manage? Where were assets used?                                               | approved brief/scope、call sheet、delivery list、published links、client approval | Turning a Chinese automotive story into credible UK-located brand content                        | 最接近 Brand + UK Local Execution 定位                             |
| Changan European Brand Launch             | launch objective、Venus complete role、timeline、stakeholders、deliverables、post-launch use                | What launch moment mattered? Which teams/suppliers were coordinated? What content was delivered and used?                                     | contract/scope、run of show、delivery evidence、publication、approved outcome     | Delivering visual and live-content support for a Chinese automotive brand’s European launch      | 证明 launch complexity 与中国品牌关联                              |
| BYD BD11 London Launch                    | business context、launch ownership、local dependencies、deliverables、audience/use                          | Was Venus commissioned by whom? Which local tasks were managed? What made London delivery complex?                                            | approved relationship wording、scope、schedule、asset list、publication           | Supporting a Chinese mobility brand’s London launch environment and content                      | 最强 China-to-UK location relevance                                |
| CATL Open Day 2025                        | event objective、technology story、speaker/content scope、turnaround、usage                                 | What did the audience need to understand? What was captured live? What was the turnaround?                                                    | brief、stage/run-of-show material、delivery list、published content、approval     | Making a complex technology event clear and reusable through speaker, stage and audience content | 连接 Automotive、Technology、Founder/Expert communication          |
| One selected Entertainment / Live project | project identity、client/subject、date/location、Venus role、rights、deliverables、turnaround、business use | Which collection has the strongest complete facts? Was it official/client work? What talent/rights constraints existed? How were assets used? | rights and client approval、brief、call sheet、delivery proof、publication        | Managing a talent-sensitive, time-critical live environment for audience-facing content          | 防止 Entertainment 永远停留在图库；建立独特 creator/cultural proof |

### Evidence-request sequence

1. 先由内部团队填写已知事实和“unknown”；
2. 再向客户请求公开措辞、scope、deliverables 和结果批准；
3. 无 outcome 的项目升级为 richer Tier 2，不强行做 Tier 1；
4. 只有具备 objective、challenge、execution、outcome 与 business value 的项目才进入 Tier 1；
5. Entertainment 深案例若无法取得完整客户/rights 证据，继续保留 Tier 3，不降低其视觉价值。

## 17. Homepage Proof Ranking

### Scoring

Each dimension is 1–5. Total /30.

| Rank | Proof                           | Relevance | Credibility | Complexity | China→UK fit | Visual | Evidence completeness |  Total |
| ---: | ------------------------------- | --------: | ----------: | ---------: | -----------: | -----: | --------------------: | -----: |
|    1 | London Automotive Brand Film    |         5 |           5 |          4 |            5 |      5 |                     4 | **28** |
|    2 | Changan European Brand Launch   |         5 |           5 |          5 |            4 |      5 |                     4 | **28** |
|    3 | BYD BD11 London Launch          |         5 |           5 |          4 |            5 |      4 |                     4 | **27** |
|    4 | CATL Open Day                   |         5 |           5 |          5 |            4 |      4 |                     4 | **27** |
|    5 | Leapmotor at IAA                |         4 |           5 |          4 |            4 |      4 |                     4 | **25** |
|    6 | Teal Editorial Fashion          |         3 |           3 |          3 |            2 |      5 |                     3 | **19** |
|    7 | Entertainment / Live capability |         4 |           2 |          4 |            2 |      5 |                     2 | **19** |
|    8 | Technology / AI capability      |         4 |           2 |          3 |            3 |      5 |                     2 | **19** |

### Homepage recommendation

- 首屏 Proof cue：London/UK automotive or launch fact，不用 Logo 墙；
- 主 Proof 3 项：London Automotive Brand Film、Changan Launch、BYD BD11 或 CATL；
- Supporting capability strip：Technology、Fashion、Entertainment 各一项，用 capability label，不称 case；
- 首页不能因视觉多样性牺牲商业相关性；多样性由 supporting proof 提供。

## 18. Demand Creation Framework

### Section concept

推荐标题方向：**What UK expansion teams often underestimate**。它比 “What usually goes wrong” 更专业，也避免恐吓式销售。

| Problem                                         | Business impact                              | Venus entry point                        |
| ----------------------------------------------- | -------------------------------------------- | ---------------------------------------- |
| Entering without a defined first test           | 预算分散，无法判断 go/no-go                  | Market Entry Diagnostic                  |
| Reusing China-first messaging unchanged         | 英国受众不理解 proposition 或 proof          | Localisation Review                      |
| Treating a launch/exhibition as a one-day event | 没有 pre/post content，活动价值快速消失      | Launch Readiness Review                  |
| Hiring disconnected local suppliers             | 客户承担跨语言责任、时间和审核风险           | Local Delivery / responsibility map      |
| Choosing creators mainly by follower count      | brand fit、rights、disclosure 和内容质量失控 | Creator brief within Localisation/Launch |
| Building no post-launch content system          | 认知无法累积，每次重新采购                   | Brand & Content system                   |
| Mapping specialist dependencies too late        | launch 延误或内容无法获批                    | Specialist dependency mapping            |

每个问题必须链接到一个 entry product、solution 或 proof；不能只制造焦虑。

## 19. Homepage Business Narrative

### Narrative sequence

```text
WHO VENUS HELPS
中国企业推进英国品牌、发布与本地执行
↓
WHICH SITUATION AM I IN?
Explore / Launch / Build / Execute
↓
WHAT AM I UNDERESTIMATING?
验证、本地化、责任、内容持续性、专业依赖
↓
WHAT IS THE RIGHT SOLUTION?
Review / plan / local production / network coordination
↓
CAN VENUS REALLY DELIVER?
真实 launch、UK content、exhibition 和 production proof
↓
HOW DOES VENUS WORK?
Define / connect / plan / execute / learn
↓
WHAT CAN VENUS EXECUTE?
Content、talent、creator、event、crew、bilingual PM
↓
WHY TRUST VENUS?
People、method、proof、boundaries、vetted network
↓
WHAT SHOULD I DO NEXT?
Fit Call 或 Execution Brief
```

### One homepage commercial goal

> **让一个中国企业决策人在一次访问中识别自己的英国阶段、发现关键不确定性，并选择一个可信且低风险的下一步。**

首页不承担完整 market-entry education、全部 capability database 或全部案例展示；它负责分类、建立需求、提供证据和转化。

## 20. Homepage Section Specifications

### Section 01 — Hero / Commercial Position

**Purpose:** 在五秒内定义 primary customer、UK focus、commercial outcome 与 Venus 的真实交付位置。  
**Target visitor state:** 第一次访问，不确定 Venus 是制作公司还是市场进入顾问。  
**Primary message:** Venus 帮助中国企业在英国建立品牌、完成发布并可靠地本地执行。  
**Secondary message:** 从明确下一步和责任，到组织当地内容、活动、人才与 production。  
**Customer question answered:** “你们服务谁、在哪、最终帮助我完成什么？”  
**Business objective:** 排除低相关流量，建立 B2B 类别认知。  
**Proof required:** London/UK operating cue；一个已发布 UK/launch proof；不能只用抽象口号。  
**Content required:** Positioning、support sentence、1 条 proof cue、2 个 CTA。  
**Recommended CTA:** Primary `Book a 20-minute UK Fit Call`；Secondary `Send an Execution Brief`。  
**Existing content reusable:** London-based、bilingual、UK delivery；现有视觉系统和 project-route design language。  
**Existing assets reusable:** London automotive brand film 或 BYD London launch 的安全画面；品牌 Logo。  
**What must NOT appear:** 六类受众清单、全部 services、Market Entry Consultancy、Europe-wide claim。  
**Mobile priority:** H1、support、Primary CTA、proof cue 需在首个 1.5 viewport 内；Secondary CTA 可弱化。

### Section 02 — Customer Situations

**Purpose:** 让访客先按自己的商业阶段选择，而不是学习 Venus 内部服务分类。  
**Target visitor state:** 知道英国意图，但不确定需要哪项服务。  
**Primary message:** “从你现在所处的阶段开始。”  
**Secondary message:** Explore、Launch、Build、Execute 分别有不同下一步。  
**Customer question answered:** “我属于哪种情况？”  
**Business objective:** 提升 self-qualification 与相关页面点击。  
**Proof required:** 不需要项目图片；每个状态需要明确 trigger 和 next step。  
**Content required:** 4 cards；每卡 1 个客户句子、1 个 outcome、1 个 link。  
**Recommended CTA:** `Explore this situation`，链接到对应 situation page。  
**Existing content reusable:** Create / Launch / Enter 的部分结构，但需按阶段重组。  
**Existing assets reusable:** 现有 route visual motifs；不必每卡使用照片。  
**What must NOT appear:** 摄影、视频、模特等 capability list；第五个 University 状态。  
**Mobile priority:** 四卡纵向；客户句子先于解决方案；每卡不超过 70–90 字中文。

### Section 03 — What UK Teams Underestimate

**Purpose:** 创造问题意识，让客户发现尚未写进 brief 的风险。  
**Target visitor state:** 认为只要找供应商、参加展会或翻译内容即可。  
**Primary message:** 英国动作的成本通常不在单项制作，而在错误顺序、责任断点和缺少后续。  
**Secondary message:** 这些问题可通过 review、planning 与本地协调提前降低。  
**Customer question answered:** “我可能忽略了什么？”  
**Business objective:** 从已知制作需求扩展到 advisory/review demand。  
**Proof required:** 每个问题必须有实际项目经验或可靠 operating logic；不使用虚构市场数据。  
**Content required:** 5–7 个问题，本阶段采用 7 个；每项含 impact 与 entry point。  
**Recommended CTA:** `Review your UK readiness`，先进入 Fit Call 说明页。  
**Existing content reusable:** market-entry responsibility map、launch/content/process 内容。  
**Existing assets reusable:** 责任图、时间线、非装饰性项目细节图。  
**What must NOT appear:** 恐吓、统计数字、监管结论、保证失败规避。  
**Mobile priority:** 使用短列表或 accordion；默认显示前三个最高影响问题。

### Section 04 — How Venus Helps / Solutions

**Purpose:** 将问题映射到少量商业 solutions。  
**Target visitor state:** 已意识到问题，正在判断 Venus 是否相关。  
**Primary message:** Venus 把 review、planning、local connection 和 execution 连接起来。  
**Secondary message:** Solutions 有明确 direct、network-delivered 和 specialist boundary。  
**Customer question answered:** “你们具体怎样解决？”  
**Business objective:** 建立可购买的解决方案，不退回 capability list。  
**Proof required:** 每个 solution 至少关联一个 proof 或 pilot status。  
**Content required:** 5 个主 solutions：Market Exploration、Brand & Localisation、Launch & Activation、Creative Production、Local Delivery；Creator/Talent 与 Innovation 作为 cross-cutting modules。  
**Recommended CTA:** `See how we help` / solution-specific link。  
**Existing content reusable:** What We Do 三路径、service details、market-entry boundaries。  
**Existing assets reusable:** 当前 Expertise/route supporting media，按相关性选用。  
**What must NOT appear:** 20 项 deliverables、所有 specialist categories、未验证 outcome。  
**Mobile priority:** 先显示 customer outcome，再显示 scope；capabilities 默认折叠或次级。

### Section 05 — Proof by Business Objective

**Purpose:** 证明 Venus 已在相关 UK/Europe 环境中交付，而不是展示最漂亮照片。  
**Target visitor state:** 对承诺感兴趣，但怀疑经验和复杂度。  
**Primary message:** 真实项目证明 launch、UK content、exhibition 和 local delivery。  
**Secondary message:** 每个 proof 有 tier、事实边界和可验证 scope。  
**Customer question answered:** “你们做过与我的业务动作相关的事情吗？”  
**Business objective:** 提升 B2B trust 和深案例访问。  
**Proof required:** Tier 1/2 才进入主 proof；Tier 3 清楚标为 Capability Evidence。  
**Content required:** 3 个主 proof；每项只显示 situation、objective、confirmed role、location、link。  
**Recommended CTA:** `See the evidence`；单项 `View execution case`。  
**Existing content reusable:** Portfolio projects、case gate、project detail。  
**Existing assets reusable:** London automotive film、Changan、BYD/CATL。  
**What must NOT appear:** 未确认 metrics、client objective、完整职责或结果；按照片类型筛选。  
**Mobile priority:** 1 个主 proof + 2 个紧凑 proof；先显示 objective，再显示图片。

### Section 06 — From Decision to Local Delivery

**Purpose:** 展示 Venus 如何从不确定性走向执行，但不伪装成成熟 consultancy。  
**Target visitor state:** 想知道工作方式、责任和谁来决定。  
**Primary message:** Define → Connect → Plan → Execute → Learn。  
**Secondary message:** Understand/Validate 只在相应产品 scope 内提供。  
**Customer question answered:** “如何推进、在哪些节点做决定？”  
**Business objective:** 降低合作风险，支撑更高价值项目。  
**Proof required:** 实际模板、responsibility map、decision gates；Phase 2 上线前需 owner 确认。  
**Content required:** 5 步；每步 1 个 action、1 个 output、1 个 owner。  
**Recommended CTA:** `See the working model` 或链接 About/Method。  
**Existing content reusable:** Production Process、market-entry scope boundaries。  
**Existing assets reusable:** 流程排版和品牌图形。  
**What must NOT appear:** “proprietary methodology”、guaranteed outcome、成熟 validation claim。  
**Mobile priority:** 线性阅读；不使用依赖横向 scroll 或 hover 的复杂图。

### Section 07 — Local Execution Engine

**Purpose:** 保留并明确 Venus 当前最强的 execution capabilities。  
**Target visitor state:** 已认可路线，需判断实际交付能力。  
**Primary message:** 一个双语 UK delivery route 可组织内容、人才、活动和当地 production。  
**Secondary message:** 能力按 direct/network-delivered 标记，不把每项变成 service。  
**Customer question answered:** “真正落地时你们能管理什么？”  
**Business objective:** 转化已有明确 brief 的客户并支撑 advisory 的可信度。  
**Proof required:** portfolio/capability media、供应方式和 scope boundary。  
**Content required:** 6 capability clusters：Content、Film/Photography、Talent/Creator、Events/Exhibitions、Interviews/Experts、UK Production Management。  
**Recommended CTA:** `Send an Execution Brief`。  
**Existing content reusable:** Create/Launch、Entertainment、Technology、Fashion capabilities。  
**Existing assets reusable:** 各领域 approved media，避免同页重复。  
**What must NOT appear:** software development、artist representation、PR result、未确认供应商 network scale。  
**Mobile priority:** 文字优先；最多 3 张 supporting media；避免人物图库效果。

### Section 08 — Network Advantage

**Purpose:** 解释 Venus 如何连接资源，同时公开真实性和专业边界。  
**Target visitor state:** 需要 creator、talent、expert、institution 或 specialist。  
**Primary message:** Venus 组织合适的本地资源和 brief，不把第三方能力冒充自有。  
**Secondary message:** Creative/Talent network 现在较强；Innovation/Specialist network 按批准与项目 fit。  
**Customer question answered:** “如果问题跨多个英国供应方，谁来组织？”  
**Business objective:** 建立 orchestration 差异化。  
**Proof required:** network category owner、selection process、approved relationship records。  
**Content required:** 3 层：Production & Talent / Innovation & Knowledge / Vetted Specialists。  
**Recommended CTA:** `Discuss the resources your brief needs`。  
**Existing content reusable:** market-entry specialist boundaries、institution gates、About extended network。  
**Existing assets reusable:** 品牌路径图；当前不使用 institution Logo。  
**What must NOT appear:** partner count、unapproved logos、official university network、guaranteed access。  
**Mobile priority:** 先解释 Venus role，再列 resource examples；免责声明不应隐藏。

### Section 09 — Industries

**Purpose:** 证明行业语境，不假装覆盖所有中国企业。  
**Target visitor state:** 判断 Venus 是否理解其行业。  
**Primary message:** Core proof in Automotive；growth focus in Technology、Fashion/Beauty、Entertainment/Creator。  
**Secondary message:** 其他行业按项目适配，不等于已有成熟案例。  
**Customer question answered:** “你们是否理解我的产品、受众和执行环境？”  
**Business objective:** 提高高适配行业转化，降低泛化。  
**Proof required:** CORE 必须有 Tier 1/2；GROWTH 可有 Tier 3 但需明确。  
**Content required:** 4 个主行业 + 1 个 Adjacent consumer group；每项含 proof status。  
**Recommended CTA:** `View relevant proof`。  
**Existing content reusable:** 四个 Expertise sectors。  
**Existing assets reusable:** 现有行业卡媒体。  
**What must NOT appear:** Manufacturing/Professional Services 作为成熟行业、十几个行业清单。  
**Mobile priority:** 先显示 Core/Growth 状态和客户问题，不以图片占满页面。

### Section 10 — Insights / Decision Support

**Purpose:** 持续创造需求并证明判断力。  
**Target visitor state:** 尚未准备联系，正在研究英国问题。  
**Primary message:** Practical questions to resolve before spending on UK activity。  
**Secondary message:** 内容服务 Explore、Launch、Build、Execute 四阶段。  
**Customer question answered:** “在联系供应商前我应该知道什么？”  
**Business objective:** 捕获早期需求、形成 diagnostic pipeline。  
**Proof required:** 每篇由可识别 owner 审核；regulated topic 由 specialist 审核。  
**Content required:** 首页 3 篇；Insights 导航上线前至少 6 篇高质量内容。  
**Recommended CTA:** article-specific Fit Call / Review CTA。  
**Existing content reusable:** 当前 market-entry scope、launch、localisation 和 case learning。  
**Existing assets reusable:** 项目细节、流程图；不需要 stock-news visuals。  
**What must NOT appear:** 泛 UK news、编造市场数据、未标来源的法律建议。  
**Mobile priority:** 标题 + 一句问题 + stage；不显示长摘要。

### Section 11 — Dual Conversion

**Purpose:** 分开未知需求与明确执行 brief。  
**Target visitor state:** 已建立足够信任，准备下一步。  
**Primary message:** “Still exploring?” 与 “Already have a brief?” 是两种不同入口。  
**Secondary message:** Fit Call 判断匹配；Execution Brief 评估 scope。  
**Customer question answered:** “我现在应该怎样开始？”  
**Business objective:** 提升 qualification，避免所有用户进入 production form。  
**Proof required:** response expectation、owner、privacy/data boundary。  
**Content required:** 两张路径卡；每张 1 个 CTA、用户会得到什么、适用条件。  
**Recommended CTA:** Primary `Book a 20-minute UK Fit Call`；Secondary `Send an Execution Brief`。  
**Existing content reusable:** Quick/Full contact modes，但要改变语义和字段。  
**Existing assets reusable:** Contact 现有双面板结构。  
**What must NOT appear:** “free consultation”、无边界的 advice、同一个表单。  
**Mobile priority:** Primary route first；明确预计时长、回复和不应上传的敏感资料。

## 21. Homepage Content Wireframe

```text
[HEADER]
Logo
How We Help | Solutions | Proof | Industries | Insights* | About
Persistent CTA: Book a UK Fit Call
* Hidden until content launch gate is met

↓

[01 HERO — POSITION]
UK Brand, Launch & Local Execution Partner for Chinese Companies
Supporting positioning
CTA A: Book a 20-minute UK Fit Call
CTA B: Send an Execution Brief
One verified UK / launch proof cue

↓

[02 CUSTOMER SITUATIONS]
Where are you in your UK journey?
01 Exploring the UK
02 Preparing a UK Launch
03 Building UK Presence
04 Ready for Local Delivery

↓

[03 WHAT UK TEAMS UNDERESTIMATE]
5–7 decision risks
Each: problem → impact → Venus entry point

↓

[04 SOLUTIONS]
Market Exploration
Brand & Localisation
Launch & Activation
Creative Production
Local Delivery
Cross-cutting: Creator/Talent; Innovation/Knowledge

↓

[05 PROOF BY BUSINESS OBJECTIVE]
1 UK Brand / Local Content proof
1 Launch proof
1 UK/Europe event or exhibition proof
Supporting capability evidence clearly labelled

↓

[06 DECISION TO LOCAL DELIVERY]
Define → Connect → Plan → Execute → Learn
Owner + output at each stage

↓

[07 LOCAL EXECUTION ENGINE]
Content | Film/Photography | Talent/Creator
Events/Exhibitions | Interviews/Experts | UK Production Management

↓

[08 NETWORK ADVANTAGE]
Production & Talent
Innovation & Knowledge
Vetted Specialists
Truth boundary

↓

[09 INDUSTRIES]
CORE: Automotive
GROWTH: AI/Technology; Fashion/Beauty; Entertainment/Creator
ADJACENT: Selected consumer brands

↓

[10 INSIGHTS]
Three problem-led articles
Build before navigation

↓

[11 DUAL CONVERSION]
Exploring: Book a UK Fit Call
Defined brief: Send an Execution Brief

[FOOTER]
Positioning + UK-first / project-specific Europe
Core links + legal + contact
Specialist boundary
```

## 22. Homepage Content Budget

### Section budgets

| Section          | Max headline words (EN) | Max support      |         Cards/items |          Proof items |    CTAs | Desktop priority | Mobile priority |
| ---------------- | ----------------------: | ---------------- | ------------------: | -------------------: | ------: | ---------------- | --------------- |
| Hero             |                   10–12 | 35–45 words      |                   0 |                1 cue |       2 | Critical         | Critical        |
| Situations       |                     6–8 | 20–30 words      |                   4 |                    0 | 4 links | Critical         | Critical        |
| Underestimated   |                     6–9 | 25–35 words      |                 5–7 |                    0 |       1 | High             | High            |
| Solutions        |                     6–8 | 25–35 words      | 5 + 2 cross-cutting |  1 per solution link |     1–5 | High             | High            |
| Proof            |                     5–7 | 20–30 words      |                   3 | 3 + max 3 supporting |   4 max | Critical         | Critical        |
| Method           |                     5–8 | 20–30 words      |             5 steps |        1 process cue |       1 | Medium           | Medium          |
| Execution Engine |                     5–8 | 25–35 words      |          6 clusters |         max 3 images |       1 | High             | High            |
| Network          |                     5–8 | 30–45 words      |            3 layers | max 2 approved facts |       1 | Medium           | Medium          |
| Industries       |                     4–6 | 20–30 words      |                 4–5 |          1 link each |       1 | Medium           | Low–Medium      |
| Insights         |                     5–8 | 20–30 words      |          3 articles |                    0 |   4 max | Medium           | Medium          |
| Conversion       |                     5–8 | 25–35 words/path |            2 routes |                    0 |       2 | Critical         | Critical        |

### Homepage Content Density Rules

1. 首页总主 sections 不超过 11；Footer 不计。
2. 同一 section 不同时使用长段落、6 张图片和 6 张卡。
3. 每个 section 只回答一个客户问题。
4. 每个 CTA 必须说明下一步或产出，不使用重复 `Learn more`。
5. 每屏最多一个 primary visual focal point。
6. Tier 3 capability media 不得与 Tier 1/2 case 使用相同标签。
7. 移动端正文单段建议不超过 70–90 个中文字或 45 个英文单词。
8. 全首页主 CTA 文案只保留两种；section links 使用描述性动词。
9. 不在首页显示完整 specialist list；只说明模式和最相关类别。
10. 若 Insights 尚未达到发布门槛，整个 section 和 nav item 都不显示空状态。

## 23. Conversion Architecture

### Route A — Unknown or emerging need

| Field              | Specification                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| Visitor state      | 正在探索英国、准备 launch 或认知到 localisation 问题，但没有完整 brief                                                           |
| CTA                | **Book a 20-minute UK Fit Call**                                                                                                 |
| Form fields        | Name；company；role；website；current UK stage；intended action/timing；main uncertainty；budget readiness band；contact details |
| Qualification      | 明确主体、时间和商业问题；排除求职、泛资源索取、无主体的免费咨询                                                                 |
| Next step          | 20 分钟 call → recommend paid product / execution brief / specialist / not a fit                                                 |
| What user receives | Fit decision、最合适下一步、是否需要补充资料；不是免费 strategy                                                                  |
| Internal owner     | 必须指定 Commercial/Strategy Owner；未指定前 NO-GO                                                                               |
| Conversion risk    | 被理解为免费 market-entry consulting；需限制 call 目标和时长                                                                     |

### Route B — Defined execution need

| Field              | Specification                                                                                                                                      |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visitor state      | 已有 approved objective、date、location、deliverables 或 agency brief                                                                              |
| CTA                | **Send an Execution Brief**                                                                                                                        |
| Form fields        | Company；project objective；location；date；deliverables；channels；talent/venue/crew needs；usage；budget range；approval owner；attachments link |
| Qualification      | UK/Europe project fit、scope、rights、timeline、budget、decision owner                                                                             |
| Next step          | brief review → clarification → feasibility/scope → execution proposal                                                                              |
| What user receives | confirmation of fit、missing inputs、estimated proposal timeline                                                                                   |
| Internal owner     | Production/Project Director                                                                                                                        |
| Conversion risk    | 不完整 brief 导致免费 scope work；需 mandatory minimum fields                                                                                      |

### Fit Call vs Diagnostic vs Consulting vs Proposal

```text
20-minute Initial Fit Call
免费；判断相关性，不提供完整建议
↓
Structured Paid Review / Diagnostic
固定问题、范围、产出和时限
↓
Decision Route
执行 / 补研究 / specialist / pause
↓
Execution Proposal
只针对已定义 scope
↓
Project Delivery
```

### Free vs paid decision

| Model                                  | Advantage              | Risk                      | Decision                |
| -------------------------------------- | ---------------------- | ------------------------- | ----------------------- |
| Free initial call                      | 降低接触门槛、筛选 fit | 容易变成免费咨询          | GO，20 分钟且有脚本     |
| Free diagnostic                        | 快速积累 leads         | 无法验证付费意愿，耗费高  | NO-GO                   |
| Paid fixed-fee diagnostic              | 证明价值、控制范围     | 初期需 owner/method和价格 | GO after build/pilot    |
| Diagnostic fully credited to execution | 易成交                 | 产品被视为免费售前        | 不建议；最多有限 credit |

## 24. Trust Architecture

| Trust Layer   | Current Evidence                              | Missing Evidence                                 | Action Required                          | Website Role               |
| ------------- | --------------------------------------------- | ------------------------------------------------ | ---------------------------------------- | -------------------------- |
| People        | About roles/brand-led structure               | named accountable leaders、bios、decision rights | 获取真实人员信息与批准                   | Who is responsible         |
| Method        | production process、responsibility boundaries | diagnostic rubric、templates、decision gates     | 建立并 pilot                             | Why the work is repeatable |
| Process       | brief→production→handoff较强                  | advisory→execution path                          | 扩展为 define/connect/plan/execute/learn | Reduce uncertainty         |
| Proof         | 9 projects、approved media                    | objectives、deliverables、outcomes               | 升级 3–5 cases                           | Evidence of ability        |
| Partners      | specialist gate                               | vetted named/category records                    | qualification and governance             | Scope beyond Venus         |
| Boundaries    | market-entry disclaimers、case gate           | concise public boundary statement                | 全站统一                                 | Prevent overclaim          |
| Insights      | market-entry content fragments                | authored problem-led content                     | publish 6+ launch set                    | Show judgement             |
| Outcomes      | mostly absent                                 | verified business results/learning               | client evidence requests                 | Support higher-value claim |
| Repeatability | content/release systems                       | product operating data                           | capture every diagnostic/project         | Build moat                 |

### Avoiding “consultancy copy without consultancy substance”

Advisory 相关页面必须同时显示：

1. named owner；
2. specific inputs；
3. bounded process；
4. tangible deliverables；
5. what is excluded；
6. pilot/evidence status；
7. separate specialist responsibility；
8. case or learning after launch。

缺少其中关键项时，产品不得主推。

## 25. People Trust Requirements

不虚构人员；以下是上线前资料要求。

| Role                           | Why needed                        | Required public evidence                                                 | Minimum responsibility          |
| ------------------------------ | --------------------------------- | ------------------------------------------------------------------------ | ------------------------------- |
| Founder / Managing Director    | 承担公司与客户关系可信度          | name、approved portrait、bio、China/UK experience、public approval       | final commercial accountability |
| Strategy / Commercial Lead     | 承担 diagnostic 与 recommendation | name、relevant experience、method ownership、conflict/boundary statement | owns Fit Call and reviews       |
| Production Lead                | 证明本地执行能力                  | production credits、scope、locations/events experience                   | feasibility and execution       |
| Specialist Partners            | 专业事项可信度                    | entity/person、qualification、insurance、relationship wording、approval  | regulated/specialist delivery   |
| Academic / Expert Contributors | innovation credibility            | expertise、institution wording、consent、project role                    | specific contribution only      |

### Publication rules

- 一人可兼任多个真实角色，但必须写清；
- “Extended Network”不能代替 accountable owner；
- 不使用艺人、嘉宾、模特或活动演讲者作为团队；
- 无人资料未就绪时，产品页只发布为 pilot invitation，不宣称成熟 practice。

## 26. Capability Truth Architecture

### Taxonomy

| Type               | Definition                                         | Examples                                                                           | Public wording                                 |
| ------------------ | -------------------------------------------------- | ---------------------------------------------------------------------------------- | ---------------------------------------------- |
| DIRECT             | Venus 可直接管理并对结果负责                       | bilingual PM、creative/production planning、content delivery、on-site coordination | `We lead / We deliver`，限于证据 scope         |
| NETWORK-DELIVERED  | crew、talent、supplier network 在 Venus 管理下交付 | photographers、film crew、models、HMU、venue/AV                                    | `We assemble and manage`                       |
| SPECIALIST-PARTNER | 独立专业方承担判断/申报/受监管交付                 | legal、tax、regulatory、certification、PR where contracted                         | `We coordinate with appointed specialists`     |
| DEVELOPING         | 正在建立方法、试点或关系                           | diagnostic、validation、university connections、technology scouting                | `Pilot / available subject to fit`，或暂不公开 |
| NOT OFFERED        | 无能力、证据或不适合承担                           | investment advice、immigration advice、supply-chain operation、distribution        | 不出现在 service claim                         |

### Content-system rule

每项 capability record 至少包含：

- truth type；
- owner；
- evidence IDs；
- geography；
- direct/supplier/specialist responsibility；
- public wording；
- exclusions；
- last reviewed；
- publish status。

## 27. UK vs Europe Positioning

| Level          | Meaning                                                                 | Evidence requirement                          | Current use                           |
| -------------- | ----------------------------------------------------------------------- | --------------------------------------------- | ------------------------------------- |
| UK-first       | London/UK 是主要 operating base 和承诺区域                              | UK team/process/projects                      | **Primary claim now**                 |
| Europe-capable | 在特定欧洲项目、国家和 partner scope 内交付                             | named project/location/supplier evidence      | **Project-specific supporting claim** |
| Europe-wide    | 多国 market-entry infrastructure、partners、regulatory/market knowledge | repeatable multi-country cases and governance | **Do not claim**                      |

### Approved geographic statement

> **UK-first, with selected European project experience and delivery confirmed case by case.**

不使用 “UK & Europe Market Entry Platform”“Europe-wide network”或“across Europe”作为默认主张。

## 28. Industry Prioritisation

评分采用 1–5；Revenue Potential 是战略估计，不是收入预测。

| Industry                |               Existing Proof | Strategic Fit | Revenue Potential | Credibility | Website Status                  |
| ----------------------- | ---------------------------: | ------------: | ----------------: | ----------: | ------------------------------- |
| Automotive / Mobility   |                            5 |             5 |                 5 |           5 | **CORE**                        |
| AI / Technology         |                            3 |             5 |                 5 |           3 | **GROWTH**                      |
| Fashion / Apparel       |                            4 |             4 |                 4 |           4 | **GROWTH**                      |
| Beauty                  |                            3 |             4 |                 4 |           3 | **GROWTH**，可与 Fashion 共架构 |
| Entertainment / Culture | 3 capability / limited cases |             4 |                 4 |           3 | **GROWTH capability**           |
| Consumer brands         |                            2 |             4 |                 5 |           2 | **ADJACENT**                    |
| Manufacturing           |                            1 |             4 |                 4 |           1 | **DO NOT FEATURE YET**          |
| Education / Research    |        1 public relationship |             4 |                 3 |           1 | **ADJACENT / build first**      |
| Luxury                  |            2 adjacent visual |             3 |                 4 |           2 | **ADJACENT**                    |
| Professional Services   |                            1 |             2 |                 3 |           1 | **DO NOT FEATURE YET**          |

### Homepage industry decision

- CORE：Automotive / Mobility；
- GROWTH：AI / Technology；Fashion & Beauty；Entertainment & Creator；
- ADJACENT：Selected Consumer Brands，只以适配说明出现；
- Manufacturing、Education/Research、Luxury、Professional Services 不作为首页主行业卡。

## 29. Navigation Architecture

### Final target navigation

```text
How We Help
├─ Exploring the UK
├─ Preparing a UK Launch
├─ Building UK Presence
└─ Ready for Local Delivery

Solutions
├─ Brand & Localisation
├─ Launch & Activation
├─ Creative Production
├─ Creator & Talent
├─ Local Delivery
└─ Innovation & Knowledge Connections*

Proof
├─ By Business Objective
└─ By Industry

Industries
Insights*
About

Persistent CTA: Book a UK Fit Call
Secondary conversion within pages: Send an Execution Brief
```

`Insights` 需至少 6 篇审核内容后显示；`Innovation & Knowledge Connections` 需 owner、process 和关系边界后主推。在 gate 前可保留非导航说明页。

### Why this is the final structure

- 一级导航 6 项，不是 capability database；
- How We Help 按客户状态；
- Solutions 按 business solution；
- Proof 代替 portfolio category；
- Industries 是信任筛选，不主导首页；
- Network 不做一级项，避免夸大；
- Contact 由 persistent CTA 和 Footer 承担。

## 30. Content Migration Map

| Current Route                        | Current Role                   | Future Role                                      |       Keep        | Merge |              Redirect              |  Rewrite   |
| ------------------------------------ | ------------------------------ | ------------------------------------------------ | :---------------: | :---: | :--------------------------------: | :--------: |
| `/[lang]`                            | production-led homepage        | commercial decision homepage                     |         ✓         |       |                                    |     ✓      |
| `/what-we-do`                        | three project paths            | How We Help hub                                  |         ✓         |       |                                    |     ✓      |
| `/what-we-do/create-in-the-uk`       | content production path        | Ready for Local Delivery / Creative Production   |                   |   ✓   |      evaluate canonical route      |     ✓      |
| `/what-we-do/launch-in-the-uk`       | launch path                    | Preparing a UK Launch                            |         ✓         |       |                                    |     ✓      |
| `/what-we-do/enter-the-uk`           | market-entry coordination      | Exploring the UK                                 |         ✓         |       |                                    |     ✓      |
| `/services`                          | legacy service hub             | Solutions hub                                    |                   |   ✓   | `/solutions` or retained canonical |     ✓      |
| `/services/commercial-production`    | production service             | Creative Production solution                     | ✓ for SEO equity  |   ✓   |              optional              |     ✓      |
| `/services/events-exhibitions`       | events service                 | Launch & Activation                              | ✓ for SEO equity  |   ✓   |              optional              |     ✓      |
| `/services/uk-market-entry`          | compliance coordination        | Exploring UK + Specialist boundaries             |                   |   ✓   |        to How We Help page         |     ✓      |
| `/services/research-innovation`      | specialist projects            | Innovation & Knowledge Connections               |  hold until gate  |   ✓   |              optional              |     ✓      |
| `/expertise`                         | four sectors                   | Industries hub                                   |                   |   ✓   |          to `/industries`          |     ✓      |
| `/expertise/automotive`              | sector capability              | Automotive industry page                         |                   |   ✓   |    to canonical industry route     |     ✓      |
| `/expertise/fashion-beauty-apparel`  | sector capability              | Fashion & Beauty industry page                   |                   |   ✓   |    to canonical industry route     |     ✓      |
| `/expertise/entertainment-culture`   | capability sector              | Entertainment/Creator growth page                | ✓ or canonicalise |   ✓   |              optional              |     ✓      |
| `/expertise/technology-ai-research`  | technology/research sector     | AI/Technology; research becomes network module   |                   |   ✓   |         split/canonicalise         |     ✓      |
| `/industries`                        | legacy industry hub            | final Industries hub                             |         ✓         |       |                                    |     ✓      |
| `/industries/automotive`             | sector page                    | final Automotive page                            |         ✓         |       |                                    |     ✓      |
| `/industries/fashion-beauty-apparel` | sector page                    | final Fashion & Beauty page                      |         ✓         |       |                                    |     ✓      |
| `/work`                              | verified work gallery          | Proof hub                                        |  ✓ URL initially  |       |           later optional           |     ✓      |
| `/work/[slug]`                       | project detail                 | Tier 1/2 proof detail                            |         ✓         |       |       avoid churn initially        | ✓ template |
| `/talent`                            | talent catalogue/service       | Creator & Talent capability                      |                   |   ✓   |        to solution section         |     ✓      |
| `/for-agencies`                      | agency production desk         | Ready for Local Delivery segment                 | ✓ as SEO landing  |   ✓   |            no main nav             |     ✓      |
| `/about`                             | brand/process/team             | People, method, boundaries, network governance   |         ✓         |       |                                    |     ✓      |
| `/contact`                           | one production form with modes | dual conversion hub                              |         ✓         |       |                                    |     ✓      |
| `/media-review`                      | dev-only media tool            | unchanged                                        |    ✓ dev-only     |       |                                    |            |
| `/privacy`, `/terms`                 | legal                          | unchanged, update only if forms/products require |         ✓         |       |                                    |  targeted  |

### Migration rule

先确定 canonical content owner，再做 redirect。不能在新首页上线后长期保留四套互相冲突的服务分类。

## 31. SEO Preservation Notes

1. SEO 服从定位和客户旅程，不以关键词为由保留旧主导航。
2. `/work/[slug]` 已有项目 URL，应优先保留并重写语义，避免无必要迁移。
3. `/services/commercial-production`、`events-exhibitions` 可作为 solution landing page 保留搜索权益，但不必在一级导航出现。
4. `/expertise` 与 `/industries` 必须选一个 canonical taxonomy；建议 `/industries`。
5. 每次 merge 建立 one-to-one redirect、canonical、hreflang 和 sitemap 更新。
6. 不为 Manufacturing、Compliance、University、Supply Chain 建关键词页，除非真实能力和内容就绪。
7. Insights 只发布原创、可审核、与产品相关的 decision content；不批量生成泛新闻。
8. Market Entry 页面 metadata 必须使用 coordination/readiness wording，不能暗示 legal/GTM result。
9. Capability Evidence 不生成 case outcome schema；Tier 1/2 schema 按事实等级。
10. Phase 2 前保存现有 route、title、traffic/backlink baseline，迁移后监控。

## 32. Insight / Content Engine

### Publication model

每篇内容必须有：

- customer stage；
- one decision problem；
- evidence/source；
- author/reviewer；
- what Venus can and cannot do；
- one relevant commercial CTA；
- review date。

### 20-topic launch backlog

| Title                                                                               | Customer stage | Problem                           | Commercial CTA           |
| ----------------------------------------------------------------------------------- | -------------- | --------------------------------- | ------------------------ |
| 1. How to choose the first UK market test                                           | Explore        | 不知道从何开始                    | UK Fit Call              |
| 2. What a UK readiness review should answer                                         | Explore        | 把 market entry 当作 service list | Market Entry Diagnostic  |
| 3. Exhibition, pilot or launch: which comes first?                                  | Explore        | 行动顺序错误                      | UK Fit Call              |
| 4. The specialist dependencies to map before UK activity                            | Explore        | 太晚发现 legal/regulatory needs   | Market Entry Diagnostic  |
| 5. What information a Chinese company should prepare before speaking to UK partners | Explore        | brief 不完整                      | UK Fit Call              |
| 6. What Chinese brands underestimate before a UK launch                             | Launch         | 本地依赖遗漏                      | Launch Readiness Review  |
| 7. A pre-live-post content system for UK launches                                   | Launch         | 活动只有一天价值                  | Launch Readiness Review  |
| 8. What to prepare before a London product launch                                   | Launch         | timeline/owners不清               | Launch Readiness Review  |
| 9. Turning an exhibition into more than stand photography                           | Launch         | 无后续内容与 learning             | Exhibition/Launch Review |
| 10. Founder, speaker and interview content at a launch                              | Launch         | executive visibility 未规划       | Launch Review            |
| 11. Is your China campaign usable in Britain?                                       | Build          | 内容直接复用                      | Localisation Review      |
| 12. When a Chinese brand needs UK-based content                                     | Build          | 不知道何时本地制作                | Localisation Review      |
| 13. Founder visibility for UK market credibility                                    | Build          | 缺当地 authority content          | Localisation Review      |
| 14. Choosing UK creators beyond follower count                                      | Build          | creator fit/rights/disclosure     | Localisation Review      |
| 15. How to reuse, adapt or replace China-market assets                              | Build          | 重拍或硬复用成本高                | Localisation Review      |
| 16. What belongs in a UK production brief                                           | Execute        | brief 无法报价/执行               | Execution Brief          |
| 17. The approvals to settle before booking UK talent                                | Execute        | usage和档期风险                   | Execution Brief          |
| 18. How bilingual production control reduces supplier fragmentation                 | Execute        | 管理多个供应方                    | Execution Brief          |
| 19. Planning interviews across camera, sound, claims and cutdowns                   | Execute        | 把采访当单一拍摄                  | Execution Brief          |
| 20. What an overseas agency needs from a UK production desk                         | Execute        | 无本地办公室                      | Agency Execution Brief   |

### Navigation gate

Insights 一级导航显示前至少完成：

- 每阶段 1 篇，共 4 篇；
- 另 2 篇最强商业主题；
- author/review model；
- CTA 和 analytics；
- 更新/撤回流程。

## 33. Commercial Flywheel

### Final model

```text
PROBLEM-LED INSIGHT
让客户识别风险和机会
↓
FIT CALL
筛选真实商业问题
↓
PAID REVIEW / DIAGNOSTIC
定义下一步、责任和证据缺口
↓
EXECUTION PROJECT
完成品牌、发布或本地交付
↓
STRUCTURED LEARNING
记录决定、结果、供应方和客户反馈
↓
TIERED PROOF
形成 Strategic Case / Execution Case / Capability Evidence
↓
VETTED NETWORK
积累可靠 crew、talent、expert 和 specialist
↓
STRONGER INSIGHT & METHOD
提高下一次诊断和执行质量
```

### Data captured after every engagement

- customer situation；
- assumption/problem；
- chosen action；
- direct/network/specialist roles；
- timeline and dependencies；
- confirmed deliverables；
- evidence and outcome；
- what changed；
- reusable checklist；
- relationship permission；
- case publication status。

网站因此不仅产生 lead，还积累方法、证据、网络和可复用知识。

## 34. Strategic Moat

| Stage    | Moat element                            | Current state       | How it compounds                                |
| -------- | --------------------------------------- | ------------------- | ----------------------------------------------- |
| EXISTING | China-facing bilingual coordination     | 已有定位与流程      | 重复项目形成沟通与责任模式                      |
| EXISTING | UK production and local execution       | 有真实项目          | crew/supplier reliability 与 delivery knowledge |
| EXISTING | Automotive launch/exhibition proof      | 强                  | 行业信誉与 cross-sell                           |
| EXISTING | Entertainment/Fashion/Talent production | 有能力媒体与作品    | cultural and creator execution range            |
| EMERGING | Strategy-to-execution orchestration     | 尚未产品化          | diagnostic → execution feedback                 |
| EMERGING | Vetted specialist ecosystem             | 有 gate，无公开网络 | 每次 referral 增加可靠性数据                    |
| EMERGING | University / knowledge connections      | 有潜力，证据不足    | approved relationships and topic fit            |
| EMERGING | Accumulated UK market learning          | 未系统捕获          | 每个项目变成 benchmark/checklist                |
| FUTURE   | Repeatable diagnostic data              | 无                  | 匿名跨项目 patterns 改善判断                    |
| FUTURE   | China–UK client relationships           | 部分                | repeat work、referrals、industry depth          |
| FUTURE   | Project-specific Europe network         | 少量经验            | country-specific partners and cases             |

真正 moat 是 **关系 + 执行记录 + 学习 + 证据 + 方法** 的复利，不是资源名单或视觉质量。

## 35. Venus Boundary Statement

### Who we are

Venus Bridge Media 是面向中国企业的英国品牌、发布与本地执行伙伴，以双语项目控制连接英国内容、活动、人才和 production。

### Who we are not

Venus 不是法律、税务、监管、移民、投资、供应链或全欧洲市场进入咨询机构，也不代表高校、艺人或第三方机构。

### What we deliver directly

- brief/problem framing within agreed scope；
- brand/content/launch planning；
- bilingual project management；
- UK creative production；
- events/exhibitions content and local coordination；
- interviews、talent/creator production；
- delivery and handoff。

### What we organise through our network

- crew、talent、creator、styling、venue、AV、supplier 和 approved expert participation，按项目可用性和权限。

### What specialist partners deliver

- legal、tax、accounting、regulatory、certification、formal PR/media relations 及其他需要专业资格的工作，由客户聘任的合适机构提供。

### What is developing

- structured market-entry diagnostic；
- formal validation products；
- university/innovation connection system；
- vetted business-introduction and specialist network。

### What we do not offer now

- guaranteed market access、sales、distribution、investment、funding、university access 或 campaign outcomes；
- Europe-wide infrastructure；
- direct regulated advice；
- supply-chain、warehousing、recruitment 或 immigration delivery。

## 36. Messaging Hierarchy

```text
LEVEL 1 — PRIMARY PROMISE
UK Brand, Launch & Local Execution Partner for Chinese Companies

↓

LEVEL 2 — CUSTOMER SITUATIONS
Exploring / Preparing to Launch / Building Presence / Ready to Execute

↓

LEVEL 3 — SOLUTIONS
Market Exploration / Brand & Localisation / Launch & Activation /
Creative Production / Local Delivery

↓

LEVEL 4 — CAPABILITIES
Photography / Film / Interviews / Talent / Creator / Events /
Exhibitions / Crew / Locations / Bilingual PM

↓

LEVEL 5 — PROOF
Tier 1 Strategic / Tier 2 Execution / Tier 3 Capability Evidence

↓

LEVEL 6 — SPECIALIST NETWORK
Independent qualified support, only where required and vetted
```

### Copy governance rules

1. 每句话必须能定位到一个层级。
2. 不把 Photography 与 Market Exploration 并列。
3. 不把 Future capability 写进 Level 1。
4. Level 1 全站一致；不为每页发明新公司身份。
5. Level 5 必须有 evidence ID 和 publication status。
6. Level 6 必须使用 coordinate/refer，不使用 deliver/advice。

## 37. P0 / P1 / P2 Implementation Priorities

### P0 — Decisions and operating substance

1. 批准 Primary Positioning、Primary Customer 与 Boundary Statement；
2. 任命 Commercial/Strategy Owner 和 Production Owner；
3. 建 Launch Readiness 与 Localisation Review templates；
4. 建 Market Entry Diagnostic minimum product；
5. 确认 Fit Call qualification、response、privacy 与 ownership；
6. 向 3–5 个案例索取事实和授权；
7. 建 capability truth records 与 partner publication gate。

### P1 — Commercial content architecture

1. 完成 homepage section copy brief；
2. 重写 How We Help / Solutions / Proof taxonomy；
3. 建 dual conversion forms；
4. 将 Work 改为 proof-by-objective；
5. 建 People/Method/About content；
6. 完成 route canonical and migration decisions；
7. 完成首批 6 篇 Insights。

### P2 — Production implementation

1. 修改 content types/config；
2. 实现 Homepage；
3. 实现 navigation and redirects；
4. 实现 products/situation pages；
5. 实现 proof tiers；
6. 实现 contact routing；
7. 更新 metadata/schema/sitemap；
8. 跨端、无障碍、release gate、analytics 与 build verification。

## 38. What NOT To Build

- 不构建 full-service market-entry consultancy 首页。
- 不构建 Europe-wide platform claim。
- 不构建 20–30 项 services mega menu。
- 不构建 University Services、Cambridge Partnership 或 Logo wall。
- 不构建 Legal/Tax/Compliance/Supply Chain 等 Venus direct service pages。
- 不构建免费 Diagnostic。
- 不构建同一个 Contact form 服务所有意图。
- 不构建按 Photo/Video/Fashion/Event 为主的首页 Portfolio。
- 不把 Tier 3 capability media 包装成案例。
- 不先做新 animation、图片系统或 UI polish。
- 不批量生成泛 UK news/SEO 页面。
- 不在没有 owner、method、template 和 pilot 时发布 advisory product。
- 不删除 Entertainment/Fashion；重新建立商业上下文。
- 不把现有中国汽车品牌 project scope 扩写成未获证实的市场进入成果。

## 39. Decisions Required Before Coding

### GO / NO-GO DECISIONS

**GO**

- Use **UK Brand, Launch & Local Execution Partner for Chinese Companies** as Primary Positioning.
- Use Market Entry as a customer problem and product entry point, not current top-level consultancy identity.
- Use four customer situations as homepage entry architecture.
- Use a free 20-minute Fit Call followed by paid, bounded products.
- Pilot Launch Readiness and Localisation Review before broad promotion.
- Build the Market Entry Diagnostic before piloting it.
- Keep Entertainment, Celebrity, Concert, Creator and Fashion as business capability proof.
- Reclassify proof by business objective.
- Maintain UK-first and project-specific Europe wording.
- Separate unknown-need and execution-brief conversion routes.
- Build People, Method, Proof, Boundary and Partner governance before advisory claims.
- Keep specialist delivery independent and explicit.

**NO-GO**

- Claim full-service UK/European market-entry consultancy.
- Use Market Entry Partner as the current Hero identity.
- Promote supply-chain, distribution, investment, recruitment or immigration delivery.
- Publish university logos or official relationship wording without evidence.
- Offer a free diagnostic.
- Put every capability or specialist category in navigation.
- Continue visual-first homepage work before commercial decisions are approved.
- Publish Insights navigation before the minimum content gate.
- Infer outcomes, roles, clients or relationships from images and visible logos.

### Blocking decisions

Coding can begin only after business owners decide:

1. Who owns the Fit Call and three products?
2. Is the Primary Positioning approved verbatim or conceptually?
3. Will initial paid product pricing be fixed-fee, and who approves it?
4. Which three pilot clients/projects can be used?
5. Which 3–5 existing projects can provide missing case facts and approvals?
6. Is `/industries` the canonical sector taxonomy?
7. Will `Insights` launch in Phase 2 only if six articles are ready?
8. What is the response SLA and data handling route for both conversion forms?

If these remain unanswered, Phase 2 may implement content infrastructure but must not publicly launch advisory products.

## 40. Phase 2 Development Brief

### Implementation order

1. Encode Positioning, customer situations, truth types, proof tiers and product status in content models.
2. Build the dual conversion data model and owner routing.
3. Restructure Homepage content in the 11-section order.
4. Reframe Work as Proof by Business Objective without fabricating facts.
5. Consolidate How We Help / Services / Expertise / Industries according to the migration map.
6. Add product pages only at their approved `pilot` or `ready` status.
7. Implement canonical URLs, redirects, metadata, hreflang, schema and sitemap rules.
8. Add Insights only after its content gate.
9. Validate bilingual copy, mobile density, accessibility, analytics, release gates, tests and production build.

### Affected systems

- `content/` commercial architecture, navigation, pages, portfolio/proof, truth records；
- Homepage, Header/Footer, What We Do/Solutions, Proof, About, Contact components；
- route structure and redirects；
- contact validation/routing；
- SEO, structured data and sitemap；
- tests for claim boundaries, tiers, hidden/gated content and responsive behaviour。

### Critical dependencies

- approved positioning and primary customer；
- named internal owners；
- product templates, scope, status and pricing decision；
- case facts and permissions；
- partner/institution records；
- six Insight articles if navigation is enabled；
- contact SLA, privacy and data-handling decisions。

### Phase 2 code boundary

Do not implement new visual effects or media systems until the commercial content architecture, product gates and conversion routes are working and verified.
