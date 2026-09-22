# Venus Bridge 科技业务聚焦与视觉信息架构 — 本轮审阅记录

BASE_SHA: b0c64d1abfaed2d3177cbaf61ce2feb6b6b63387

CURRENT_BRANCH: codex/venus-commercial-rebuild

开始时 HEAD 与基线一致，工作区干净，无基线后的增量需要保留。本轮未提交、未推送，全部变更可在本地差异中审阅。未操作 Vivian Adventure。

## REMOVED_PUBLIC_CASES

品牌展示资格独立于素材授权：retiredPortfolioSlugs / isBrandEligiblePortfolioProject 叠加到原有发布门槛。四项历史记录、原始媒体、授权、审批和证据保持原状。findPortfolioProject、findPublishedPortfolioProject、findPortfolioMedia、portfolioMediaForPage、首页、列表、详情静态参数、相关/下一案例与 sitemap 都通过发布资格过滤。

| 历史项目                     | EN 旧地址                             | ZH 旧地址                             | 处理                                    |
| ---------------------------- | ------------------------------------- | ------------------------------------- | --------------------------------------- |
| wang-linkai-london-concert   | /en/work/wang-linkai-london-concert   | /zh/work/wang-linkai-london-concert   | 真实 404；尾斜杠与 .html 形式也验证 404 |
| yue-yunpeng-london-live      | /en/work/yue-yunpeng-london-live      | /zh/work/yue-yunpeng-london-live      | 真实 404；尾斜杠与 .html 形式也验证 404 |
| london-fashion-week-2025     | /en/work/london-fashion-week-2025     | /zh/work/london-fashion-week-2025     | 真实 404；尾斜杠与 .html 形式也验证 404 |
| beauty-fashion-brand-content | /en/work/beauty-fashion-brand-content | /zh/work/beauty-fashion-brand-content | 真实 404；尾斜杠与 .html 形式也验证 404 |

以下别名的 EN/ZH 地址均为真实 404，无跨域跳转、首页跳转或替代案例：

- /en/work/london-celebrity-event-coverage 与 /zh/work/london-celebrity-event-coverage（含尾斜杠及 .html）。
- /en/work/fashion-campaign-production-london 与 /zh/work/fashion-campaign-production-london（含尾斜杠及 .html）。
- /en/work/beauty-creator-content-sprint 与 /zh/work/beauty-creator-content-sprint（含尾斜杠及 .html）。
- /en/work/jewellery-editorial-shoot 与 /zh/work/jewellery-editorial-shoot（含尾斜杠及 .html）。
- /en/work/teal-editorial-series 与 /zh/work/teal-editorial-series（含尾斜杠及 .html）。
- /en/work/commercial-fashion-styling 与 /zh/work/commercial-fashion-styling（含尾斜杠及 .html）。
- /en/work/creative-beauty-makeup 与 /zh/work/creative-beauty-makeup（含尾斜杠及 .html）。

旧 fashion-beauty-apparel / entertainment-culture 行业与 expertise 地址也返回 404。删除了会输出 200 的时尚静态路由源文件；原始内容数据仍保留。其余仍有对应内容的旧服务入口直接重定向到有效服务锚点，科技/汽车行业入口指向首页 #priority-areas。没有宽泛 catch-all 将下架项目重新导向其他业务。

## RETAINED_TECH_CASES

- geely-london-brand-launch
- changan-europe-launch-2025
- catl-open-day-2025
- leapmotor-iaa-2023
- byd-bd11-london
- agibot-london-launch
- london-automotive-brand-film
- european-road-lifestyle：保留为次级汽车作品系列，不作为首页或三张核心商业页面的主要证据。

文化/艺人筛选已移除；筛选只展示当前集合存在的类别。Work 末尾 cultural project / 文化项目已改为科技发布、展会或技术演示。空案例集合不再使封面预加载崩溃。

## COMPANIES_PAGE

