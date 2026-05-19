export const article = {
  name: 'article',
  title: '灵感文章',
  type: 'document',
  fields: [
    { name: 'title', title: '文章标题', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'URL别名', type: 'slug', options: { source: 'title' }, validation: (Rule: any) => Rule.required() },
    { name: 'coverImage', title: '封面图片', type: 'image', options: { hotspot: true } },
    { name: 'category', title: '分类', type: 'string', options: { list: ['设计灵感', '植物养护', '案例分析', '设计手记'] } },
    { name: 'summary', title: '摘要', type: 'text' },
    { name: 'content', title: '正文', type: 'array', of: [{ type: 'block' }, { type: 'image' }] },
    { name: 'publishDate', title: '发布日期', type: 'datetime' },
  ],
}