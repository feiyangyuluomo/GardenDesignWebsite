export default {
  name: 'siteSettings',
  title: '网站设置',
  type: 'document',
  fields: [
    {
      name: 'siteName',
      title: '网站名称',
      type: 'string',
    },
    {
      name: 'heroTitle',
      title: '首页主标题',
      type: 'string',
    },
    {
      name: 'heroSubtitle',
      title: '首页副标题',
      type: 'text',
    },
    {
      name: 'heroImage',
      title: '首页首屏图片',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'heroVideo',
      title: '首页首屏视频URL',
      type: 'url',
    },
    {
      name: 'wechatQrCode',
      title: '微信二维码',
      type: 'image',
    },
    {
      name: 'wechatId',
      title: '微信号',
      type: 'string',
    },
    {
      name: 'phone',
      title: '手机号',
      type: 'string',
    },
    {
      name: 'questionnaireLink',
      title: '问卷星链接',
      type: 'url',
    },
    {
      name: 'xiaohongshuLink',
      title: '小红书链接',
      type: 'url',
    },
    {
      name: 'videoLink',
      title: '视频号链接',
      type: 'url',
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
    prepare: () => ({ title: '网站设置' }),
  },
}
