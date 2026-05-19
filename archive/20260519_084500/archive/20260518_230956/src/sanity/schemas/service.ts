export default {
  name: 'service',
  title: '服务',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '服务名称',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'subtitle',
      title: '简短说明',
      type: 'string',
    },
    {
      name: 'suitableFor',
      title: '适合对象',
      type: 'text',
      rows: 2,
    },
    {
      name: 'deliverables',
      title: '交付内容',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'priceRange',
      title: '参考价格',
      type: 'string',
      description: '例如：5000元起 / 项目制报价',
    },
    {
      name: 'description',
      title: '服务说明',
      type: 'text',
      rows: 4,
    },
    {
      name: 'sortOrder',
      title: '排序',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'visible',
      title: '是否显示',
      type: 'boolean',
      initialValue: true,
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
      subtitle: 'priceRange',
    },
  },
}
