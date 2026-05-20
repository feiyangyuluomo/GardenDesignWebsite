# 版本存档说明

## 四个版本的发布时间线

| 版本 | 时间 | 状态 |
|-----|------|------|
| [20260518_230956](20260518_230956/README.md) | 2026-05-18 23:09 | 初始版本 |
| [20260519_084500](20260519_084500/README.md) | 2026-05-19 00:04 | Sanity CMS 集成 |
| [20260519_220000](20260519_220000/README.md) | 2026-05-19 22:00 | 最终版本（可部署） |
| [20260520_214500](20260520_214500/) | 2026-05-20 21:45 | 灵感页面+视频升级 |

---

## 版本功能对比

### v1.0 - 20260518_230956（初始版本）

**文件数量**: ~45个

**包含内容**:
- 基础 Next.js 14 App Router 项目结构
- Tailwind CSS 配置（forest/sage/cream 主题色）
- 首页、项目列表、项目详情、服务、关于、联系页面
- 响应式导航组件（桌面/移动端自适应）
- 项目卡片组件（带筛选功能）
- 模拟数据支撑的完整页面

**功能特性**:
- 首屏 Hero 区域（背景图 + 文字 + CTA 按钮）
- 精选项目展示（首页3个）
- 服务项目展示（6个服务卡片）
- 关于页面（设计理念、擅长领域、工作方式）
- 联系页面（问卷跳转、微信二维码、FAQ）
- 滚动动画（FadeInSection）
- 图片画廊（Lightbox 功能）

---

### v2.0 - 20260519_084500（Sanity CMS 集成版）

**文件数量**: ~65个

**新增内容**:
- Sanity CMS 集成（`@sanity/client`, `next-sanity`）
- Sanity Studio 路由 `/studio`
- Sanity Schema 定义:
  - `siteSettings` - 网站设置
  - `project` - 设计作品
  - `service` - 服务项目
  - `article` - 灵感文章
- Sanity GROQ 查询函数（`src/lib/sanity.ts`）
- Webhook 重新验证 API 路由（`/api/revalidate`）
- Sanity 环境变量配置模板（`.env.local.example`）

**功能特性**:
- CMS 内容管理后台
- 页面数据从 Sanity 动态获取
- 模拟数据降级方案（Sanity 未配置时使用）
- ISR 增量静态生成支持
- Webhook 触发前端重新渲染

**已知问题**:
- Sanity Studio v5 与 Next.js 14 存在 React 依赖冲突

---

### v3.0 - 20260519_220000（最终可部署版本）

**文件数量**: ~75个

**保留内容**:
- Sanity CMS 集成和 GROQ 查询
- Webhook 重新验证 API
- Sanity Schema 定义文件
- 所有页面和组件

**修复内容**:
- 移除 `/studio` 路由（解决 React 版本冲突）
- `sanity.config.ts` - Sanity Studio 配置
- `sanity.cli.ts` - Sanity CLI 配置
- `src/sanity/schemas/*` - 完整的 Schema 定义

**功能特性**:
- 构建成功（`npm run build` 通过）
- 所有页面支持 ISR 重新验证
- 模拟数据完整可用
- 响应式设计完整（移动端/桌面端自适应）

**推荐部署方式**:
- 方式一：独立部署 Sanity Studio（使用 `npx sanity init` 创建）
- 方式二：直接在 https://sanity.io/manage 在线编辑内容

---

### v4.0 - 20260520_214500（灵感页面与视频播放器升级）

**日期**: 2026-05-20

**新增内容**:

#### 1. 灵感文章页面
- `src/app/inspiration/page.tsx` - 文章列表页
- `src/app/inspiration/[slug]/page.tsx` - 文章详情页
- 从 Sanity 获取文章列表，支持富文本内容渲染
- 支持封面图、分类、标题、摘要、日期显示

#### 2. 视频播放器升级
- `src/components/VideoPlayer.tsx`
- 新增播放/暂停按钮（中间大按钮 + 底部控制栏）
- 进度条拖动跳转功能
- 时间显示（当前时间 / 总时长）
- 关闭/退出按钮
- 鼠标悬停显示控制栏，3秒无操作自动隐藏

#### 3. 首页视频集成
- 从 siteSettings 获取 `heroVideoUrl` 和 `heroVideoPosterUrl`
- 支持自定义视频封面图上传

#### 4. 内容同步修复
- 所有 Sanity 查询添加 `{ cache: 'no-store' }` 禁用 CDN 缓存
- 确保每次访问获取最新数据

#### 5. Studio Schema 更新
- 新增 `heroVideoPoster` 字段用于视频封面图上传

#### 6. 导航同步
- Navigation 添加"灵感"菜单项
- Footer 导航添加"灵感文章"，与顶部导航保持一致

#### 7. 详情页修复
- 修复文章详情页 404 问题
- 修复项目详情页 Application Error 问题
- 处理可选字段为空的情况

---

## 版本升级路径

```
v1.0 (初始版本)
    ↓
v2.0 (添加 Sanity CMS)
    ↓  [修复 React 兼容问题]
v3.0 (最终版本)
    ↓
v4.0 (灵感页面 + 视频升级 + 内容同步)
```

---

## 如何在版本间切换

```bash
# 查看版本列表
ls archive/

# 切换到指定版本
cp -r archive/20260518_230956/* ./
```

---

## 部署检查清单

- [x] 代码构建成功（`npm run build`）
- [x] 响应式设计适配（移动端/桌面端）
- [x] 环境变量配置模板（`.env.local.example`）
- [x] GitHub 仓库已创建
- [x] Vercel 部署
- [x] Sanity 项目创建
- [x] Sanity Webhook 配置（待完善）

---

## Git 提交记录 (2026-05-20)

| 提交 | 说明 |
|------|------|
| 588bea9 | Add version history and archive of today's changes |
| d4bfa5e | Add video poster field and fix article detail page |
| d3484a9 | Enhance VideoPlayer with full playback controls |
| af13d63 | Fix article and project detail pages |
| 95f5d2f | Use heroVideoUrl from siteSettings for homepage video section |
| bc6858e | Add inspiration page and fix content sync issues |
| bfe7d9f | Fix: disable CDN cache for siteSettings to get fresh data |