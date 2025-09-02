export default function Loading() {
  return (
    <div className="container py-16">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" aria-hidden="true"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
        <span className="sr-only">Page is loading</span>
      </div>
    </div>
  )
}