/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { ogTitleMap } from '@/lib/ogTitleMap'

export const runtime = 'edge'

interface Props {
  params: Promise<{ slug: string }>
}

export async function GET(_: Request, { params }: Props) {
  const { slug } = await params
  const title = ogTitleMap[slug] || 'Aysajan Eziz'
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#fff',
          fontSize: 54,
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 24, lineHeight: 1.2 }}>
          {title}
        </div>
        <div style={{ fontSize: 28, color: '#555', fontWeight: 400 }}>
          aysajaneziz.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
