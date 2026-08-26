# Information architecture redirect map

所有记录使用 Next.js `permanent: true`，运行时返回 308 Permanent Redirect，并保持语言参数。

| 旧路径                                                       | 新路径                                                      | 原因                           |
| ------------------------------------------------------------ | ----------------------------------------------------------- | ------------------------------ |
| `/:lang/services`                                            | `/:lang/what-we-do`                                         | 服务总览合并为三条客户路径     |
| `/:lang/services/commercial-production`                      | `/:lang/what-we-do/create-in-the-uk`                        | 商业制作并入 Create            |
| `/:lang/talent`                                              | `/:lang/what-we-do/create-in-the-uk#talent-casting-styling` | Talent 变为 Create 模块        |
| `/:lang/services/events-exhibitions`                         | `/:lang/what-we-do/launch-in-the-uk`                        | 活动、展会与路演并入 Launch    |
| `/:lang/for-agencies`                                        | `/:lang/what-we-do/enter-the-uk#uk-production`              | Agency Support 并入 Enter      |
| `/:lang/services/uk-market-entry`                            | `/:lang/what-we-do/enter-the-uk`                            | 市场进入迁移至核心路径         |
| `/:lang/services/research-innovation`                        | `/:lang/expertise/technology-ai-research`                   | 科研创新进入专业领域           |
| `/:lang/industries`                                          | `/:lang/expertise`                                          | Industries 更名为 Expertise    |
| `/:lang/industries/automotive`                               | `/:lang/expertise/automotive`                               | 汽车页迁移                     |
| `/:lang/industries/fashion-beauty-apparel`                   | `/:lang/expertise/fashion-beauty-apparel`                   | 时尚页迁移                     |
| `/:lang/work/london-celebrity-event-coverage`                | `/:lang/expertise/entertainment-culture`                    | 娱乐场景迁移                   |
| `/:lang/work/fashion-campaign-production-london`             | `/:lang/what-we-do/create-in-the-uk#typical-project-route`  | 时尚场景迁移                   |
| `/:lang/work/ai-product-video-uk-market`                     | `/:lang/expertise/technology-ai-research`                   | AI 场景迁移                    |
| `/:lang/work/beauty-creator-content-sprint`                  | `/:lang/what-we-do/create-in-the-uk#typical-project-route`  | 美妆场景迁移                   |
| `/:lang/work/automotive-event-presenter-support`             | `/:lang/what-we-do/launch-in-the-uk#typical-project-route`  | 汽车发布场景迁移               |
| `/:lang/work/jewellery-editorial-shoot`                      | `/:lang/what-we-do/create-in-the-uk#typical-project-route`  | 编辑制作场景迁移               |
| `/:lang/work/uk-brand-launch-roadshow`                       | `/:lang/what-we-do/launch-in-the-uk#roadshows`              | 路演场景迁移                   |
| `/:lang/work/investor-strategic-partner-roadshow-production` | `/:lang/what-we-do/enter-the-uk`                            | 投资相关活动保留在合规边界路径 |
| `/:lang/work/product-demonstration-buyer-roadshow`           | `/:lang/what-we-do/launch-in-the-uk#roadshows`              | 产品路演迁移                   |
| `/:lang/work/innovation-university-industry-roadshow`        | `/:lang/expertise/technology-ai-research`                   | 创新与高校产业场景迁移         |

重定向测试验证：全部为永久重定向；没有 destination 再成为 redirect source；不存在循环。
