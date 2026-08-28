# Phase 8 真实内容与确认清单

此清单只接受可验证的真实信息。不要为了让 validator 通过而填写示例、占位或推测内容。

## 公司与法律

- 法定公司名称 `NEXT_PUBLIC_COMPANY_LEGAL_NAME`
- Companies House 公司编号 `NEXT_PUBLIC_COMPANY_NUMBER`
- 注册办公室完整地址 `NEXT_PUBLIC_REGISTERED_OFFICE`
- 业务邮箱 `NEXT_PUBLIC_BUSINESS_EMAIL`
- 隐私联系邮箱 `NEXT_PUBLIC_PRIVACY_EMAIL`
- Privacy Policy 生效日期 `NEXT_PUBLIC_PRIVACY_EFFECTIVE_DATE`
- Terms 生效日期 `NEXT_PUBLIC_TERMS_EFFECTIVE_DATE`
- 法务完成审阅后：`NEXT_PUBLIC_LEGAL_APPROVAL_STATUS=approved`
- 人工确认：`LEGAL_REVIEW_CONFIRMED=true`
- 人工确认：`PUBLIC_COMPANY_DETAILS_CONFIRMED=true`

## 域名、联系与投递

- 正式 HTTPS 站点 URL `NEXT_PUBLIC_SITE_URL`
- 正式 HTTPS webhook `CONTACT_WEBHOOK_URL`
- webhook 签名 secret `CONTACT_WEBHOOK_SECRET`
- 允许提交的 HTTPS origins `CONTACT_ALLOWED_ORIGINS`
- 确认公开的 WhatsApp、WeChat、电话与社交资料 URL；未确认的渠道保持为空
- 完成真实端到端投递、失败告警和回复流程测试后：`CONTACT_DELIVERY_VERIFIED=true`
- 审核公开渠道后：`CONTACT_CHANNELS_CONFIRMED=true`
- 审核社交 URL 后：`SOCIAL_PROFILES_CONFIRMED=true`

## 分布式限流

- 选择生产级分布式 provider
- `RATE_LIMIT_PROVIDER=distributed`
- `RATE_LIMIT_DISTRIBUTED_URL` 使用 HTTPS
- `RATE_LIMIT_DISTRIBUTED_TOKEN`
- 完成多实例/失败降级验证后：`RATE_LIMIT_DISTRIBUTED_VERIFIED=true`

当前 adapter 约定为向 provider POST 哈希后的 key、limit 与 window；provider 不可用时生产 API 返回 503，不退回本地 memory。

## Work 发布决策

必须显式选择：

- `PUBLIC_WORK_MODE=hidden`：没有可公开场景或不希望展示 Work。
- `PUBLIC_WORK_MODE=scenarios`：展示明确标注的 Production Scenarios，详情 noindex。
- `PUBLIC_WORK_MODE=portfolio`：只在真实案例证据和媒体权利均完成时使用。

如果选择 portfolio，每个公开记录至少需要：

- 可核验客户/项目身份与公开授权；
- FrameBridge 实际职责、时间、地点和交付范围；
- 经批准的结果描述，不使用无法证明的数字；
- 媒体来源、版权、模特/人才肖像、音乐、场地与商标使用权；
- publication 状态与审批人/日期；
- 所有 critical 媒体从 `placeholder` 更新为 `approved`；
- 完成后才设置 `PUBLIC_CASE_EVIDENCE_CONFIRMED=true` 与 `APPROVED_MEDIA_CONFIRMED=true`。

## 当前必须替换的 13 个 critical media

1. `home-hero-primary`
2. `home-featured-case`
3. `production-hero`
4. `talent-hero`
5. `research-hero`
6. `events-hero`
7. `agency-hero`
8. `industry-fashion`
9. `industry-jewellery`
10. `industry-beauty`
11. `industry-tech`
12. `industry-automotive`
13. `industry-lifestyle`

每项需要桌面/移动裁切检查、准确 alt/caption、文件尺寸、来源、权利状态与批准记录。视频还需要 poster、字幕/文本替代和 save-data/reduced-motion 降级验证。

## 最终人工 QA

- 中文与英文逐页校对，不只检查机器可读字段。
- 真实设备检查 320–430px、平板与桌面。
- 对最终真实图片执行色彩、裁切、可读性和 LCP 复测。
- 键盘、屏幕阅读器、200% 放大、焦点顺序、错误提示、表单成功/失败人工检查。
- 复核 Privacy、Terms、cookie/analytics 方案与实际部署一致。
- 复核运营负责人能够收到、分派、回复并追踪询盘。
