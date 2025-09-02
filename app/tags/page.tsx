import Link from 'next/link'
import { getAllTags } from '@/lib/mdx'

export const metadata = { title: 'Tags' }

export default function TagsPage() {
  const tags = Object.entries(getAllTags()).sort((a,b) => b[1]-a[1])
  const totalPosts = Object.values(getAllTags()).reduce((sum, count) => sum + count, 0)

  return (
    <div className="container py-16">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Tags</h1>
        <p className="text-gray-600">
          {tags.length} tag{tags.length !== 1 ? 's' : ''} across {totalPosts} post{totalPosts !== 1 ? 's' : ''}.
        </p>
      </header>
      
      {tags.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No tags yet.</p>
          <Link href="/blog" className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded">
            View all posts →
          </Link>
        </div>
      ) : (
        <>
          <nav className="mb-8" role="navigation" aria-label="Tag cloud">
            <ul className="flex flex-wrap gap-3">
              {tags.map(([tag, count]) => (
                <li key={tag}>
                  <Link 
                    href={`/tags/${encodeURIComponent(tag)}`} 
                    className="inline-block px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 text-sm transition-colors"
                    aria-label={`View ${count} post${count !== 1 ? 's' : ''} tagged with ${tag}`}
                  >
                    {tag} <span className="text-gray-500">({count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="text-sm text-gray-600">
            <Link 
              href="/blog" 
              className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded"
            >
              View all posts
            </Link>
            <span className="mx-2" aria-hidden="true">·</span>
            <Link 
              href="/search" 
              className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded"
            >
              Search posts
            </Link>
          </div>
        </>
      )}
    </div>
  )
}