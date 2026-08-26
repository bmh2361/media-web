# FrameBridge Studio Phase 8 最终报告

日期：2026-07-17  
状态：代码与可安全完成的验证已完成；生产发布仍被真实内容、法律与基础设施门禁阻止。

## 1. Executive summary

Phase 8 将网站从“展示多个可能能力的创意站点”收敛为面向中国品牌、制作公司、代理商与国际团队的英国 B2B 制作协作入口。首页现在可以在首屏和随后五段中回答：服务谁、在英国做什么、为什么选择 FrameBridge、项目如何推进、怎样开始。

本阶段没有把概念项目伪装成客户案例，也没有新增虚构客户、合作关系、数据或公开价格。默认非生产环境展示 `scenarios`；生产环境未显式配置时隐藏 Work，确保 fail-closed。

主要成果：

- 核心服务收敛为商业制作、人才/选角/造型、活动/PR/展览、英国制作与代理支持；专业与创新项目降为次级能力。
- 首页重建为严格六段，中文 390px 页面由 9731px 降至 7256px，缩短 25.43%。
- Work 建立 `hidden / scenarios / portfolio` 三态发布模型；只有证据与媒体均合格的 portfolio 记录可以被索引。
- Quick Enquiry 只要求姓名、项目摘要、同意项和至少一种联系方式；Full Brief 保留两步结构。
- 服务与行业页不再重复同一种交替灰图模板，而使用不同的信息结构与艺术指导。
- 新增生产安全响应头、可替换限流 adapter、内容/媒体/人工确认门禁和干净源码打包。
- clean install、format、lint、typecheck、unit、build、browser、motion、contact、visual regression、performance 均通过。

## 2. 根本问题

1. 定位层级不清：Research & Innovation 与核心媒体制作并列，稀释购买者对 FrameBridge 的即时理解。
2. Work 语义风险：概念内容靠披露文字补救，但 URL、导航与页面结构仍容易被理解为真实 portfolio。
3. 首页信息过长：多个叙事组件重复解释能力，移动端超过 9700px。
4. 页面同质化：服务和行业页大量复用同一种媒体/文本交替节奏，不能体现不同制作场景的工作方式。
5. Contact 摩擦偏高：Quick Enquiry 仍接近完整 brief，且联系渠道可能显示未配置值。
6. 生产门禁不完整：本地内存限流不适用于多实例；缺少媒体、案例、社交与联系渠道人工确认。
7. 性能审计失真风险：旧路由计时包含打开移动菜单的耗时，视频测试也不应伪造为真实媒体加载。
8. 响应式缺陷被掩盖：`overflow-x: clip` 隐藏了真实越界；根因是媒体容器高度与 aspect-ratio 共同推导宽度。
9. 动效测试陈旧：仍等待已经从 Phase 8 首页移除的 sticky capability 与 industry marquee。

## 3. 战略与信息架构变化

新的核心表达：

> UK creative production, talent and local execution — coordinated from London.  
> 从伦敦出发，统筹英国创意制作、人才与本地执行。

主要导航顺序：

1. Creative & Commercial Production
2. Talent, Casting & Styling
3. Events, PR & Exhibitions
4. UK Production & Agency Support
5. Specialist & Innovation Projects（次级）

Work 导航是否出现由发布模式决定；`hidden` 时 Header、移动菜单、Footer、首页和 sitemap 均不暴露 Work。

## 4. 页面修改

| 页面                           | Phase 8 修改                                                                                                                               |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| Home                           | 严格六段：Hero、What we deliver、Scenarios/Portfolio、Why、四步流程、最终 CTA；移除重复 proof/project/industry/sticky 叙事；移动密度优化。 |
| Services                       | 四项核心服务优先，专业项目以次级 aside 呈现；避免研究能力抢占主定位。                                                                      |
| Commercial Production          | 使用 storyboard、reel、contact sheet 的制作语言。                                                                                          |
| Talent                         | 使用 casting desk、筛选、造型与 rights/usage 语言。                                                                                        |
| Events / PR / Exhibitions      | 使用空间规划、run of show 和责任矩阵；移动端表格改为卡片。                                                                                 |
| UK Production / Agency Support | 使用白标协作、职责与交付矩阵。                                                                                                             |
| Specialist & Innovation        | 改为技术审阅/专业项目，不暗示大学、机构合作或资源准入。                                                                                    |
| Industries                     | 六个行业归入三种不同布局家族；直接回答挑战、FrameBridge 角色、格式、交付与相关场景。                                                       |
| Work index                     | 根据发布模式显示 404、Production Scenarios 或已验证 portfolio。                                                                            |
| Work detail                    | scenarios 强制 noindex；portfolio 仅合格记录可公开与索引。                                                                                 |
| Contact                        | Quick Enquiry 降低必填；Full Brief 保留两步、自适应字段、引用链接与状态；只显示已配置渠道。                                                |
| About / Privacy / Terms        | 接入集中式公司与法律配置，生产占位信息不能通过门禁。                                                                                       |

