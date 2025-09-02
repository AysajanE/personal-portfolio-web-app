import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="border-b border-gray-200 py-4" role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="font-bold focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded"
            aria-label="Home - Aysajan Eziz"
          >
            Aysajan Eziz
          </Link>
          <div className="flex space-x-4" role="list">
            <div role="listitem">
              <Link 
                href="/blog" 
                className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded px-1 py-1"
                aria-label="View all blog posts"
              >
                Blog
              </Link>
            </div>
            <div role="listitem">
              <Link 
                href="/tags" 
                className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded px-1 py-1"
                aria-label="Browse posts by tags"
              >
                Tags
              </Link>
            </div>
            <div role="listitem">
              <Link 
                href="/search" 
                className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded px-1 py-1"
                aria-label="Search blog posts"
              >
                Search
              </Link>
            </div>
            <div role="listitem">
              <Link 
                href="/colophon" 
                className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded px-1 py-1"
                aria-label="About this website and its philosophy"
              >
                Colophon
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}