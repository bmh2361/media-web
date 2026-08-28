# Phase 8 Production Readiness

## 当前结论

**NOT READY FOR PRODUCTION。**

代码、构建、自动化与 staging 门禁通过；production validator 正确失败。失败代表真实上线条件尚未满足，不应绕过。

## 已通过

- clean `npm ci`
- Prettier、ESLint、TypeScript、16 个 unit tests
- 45 页 production build
- 内容与无公开定价校验
- staging release validator
- 浏览器 release：17 passed / 1 desktop-only skip
- motion/reduced-motion：12 passed / 2 viewport skips
- contact delivery：10 assertions
- visual regression：4/4，1% pixel threshold
- performance：4/4 场景、0 violations
- 320/360/390/430/768/1024/1440/1920 可见边界检查
- 代表路由 Axe moderate 及以上零发现
- 安全响应头与生产 HSTS 配置
- memory/distributed rate-limit adapter 与生产 fail-closed
- Organization JSON-LD 在生产配置不完整时不输出

## Production blockers

1. 未设置部署态 `RELEASE_PROFILE=production`。
2. 未显式选择 `PUBLIC_WORK_MODE=hidden|scenarios|portfolio`。
3. 缺少正式 HTTPS `NEXT_PUBLIC_SITE_URL` 与 `CONTACT_WEBHOOK_URL`。
4. 缺少公司法定名称、公司编号、注册地址、生效日期。
5. 隐私与条款尚未记录为法务 approved。
6. 未配置 `CONTACT_ALLOWED_ORIGINS`。
7. 七项人工确认未完成：legal、company details、contact delivery、approved media、case evidence、social profiles、contact channels。
8. 未配置并验证 production distributed rate limiter。
9. 13 个 critical media 仍为 placeholder。
10. 当前 6 个 case records 仅为 production scenarios，不是已验证 portfolio。

## 上线顺序

1. 由业务/法务提供并审核公司、Privacy、Terms 信息。
2. 决定 Work 模式；没有完整案例证据时选择 `hidden` 或 `scenarios`。
3. 替换并审批 critical media，完成权利与裁切记录。
4. 配置正式域名、联系渠道、webhook、签名、允许来源和 distributed limiter。
5. 在 staging 做真实投递、失败、限流、弱网、移动设备和辅助技术验收。
6. 只在对应人工工作确实完成后设置确认变量。
7. 运行以下最终门禁：

```powershell
npm.cmd ci
npm.cmd run format:check
npm.cmd run lint
npm.cmd run typecheck
npm.cmd test
npm.cmd run validate:content
npm.cmd run validate:pricing
npm.cmd run validate:release:production
npm.cmd run build
npm.cmd run test:e2e
npm.cmd run test:contact
npm.cmd run audit:performance
npm.cmd run package:source
```

所有命令必须成功，尤其 `validate:release:production` 必须从当前预期失败变为零失败。

## 安全与运行说明

- CSP 允许 Next.js 运行与正式媒体/表单需求，但部署前应使用真实域名复核 webhook、图片 CDN 和监控域名。
- HSTS 仅在 production 响应中启用；正式域名必须全站 HTTPS。
- 生产限流 provider 不可用时联系 API 返回 503；这比静默退回 process-local limiter 更安全。
- Contact 不会在 webhook 未配置或投递失败时展示虚假成功。
- 源码包排除 `node_modules`、`.next`、测试报告、大型 audit 截图、performance fixtures、debug 和环境 secrets。

## 已知非阻塞提示

- Next build 输出 Edge Runtime 页面禁用静态生成提示；构建成功，相关 OG route 为动态生成。
- validator 的 TypeScript 内容导入会输出 Node `MODULE_TYPELESS_PACKAGE_JSON` 性能提示；不影响校验结果。
- 自动化 Axe 零发现不等于完整 WCAG 认证；最终真实媒体仍需要人工无障碍复核。

## 发布签署

建议由以下角色分别确认后再将发布状态改为 ready：

- 公司负责人：公司信息、公开渠道、案例真实性
- 法务：Privacy、Terms、权利与商标/肖像许可
- 制作/品牌负责人：最终媒体与双语文案
- 技术负责人：域名、webhook、签名、限流、安全头、监控与回滚
- 运营负责人：询盘接收、分派、回复 SLA 与失败告警
