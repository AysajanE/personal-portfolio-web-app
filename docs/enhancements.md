# Enhancement & Refinement Checklist

Below is a **prioritized, practical checklist** to push the website from “great” to “exceptional.” I’ve included a few **surgical code patches** you can drop in today (fixes + high‑ROI UX/SEO), followed by “signature” ideas that will make the site unmistakably yours.

---

## 🔧 Quick fixes (do these first)

### 1) Actually use your custom MDX components (+ better headings)

Right now `useMDXComponents` is imported but not used, so external links, images, and iframes aren’t getting your custom behavior.

**`app/blog/[slug]/page.tsx`** — replace the whole file with the version below (also fixes typing of `params`, adds heading slugs/links, reading time, prev/next, and richer metadata):

```tsx
// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/mdx'
import { useMDXComponents } from '@/components/MDXComponents'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = params
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
      images: [{ url: `/og/${slug}.png` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metadata.title,
      description: post.metadata.excerpt || post.metadata.title,
      images: [`/og/${slug}.png`],
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = params
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

  const components = useMDXComponents({})

  return (
    <div className="container py-16">
      <Link href="/blog" className="underline hover:no-underline mb-8 inline-block">
        ← Back to blog
      </Link>

      <article className="max-w-none">
        <header className="mb-8">
          <h1 className="text-2xl font-bold mb-2">{post.metadata.title}</h1>
          <div className="text-sm text-gray-600">
            <time>{formatDate(post.metadata.date)}</time>
            <span aria-hidden> · </span>
            <span>{readingTime} min read</span>
          </div>
        </header>

        <div className="prose prose-slate max-w-none">
          <MDXRemote
            source={post.content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkMath, remarkGfm],
                rehypePlugins: [
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
```

### 2) Fix images in MDX

Your current `Next/Image` mapping uses `width={0}`/`height={0}` which is invalid and adds client JS. If you want **no client JS**, use a plain `<img>` and let the browser lazy‑load.

**`components/MDXComponents.tsx`** — replace the `img` mapping:

```tsx
// components/MDXComponents.tsx (inside useMDXComponents return)
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
```

*(If you prefer Next/Image, switch to the `fill` layout inside a ratio box. But for your “no JS” philosophy, the plain `<img>` is perfect.)*

### 3) Sanitize MDX for safety

User‑generated or migrated MDX can contain unsafe HTML. Add `rehype-sanitize`.

```bash
npm i rehype-sanitize
```

Then in `app/blog/[slug]/page.tsx`, add `import rehypeSanitize from 'rehype-sanitize'` and include it **before** KaTeX/highlight:

```ts
rehypePlugins: [
  rehypeSanitize,
  rehypeKatex,
  rehypeHighlight,
  rehypeSlug,
  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
],
```

### 4) Params typing (tiny TS papercut)

You typed `params` as a `Promise`. The patch above fixes it; no more `await params`.

---

## 🚀 High‑impact enhancements (1–2 hour wins)

### A) Add tags & tag pages (better IA without bloat)

**`lib/mdx.ts`** — add helpers:

```ts
export function getAllTags(): Record<string, number> {
  const counts: Record<string, number> = {}
  getAllPosts().forEach(p => {
    (p.metadata.tags || []).forEach(t => {
      counts[t] = (counts[t] || 0) + 1
    })
  })
  return counts
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter(p => (p.metadata.tags || []).includes(tag))
}
```

**`app/tags/page.tsx`**:

```tsx
import Link from 'next/link'
import { getAllTags } from '@/lib/mdx'

export const metadata = { title: 'Tags' }

export default function TagsPage() {
  const tags = Object.entries(getAllTags()).sort((a,b) => b[1]-a[1])
  return (
    <div className="container py-16">
      <h1 className="text-2xl font-bold mb-8">Tags</h1>
      <ul className="flex flex-wrap gap-3">
        {tags.map(([tag, count]) => (
          <li key={tag}>
            <Link href={`/tags/${encodeURIComponent(tag)}`} className="underline hover:no-underline">
              {tag} <span className="text-gray-500">({count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
```

**`app/tags/[tag]/page.tsx`**:

