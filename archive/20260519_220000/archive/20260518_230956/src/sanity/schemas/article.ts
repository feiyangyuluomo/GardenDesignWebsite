export default {
  name: 'article',
  title: '灵感文章',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '标题',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL别名',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'coverImage',
      title: '封面图',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'category',
      title: '分类',
      type: 'string',
      options: {
        list: [
          { title: '设计指南', value: 'design_guide' },
          { title: '植物养护', value: 'plant_care' },
          { title: '案例解析', value: 'case_study' },
          { title: '生活方式', value: 'lifestyle' },
        ],
      },
    },
    {
      name: 'summary',
      title: '摘要',
      type: 'text',
      rows: 3,
    },
    {
      name: 'content',
      title: '正文',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
    {
      name: 'publishDate',
      title: '发布日期',
      type: 'date',
    },
    {
      name: 'seoTitle',
      title: 'SEO标题',
      type: 'string',
    },
    {
      name: 'seoDescription',
      title: 'SEO描述',
      type: 'text',
    },
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'coverImage',
    },
    prepare({ title, category, media }: any) {
      const categoryMap: Record<string, string> = {
        design_guide: '设计指南',
        plant_care: '植物养护',
        case_study: '案例解析',
        lifestyle: '生活方式',
      }
      return {
        title,
        subtitle: categoryMap[category] || category,
        media,
      }
    },
  },
}
