'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error('Application Error:', error)
  }, [error])
  return (
    <div className="container py-16">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">⚠️</h1>
        <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
        <p className="text-gray-600 mb-8">
          We're sorry, but something unexpected happened. Please try again or return to the homepage.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="text-left mb-8 text-sm">
            <summary className="cursor-pointer text-gray-500 hover:text-gray-700">
              Technical details
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
        
        <div className="space-y-4">
          <div>
            <button
              onClick={reset}
              className="inline-block px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
            >
              Try again
            </button>
          </div>
          <div>
            <Link 
              href="/" 
              className="inline-block underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded px-1 py-1"
            >
              Return to homepage →
            </Link>
          </div>
          <div>
            <Link 
              href="/blog" 
              className="inline-block underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded px-1 py-1"
            >
              Browse all posts →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}