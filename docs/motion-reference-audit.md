# Motion reference audit — correction pass

访问日期：2026-07-13。研究方法：先从 Awwwards、Godly、CSS Design Awards、SiteInspire 与 FWA 相关索引发现候选，再直接访问官网；生产浏览器以 1440×1000 打开首屏、等待媒体、连续滚动五屏并记录图片完成数、页面高度、横向溢出和实际 CSS transition。原始记录与逐站截图位于 `audit/motion-correction/reference-browser-audit.json` 和 `audit/motion-correction/references/`。以下时长是浏览器观察估算，不是网站源码声明。

## 1. Builders Club — creative production

- 官网：https://builders-club.com/；动效：全幅 moving-image 项目索引、媒体主导开场；时长/easing：约 600–900ms，缓出。
- 图片加载：深色稳定底层后媒体出现；滚动：项目序列而非滚动劫持；预览：大幅媒体与文字索引联动；切换：短覆盖/淡化。
- 移动降级：单列媒体；可借鉴：让媒体承担类别差异；不复制：客户素材、全屏视频密度；FrameBridge：Hero 与 Work stage。

## 2. Blinkink — film / mixed-media production

- 官网：https://www.blinkink.co.uk/；动效：showreel 与导演索引；约 450–700ms，快速 ease-out。
- 加载：视频 poster 先行；滚动：自然长页；预览：hover 触发项目媒体；切换：内容快速交接。
- 移动降级：静态 poster 优先；借鉴：媒体加载前保持构图；不复制：自动播放强度；应用：MediaReveal poster/fallback。

## 3. Stink Films — film production

- 官网：https://stinkfilms.com/；动效：克制的导演/作品索引切换；约 350–600ms。
- 加载：媒体容器预留；滚动：编辑式列表；预览：列表与大图关联；切换：短交叉淡化。
- 移动：列表直接配图；借鉴：active 项目保持；不复制：真实导演肖像；应用：Selected Work 双层 stage。

## 4. Tendril — design / animation studio

- 官网：https://tendril.ca/；动效：motion reel、项目网格和图形过渡；约 600–900ms，柔和缓出。
- 加载：稳定色块到媒体；滚动：媒体节奏分段；预览：hover 提升对比与播放；切换：全幅媒体衔接。
- 移动：减少 autoplay；借鉴：不同项目拥有不同运动语气；不复制：高 GPU 持续动画；应用：六类 demo art direction。

## 5. Panoply — motion design studio

- 官网：https://panoply.co.uk/；动效：极简文字开场、大型 featured media；约 500–800ms。
- 加载：黑色舞台稳定后内容呈现；滚动：自然序列；预览：标题/媒体同步；切换：克制遮罩。
- 移动：静态作品流；借鉴：少量动作维持高端感；不复制：极少信息架构；应用：首页媒体 curtain。

## 6. Studio Dumbar — cultural / graphic design

- 官网：https://studiodumbar.com/；动效：动态图形项目索引与强排版；约 300–650ms，线性与缓出混合。
- 加载：项目块先占位；滚动：密集网格；预览：索引项即时视觉响应；切换：图形化但短。
- 移动：网格重排；借鉴：active 状态来自线条/对比而非按钮底色；不复制：品牌专属动态图形；应用：行业索引与 Work active line。

## 7. PORTO ROCHA — fashion / culture / strategy

- 官网：https://www.portorocha.com/；动效：超长编辑项目索引、图像 hover；约 250–500ms。
- 加载：文字索引可先用；滚动：内容驱动自然长页；预览：hover/focus 补充而不阻止点击；切换：短淡化。
- 移动：文字优先；借鉴：页面在媒体未完成时仍可读；不复制：项目数量与品牌资产；应用：fallback 可读性。

## 8. Base Design — global brand agency

- 官网：https://www.basedesign.com/；动效：大字号、项目媒体揭示；约 500–750ms，平滑 ease-out。
- 加载：色块/版式先建立；滚动：分屏叙事；预览：视觉对比提升；切换：编辑式 panel。
- 移动：取消复杂并排；借鉴：motion 服务标题层级；不复制：品牌字体系统；应用：Services/PageIntro。

## 9. Accept & Proceed — culture / brand studio

- 官网：https://www.acceptandproceed.com/；动效：文字线条、媒体段落渐进；约 450–700ms。
- 加载：空间稳定、媒体后入；滚动：章节式；预览：轻量；切换：paper-like crossfade。
- 移动：自然段落；借鉴：process line 表示进度；不复制：生态主题图形；应用：About process。

## 10. Uncommon — creative agency

- 官网：https://www.uncommon.studio/；动效：live-feed/editorial 信息流；约 300–600ms。
- 加载：内容与媒体独立；滚动：feed；预览：对比和标题响应；切换：短促。
- 移动：feed 单列；借鉴：避免所有段落同一种 fade-up；不复制：实时内容机制；应用：About network 文本轨道。

## 11. Modem — digital experience studio

- 官网：https://modemworks.com/；动效：研究型页面、细线与模块 reveal；约 400–700ms。
- 加载：容器和排版先行；滚动：模块叙事；预览：焦点与 hover 同逻辑；切换：clip crossfade。
- 移动：移除并行 sticky；借鉴：功能性 motion；不复制：实验界面语汇；应用：Capability scroll observer。

## 12. Art&Graft — animation studio

- 官网：https://artandgraft.com/；动效：illustration/film 项目进入和 playful hover；约 500–850ms。
- 加载：poster 后视频；滚动：作品节拍；预览：媒体变化明显；切换：方向遮罩。
- 移动：静态 poster；借鉴：旧图/新图共存避免闪断；不复制：插画角色；应用：ProjectPreview AnimatePresence sync。

## 13. DIVISION — fashion / film production

- 官网：https://division.global/；动效：导演与作品全幅媒体；约 450–750ms。
- 加载：深底 poster；滚动：媒体索引；预览：hover 触发但移动直接配图；切换：全幅交叉。
- 移动：取消浮动预览；借鉴：desktop stage/mobile cards 两套结构；不复制：艺人影像；应用：Selected Work responsive split。

## 14. Hylink UK — cross-border strategy agency

- 官网：https://www.hylink.co.uk/；动效：标题、项目与内容段进入；约 400–700ms。
- 加载：普通响应式图片；滚动：信息长页；预览：案例卡；切换：轻量。
- 移动：内容顺序优先；借鉴：跨境能力必须保持信息清晰；不复制：客户名单/案例声明；应用：Services 与 Industries 克制 reveal。

## 15. Viro Media — UK/China cross-border agency

- 官网：https://www.viromedia.co.uk/；动效：大标题与章节进入；约 350–650ms。
- 加载：排版优先；滚动：叙事型长页；预览：案例媒体辅助；切换：短淡化。
- 移动：简化并排；借鉴：品牌叙事先于装饰；不复制：业绩数字与商业主张；应用：FrameBridge proof strip 最后进入。

## 采用的统一原则

1. 页面结构先稳定，再加载媒体；不以 spinner 或百分比伪装网络状态。
2. Opening、Hero、媒体 decode 必须共享因果顺序，而不是同时在遮罩两侧播放。
3. 桌面滚动场景由 viewport 位置主控；hover/focus 只是辅助；移动端回到内容与媒体直接配对。
4. 媒体切换保留退出层和进入层；420–720ms 内完成，快速连续输入不排队。
5. reduced-motion 直接显示内容、静态 Logo grid、无 parallax。
