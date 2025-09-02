import { getAllPosts } from '@/lib/mdx'

export const runtime = 'nodejs'

export function GET(): Response {
  const baseUrl = 'https://www.aysajaneziz.com'
  const posts = getAllPosts().slice(0, 20)
  
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Aysajan Eziz</title>
    <description>Personal blog of Aysajan Eziz</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <managingEditor>contact@aysajaneziz.com (Aysajan Eziz)</managingEditor>
    <webMaster>contact@aysajaneziz.com (Aysajan Eziz)</webMaster>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    
    ${posts.map(post => `
    <item>
      <title><![CDATA[${post.metadata.title}]]></title>
      <description><![CDATA[${post.metadata.excerpt || post.metadata.title}]]></description>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.metadata.date).toUTCString()}</pubDate>
      <author>contact@aysajaneziz.com (${post.metadata.author || 'Aysajan Eziz'})</author>
    </item>`).join('')}
  </channel>
</rss>`.trim()

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}