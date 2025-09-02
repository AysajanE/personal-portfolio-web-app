import type { MDXComponents } from 'mdx/types'
import Link from 'next/link'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }: any) => {
      if (href?.startsWith('http')) {
        return (
          <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:no-underline"
            {...props}
          >
            {children}
          </a>
        )
      }
      return (
        <Link 
          href={href || ''} 
          className="underline hover:no-underline"
          {...props}
        >
          {children}
        </Link>
      )
    },
    img: ({ src, alt, ...props }: any) => (
      <img
        src={src}
        alt={alt || ''}
        loading="lazy"
        decoding="async"
        className="w-full h-auto rounded-md"
        {...props}
      />
    ),
    iframe: ({ src, title, ...props }: any) => (
      <div className="relative aspect-video mb-4">
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          {...props}
        />
      </div>
    ),
    ...components,
  }
}