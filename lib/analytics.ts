// Performance monitoring utilities
export interface WebVitals {
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  id: string
}

export function reportWebVitals(metric: WebVitals) {
  // Log performance metrics in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`📊 ${metric.name}: ${metric.value}ms (${metric.rating})`)
  }
  
  // In production, you could send to analytics service
  // Example: analytics.track('web-vitals', metric)
}

export function getPerformanceMetrics() {
  if (typeof window === 'undefined') return null
  
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  
  if (!navigation) return null
  
  return {
    // Page load metrics
    domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart),
    loadComplete: Math.round(navigation.loadEventEnd - navigation.loadEventStart),
    
    // Network metrics
    dns: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
    tcp: Math.round(navigation.connectEnd - navigation.connectStart),
    request: Math.round(navigation.responseStart - navigation.requestStart),
    response: Math.round(navigation.responseEnd - navigation.responseStart),
    
    // Rendering metrics  
    domInteractive: Math.round(navigation.domInteractive - navigation.startTime),
    domComplete: Math.round(navigation.domComplete - navigation.startTime),
    
    // Total time
    total: Math.round(navigation.loadEventEnd - navigation.startTime)
  }
}