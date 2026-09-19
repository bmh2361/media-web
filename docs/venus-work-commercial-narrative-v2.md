# Venus Bridge 案例商业表达：本地审阅报告

2026-09-19 · 本地修改与预览完成；后续获用户授权，提交并推送工作分支 `codex/venus-commercial-expression`。随后用户明确授权推送 main 并发布到正式网站；下文测试与本地阶段记录保留，线上状态以发布后的验证结果为准。

开始前已 fetch 远端：`origin/main` 最新为 `2739a54b66de7593950f9f4de66fb244d2fb6243`，与参考提交相同。工作位于 `D:/media web/venus-work-narrative-v2`，独立分支 `codex/venus-commercial-expression`。原 `media-web` 工作区及 `codex/venus-english-hardening` 分支未改动。

本地预览：[中文 Work](http://127.0.0.1:3228/zh/work) · [English Work](http://127.0.0.1:3228/en/work)。关闭服务后可在上述工作区运行 `node scripts/serve-static-export.mjs --port 3228`。

## 修改文件与内容链

| 文件                                                                                                                                                                                                                                             | 改动                                                                                                                               |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `content/portfolio.ts`                                                                                                                                                                                                                           | 十二案双语编辑；短标题、完整项目名称、简短参与摘要；删除重复主题、推测性挑战及未来用途字段；去除四个无依据的排序日期，保留显式顺序 |
| `components/sections/CommercialCaseIndex.tsx`                                                                                                                                                                                                    | 桌面与移动预览统一读取商业主题及参与摘要；分类、地点移到标题下方；保留 hover、focus、点击和滚动激活逻辑                            |
| `components/sections/PortfolioProjectDetail.tsx`                                                                                                                                                                                                 | 背景→紧凑参与模块→原有项目影像→独立的新项目合作入口；移除巨大角色标题、重复职责标签及 Potential use 双栏                           |
| `components/sections/PortfolioWork.tsx`、`app/[lang]/work/page.tsx`                                                                                                                                                                              | “精选项目与团队经验”；列表前说明面向中国企业的英国／欧洲合作范围并提供入口                                                         |
| `app/[lang]/work/[slug]/page.tsx`                                                                                                                                                                                                                | metadata、Open Graph、CreativeWork 使用相同短标题、商业主题和参与摘要                                                              |
| `content/phase5.ts`、`components/sections/Phase5Homepage.tsx`                                                                                                                                                                                    | 当前首页案例引用改用团队经验归属及参与摘要                                                                                         |
| `HomepageEarlyProof.tsx`、`HomepageSelectedWork.tsx`、`Phase3Homepage.tsx`、`Phase4Homepage.tsx`（均在 `components/sections/`）及 `app/[lang]/industries/fashion-beauty-apparel/page.tsx`                                                        | 保留组件中的旧引用同步读取摘要，避免再次调用旧职责数组                                                                             |
| `tests/work-commercial-narrative-v2.test.mjs`、`case-study-commercial-redesign.test.mjs`、`phase-3-repositioning.test.mjs`、`phase-3-2c-experience.test.mjs`、`phase-3-4-release-readiness.test.mjs`、`scalable-commercial-case-system.test.mjs` | 测试保护实际结构、逐案职责、身份及权限，不再强制保留旧句子／未来用途                                                               |
| `e2e/work-commercial-narrative-v2.spec.ts`、`case-study-commercial-redesign.spec.ts`、`commercial-evidence-university.spec.ts`、`motion-correction.spec.ts`                                                                                      | 同步参与摘要断言；增加平板、原生语言与段落顺序检查；修正快速滑动轮询采样，保留原时限与交互断言                                     |
| 本文件                                                                                                                                                                                                                                           | 唯一内部交付报告，汇总证据判断、缺口、截图和测试                                                                                   |

`Spec.title` 是短标题唯一来源；新增 `eventName` 保留完整项目名称，`participationSummary` 用于预览、首页、信息栏和 SEO。`Spec.objective` 映射到 `commercialObjective`，详情和预览共用该商业主题。`roleStatement` 只在详情完整呈现一次；`execution` 说明本页实际内容。`roles` 仍映射到兼容字段 `role`／`venusRole`，不再驱动这些公开展示组件。`scope`、`capabilities` 是历史事实范围，未扩大；`scopeBoundary` 改为正面归属说明。删除 `projectValue`、`continuedValue`、`projectChallenge`，消除另一套主题和推测内容。

已读取语言布局：`app/[lang]/layout.tsx` 原本正确输出 `zh-CN`／`en-GB`，无需修改。图片、自然比例、焦点、素材权限、原始来源、slug、类别及联系地址均未改变。

## 三个代表案例：前后对比

| 案例         | 修改前                                                                          | 本轮表达                                                                                                                                                                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BYD          | 长标题“BYD BD11 双层公交车伦敦发布”；完整摄影职责在多处重复，再接“后续沟通可用” | **BYD BD11｜伦敦产品发布 / BYD BD11 \| London Product Launch**。主题保留英国公共交通语境；摘要为“团队参与 BD11 发布摄影，涵盖车辆、场地与观众。”／“Launch photography of the BD11, venue and audience.”；完整说明交代这些内容如何保留当地发布背景                            |
| AGIBOT       | “让具身智能拥有具体的产品表达”；挑战段夹带“购买需求验证”否定，随后写假想用途    | **AGIBOT 智元｜伦敦产品发布 / AGIBOT \| London Product Launch**。主题：“让技术介绍与真实产品展示形成清晰的品牌表达。”／“Connecting technical explanation and real product displays in a clear brand introduction.”；完整说明保留技术演讲、机器人展示、现场摄影与展示内容记录 |
| 英国汽车影片 | 泛称伦敦汽车品牌影片；正文反复否定成片剪辑／投放，再解释未来参考用途            | **汽车品牌影片｜英国实景 / Automotive Film \| UK Locations**。摘要明确英国实景协调、本地制作与汽车视觉制作；正文对应伦敦街道、采访画面及英格兰乡村。EN：“UK location coordination, local production and automotive imagery.”；不新增剪辑、发行或 campaign 职责               |

十二案均已检查中英文。长安保留美因茨多品牌发布身份；吉利保留英国品牌与 EX5 介绍；CATL 保留技术发布；零跑保留展会；两场演出保留文化／现场内容；伦敦时尚保留编辑肖像；美妆与欧洲汽车系列仍为独立作品选集。未把行业背景写成团队策略或已收到的客户 brief。

## 页面截图

同一静态构建、无浏览器自动翻译；截图宽度 1440、768、390。桌面列表十二个标题均不超过两行，前六个企业标题均为一行。保留移动端原有进度提示与交互。

| 页面                 | 桌面                                                                                        | 平板                                                                                       | 手机                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| 中文 Work            | [截图](../audit/commercial-expression/screenshots/zh-work-1440.png)                         | [截图](../audit/commercial-expression/screenshots/zh-work-768.png)                         | [截图](../audit/commercial-expression/screenshots/zh-work-390.png)                         |
| English Work         | [截图](../audit/commercial-expression/screenshots/en-work-1440.png)                         | [截图](../audit/commercial-expression/screenshots/en-work-768.png)                         | [截图](../audit/commercial-expression/screenshots/en-work-390.png)                         |
| BYD 中文详情         | [截图](../audit/commercial-expression/screenshots/zh-byd-bd11-london-1440.png)              | [截图](../audit/commercial-expression/screenshots/zh-byd-bd11-london-768.png)              | [截图](../audit/commercial-expression/screenshots/zh-byd-bd11-london-390.png)              |
| AGIBOT 中文详情      | [截图](../audit/commercial-expression/screenshots/zh-agibot-london-launch-1440.png)         | [截图](../audit/commercial-expression/screenshots/zh-agibot-london-launch-768.png)         | [截图](../audit/commercial-expression/screenshots/zh-agibot-london-launch-390.png)         |
| 英国汽车影片英文详情 | [截图](../audit/commercial-expression/screenshots/en-london-automotive-brand-film-1440.png) | [截图](../audit/commercial-expression/screenshots/en-london-automotive-brand-film-768.png) | [截图](../audit/commercial-expression/screenshots/en-london-automotive-brand-film-390.png) |

其余英文详情、首页引用、列表前合作入口及六张完整参与模块截图同在 `audit/commercial-expression/screenshots/`，共 42 张。

## 实际验证

| 检查                                                             | 实际结果                                                                                                                                                                                                   |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `lint`、`typecheck`、`format:check`                              | 通过                                                                                                                                                                                                       |
| `validate:content`、`validate:media`、`validate:release:staging` | 通过；媒体校验 83 条。通用内容校验针对 6 条旧注册记录，另由本轮单元／浏览器测试覆盖全部 12 案                                                                                                              |
| `npm test`                                                       | **126 通过，0 失败，11 原有跳过**                                                                                                                                                                          |
| `npm run build`                                                  | 通过，生成 **98 个静态页面**                                                                                                                                                                               |
| 完整浏览器首轮                                                   | 191 通过、3 失败、68 原有跳过；3 项等待旧参与句，已更新为新摘要并通过后续完整复跑                                                                                                                          |
| 完整浏览器复跑                                                   | **193 通过、1 失败、68 原有跳过**；唯一失败为快速滑动断言的采样遗漏，见下文                                                                                                                                |
| 修正后针对该项连续复跑                                           | **5 次通过、0 失败、0 跳过**；命令：`npm run test:e2e -- e2e/mobile-case-preview-polish.spec.ts --project=mobile --workers=1 --grep 'rapid flick' --repeat-each=5`                                         |
| 原生语言、SEO 与布局                                             | 12 案 × 2 语言 × 3 宽度，共 **72 次详情检查通过**；检查段落顺序、图片加载、横向溢出、canonical、hreflang、OG／CreativeWork 描述一致性。另核对 24 份静态详情、6 次真实语言切换，以及首页／Work 三种宽度截图 |
| 基线不变量比较                                                   | 十二案的 scope、capabilities、类别、图片／布局／焦点、权限全部一致                                                                                                                                         |
| 本轮未执行                                                       | production 发布门槛、部署、新一轮裁切生成；本轮不发布，未修改图像配置                                                                                                                                      |

快速滑动失败可重现，诊断显示目标约 930ms 已激活；默认轮询约在 850ms 后退避至 1850ms，越过 1500ms 截止时间。只在 `e2e/mobile-case-preview-polish.spec.ts` 将轮询间隔设为 50ms，**原 1500ms 截止、最多两次激活、最终目标一致三项约束不变**，网站交互代码未改。修正前该测试 5 次复现失败，修正后 5 次连续通过。此后未再执行第三次完整套件，不将定向复跑冒称完整套件全绿。没有新增跳过项。

旧结构断言改为保护“背景、完整参与说明、实际内容、独立未来合作”；权限断言增加逐项撤销权限时拒绝发布的验证。未来职责不再依靠全局白名单，而以这十二案的逐案 scope 基线防止无来源扩张。

已直接请求线上中英文 Work 与吉利详情：4 路由均 HTTP 200、语言正确，未出现“事件文档”或“将于2025”。仍显示旧标题，与 `2739a54` 基线一致；该 SHA 的 Cloudflare Pages 和 GitHub quality 检查均成功。无法仅凭现有截图确定差异来自自动翻译还是缓存；未添加全站禁译设置。以上是旧版部署核对，不是本轮上线声明。

## 证据判断与待负责人确认

品牌公开资料只支持活动背景，不证明团队委托范围。沿用已审阅来源：[BYD BD11 发布](https://bydeurope.com/article/464)、[长安美因茨发布](https://www.globalchangan.com/newsroom/changan-automobile-launches-changan-deepal-and-avatr-in-europe-ushering-in-a-new-era-of-evs.html)、[吉利英国发布](https://www.geely.com/en/news/2025/geely-debuts-ex5-uk)、[CATL Open Day](https://www.catl.com/en/news/6527.html)。BYD 年份采用明确的 2024 年活动记录；AGIBOT、汽车影片未补猜日期。四个删除的日期为演出、时尚与零跑记录中的人工月初占位，不影响显示年份或案例顺序。

| 项目范围                 | 扩大具体职责前需负责人提供的确认                                                                                 |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| 六个品牌／技术发布与展会 | 是否实际承担内容策划、议程、现场统筹、展台、嘉宾邀请、传播分发或合作引荐；逐项目提供委托方、职责记录及可公开来源 |
| 英国汽车影片             | 实景协调的具体工作与边界、制作委托及年份；如要加入成片剪辑、整体 campaign 或投放，需单独确认对应交付记录         |
| 两场演出                 | 确切日期及是否存在摄影之外的演出统筹、艺人经纪或品牌合作职责；不从活动身份推导团队身份                           |
| 伦敦时尚与两个选集       | 独立作品的具体委托／署名关系；若要公开时装周官方身份或长期品牌合作，须提供对应任命或合同来源                     |
| 全部历史项目             | 历史签约主体、个人／团队／公司经验归属，以及获准公开的传播使用或量化结果                                         |

“尚无记录”不等于“确认没有做过”。以上未确认内容没有补入本轮案例。未来可以逐项目增加经确认的策划、统筹等职责，必须同时更新该项目来源与事实范围；测试不再用全局制作角色白名单永久限制未来项目。原资料中的另一条 BYD 2024 影片与本站画面未建立对应，未转移其制作公司署名或年份。未新增结果、背书、客户评价或商业转化主张。
