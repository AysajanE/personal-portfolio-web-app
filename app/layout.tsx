import type { Metadata } from 'next'
import './globals.css'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aysajaneziz.com'),
  title: {
    default: 'Aysajan Eziz',
    template: '%s | Aysajan Eziz'
  },
  description: 'Personal blog of Aysajan Eziz, Assistant Professor of Management Science at Ivey Business School, Western University.',
  authors: [{ name: 'Aysajan Eziz', url: 'https://www.aysajaneziz.com' }],
  alternates: {
    canonical: 'https://www.aysajaneziz.com',
    types: {
      'application/rss+xml': [{ url: 'feed.xml', title: 'Aysajan Eziz Blog RSS Feed' }],
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-mono antialiased bg-white text-gray-900 leading-relaxed">
        {/* Skip to main content link for keyboard users */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-white border border-gray-300 rounded px-3 py-2 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Skip to main content
        </a>
        
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main id="main-content" className="flex-grow" role="main">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}