唯一任务：判断企业当前阶段如何开展下一项英国市场行动。

五部分：简洁首屏与吉利真实项目图；Market Action Map；AGIBOT / CATL 两组大幅项目故事；输入—工作—输出与三条适配条件；提交产品、目标、时间的 CTA。

移除完整 Engagements、Situations、CommercialProcess、重复行业名单及完整 SelectedCommercialExperience。共享 engagements 只提供阶段、问题、关键动作、输出与 Services 锚点；明确三项可独立购买。项目故事沿用原始角色事实，无买家、销售或能源部署成果增补。

## PARTNERS_PAGE

唯一任务：让需求方或专业参与方知道如何进入评估。

五部分：需求匹配首屏；商业/研究/专业三条入口；需求→相关性研究→双方判断→约定下一步；两组明确标注的合作形式示意；按意图联系。

主视觉不使用品牌照片或供应商 Logo。图解保留补充信息与暂不推进分支。商业 demand、研究 research、专业 specialist 使用各自联系锚点与邮件简报。研究参与和专业审批边界保留在对应模块。

## SERVICES_PAGE

唯一任务：比较三项独立服务与交付内容。

五部分：短首屏；同维度服务比较（阶段、问题、三项交付、客户输入、启动）；三份可读的 HTML/CSS 交付格式示意；支持模块与职责表；服务 CTA。

Launch & Partnership Programme 标为主推服务，不宣称最受欢迎。全部比较无需交互；文档只有结构字段，无虚构买家、数据或 SaaS 界面。#process 对应启动与验收；#brand-communication / #local-delivery 对应实质支持模块。服务参数 readiness / launch / development 进入邮件主题和正文。

首页仅保留定位、双入口、技术重点、少量真实科技案例和团队摘要。About 保留准确资历；仅精简 Minghan 职责里的重复解释，Vivian 的科技项目职责更清晰，真实影视/时尚职业背景仍保留。

## COPY_BEFORE_AFTER

采集同一静态站点的渲染 main.innerText，等待字体和图像加载；包含标题、字段标签与 CTA，不包含 header/footer，不数 TSX 源码。英文按 Unicode 字母/数字词（允许词内连字符/撇号）计数；中文只数 Unicode Han 字符。390px 与 1440px 数字相同。采集器同时打开所有 main details 重新统计；三页最终没有 tabs/accordion，默认与全部展开数字相同。

| 页面 / 语言    | 修改前可见 / 全展开 | 修改后可见 / 全展开 |  减少 |
| -------------- | ------------------: | ------------------: | ----: |
| companies / en |           833 / 833 |           335 / 335 | 59.8% |
| partners / en  |           360 / 360 |           287 / 287 | 20.3% |
| services / en  |           488 / 488 |           431 / 431 | 11.7% |
| companies / zh |         1612 / 1612 |           616 / 616 | 61.8% |
| partners / zh  |           663 / 663 |           540 / 540 | 18.6% |
| services / zh  |           956 / 956 |           796 / 796 | 16.7% |

Companies 的基线重复最重，减少约 60%；Partners 与 Services 原本较短，保留三条路径、服务比较字段和实质边界后分别减少约 12–20%，没有为凑比例删除必要信息或隐藏正文。

计数记录：[修改前](<D:/media web/media-web/tmp/tech-focus/before-counts.json>) · [修改后](<D:/media web/media-web/tmp/tech-focus/after-counts.json>) · [采集脚本](<D:/media web/media-web/tmp/tech-focus/capture.mjs>)。

## VISUAL_EVIDENCE

