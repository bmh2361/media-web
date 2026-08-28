# Work and scenarios separation

## Work

Work 只读取 `content/portfolio.ts` 中九个公开、权利确认且有证据记录的真实项目。公开筛选为：All、Automotive、Fashion & Beauty、Entertainment、Technology & Research、Events & Roadshows。

Entertainment 当前没有获准公开的真实案例，因此显示诚实空状态。Technology & Research 只映射同时具有技术行业语境的 CATL 与 Leapmotor 活动影像，不将其包装为 AI 或科研咨询案例。

## Typical Project Routes

概念内容只出现在 What We Do 详情页：

- Create：Fashion or artist campaign；AI product demonstration or founder interview。
- Launch：Automotive brand launch or roadshow；Artist event or innovation roadshow。
- Enter：Market-entry preparation to local launch。

每项均使用 `status: "scenario"`，显示 `Typical Project Route / 典型项目路径` 或 `Production Scenario / 制作场景`，并明确不是已完成客户项目。

## 旧场景处理

旧 `/work/[concept-slug]` 全部永久重定向到最相关的新路径或专业领域。新 Work 页面、静态参数、metadata 与 sitemap 不再读取 `caseStudies` 或 `roadshowCaseStudies`。
