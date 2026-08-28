# Phase 12 final report

日期：2026-07-17

## 1. Executive summary

Venus Bridge Media 的公开信息架构已从相互重叠的 Services、Industries、Talent、Agency Support 与概念案例，收敛为三条客户项目路径、四个专业领域和一个只展示真实获准项目的 Work 系统。英文与中文使用同一内容模型、导航数据与发布边界。

## 2. 旧结构的核心问题

- 客户必须先理解公司内部服务分类，才能判断从哪里开始。
- Services、Industries 与首页重复解释相同能力。
- Talent、Agency Support 和 Market Entry 被拆成竞争入口。
- Work 混合真实项目与概念场景，削弱证据可信度。
- Contact 继续沿用旧服务树，无法直接对应客户目标。

## 3. 新导航

- What We Do：Create in the UK、Launch in the UK、Enter the UK Market。
- Expertise：Automotive、Fashion, Beauty & Apparel、Entertainment & Culture、Technology, AI & Research。
- Work、About Us、Contact。

桌面 Mega Menu 与移动端 Accordion 共用 `content/navigation.ts`，没有单独维护的第二套入口。

## 4. 三条项目路径

1. Create in the UK：商业摄影、影片、访谈、产品内容、多格式交付，以及人才、选角、造型和英国制作支持。
2. Launch in the UK：品牌发布、产品活动、展会、演出、路演、主持与现场内容。
3. Enter the UK Market：进入准备、英国本地制作、发布统筹与独立专业机构协作边界。

每条路径都包含适用对象、能力模块、工作方式、真实 Work 证明、最多两个 Typical Project Routes、责任边界与询盘 CTA。

## 5. 四个专业领域

- Automotive：以 6 个获准汽车项目支撑制作与发布经验。
- Fashion, Beauty & Apparel：以 3 个获准视觉项目支撑商业制作经验。
- Entertainment & Culture：保留演出、艺人和创作者内容能力，但明确当前没有获准公开的具名案例，不声称签约或官方关系。
- Technology, AI & Research：保留 AI 产品、专家访谈、创新活动与资源网络能力；CATL 和 Leapmotor 仅作为技术行业语境中的活动影像证据，不推导为 AI 咨询、科研项目或高校背书。

## 6. 合并、迁移与重定向

旧 Services、Industries、Talent、Agency Support、Market Entry 和 Research 页面已从公开导航及 sitemap 移除，并通过 20 条永久重定向迁移到最相关的新路径或专业领域。10 个旧概念 Work URL 同样永久重定向，不再生成概念项目详情页。完整映射见 `information-architecture-redirect-map.md`。

## 7. 首页

首页固定为 7 个主要内容区域：Hero、Three Ways We Help、Selected Work、Expertise、Why Venus Bridge Media、How We Work、About + CTA。原独立 Market Entry 横幅并入三条路径，不形成第四套业务系统。

## 8. 统一 Work

Work 只读取 9 个真实、具有证据与公开许可状态的项目。模型增加 `primaryPath`、`primarySector`、`secondarySectors`、`tags`、双语角色、状态与审批字段。公开筛选为 All、Automotive、Fashion & Beauty、Entertainment、Technology & Research、Events & Roadshows。

Entertainment 的空筛选显示诚实空状态。Technology & Research 只映射 CATL 与 Leapmotor 的技术行业活动影像，不扩大项目性质。

## 9. 场景内容

原 10 个概念案例不再出现在 Work。它们被压缩为 5 个明确标识的 Typical Project Routes，分别放回 Create、Launch 与 Enter 详情页，并标注为场景而非已完成客户项目。

## 10. Contact

项目类型首层改为 Create content in UK、Launch event/product、Enter market、Not sure，并新增 Expertise 选择。表单继续通过适配层提交到现有 API 枚举，保留动态字段、校验、人工发布门和专业责任边界。

## 11. SEO 与结构化数据

- 新页面均使用双语 metadata、canonical、hreflang 与 Open Graph。
- What We Do 详情页输出 Service 与 BreadcrumbList schema。
- Expertise 详情页输出 BreadcrumbList schema。
- sitemap 仅包含新规范路由、法律页和 9 个真实 Work 项目。
- 旧公开入口由永久重定向接管，测试确认无循环。

## 12. 内容迁移结果

