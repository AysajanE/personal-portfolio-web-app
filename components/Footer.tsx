import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 mt-16" role="contentinfo">
      <div className="container py-8">
        <div className="flex justify-between items-center text-sm">
          <p>© {currentYear} Aysajan Eziz</p>
          <Link 
            href="/feed.xml" 
            className="underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 rounded px-1 py-1"
            aria-label="Subscribe to RSS feed for blog updates"
          >
            RSS
          </Link>
        </div>
      </div>
    </footer>
  )
}