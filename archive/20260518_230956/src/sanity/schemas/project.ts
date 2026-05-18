export default {
  name: 'project',
  title: '案例',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '案例标题',
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
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'heroVideo',
      title: '案例视频URL',
      type: 'url',
    },
    {
      name: 'city',
      title: '城市',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'area',
      title: '面积',
      type: 'string',
      description: '例如：120㎡',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'budgetRange',
      title: '预算区间',
      type: 'string',
      description: '例如：20-30万',
    },
    {
      name: 'spaceType',
      title: '空间类型',
      type: 'string',
      options: {
        list: [
          { title: '私家庭院', value: 'private_garden' },
          { title: '别墅花园', value: 'villa_garden' },
          { title: '露台花园', value: 'terrace' },
          { title: '屋顶花园', value: 'roof_garden' },
          { title: '阳台花园', value: 'balcony' },
          { title: '花境设计', value: 'flower_bed' },
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'styleTags',
      title: '风格标签',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          '自然野趣',
          '现代简约',
          '东方庭院',
          '度假风',
          '日式',
          '英式',
        ],
      },
    },
    {
      name: 'shortDescription',
      title: '简短描述',
      type: 'text',
      rows: 3,
      validation: (Rule: any) => Rule.required().max(200),
    },
    {
      name: 'designBackground',
      title: '设计背景',
      type: 'text',
      rows: 4,
    },
    {
      name: 'painPoints',
      title: '设计难点',
      type: 'text',
      rows: 4,
    },
    {
      name: 'solution',
      title: '解决方案',
      type: 'text',
      rows: 4,
    },
    {
      name: 'plants',
      title: '植物搭配',
      type: 'text',
      rows: 3,
    },
    {
      name: 'materials',
      title: '材料与工艺',
      type: 'text',
      rows: 3,
    },
    {
      name: 'lighting',
      title: '灯光/水景说明',
      type: 'text',
      rows: 3,
    },
    {
      name: 'beforeImages',
      title: '改造前图片',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'afterImages',
      title: '改造后图片',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'gallery',
      title: '图集',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    },
    {
      name: 'clientFeedback',
      title: '客户反馈',
      type: 'text',
      rows: 3,
    },
    {
      name: 'featured',
      title: '首页推荐',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'sortOrder',
      title: '排序',
      type: 'number',
      initialValue: 0,
    },
  ],
  orderings: [
    {
      title: '排序',
      name: 'sortOrder',
      by: [{ field: 'sortOrder', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      city: 'city',
      media: 'coverImage',
    },
    prepare({ title, city, media }: any) {
      return {
        title,
        subtitle: city,
        media,
      }
    },
  },
}