```tsx
import Link from 'next/link'
import { getPostsByTag, formatDate } from '@/lib/mdx'

export async function generateStaticParams() {
  // static params from all tags
  const tags = new Set<string>()
  getPostsByTag // type hint only
  // gather
  return Object.keys(require('@/lib/mdx').getAllTags()).map(t => ({ tag: t }))
}

export default function TagPage({ params }: { params: { tag: string } }) {
  const posts = getPostsByTag(params.tag)
  return (
    <div className="container py-16">
      <h1 className="text-2xl font-bold mb-8">#{params.tag}</h1>
      {posts.length === 0 ? <p>No posts.</p> : (
        <div className="space-y-8">
          {posts.map(post => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="text-xl font-medium mb-1 group-hover:underline">{post.metadata.title}</h2>
              </Link>
              <time className="text-sm text-gray-600">{formatDate(post.metadata.date)}</time>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
```

*Bonus:* Add a small “Tags” section under each post header listing clickable tags if present.

---

### B) Add server‑rendered search (no client JS)

**`lib/mdx.ts`** — add:

```ts
export function searchPosts(q: string): Post[] {
  const query = q.toLowerCase()
  return getAllPosts().filter(p => {
    const hay = `${p.metadata.title} ${p.metadata.excerpt ?? ''} ${p.content}`.toLowerCase()
    return hay.includes(query)
  })
}
```

**`app/search/page.tsx`**:

```tsx
import { searchParams } from 'next/navigation' // Next 15 alternative uses props
import Link from 'next/link'
import { searchPosts, formatDate } from '@/lib/mdx'

export const metadata = { title: 'Search' }

export default function SearchPage({ searchParams }: { searchParams?: { q?: string }}) {
  const q = (searchParams?.q ?? '').trim()
  const results = q ? searchPosts(q) : []
  return (
    <div className="container py-16">
      <h1 className="text-2xl font-bold mb-6">Search</h1>
      <form method="GET" action="/search" className="mb-8">
        <input
          type="text" name="q" defaultValue={q}
          placeholder="Search posts…"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </form>

      {q && (
        <p className="text-sm text-gray-600 mb-6">
          {results.length} result{results.length !== 1 && 's'} for “{q}”
        </p>
      )}

      <div className="space-y-8">
        {results.map(p => (
          <article key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="group">
              <h2 className="text-xl font-medium mb-1 group-hover:underline">{p.metadata.title}</h2>
            </Link>
            <time className="text-sm text-gray-600">{formatDate(p.metadata.date)}</time>
            {p.metadata.excerpt && <p className="mt-2 text-gray-700">{p.metadata.excerpt}</p>}
          </article>
        ))}
      </div>
    </div>
  )
}
```

*Add a “Search” link to `Navigation.tsx` if you like.*

---

### C) Richer SEO: structured data + dynamic OG images

1. **JSON‑LD** per post is already covered in `generateMetadata` above. You can add a small `<script type="application/ld+json">` block if you want explicit schema.org `BlogPosting`—but Next metadata is usually enough.

2. **OG images** that render your title dynamically make shares look premium.

```bash
npm i @vercel/og
```

**`app/og/[slug]/route.tsx`**:

```tsx
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from '@vercel/og'
import { getPostBySlug } from '@/lib/mdx'

export const runtime = 'edge'

export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug)
  const title = post?.metadata.title ?? 'Aysajan Eziz'
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: '#fff',
          fontSize: 54,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 24 }}>{title}</div>
        <div style={{ fontSize: 28, color: '#555' }}>aysajaneziz.com</div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
```

Then reference `/og/[slug].png` in `generateMetadata` as shown.

---

### D) Accessibility niceties (zero visual cost)

**Skip link + robust landmarks.**

**`app/layout.tsx`** — minimal diff:

```tsx
<body className="font-mono antialiased bg-white text-gray-900 leading-relaxed">
  <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 underline">
    Skip to content
  </a>
  <div className="min-h-screen flex flex-col">
    <Navigation />
    <main id="content" className="flex-grow">{children}</main>
    <Footer />
  </div>
</body>
```

**`app/globals.css`** — ensure `.sr-only` exists (Tailwind has it built-in; the focus utility above reveals it).

---

### E) Harden your XML routes to the Node runtime

You’re reading from the filesystem in `feed.xml`/`sitemap.xml`. Make the runtime explicit to avoid accidental Edge deployments.

Add at the top of `app/feed.xml/route.ts` and `app/sitemap.xml/route.ts`:

```ts
export const runtime = 'nodejs'
```

---

### F) Clean up docs mismatch

