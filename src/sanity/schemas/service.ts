export const service = {
  name: 'service',
  title: '服务项目',
  type: 'document',
  fields: [
    { name: 'title', title: '服务名称', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'subtitle', title: '副标题', type: 'string' },
    { name: 'suitableFor', title: '适合对象', type: 'string' },
    { name: 'deliverables', title: '交付内容', type: 'array', of: [{ type: 'string' }] },
    { name: 'priceRange', title: '价格区间', type: 'string' },
    { name: 'description', title: '服务描述', type: 'text' },
    { name: 'visible', title: '显示', type: 'boolean', initialValue: true },
    { name: 'sortOrder', title: '排序', type: 'number' },
  ],
}