import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/mdx'

export const metadata = {
  title: 'Blog',
  description: 'Blog posts about optimization, machine learning, deep work, and academic life.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <div className="container py-16">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Blog</h1>
        <p className="text-gray-600">
          {posts.length} post{posts.length !== 1 ? 's' : ''} about optimization, machine learning, and academic life.
        </p>
      </header>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No posts yet.</p>
          <Link href="/" className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded">
            Return to homepage →
          </Link>
        </div>
      ) : (
        <div className="space-y-8" role="feed" aria-label="Blog posts">
          {posts.map((post) => {
            // Calculate reading time (≈225 wpm)
            const words = post.content.trim().split(/\s+/).length
            const readingTime = Math.max(1, Math.round(words / 225))
            
            return (
              <article key={post.slug} className="border-b border-gray-200 pb-8 last:border-b-0">
                <Link 
                  href={`/blog/${post.slug}`} 
                  className="group focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded"
                  aria-describedby={`post-meta-${post.slug}`}
                >
                  <h2 className="text-xl font-medium mb-2 group-hover:underline group-focus:underline">
                    {post.metadata.title}
                  </h2>
                </Link>
                
                <div id={`post-meta-${post.slug}`} className="text-sm text-gray-600 mb-3">
                  <time dateTime={post.metadata.date} className="mr-3">
                    {formatDate(post.metadata.date)}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span className="ml-3">{readingTime} min read</span>
                </div>
                
                {post.metadata.excerpt && (
                  <p className="text-gray-700 mb-3">{post.metadata.excerpt}</p>
                )}
                
                {post.metadata.tags && post.metadata.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 text-xs" role="list" aria-label="Post tags">
                    {post.metadata.tags.map(tag => (
                      <Link
                        key={tag}
                        href={`/tags/${encodeURIComponent(tag)}`}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                        role="listitem"
                        aria-label={`View posts tagged with ${tag}`}
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            )
          })}
        </div>
      )}
    </div>
  )
}