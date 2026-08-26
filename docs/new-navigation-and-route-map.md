# New navigation and route map

## Desktop and mobile navigation

```text
What We Do / 我们能做什么
├── Create in the UK / 英国内容制作
├── Launch in the UK / 英国发布与现场执行
└── Enter the UK Market / 英国市场进入

Expertise / 专业领域
├── Automotive / 汽车与出行
├── Fashion, Beauty & Apparel / 时尚、美妆与服装
├── Entertainment & Culture / 娱乐与文化
└── Technology, AI & Research / 科技、AI 与科研

Work / 项目
About Us / 关于我们
Contact / 联系
Start a Project / 提交项目
```

桌面 Mega Menu 与移动 Accordion 读取同一 `content/navigation.ts` 数据；Talent、Events、Roadshows、Research、Agency Support 不再占用一级导航。

## Canonical public routes

- `/[lang]`
- `/[lang]/what-we-do`
- `/[lang]/what-we-do/create-in-the-uk`
- `/[lang]/what-we-do/launch-in-the-uk`
- `/[lang]/what-we-do/enter-the-uk`
- `/[lang]/expertise`
- `/[lang]/expertise/automotive`
- `/[lang]/expertise/fashion-beauty-apparel`
- `/[lang]/expertise/entertainment-culture`
- `/[lang]/expertise/technology-ai-research`
- `/[lang]/work`
- `/[lang]/work/[approved-real-project-slug]`
- `/[lang]/about`
- `/[lang]/contact`
- `/[lang]/privacy`
- `/[lang]/terms`

每个页面通过 `buildMetadata` 生成双语 canonical、hreflang 与 Open Graph；详情页同时输出 BreadcrumbList，What We Do 详情页输出 Service schema。
