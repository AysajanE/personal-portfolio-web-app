import { MetadataRoute } from 'next'

export function GET(): Response {
  const robotsTxt = `User-agent: *
Allow: /
Allow: /blog/
Allow: /tags/
Allow: /search

# Disallow sensitive areas
Disallow: /api/
Disallow: /_next/
Disallow: /admin/
Disallow: /.well-known/

# Performance optimization - crawl delay
Crawl-delay: 1

Sitemap: https://www.aysajaneziz.com/sitemap.xml

# Security note: This robots.txt provides basic guidance to well-behaved crawlers
# but is not a security measure - sensitive content should be properly protected
`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}