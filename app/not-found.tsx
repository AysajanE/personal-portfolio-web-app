import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container py-16">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="space-y-4">
          <div>
            <Link 
              href="/blog" 
              className="inline-block underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded px-1 py-1"
            >
              Browse all posts →
            </Link>
          </div>
          <div>
            <Link 
              href="/search" 
              className="inline-block underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded px-1 py-1"
            >
              Search posts →
            </Link>
          </div>
          <div>
            <Link 
              href="/" 
              className="inline-block underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded px-1 py-1"
            >
              Return to homepage →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}