import Link from 'next/link'
import { getPostsByTag, formatDate, getAllTags } from '@/lib/mdx'

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const allTags = getAllTags()
  return Object.keys(allTags).map(tag => ({ tag }))
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params
  return {
    title: `Posts tagged "${tag}"`,
    description: `All posts tagged with "${tag}"`
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const posts = getPostsByTag(tag)
  
  return (
    <div className="container py-16">
      <Link 
        href="/tags" 
        className="underline hover:no-underline mb-8 inline-block focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded px-1 py-1"
      >
        ← All tags
      </Link>
      
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">#{tag}</h1>
        <p className="text-gray-600">
          {posts.length} post{posts.length !== 1 ? 's' : ''} tagged with "{tag}"
        </p>
      </header>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No posts found with this tag.</p>
          <div className="space-y-2">
            <div>
              <Link 
                href="/blog" 
                className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded"
              >
                View all posts →
              </Link>
            </div>
            <div>
              <Link 
                href="/search" 
                className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded"
              >
                Search posts →
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8" role="feed" aria-label={`Posts tagged with ${tag}`}>
          {posts.map(post => {
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
                    {post.metadata.tags.map(postTag => (
                      <Link
                        key={postTag}
                        href={`/tags/${encodeURIComponent(postTag)}`}
                        className={`px-2 py-1 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${
                          postTag === tag
                            ? 'bg-gray-700 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                        role="listitem"
                        aria-label={`View posts tagged with ${postTag}`}
                        aria-current={postTag === tag ? 'page' : undefined}
                      >
                        {postTag}
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