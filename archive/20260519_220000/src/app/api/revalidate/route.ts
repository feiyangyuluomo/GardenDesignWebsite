import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-sanity-webhook-secret')
  const expectedSecret = process.env.SANITY_WEBHOOK_SECRET

  if (expectedSecret && secret !== expectedSecret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { _type } = body

    switch (_type) {
      case 'siteSettings':
        revalidateTag('siteSettings')
        revalidateTag('home')
        revalidateTag('contact')
        revalidateTag('services')
        break
      case 'project':
        revalidateTag('projects')
        revalidateTag('home')
        revalidateTag('project-detail')
        break
      case 'service':
        revalidateTag('services')
        revalidateTag('home')
        break
      case 'article':
        revalidateTag('articles')
        break
    }

    return NextResponse.json({ revalidated: true, type: _type })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to parse body' }, { status: 500 })
  }
}