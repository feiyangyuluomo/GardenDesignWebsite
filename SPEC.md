# 花园设计师个人官网 - 设计规范

## 1. Concept & Vision

这是一个为高端私宅业主服务的花园设计师个人官网，定位为"高端生活方式品牌 + 设计师作品集"。整体气质追求**高级、克制、自然、有生活品味**，避免传统装修公司的商业促销感。网站如同一本精心编排的庭院设计杂志，让访客在浏览过程中感受到设计师的审美高度和专业能力，最终引导至微信私域或问卷星收集高意向客户。

## 2. Design Language

### 2.1 Aesthetic Direction
- **风格参考**: 安缦酒店官网 + 日式庭院杂志 + 精品民宿品牌
- **核心感受**: 安静、精致、有呼吸感、自然生长

### 2.2 Color Palette
```
Primary Colors:
- Deep Forest Green: #2D3E30 (主色调，用于标题、重点)
- Warm Sage: #8B9A7E (辅助绿色，自然感)
- Soft Cream: #F7F5F0 (主背景色)
- Warm White: #FDFCFA (卡片背景)

Accent Colors:
- Terracotta: #C4A77D (暖调点缀，木色系)
- Charcoal: #3A3A3A (正文文字)
- Stone Gray: #6B6B6B (次要文字)
- Light Sage: #E8EBE4 (分割线、hover背景)

CTA Colors:
- Deep Forest Green: #2D3E30 (主按钮)
- Hover: #1E2920 (按钮hover)
```

### 2.3 Typography
- **中文**: "Noto Serif SC" (标题), "Noto Sans SC" (正文) - Google Fonts
- **英文**: "Cormorant Garamond" (标题装饰), "Inter" (正文)
- **字重**: 标题 300-500, 正文 300-400
- **行高**: 正文 1.8-2.0, 标题 1.2-1.4

### 2.4 Spatial System
- **基础单位**: 4px
- **间距层级**: 8, 16, 24, 32, 48, 64, 96, 128px
- **容器最大宽度**: 1440px
- **内容区最大宽度**: 1200px
- **移动端边距**: 24px

### 2.5 Motion Philosophy
- **原则**: 轻柔、自然、不打断浏览节奏
- **图片入场**: opacity 0→1, 600ms ease-out
- **文字入场**: translateY 20px→0, opacity 0→1, 500ms ease-out
- **悬停**: 图片scale 1.02, 400ms ease; 按钮background-color 300ms
- **页面切换**: opacity淡入淡出，300ms
- **禁止**: 弹跳、闪烁、剧烈位移

### 2.6 Visual Assets
- **图片风格**: 自然光、真实生活场景、避免过度修图
- **图标**: 使用Lucide React，线条风格，stroke-width: 1.5
- **装饰元素**: 植物摄影、叶片线条、圆形元素（呼应庭院）

## 3. Layout & Structure

### 3.1 全局结构
```
[Navigation Bar - 固定顶部，滚动时背景模糊]
[Main Content - 各页面内容]
[Footer - 品牌信息、微信二维码、社交媒体]
```

### 3.2 导航栏
- **默认状态**: 透明背景，白色文字（浅色首屏时）
- **滚动后**: 白色背景，深色文字，box-shadow
- **移动端**: 汉堡菜单，全屏覆盖式导航

### 3.3 页面节奏
- **首页**: 大面积留白 → 精选案例网格 → 服务介绍 → 理念文字 → CTA
- **案例列表**: 筛选栏 → 瀑布流网格 → 底部CTA
- **案例详情**: 沉浸式首图 → 项目信息 → 图集 → 设计故事 → 相关案例
- **服务页**: 服务卡片网格 → 报价说明 → CTA
- **关于页**: 大图 → 理念文字 → 工作方式 → CTA
- **联系页**: 简洁表单/二维码 → 社交媒体

### 3.4 响应式断点
- **Desktop**: 1024px+
- **Tablet**: 768px - 1023px
- **Mobile**: < 768px
- **Small Mobile**: < 375px

## 4. Features & Interactions

### 4.1 首页
- **首屏**:
  - 全屏背景图片或视频（支持视频，muted autoplay loop）
  - 图片优先加载，视频懒加载
  - 品牌主标题淡入（200ms延迟）
  - 副标题淡入（400ms延迟）
  - CTA按钮淡入（600ms延迟）
- **精选案例**:
  - 3个案例卡片，hover时图片微缩放
  - 点击跳转案例详情
- **服务类型**:
  - 6个服务图标卡片，hover时背景色变化
- **设计理念**:
  - 大段文字，配合植物背景
  - 左侧装饰线条
- **底部CTA**:
  - "获取初步设计建议" 按钮跳转问卷星