静态构建预览：[Companies](http://127.0.0.1:3110/en/companies) · [Partners](http://127.0.0.1:3110/en/partners) · [Services](http://127.0.0.1:3110/en/services)。将 /en/ 换为 /zh/ 查看中文。本地 3110 预览进程已重启，加载最新重定向。

12 张修改前、12 张修改后完整截图；另有 12 张图解细节截图。截图为本机 Chromium 实际渲染，未用生成图替代；细节由同一完整截图按实际元素位置裁切，避免固定导航遮住图解。文件在忽略的本地 tmp 目录中保留，不随本轮源码自动推送。

| 页面      | 语言 | 宽度 | 修改前                                                                           | 修改后                                                                          |
| --------- | ---- | ---: | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| companies | en   |  390 | [完整截图](<D:/media web/media-web/tmp/tech-focus/before-en-companies-390.png>)  | [完整截图](<D:/media web/media-web/tmp/tech-focus/after-en-companies-390.png>)  |
| partners  | en   |  390 | [完整截图](<D:/media web/media-web/tmp/tech-focus/before-en-partners-390.png>)   | [完整截图](<D:/media web/media-web/tmp/tech-focus/after-en-partners-390.png>)   |
| services  | en   |  390 | [完整截图](<D:/media web/media-web/tmp/tech-focus/before-en-services-390.png>)   | [完整截图](<D:/media web/media-web/tmp/tech-focus/after-en-services-390.png>)   |
| companies | en   | 1440 | [完整截图](<D:/media web/media-web/tmp/tech-focus/before-en-companies-1440.png>) | [完整截图](<D:/media web/media-web/tmp/tech-focus/after-en-companies-1440.png>) |
| partners  | en   | 1440 | [完整截图](<D:/media web/media-web/tmp/tech-focus/before-en-partners-1440.png>)  | [完整截图](<D:/media web/media-web/tmp/tech-focus/after-en-partners-1440.png>)  |
| services  | en   | 1440 | [完整截图](<D:/media web/media-web/tmp/tech-focus/before-en-services-1440.png>)  | [完整截图](<D:/media web/media-web/tmp/tech-focus/after-en-services-1440.png>)  |
| companies | zh   |  390 | [完整截图](<D:/media web/media-web/tmp/tech-focus/before-zh-companies-390.png>)  | [完整截图](<D:/media web/media-web/tmp/tech-focus/after-zh-companies-390.png>)  |
| partners  | zh   |  390 | [完整截图](<D:/media web/media-web/tmp/tech-focus/before-zh-partners-390.png>)   | [完整截图](<D:/media web/media-web/tmp/tech-focus/after-zh-partners-390.png>)   |
| services  | zh   |  390 | [完整截图](<D:/media web/media-web/tmp/tech-focus/before-zh-services-390.png>)   | [完整截图](<D:/media web/media-web/tmp/tech-focus/after-zh-services-390.png>)   |
| companies | zh   | 1440 | [完整截图](<D:/media web/media-web/tmp/tech-focus/before-zh-companies-1440.png>) | [完整截图](<D:/media web/media-web/tmp/tech-focus/after-zh-companies-1440.png>) |
| partners  | zh   | 1440 | [完整截图](<D:/media web/media-web/tmp/tech-focus/before-zh-partners-1440.png>)  | [完整截图](<D:/media web/media-web/tmp/tech-focus/after-zh-partners-1440.png>)  |
| services  | zh   | 1440 | [完整截图](<D:/media web/media-web/tmp/tech-focus/before-zh-services-1440.png>)  | [完整截图](<D:/media web/media-web/tmp/tech-focus/after-zh-services-1440.png>)  |

| 核心图解              | EN 手机                                                                               | EN 桌面                                                                                 | ZH 手机                                                                               | ZH 桌面                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| market-action-map     | [390](<D:/media web/media-web/tmp/tech-focus/after-en-market-action-map-390.png>)     | [1440](<D:/media web/media-web/tmp/tech-focus/after-en-market-action-map-1440.png>)     | [390](<D:/media web/media-web/tmp/tech-focus/after-zh-market-action-map-390.png>)     | [1440](<D:/media web/media-web/tmp/tech-focus/after-zh-market-action-map-1440.png>)     |
| requirement-map       | [390](<D:/media web/media-web/tmp/tech-focus/after-en-requirement-map-390.png>)       | [1440](<D:/media web/media-web/tmp/tech-focus/after-en-requirement-map-1440.png>)       | [390](<D:/media web/media-web/tmp/tech-focus/after-zh-requirement-map-390.png>)       | [1440](<D:/media web/media-web/tmp/tech-focus/after-zh-requirement-map-1440.png>)       |
| deliverable-workbench | [390](<D:/media web/media-web/tmp/tech-focus/after-en-deliverable-workbench-390.png>) | [1440](<D:/media web/media-web/tmp/tech-focus/after-en-deliverable-workbench-1440.png>) | [390](<D:/media web/media-web/tmp/tech-focus/after-zh-deliverable-workbench-390.png>) | [1440](<D:/media web/media-web/tmp/tech-focus/after-zh-deliverable-workbench-1440.png>) |

已实际检查前后全页概览、桌面页面和双语手机图解。修复了中文企业首屏标题断词、服务比较固定行高造成的空白，以及局部截图被固定导航覆盖的问题。最终未发现裁切主体、横向溢出或不可读标签。图解移动端自然竖排，主要信息不依赖 hover、拖拽或动画。旧项目素材分辨率保持原状，未生成替代现场。

素材记录：

| 素材 ID                           | 项目                | 本轮用途               | 裁切                                   |
| --------------------------------- | ------------------- | ---------------------- | -------------------------------------- |
| geely-london-brand-launch-01-hero | 吉利伦敦品牌发布    | Companies 首屏         | natural 原始 4:3，完整保留场景         |
| agibot-london-launch-01-hero      | AGIBOT 伦敦发布     | Companies 第一图像故事 | natural 原始比例，完整保留技术演讲场景 |
| catl-open-day-2025-02-cover       | CATL 慕尼黑技术发布 | Companies 第二图像故事 | natural 16:9，保留舞台和技术展示       |

三项均来自现有权利审批完整的 portfolio manifest。Partners 和 Services 不使用客户照片；主页原有获准科技素材及图像机制保留，未添加时尚、演唱会或 lifestyle 图。

## FACTS_PRESERVED

中国科技企业为主要付费客户，英国为核心市场；欧洲按项目延伸。三项服务名称与主推项保留。Minghan 的 Leeds Chemical & Process Engineering 博士、能源系统/应用 AI/工业技术、个人皇家工程院 Global Talent 签证背书、个人研究边界全部保留，无院士或公司背书暗示。Vivian 的团队身份与真实经历保留，不虚构工程资历。案例历史事实、媒体授权与审批数据未改。未修改 Radar、隐私/条款、公司法律信息、DNS、OAuth 或生产变量。

## TESTS_RUN

- npm test：135 通过，11 项原有 skip；无新增 skip。
- npm run lint / typecheck / format:check / build：通过。
- npm run validate:content / validate:pricing / validate:release:staging：通过；staging failedChecks 为空。
- 商业、个人资历、科技聚焦、八个公开案例与媒体、案例筛选/导航 E2E：68 项全部通过（2.6 分钟）。
- 范围：EN/ZH，375/390/430/768/1024/1440/1536px；正常及 reduced motion；键盘；CSS zoom 200% 与 720 CSS px 重排；axe；静态 sitemap、HTML/TXT 数据与旧地址；服务和三类意图的解码邮件主题及正文。没有发送真实邮件。

日志：[单元测试](<D:/media web/media-web/tmp/tech-focus/unit.txt>) · [构建](<D:/media web/media-web/tmp/tech-focus/build.txt>) · [最终 E2E](<D:/media web/media-web/tmp/tech-focus/e2e-final.txt>) · [staging](<D:/media web/media-web/tmp/tech-focus/staging.txt>)。

## TESTS_NOT_RUN

没有运行整套历史 E2E（其中包含已退休业务和旧架构要求）；本轮相关五个测试文件已运行。未做 Safari/Firefox 或人工浏览器工具栏缩放测试；缩放覆盖为 Chromium CSS zoom=2 与对应布局宽度检查。未进行真实邮件投递或生产部署测试。

## FAILURES

修复过程中：先用展示资格回归复现四案例仍公开的问题；更新旧断言以验证页面分工和八案例集合，同时保留十二条历史记录的事实测试。邮件 E2E 首轮在过渡动画期间遇到双 main，已改为等待过渡完成后验收，10 项聚焦复测通过。临时采集脚本的 CommonJS lint 问题已改为 ESM。最终无待修功能失败；生产发布阻塞见下。

## PRODUCTION_BLOCKERS

额外只读运行生产校验，当前本地环境仍有 11 项原有阻塞，未填假值：PUBLIC_WORK_MODE=portfolio、LEGAL_ENTITY_MODE；privacyEffectiveDate / termsEffectiveDate；NEXT_PUBLIC_LEGAL_APPROVAL_STATUS / NEXT_PUBLIC_TERMS_APPROVAL_STATUS；LEGAL_REVIEW_CONFIRMED、PUBLIC_COMPANY_DETAILS_CONFIRMED、APPROVED_MEDIA_CONFIRMED、PUBLIC_CASE_EVIDENCE_CONFIRMED、CONTACT_CHANNELS_CONFIRMED。分析工具未启用是 warning，不计作新增阻塞。此为本地验证结果，不推断线上环境状态。

[完整生产校验输出](<D:/media web/media-web/tmp/tech-focus/production.txt>)。

## FILES_CHANGED

45 个源码/测试/审阅文件（不含忽略的截图与日志）。主要变更：portfolio 集中资格、三页展示、首页、服务数据、联系邮件、旧路由与重定向、相关测试。

- [app/[lang]/contact/page.tsx](<D:/media web/media-web/app/[lang]/contact/page.tsx>)
- [app/[lang]/expertise/[sector]/page.tsx](<D:/media web/media-web/app/[lang]/expertise/[sector]/page.tsx>)
- [app/[lang]/expertise/page.tsx](<D:/media web/media-web/app/[lang]/expertise/page.tsx>)
- [app/[lang]/for-agencies/page.tsx](<D:/media web/media-web/app/[lang]/for-agencies/page.tsx>)
- [app/[lang]/industries/[sector]/page.tsx](<D:/media web/media-web/app/[lang]/industries/[sector]/page.tsx>)
- [app/[lang]/industries/automotive/page.tsx](<D:/media web/media-web/app/[lang]/industries/automotive/page.tsx>)
- [app/[lang]/industries/fashion-beauty-apparel/page.tsx](<D:/media web/media-web/app/[lang]/industries/fashion-beauty-apparel/page.tsx>)
- [app/[lang]/industries/page.tsx](<D:/media web/media-web/app/[lang]/industries/page.tsx>)
- [app/[lang]/services/commercial-production/page.tsx](<D:/media web/media-web/app/[lang]/services/commercial-production/page.tsx>)
- [app/[lang]/services/events-exhibitions/page.tsx](<D:/media web/media-web/app/[lang]/services/events-exhibitions/page.tsx>)
- [app/[lang]/services/page.tsx](<D:/media web/media-web/app/[lang]/services/page.tsx>)
- [app/[lang]/services/research-innovation/page.tsx](<D:/media web/media-web/app/[lang]/services/research-innovation/page.tsx>)
- [app/[lang]/services/uk-market-entry/page.tsx](<D:/media web/media-web/app/[lang]/services/uk-market-entry/page.tsx>)
- [app/[lang]/talent/page.tsx](<D:/media web/media-web/app/[lang]/talent/page.tsx>)
- [app/[lang]/what-we-do/[path]/page.tsx](<D:/media web/media-web/app/[lang]/what-we-do/[path]/page.tsx>)
- [app/[lang]/what-we-do/building-uk-presence/page.tsx](<D:/media web/media-web/app/[lang]/what-we-do/building-uk-presence/page.tsx>)
- [app/[lang]/what-we-do/page.tsx](<D:/media web/media-web/app/[lang]/what-we-do/page.tsx>)
- [app/[lang]/work/page.tsx](<D:/media web/media-web/app/[lang]/work/page.tsx>)
- [app/globals.css](<D:/media web/media-web/app/globals.css>)
- [components/sections/CommercialCaseIndex.tsx](<D:/media web/media-web/components/sections/CommercialCaseIndex.tsx>)
- [components/sections/CommercialSections.tsx](<D:/media web/media-web/components/sections/CommercialSections.tsx>)
- [components/sections/Phase5AudiencePages.tsx](<D:/media web/media-web/components/sections/Phase5AudiencePages.tsx>)
- [components/sections/Phase5Homepage.tsx](<D:/media web/media-web/components/sections/Phase5Homepage.tsx>)
- [content/commercial.ts](<D:/media web/media-web/content/commercial.ts>)
- [content/portfolio.ts](<D:/media web/media-web/content/portfolio.ts>)
- [content/team.ts](<D:/media web/media-web/content/team.ts>)
- [e2e/case-study-commercial-redesign.spec.ts](<D:/media web/media-web/e2e/case-study-commercial-redesign.spec.ts>)
- [e2e/commercial-rebuild.spec.ts](<D:/media web/media-web/e2e/commercial-rebuild.spec.ts>)
- [e2e/technical-positioning.spec.ts](<D:/media web/media-web/e2e/technical-positioning.spec.ts>)
- [e2e/work-commercial-narrative-v2.spec.ts](<D:/media web/media-web/e2e/work-commercial-narrative-v2.spec.ts>)
- [public/\_redirects](<D:/media web/media-web/public/_redirects>)
- [tests/commercial-rebuild.test.mjs](<D:/media web/media-web/tests/commercial-rebuild.test.mjs>)
- [tests/market-entry.test.mjs](<D:/media web/media-web/tests/market-entry.test.mjs>)
- [tests/phase-13-media.test.mjs](<D:/media web/media-web/tests/phase-13-media.test.mjs>)
- [tests/phase-14-image-system.test.mjs](<D:/media web/media-web/tests/phase-14-image-system.test.mjs>)
- [tests/phase-3-repositioning.test.mjs](<D:/media web/media-web/tests/phase-3-repositioning.test.mjs>)
- [tests/phase-5-dual-audience.test.mjs](<D:/media web/media-web/tests/phase-5-dual-audience.test.mjs>)
- [tests/portfolio.test.mjs](<D:/media web/media-web/tests/portfolio.test.mjs>)
- [tests/scalable-commercial-case-system.test.mjs](<D:/media web/media-web/tests/scalable-commercial-case-system.test.mjs>)
- [tests/technical-positioning.test.mjs](<D:/media web/media-web/tests/technical-positioning.test.mjs>)
- [tests/work-commercial-narrative-v2.test.mjs](<D:/media web/media-web/tests/work-commercial-narrative-v2.test.mjs>)
- [components/sections/EnquiryEmail.tsx](<D:/media web/media-web/components/sections/EnquiryEmail.tsx>)
- [docs/tech-focus-review.md](<D:/media web/media-web/docs/tech-focus-review.md>)
- [e2e/tech-focus.spec.ts](<D:/media web/media-web/e2e/tech-focus.spec.ts>)
- [tests/tech-focus.test.mjs](<D:/media web/media-web/tests/tech-focus.test.mjs>)

[本轮补丁（含新文件）](<D:/media web/media-web/tmp/tech-focus/review.patch>)。未修改上一轮历史审阅文档；此文件是本轮唯一审阅记录。

PUSHED: NO

MERGED_TO_MAIN: NO

DEPLOYED: NO
