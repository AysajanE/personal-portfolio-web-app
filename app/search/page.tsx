import Link from 'next/link'
import { searchPosts, formatDate } from '@/lib/mdx'

interface Props {
  searchParams?: Promise<{ q?: string }>
}

export const metadata = { title: 'Search' }

export default async function SearchPage({ searchParams }: Props) {
  const resolvedParams = await searchParams
  const q = (resolvedParams?.q ?? '').trim()
  const results = q ? searchPosts(q) : []
  
  return (
    <div className="container py-16">
      <h1 className="text-2xl font-bold mb-6">Search</h1>
      
      <form method="GET" action="/search" className="mb-8" role="search">
        <label htmlFor="search-input" className="sr-only">
          Search blog posts
        </label>
        <input
          id="search-input"
          type="text"
          name="q"
          defaultValue={q}
          placeholder="Search posts…"
          className="w-full border border-gray-300 rounded px-3 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-400"
          autoFocus
          aria-describedby={q ? "search-results-summary" : undefined}
        />
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>

      {q && (
        <p id="search-results-summary" className="text-sm text-gray-600 mb-6" aria-live="polite">
          {results.length} result{results.length !== 1 ? 's' : ''} for "{q}"
        </p>
      )}

      <div className="space-y-8" role="region" aria-label="Search results">
        {results.map(post => (
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
            <div id={`post-meta-${post.slug}`}>
              <time className="text-sm text-gray-600 mb-3 block" dateTime={post.metadata.date}>
                {formatDate(post.metadata.date)}
              </time>
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
            </div>
          </article>
        ))}
      </div>
      
      {q && results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No posts found matching "{q}".</p>
          <Link href="/blog" className="underline hover:no-underline">
            Browse all posts →
          </Link>
        </div>
      )}
    </div>
  )
}