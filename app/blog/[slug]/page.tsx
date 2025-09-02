import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/mdx'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSanitize from 'rehype-sanitize'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return { title: 'Post Not Found' }

  const url = `https://www.aysajaneziz.com/blog/${slug}`
  return {
    title: post.metadata.title,
    description: post.metadata.excerpt || post.metadata.title,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: post.metadata.title,
      description: post.metadata.excerpt || post.metadata.title,
      images: [{ url: `/og/${slug}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.excerpt || post.metadata.title,
      images: [`/og/${slug}`],
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  // minimal reading time (≈225 wpm)
  const words = post.content.trim().split(/\s+/).length
  const readingTime = Math.max(1, Math.round(words / 225))

  // prev/next (newest-first list)
  const all = getAllPosts()
  const i = all.findIndex(p => p.slug === slug)
  const prev = i < all.length - 1 ? all[i + 1] : null // older
  const next = i > 0 ? all[i - 1] : null             // newer

  // Simple inline MDX components for server-side rendering
  const components = {
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
  }

  return (
    <div className="container py-16">
      <Link href="/blog" className="underline hover:no-underline mb-8 inline-block">
        ← Back to blog
      </Link>

      <article className="max-w-none">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{post.metadata.title}</h1>
          <div className="text-sm text-gray-600 mb-3">
            <time>{formatDate(post.metadata.date)}</time>
            <span aria-hidden> · </span>
            <span>{readingTime} min read</span>
          </div>
          
          {post.metadata.tags && post.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 text-xs">
              {post.metadata.tags.map(tag => (
                <Link
                  key={tag}
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-slate max-w-none">
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath, remarkGfm],
                rehypePlugins: [
                  rehypeSanitize,
                  rehypeKatex,
                  rehypeHighlight,
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                ],
              },
            }}
          />
        </div>

        <nav aria-label="Post navigation" className="mt-12 flex justify-between text-sm">
          <div>
            {prev && (
              <Link href={`/blog/${prev.slug}`} className="underline hover:no-underline">
                ← {prev.metadata.title}
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link href={`/blog/${next.slug}`} className="underline hover:no-underline">
                {next.metadata.title} →
              </Link>
            )}
          </div>
        </nav>
      </article>
    </div>
  )
}