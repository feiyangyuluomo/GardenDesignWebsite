import { getServices } from '@/lib/sanity'

export default async function DebugPage() {
  let data = null
  let error = null

  try {
    data = await getServices()
  } catch (e) {
    error = e.message
  }

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Debug: Services Data</h1>
      <pre style={{ background: '#f0f0f0', padding: '20px', overflow: 'auto' }}>
        {JSON.stringify({
          error,
          dataCount: data?.length || 0,
          data: data?.slice(0, 3)
        }, null, 2)}
      </pre>
    </div>
  )
}