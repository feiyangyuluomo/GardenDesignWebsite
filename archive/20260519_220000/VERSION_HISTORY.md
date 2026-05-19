# 版本存档说明

## 三个版本的发布时间线

| 版本 | 时间 | 状态 |
|-----|------|------|
| [20260518_230956](20260518_230956/README.md) | 2026-05-18 23:09 | 初始版本 |
| [20260519_084500](20260519_084500/README.md) | 2026-05-19 00:04 | Sanity CMS 集成 |
| [20260519_220000](20260519_220000/README.md) | 2026-05-19 22:00 | 最终版本（可部署） |

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

## 版本升级路径

```
v1.0 (初始版本)
    ↓
v2.0 (添加 Sanity CMS)
    ↓  [修复 React 兼容问题]
v3.0 (最终版本)
```

## 如何在版本间切换

```bash
# 查看版本列表
ls archive/

# 切换到指定版本
cp -r archive/20260518_230956/* ./
```

## 部署检查清单

- [x] 代码构建成功（`npm run build`）
- [x] 响应式设计适配（移动端/桌面端）
- [x] 环境变量配置模板（`.env.local.example`）
- [x] GitHub 仓库已创建
- [ ] Vercel 部署
- [ ] Sanity 项目创建
- [ ] Sanity Webhook 配置