Your README promises “About, Projects, Research, Contact, dark mode,” etc., but the codebase is intentionally minimalist. Either add those routes or simplify README to match reality. (This alone removes confusion for future you.)

---

## ✨ Signature ideas (the “why you” factor)

Pick one or two—these are the differentiators:

1. **“Great Thoughts Friday” archive**
   Turn Hamming’s practice into a page that curates your weekly “big questions.” Short entries, dated, taggable, and RSS’d separately. (It sends a strong signal about your research ethos.)

2. **Operations Research Playground**
   Tiny, no‑build widgets that illustrate concepts you teach/research (e.g., newsvendor model, bullwhip simulation). Start with one: a simple interactive chart via `<iframe>` to an Observable notebook or a static JS snippet gated behind a “Load interaction” button to preserve the minimal baseline.

3. **Open Syllabus / Reading Ledger**
   A living reading list with short annotations and links (think “What I’m learning this quarter”). Great for students and collaborators; also creates steady content without full blog overhead.

4. **Colophon & Philosophy**
   Explain the “delete until it hurts” approach (as you did in CLAUDE.md) on a `/colophon` page. People love this, and it’s a great recruiting artifact for collaborators and students who value that taste.

---

## 🧭 Content IA & editorial polish

* **De‑emphasize “migrated”**: keep the tag for provenance, but don’t surface it in the tags index by default (or alias it to a “from the archives” collection).
* **Feature flag**: Use `featured: true` to pin 2–3 essays at the top of `/blog`.
* **Consistent excerpts**: add 1–2 sentence abstracts to older posts; they dramatically improve scanability on `/blog` and search results.
* **Series**: wrap multi‑part essays (e.g., Bitcoin thesis) into a simple series layout by sharing a tag like `series: "Bitcoin Thesis"` and listing siblings at the end of the post.

---

## 🧱 Visual/typography tweaks (still minimal)

* Consider `font-sans` for body copy (keep mono for code). Pure mono body can be tiring for long-form reading.
* Use Tailwind Typography more fully: wrap MDX content in `prose prose-slate lg:prose-lg` and add `dark:prose-invert` if you ever enable dark mode.
* Slightly increase line-height for headings and add a tiny top border to the article footer nav—gives a subtle “bookish” finish.

---

## 🔍 SEO/Discovery small wins

* **Breadcrumbs JSON‑LD** (Home → Blog → Post) in blog posts.
* **Newsletter** (Buttondown/Plausible + a static form) with a privacy‑respecting, no‑JS fallback.
* **Share links** (mailto/Twitter/LinkedIn) as plain anchors—no widgets.
* **RSS**: add `<link rel="alternate" type="application/rss+xml" href="/feed.xml">` to `layout.tsx`’s `<head>` via `alternates` (you already did—nice).

---

## 🔒 Security & performance

* **CSP headers** (tight but pragmatic). In `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    const csp = [
      "default-src 'self'",
      "img-src 'self' data: https:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self'",
      "connect-src 'self'",
      "frame-src https:",
    ].join('; ')
    return [
      { source: '/(.*)', headers: [
        { key: 'Content-Security-Policy', value: csp },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
      ]},
    ]
  },
}
module.exports = nextConfig
```

* **Type-check script**: your README mentions it, but it’s not in `package.json`. Add `"type-check": "tsc --noEmit"` to keep docs honest.

---

## 🧩 Tiny quality-of-life details

* Add `app/not-found.tsx` with the site’s voice and a link back to Blog/Home.
* In `Footer`, add a `rel="alternate"` + `type="application/rss+xml"` to the RSS link (keeps validators happy):

  ```tsx
  <Link href="/feed.xml" rel="alternate" type="application/rss+xml" className="underline hover:no-underline">
    RSS
  </Link>
  ```
* Consider `aria-current="page"` on the active nav item.

---

## What makes this *exceptional* (summary)

1. **Polished fundamentals:** headings with anchors, reading time, prev/next, tags, search — all server-rendered, no JS tax.
2. **Premium sharing:** dynamic OG images and solid metadata.
3. **Safety & resilience:** sanitized MDX and explicit runtimes.
4. **A point of view:** “Great Thoughts Friday” + an OR Playground + a Colophon give visitors a strong sense of *you*.

If you want, I can also sketch a minimal `/colophon`, `/tags`, and `/search` navigation update and a short style pass for `prose` defaults—but the patches above already move the needle meaningfully without changing your minimalist ethos.