内容按 migrated、merged、rewritten、removed from public rendering 与 archived behind redirects 分类。详细结果见 `content-migration-map.md`，旧页面组件暂作迁移来源保留，不再由新导航与 sitemap 暴露。

## 13. Phase 12 主要修改文件

- 数据与策略：`content/information-architecture.ts`、`content/portfolio.ts`、`content/navigation.ts`、`content/pages/home.ts`、`content/pages/about.ts`、`content/site.ts`、`lib/brand/venusBridgeMedia.ts`。
- 新页面：`app/[lang]/what-we-do/**`、`app/[lang]/expertise/**`。
- 页面系统：`components/sections/InformationArchitecturePages.tsx`、`PortfolioWork.tsx`、`PortfolioProjectDetail.tsx`、`ProductionSystemCanvas.tsx`、`ContactForm.tsx`、`Header.tsx`、`Footer.tsx`。
- 路由与 SEO：`next.config.mjs`、`app/sitemap.ts`。
- 表单校验：`lib/contact/validation.ts`。
- 测试：`tests/phase-12-ia.test.mjs`、`e2e/phase-12-ia.spec.ts`，以及相关契约测试更新。

## 14. 自动化与视觉验收

交付前执行并记录以下验证：

- `npm test`
- `npm run format:check`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test:e2e -- e2e/phase-12-ia.spec.ts --project=desktop`
- `npm run validate:content`
- `npm run validate:pricing`
- `npm run validate:media`
- `npm run validate:release:staging`
- 应用内浏览器对首页、What We Do、Work、Contact、桌面 Mega Menu 与移动导航进行复核。

最终结果：Prettier、ESLint、TypeScript、内容、定价、媒体与 staging 发布验证全部通过；单元与内容契约 44/44 通过；生产构建成功并生成 80 个静态页面；Phase 12 E2E 36/36 通过。E2E 覆盖 20 条永久重定向、Work 筛选、Contact 首层字段、桌面 Mega Menu、移动 Accordion，以及 14 个路由在 320/390/768/1024/1440/1920 下的溢出检查。

应用内浏览器复核 `/en`、`/en/what-we-do`、`/en/work`、`/en/contact`：标题和 H1 正确、无损坏图片、无水平溢出；What We Do 菜单交互后只显示三条项目路径；Contact 的前两个选择器分别显示四种客户路径和四个专业领域加 Other。

## 15. 截图清单

截图输出目录：`audit/phase-12-ia/`。覆盖中英文首页 390/1440、三个路径页、四个专业领域页、Work、About、Contact、桌面 Mega Menu 与移动导航；响应式自动检查覆盖 320、390、768、1024、1440、1920。

## 16. 仍缺少的真实业务材料

- 获准公开的具名 Entertainment & Culture 客户案例。
- 获准公开的 AI 产品、科研、专家/创始人访谈或高校产业合作案例。
- 可公开的独立 UK Market Entry 客户成果与量化结果。
- 更完整的客户 brief、Venus Bridge Media 角色、交付物、成果、署名与使用期限。

在上述材料获得书面许可前，网站继续使用能力说明、责任边界和明确的空状态，不用概念场景替代真实证明。

## 17. 生产发布阻塞项

Phase 12 没有新增虚构声明或新的技术阻塞。`validate:release:production` 按设计失败并阻止上线，当前阻塞项为：

- 部署环境尚未设置 `RELEASE_PROFILE=production`、`PUBLIC_WORK_MODE` 与 `PUBLIC_MARKET_ENTRY_MODE`。
- 正式 HTTPS 站点 URL、Contact webhook 与允许来源未配置。
- legal name、company number、registered office、Privacy/Terms 生效日期与法律批准状态未完成。
- Market Entry 独立法律边界与一条来源复核尚未批准。
- 分布式限流适配器尚未配置和验证。
- 7 项人工确认仍为 false：法律、公司详情、Contact 投递、媒体、案例证据、社交账号与联系渠道。
- 5 个历史关键媒体记录仍标记为 placeholder；其中部分旧页面已重定向，但发布验证器继续按 fail-closed 原则要求清理或批准。

Staging 可用于完整体验验收，但不得被视为这些生产条件已满足。

## 18. 配套文档

- `phase-12-information-architecture-report.md`
- `information-architecture-redirect-map.md`
- `content-migration-map.md`
- `new-navigation-and-route-map.md`
- `expertise-content-map.md`
- `work-and-scenarios-separation.md`