## 5. 组件变化

新增或主要启用：

- `OpeningSequenceProvider`、`EditorialReveal`、`PageTransition`：更短、更克制的动效系统。
- `HomeMotionScenes`、`ProductionProcess`、`ServicesMotionList`：支持新的首页与服务叙事。
- `QuickEnquiryForm`、`ContactExperience`：区分快速咨询与完整需求。
- `Container`、`Section`、`EditorialLink`、`Eyebrow`、`DisplayHeading`、`MediaFrame`：统一基础排版与触控规格。

删除或合并：

- 删除 `ParallaxMedia`、`ScrollProgress`、`SectionTransition`、`StickyStory`、`WordMaskReveal`。
- 删除旧 `ServicesStory` 与 `ProcessTimeline`；能力列表和流程分别合并进 Phase 8 组件。
- 首页不再使用旧 industry rail、proof strip 与 capability sticky scene 作为主叙事。

## 6. Work 发布模式

| 模式        | 导航/首页            | `/work`        | 详情页         | sitemap / metadata             |
| ----------- | -------------------- | -------------- | -------------- | ------------------------------ |
| `hidden`    | 隐藏                 | 404            | 404            | 不收录                         |
| `scenarios` | Production Scenarios | 展示制作场景   | 可访问         | 详情 `noindex`，sitemap 不收录 |
| `portfolio` | Work / Portfolio     | 只展示合格记录 | 只开放合格记录 | 合格详情可索引并进入 sitemap   |

生产环境必须显式设置 `PUBLIC_WORK_MODE`；缺失配置时应用层默认隐藏，validator 同时失败。Portfolio 合格条件由 case evidence、publication、rights 与媒体状态共同决定。

## 7. Contact 转化变化

Quick Enquiry 必填：姓名、10 字以上项目摘要、隐私同意，以及 Email 或 WeChat/WhatsApp 中至少一种。公司、地点、日期和另一联系方式均为可选。服务端校验与 UI 规则一致。

Full Brief 保留两步结构、项目类型驱动字段、参考链接和提交失败后的状态保留。未配置 webhook 时不会制造成功；生产环境必须配置 HTTPS webhook、允许来源、签名密钥、已验证分布式限流并完成人工投递确认。

## 8. 性能与可访问性

最终真实性能审计使用受控图片 fixture 与 1.2MB 视频载荷模型；fixture 明确标记为测试用途，不会进入公开媒体或 portfolio。

| 场景                    |    LCP |     CLS |  INP |  路由 | 可见溢出 | 破图 |
| ----------------------- | -----: | ------: | ---: | ----: | -------: | ---: |
| 1440 fast desktop       |  800ms | 0.00018 | 32ms |  58ms |        0 |    0 |
| 1280 mid laptop         | 1256ms | 0.00024 | 32ms |  69ms |        0 |    0 |
| 390 slow 4G             | 2436ms |       0 | 40ms | 757ms |        0 |    0 |
| 390 reduced data/motion | 1728ms |       0 | 40ms | 429ms |        0 |    0 |

阈值：移动 LCP 2500ms、CLS 0.1、INP 200ms、路由 800ms、可见溢出 0、破图 0。所有门禁通过。首屏 fixture 低于 700KB；save-data、reduced-motion 与受限网络下视频退化为 poster，不自动播放。

响应式检查覆盖 320、360、390、430、768、1024、1440、1920，中英文与所有服务详情页。移除全局 `overflow-x: clip` 后，修复媒体容器真实宽度根因。关键导航、按钮、筛选、语言切换与面包屑达到至少 44px 触控区域。

Axe 对代表路由检查 moderate、serious、critical，未发现自动化问题。自动化不能证明全部 WCAG 合规；上线前仍建议对最终真实媒体执行人工替代文本、字幕、焦点顺序和放大检查。

## 9. 命令与结果

