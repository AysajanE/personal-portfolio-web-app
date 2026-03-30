import { formatSitemapDate, getAllPosts } from '@/lib/mdx'

export const runtime = 'nodejs'

export function GET(): Response {
  const baseUrl = 'https://www.aysajaneziz.com'
  
  const staticPages = ['', '/blog', '/colophon']
  const posts = getAllPosts()
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  
  ${posts.map(post => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${formatSitemapDate(post.metadata.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')}
</urlset>`.trim()

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
