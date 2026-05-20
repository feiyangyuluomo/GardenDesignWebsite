# 版本更新历史 (Version History)

## 2026-05-20 更新记录

### 1. 灵感文章页面 (Inspiration Page)

**新增文件**:
- `src/app/inspiration/page.tsx` - 灵感文章列表页
- `src/app/inspiration/[slug]/page.tsx` - 文章详情页

**功能**:
- 从 Sanity 获取文章列表，按发布日期倒序排列
- 支持封面图、分类、标题、摘要、日期显示
- 文章详情页支持富文本内容渲染（标题、段落、引用、图片）

**GROQ 查询更新**:
```groq
*[_type == "article"] | order(publishDate desc) {
  _id, title, slug, coverImage,
  "coverImageUrl": coverImage.asset->url,
  category, summary, publishDate
}
```

---

### 2. 导航栏同步 (Navigation & Footer)

**修改文件**: `src/components/Navigation.tsx`, `src/components/Footer.tsx`

**更新内容**:
- Navigation 添加"灵感"菜单项
- Footer 导航添加"灵感文章"，与顶部导航保持一致

---

### 3. 视频播放器升级 (VideoPlayer)

**修改文件**: `src/components/VideoPlayer.tsx`

**新增功能**:
- 播放/暂停切换按钮（中间大按钮 + 底部控制栏）
- 进度条拖动跳转功能
- 时间显示（当前时间 / 总时长）
- 关闭/退出按钮
- 鼠标悬停时显示控制栏，3秒无操作自动隐藏

**组件接口**:
```typescript
interface VideoPlayerProps {
  src?: string      // 视频 URL
  poster?: string   // 预览封面图
  title?: string    // 视频标题
}
```

---

### 4. 首页视频集成 (Homepage Video)

**修改文件**: `src/app/page.tsx`, `src/lib/sanity.ts`

**更新内容**:
- 从 siteSettings 获取 `heroVideoUrl` 显示首页视频
- 获取 `heroVideoPosterUrl` 作为视频预览封面

**GROQ 查询更新**:
```groq
heroVideo,
"heroVideoUrl": heroVideo.asset->url,
heroVideoPoster,
"heroVideoPosterUrl": heroVideoPoster.asset->url,
```

---

### 5. 内容同步修复 (Content Sync Issues)

**修改文件**: `src/lib/sanity.ts`

**更新内容**:
- 所有 Sanity 查询添加 `{ cache: 'no-store' }` 禁用 CDN 缓存
- 确保每次访问获取最新数据

**受影响的查询函数**:
- `getSiteSettings()`
- `getProjects()`
- `getProjectBySlug()`
- `getServices()`
- `getArticles()`

---

### 6. 文章/项目详情页修复 (Detail Page Fixes)

**修改文件**:
- `src/app/inspiration/[slug]/page.tsx`
- `src/app/projects/[slug]/ProjectDetailClient.tsx`

**问题修复**:
- 文章详情页 404 问题
- 项目详情页 Application Error（客户端异常）
- 处理可选字段为空的情况（styleTags, shortDescription 等）
- 添加 `revalidateTag('articles')` 确保文章实时更新

---

### 7. SiteSettings Schema 更新 (Studio)

**修改文件**: `garden-design-studio/src/sanity/schemas/siteSettings.ts`

**新增字段**:
```typescript
{ name: 'heroVideoPoster', title: '首页视频封面图', type: 'image', options: { hotspot: true } }
```

**用途**: 允许用户在 Sanity Studio 后台上传视频预览封面图

---

### 8. Footer 导航更新

**修改文件**: `src/components/Footer.tsx`

**更新内容**:
- 导航列表新增"灵感文章"选项，与顶部导航保持一致

---

## 项目结构

### 前端 (garden-designer-website)
- **仓库**: https://github.com/feiyangyuluomo/GardenDesignWebsite
- **部署**: Vercel
- **主要技术**: Next.js 14, Tailwind CSS, Sanity CMS

### 后台 (garden-design-studio)
- **仓库**: https://github.com/feiyangyuluomo/garden-design-studio
- **部署**: Vercel
- **主要技术**: Next.js 16, Sanity Studio v3

---

## Git 提交记录 (2026-05-20)

| 提交 | 说明 |
|------|------|
| d4bfa5e | Add video poster field and fix article detail page |
| d3484a9 | Enhance VideoPlayer with full playback controls |
| af13d63 | Fix article and project detail pages |
| 95f5d2f | Use heroVideoUrl from siteSettings for homepage video section |
| bc6858e | Add inspiration page and fix content sync issues |
| bfe7d9f | Fix: disable CDN cache for siteSettings to get fresh data |

---

## 已知问题 / 待处理

1. **Webhook 配置**: 需要在 Sanity Dashboard 配置 webhook 才能实现内容更新自动刷新
2. **网络不稳定**: Git push 有时会失败，需要重试

---

## 相关文档

- [README.md](README.md) - 项目说明
- [.env.local.example](.env.local.example) - 环境变量配置示例
- [SANITY.md](SANITY.md) - Sanity CMS 相关说明