| 命令                                                             | 结果                                                        |
| ---------------------------------------------------------------- | ----------------------------------------------------------- |
| `npm ci`                                                         | 通过，368 packages；随后 clean build。                      |
| `npm run format:check`                                           | 通过。                                                      |
| `npm run lint`                                                   | 通过，0 warnings。                                          |
| `npm run typecheck`                                              | 通过。                                                      |
| `npm test`                                                       | 16/16 通过。                                                |
| `npm run validate:content`                                       | 通过，6 个受治理场景。                                      |
| `npm run validate:pricing`                                       | 通过，无公开价格/套餐/预设预算语言。                        |
| `npm run validate:release:staging`                               | 通过，保留真实配置 warnings。                               |
| `npm run validate:release:production`                            | 预期失败；fail-closed 正常工作。                            |
| `npm run build`                                                  | 通过；45 个静态页面，首页 First Load JS 178kB，共享 102kB。 |
| `node scripts/run-playwright-production.mjs e2e/release.spec.ts` | 17 通过，1 个桌面不适用用例跳过。                           |
| `npm run test:motion`                                            | 12 通过，2 个视口不适用用例跳过。                           |
| `npm run test:contact`                                           | 10 项断言通过，7 次 webhook 请求。                          |
| `npm run audit:visual`                                           | 4/4 通过，像素差阈值 1%。                                   |
| `npm run audit:performance`                                      | 4 场景通过，0 violations。                                  |
| `npm run package:source`                                         | 通过；输出 `dist/framebridge-source-<timestamp>.zip`。      |

构建仅保留 Next.js 的 Edge Runtime/静态生成提示，不是构建失败。

## 10. 视觉回归与前后截图

视觉回归使用 Playwright `toHaveScreenshot`，`maxDiffPixelRatio: 0.01`、全页、禁用动画。路由为 `/en`、`/zh`；viewport 为 desktop 1440×900 与 mobile 390×844。基线位于 `e2e/visual-regression.spec.ts-snapshots/`。发生超阈值差异时 Playwright 会在 `test-results` 输出 actual、expected、diff；本次复验完全匹配，因此没有失败 diff 文件。

- Desktop before：`audit/motion-final/desktop-zh-home.png`
- Desktop after：`audit/phase-8/desktop-zh-home-after.png`（1440×5146）
- Mobile before：`audit/motion-final/mobile-zh-home.png`（390×9731）
- Mobile after：`audit/phase-8/mobile-zh-home-after.png`（390×7256）

## 11. 修改文件清单

工作区在 Phase 8 开始前已包含 Phase 6/7 未提交修改；本阶段保留这些用户变更。Phase 8 直接修改集中于：

- 页面与路由：`app/[lang]/page.tsx`、`services/page.tsx`、`industries/page.tsx`、`work/**`、`contact/page.tsx`、`layout.tsx`、`sitemap.ts`、`api/contact/route.ts`。
- 内容：`content/navigation.ts`、`pages/home.ts`、`pages/services.ts`、`pages/service-details.ts`、`cases/index.ts`、`company.ts`。
- 组件：`Header`、`Footer`、`Hero`、`HomeMotionScenes`、`ProductionProcess`、`ServicesMotionList`、`IndustryExperiences`、`WorkFilterGrid`、`QuickEnquiryForm`、`ContactForm`、`MediaSlot`、服务体验组件与 UI primitives。
- 发布与安全：`lib/release.ts`、`lib/structured-data.ts`、`lib/contact/**`、`next.config.mjs`、`.env.example`、`.gitignore`。
- 测试与脚本：`tests/content-contract.test.mjs`、`e2e/release.spec.ts`、`e2e/motion*.spec.ts`、`e2e/visual-regression.spec.ts`、`scripts/validate-*.mjs`、`real-media-performance-audit.mjs`、`generate-performance-fixtures.mjs`、`package-source.mjs`、`test-contact-delivery.mjs`。
- 文档：本报告、`phase-8-content-required.md`、`phase-8-production-readiness.md`。

完整工作树清单以 `git status --short` 为准；本阶段未重置或覆盖既有未提交修改。

## 12. 结论

代码层面的 Phase 8 目标已完成。当前版本适合继续做内容录入与 staging 验收，但不应直接发布到生产。生产发布必须在真实公司/法律信息、审批媒体、案例证据、联系渠道、投递链路与分布式限流全部到位后，重新运行 production validator 并取得零失败。
