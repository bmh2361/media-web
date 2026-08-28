# Phase 12 信息架构审计与决策

日期：2026-07-17

## Executive summary

旧站同时使用 Services、Industries、Talent/Agency Support 与 Production Scenarios 四套入口解释相近能力。Phase 12 将公开结构收敛为三个客户项目路径、四个重点专业领域与一个真实 Work 系统。旧页面代码暂作为迁移来源保留，但其公开 URL 由永久重定向接管，不再形成竞争性索引。

## 审计结论

- Services 将摄影、影片、人才、活动、科研与本地执行拆成六个入口，客户必须先理解内部分类。
- Industries 与服务页重复生产能力，Automotive 和 Fashion 页面同时承担行业解释、服务说明与案例证明。
- Talent 与 Agency Support 是 Create/Enter 路径中的能力模块，不适合作为一级业务入口。
- Work 同时展示真实项目与十个概念场景，削弱了真实经验的证明作用。
- 首页以四项能力和额外 Market Entry 模块表达业务，与服务导航再次重复。
- Contact 以旧服务名称开始，要求客户先理解内部组织方式。

## 旧页面清单与迁移决策

| 当前路径                             | 原页面目的         | 主要重叠                  | 决策               | 新位置                                                | 301/308 | 新 sitemap | 真实案例支持 | 新导航 |
| ------------------------------------ | ------------------ | ------------------------- | ------------------ | ----------------------------------------------------- | ------- | ---------- | ------------ | ------ |
| `/[lang]/services`                   | 服务总览           | 首页、各服务页            | 合并               | `/what-we-do`                                         | 是      | 否         | 部分         | 否     |
| `/services/commercial-production`    | 商业制作           | Talent、Research、Fashion | 合并               | `/what-we-do/create-in-the-uk`                        | 是      | 否         | 是           | 否     |
| `/talent`                            | 人才、选角、造型   | Commercial、Fashion       | 合并为模块         | `/what-we-do/create-in-the-uk#talent-casting-styling` | 是      | 否         | 匿名视觉示例 | 否     |
| `/services/events-exhibitions`       | 活动、展会、路演   | Automotive、Scenarios     | 合并               | `/what-we-do/launch-in-the-uk`                        | 是      | 否         | 是           | 否     |
| `/for-agencies`                      | 英国制作与代理支持 | Market Entry、Commercial  | 合并               | `/what-we-do/enter-the-uk#uk-production`              | 是      | 否         | 是           | 否     |
| `/services/uk-market-entry`          | 市场进入           | Agency Support、Events    | 合并               | `/what-we-do/enter-the-uk`                            | 是      | 否         | 间接制作经验 | 否     |
| `/services/research-innovation`      | 科研与创新         | Technology、Events        | 合并               | `/expertise/technology-ai-research`                   | 是      | 否         | 有限         | 否     |
| `/industries`                        | 行业总览           | Services、首页            | 替换               | `/expertise`                                          | 是      | 否         | 部分         | 否     |
| `/industries/automotive`             | 汽车行业页         | Events、Commercial        | 保留内容、迁移 URL | `/expertise/automotive`                               | 是      | 否         | 6 项         | 否     |
| `/industries/fashion-beauty-apparel` | 时尚行业页         | Commercial、Talent        | 保留内容、迁移 URL | `/expertise/fashion-beauty-apparel`                   | 是      | 否         | 3 项         | 否     |
| `/work`                              | 真实项目与场景     | Services、Scenarios       | 重构               | `/work`                                               | 否      | 是         | 9 项         | 是     |
| `/work/[concept-slug]`               | 概念场景详情       | Work 与服务说明           | 移出 Work          | 对应 What We Do/Expertise                             | 是      | 否         | 否           | 否     |
| `/about`                             | 公司定位           | 首页优势                  | 保留并更新链接     | `/about`                                              | 否      | 是         | 不适用       | 是     |
| `/contact`                           | 项目询盘           | 旧服务树                  | 保留并重构表单     | `/contact`                                            | 否      | 是         | 不适用       | 是     |
| `/privacy`、`/terms`                 | 法律信息           | 无                        | 保留               | 原路径                                                | 否      | 是         | 不适用       | Footer |
| `/media-review`                      | 内部媒体审核       | 无                        | 保留开发门控       | 原路径                                                | 否      | 否         | 不适用       | 否     |

## 新公开系统

1. What We Do：Create in the UK、Launch in the UK、Enter the UK Market。
2. Expertise：Automotive、Fashion, Beauty & Apparel、Entertainment & Culture、Technology, AI & Research。
3. Work：只读取九个已获公开许可的真实项目；概念场景不再进入 Work。

## 风险控制

- 娱乐页面不使用未经授权的艺人姓名，也不声称签约或官方关系。
- 科技与科研页面明确区分视觉制作经验、AI/科研能力说明和高校资源网络，不声称高校背书。
- Market Entry 保留独立专业机构责任边界及生产发布门。
- 没有已获公开许可项目的筛选项显示明确空状态，不用场景填充。
