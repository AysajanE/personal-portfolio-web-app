import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // Performance monitoring
  const start = Date.now()
  
  // Clone the request headers to modify them
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-start-time', start.toString())
  
  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  })
  
  // Add security headers (backup to next.config.js)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Add performance timing header for monitoring
  const duration = Date.now() - start
  response.headers.set('X-Response-Time', `${duration}ms`)
  
  // Log performance metrics in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`${request.method} ${request.nextUrl.pathname} - ${duration}ms`)
  }
  
  return response
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - og/ (OG image generation)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|og).*)',
  ],
}