### 4.2 案例列表页
- **筛选系统**:
  - 空间类型筛选（私家庭院/别墅花园/露台花园/屋顶花园/阳台花园/花境设计）
  - 风格筛选（自然野趣/现代简约/东方庭院/度假风/日式/英式）
  - 支持多选，筛选时带淡入淡出过渡
- **案例卡片**:
  - 封面图 16:10 比例
  - 标题、城市、面积、风格标签
  - hover时图片缩放，标题下划线
  - 懒加载，列表底部时加载更多
- **空状态**: 显示"暂无符合条件的案例"

### 4.3 案例详情页
- **首图区**:
  - 全宽封面图，高度 60vh
  - 项目标题叠加在底部
- **项目信息栏**:
  - 地点 | 面积 | 风格 | 预算区间
  - 紧凑排列，移动端堆叠
- **视频展示**:
  - 封面图 + 播放按钮
  - 点击后弹出视频播放器
  - 移动端显示封面图，点击后跳转视频链接
- **图集**:
  - 瀑布流/网格布局
  - 点击放大，支持左右切换
  - 显示当前索引 / 总数
- **设计故事**:
  - 问题 → 解决方案 → 结果 叙事结构
  - 文字为主，配合图片
- **植物搭配**:
  - 植物名称列表 + 简短说明
- **客户反馈**:
  - 引用样式，带引号装饰
- **底部CTA**:
  - "想做类似花园？" + 按钮组

### 4.4 服务报价页
- **服务卡片**:
  - 服务名称、简短说明
  - hover时展开查看更多
- **报价说明**:
  - "项目制报价" 表述
  - 说明影响报价的因素
- **不适合客户**:
  - 诚实地说明服务定位

### 4.5 关于设计师页
- **个人照片**:
  - 大尺寸，设计感强
- **设计理念**:
  - 长文本，充分表达
- **擅长领域**:
  - 空间类型 + 风格类型
- **工作照**:
  - grid布局，自然纪实风格

### 4.6 联系页
- **微信二维码**:
  - 清晰易扫，注明"扫码备注"
- **问卷星入口**:
  - 大按钮，主CTA
- **社交媒体**:
  - 小红书、微信客服等

## 5. Component Inventory

### 5.1 Navigation
- **Default**: Logo + 5个导航项 + 咨询按钮
- **Scrolled**: 白色背景，阴影
- **Mobile**: Logo + 汉堡图标，全屏菜单
- **States**: nav item hover下划线动画

### 5.2 Button
- **Primary**: 深绿背景，白色文字，圆角4px
- **Secondary**: 透明背景，深绿边框，深绿文字
- **Ghost**: 无边框，文字链接样式
- **States**: hover背景变深，active微下压，disabled降低透明度

### 5.3 ProjectCard
- **Structure**: 图片 + 信息区
- **Image**: 16:10比例，object-cover
- **Info**: 标题、城市、面积、标签
- **States**: hover图片缩放1.02，标题显示下划线

### 5.4 ImageGallery
- **Grid**: 响应式列数
- **Lightbox**: 全屏黑色背景，图片居中，左右箭头
- **States**: loading时显示骨架屏

### 5.5 ServiceCard
- **Structure**: 图标 + 标题 + 描述 + 价格区间
- **States**: hover展开更多信息

### 5.6 FilterChips
- **Structure**: 横向滚动标签组
- **States**: selected状态深绿背景，未selected透明边框

### 5.7 Footer
- **Structure**: Logo + 导航 + 微信二维码 + 版权
- **Mobile**: 堆叠布局

## 6. Technical Approach

### 6.1 Framework & Tools
- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Sanity v3
- **Deployment**: Vercel
- **Icons**: Lucide React

### 6.2 Image Optimization
- Next/Image 组件
- WebP/AVIF 自动转换
- 懒加载（native loading="lazy"）
- 模糊占位符（blurDataURL）
- 响应式 sizes 属性
- 案例列表分页/无限滚动

### 6.3 Video Optimization
- 首屏视频: muted, autoPlay, loop, playsInline
- 视频封面图兜底
- 懒加载（Intersection Observer）
- 移动端降级为封面图

### 6.4 Sanity Schemas
1. **siteSettings**: 网站全局配置
2. **project**: 案例
3. **service**: 服务
4. **article**: 灵感文章（SEO用）

### 6.5 SEO
- 静态生成 + ISR
- 每页独立 title, description
- Open Graph 标签
- sitemap.xml
- robots.txt

## 7. Content Guidelines

### 7.1 文案风格
- 使用"您"而非"你"
- 描述画面感，不堆砌形容词
- 专业但不晦涩
- 诚实，不夸大

### 7.2 禁止用语
- "专业团队，价格实惠"
- "免费设计，包您满意"
- "一站式服务，诚信经营"

### 7.3 推荐用语
- "定制化设计"
- "私家庭院"
- "户外生活空间"
- "植物与空间的长期生长关系"
- "从观赏空间到可停留的生活场景"
