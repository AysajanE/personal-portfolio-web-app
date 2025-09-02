import { NextResponse } from 'next/server'

export function GET() {
  const manifest = {
    name: 'Aysajan Eziz',
    short_name: 'Aysajan Eziz',
    description: 'Personal blog of Aysajan Eziz',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    lang: 'en',
    scope: '/',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcuts: [
      {
        name: 'Blog',
        short_name: 'Blog',
        description: 'Read blog posts',
        url: '/blog',
      },
    ],
  }

  return NextResponse.json(manifest)
}