# Audit and Refine Plan
We're cutting to the bone, keeping MDX power inside posts, and making the whole thing carry on typography + rhythm alone.

---

## 0) North Star (kept visible while I work)

> **Delete until it hurts. Add back only what improves understanding at a glance.**

---

## 1) v0 Audit (why it feels heavier than it needs to)

* **Redundant sections**: “About/Research/Projects/Contact” duplicate what should live as posts or notes. They spread attention and add navigation weight without improving comprehension.
* **Client JS for chrome**: Mobile menu state, button components, and sticky/backdrop effects **ship JS** for stuff HTML/CSS can do. Not worth the hydration.
* **Two MDX pathways**: You’re using `next-mdx-remote` (string rendering) **and** global MDX config (`@next/mdx`). One is enough. Keeping the remote path preserves the ability to load MDX from `content/`.
* **Over-styled prose**: Custom `.prose-custom`, many `dark:` variants, and a pile of element overrides fight the typography plugin. More CSS ≠ better reading.
* **Image pipeline friction**: For MDX content, using `next/image` introduces domain allowlists and hard failures. Posts need **graceful fallback** with plain `<img>`.
* **Inconsistent name/meta**: “Dr. Aysa Janez Iz” vs “Aysajan Eziz” appears across pages and feed.
* **Build/deploy ballast**: Scripts for migration and `.playwright-mcp`, `.trees`, `.next` artifacts inflate the repo; they’re not part of the reading experience.

---

## 2) What I’m Deleting (aggressively) — with reasons

**Pages & routes**

* `app/about/page.tsx` — Redundant; move anything essential into a post (“/blog/welcome”).
* `app/contact/page.tsx` — A mail link in footer suffices.
* `app/research/**` — Treat research write‑ups as blog posts with tags (e.g., `#paper`, `#hotel-rm`).
* `app/projects/**` — Project notes belong as posts; keep the demo/GitHub links inside those posts.

**Components**

* `components/Button.tsx` — Buttons are decorative; links + a minimal class is cleaner and shippable as HTML.
* `components/Navigation.tsx` (client version) — Replace with server component (no JS).

**Styling**

* Custom `.prose-custom` & button styles in `app/globals.css` — Let the typography plugin lead; add only tiny utilities.
* Inter font import — System font stack renders fast and clean; no font file/FOIT.

**MDX plumbing**

* Root `mdx-components.tsx` — Redundant re-export; we’ll keep a single source of truth: `components/MDXComponents.tsx`.
* `@next/mdx` config in `next.config.js` — Not needed when rendering MDX from strings via `next-mdx-remote`.

**Content & misc (repo hygiene)**

* `scripts/**` (migration, fixers) — Out of the runtime. Archive them elsewhere if you still need them.
* `.playwright-mcp/**`, `.trees/**`, `.next/**` — Build/test artifacts; not part of app source.

> Result: Site becomes **Home**, **Blog index**, **Blog post**, plus the plain‑text/ XML routes (robots, sitemap, RSS, manifest). Nothing else.

---

## 3) v1 Architecture (ultra‑simple)

```
app/
  layout.tsx
  globals.css
  page.tsx                # Home (short)
  blog/
    page.tsx              # Listing
    [slug]/page.tsx       # Post detail (MDX power)
  feed.xml/route.ts
  robots.txt/route.ts
  sitemap.xml/route.ts
  manifest.json/route.ts

components/
  Navigation.tsx          # server component (no JS)
  Footer.tsx              # tiny
  MDXComponents.tsx       # a, img, code, figure, audio, video, iframe

lib/
  mdx.ts                  # posts only (getAllPosts, getPostBySlug, formatDate)

content/
  posts/*.mdx             # everything lives here (code, math, images, audio/video)

tailwind.config.js        # typography plugin only
next.config.js            # default
package.json              # trimmed deps
tsconfig.json             # modern target
```

**Opinionated uniqueness** now comes from:\*\*

* Stark type scale + generous line height (readable > pretty).
* Narrow measure (≈65ch), consistent rhythm.
* Only three visible routes.
* Microcopy that says “notes, not noise”.

---

## 4) Minimal style system (rules I’ll enforce)

* **Font**: system UI stack (no webfonts).
* **Measure**: container max‑width ≈ **65ch** for prose.
* **Type scale**: h1 `text-3xl`, h2 `text-2xl`, body `text-base` with comfortable leading.
* **Rhythm**: use `@tailwindcss/typography` defaults; avoid bespoke element styles.
* **Color**: neutral text on white. No gradients. No animations.
* **Links**: underline on hover only.
* **Code**: `rehype-highlight` + GitHub theme; pre blocks get subtle border + padding.
* **Media**: `<img>` plain, responsive; `<audio>`/`<video>` with controls; `iframe` wrapped to 16:9.

---

## 5) MDX power in posts (must‑haves kept)

* **Code**: fenced blocks with `rehype-highlight` (GitHub CSS).
* **Math**: `remark-math` + `rehype-katex` + KaTeX CSS.
* **Images**: native `<img>` (no domain allowlists), full‑width responsive; optional `figure/figcaption`.
* **Audio/Video**: native tags enabled with sensible defaults.
* **Embeds**: `<iframe>` gets responsive container and `allowFullScreen`.

---

## 6) Exact changes (copy/paste)

### A) Delete these (entire files/folders)

```
app/about
app/contact
app/research
app/projects
components/Button.tsx
mdx-components.tsx
scripts
.playwright-mcp
.trees
.next
```

---

### B) Replace files (full content shown)

**`app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import './globals.css'
import 'katex/dist/katex.min.css'
import 'highlight.js/styles/github.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aysajaneziz.com'),
  title: { default: 'Aysajan Eziz', template: '%s · Aysajan Eziz' },
  description: 'Operations Research & Analytics — notes on pricing, revenue management, and learning.',
  alternates: { types: { 'application/rss+xml': [{ url: '/feed.xml', title: 'RSS' }] } },
  manifest: '/manifest.json',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 antialiased">
        <Navigation />
        <main className="container py-12">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

**`app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .container { @apply mx-auto max-w-3xl px-4; }
}

/* Keep prose clean and consistent */
.prose { @apply max-w-none; }
.prose img, .prose video, .prose audio { margin-top: 1rem; margin-bottom: 1rem; }
.prose figure { margin-top: 1.25rem; margin-bottom: 1.25rem; }
.prose figcaption { @apply text-center text-sm text-neutral-500; }

/* Code blocks: subtle container */
.prose pre { @apply border border-neutral-200 rounded p-4 overflow-x-auto; }
```

**`components/Navigation.tsx`** (server component, no JS)

```tsx
import Link from 'next/link'

const links = [
  { name: 'Blog', href: '/blog' },
  { name: 'RSS', href: '/feed.xml' },
]

export default function Navigation() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-semibold tracking-tight">Aysajan Eziz</Link>
        <nav className="flex gap-6 text-sm">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="hover:underline">{l.name}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
```

**`components/Footer.tsx`** (simplified)

```tsx
export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-8 text-sm text-neutral-600">
        © {new Date().getFullYear()} Aysajan Eziz · <a href="/feed.xml" className="underline">RSS</a>
      </div>
    </footer>
  )
}
```

**`components/MDXComponents.tsx`**

```tsx
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href = '', children, ...props }: any) => {
      const external = /^https?:\/\//.test(href)
      return external ? (
        <a href={href} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
      ) : (
        <a href={href} {...props}>{children}</a>
      )
    },
    img: (props: any) => (
      /* Plain <img> avoids domain allowlists; responsive by default */
      <img loading="lazy" decoding="async" className="w-full h-auto" {...props} />
    ),
    figure: ({ children, ...props }: any) => <figure className="my-6" {...props}>{children}</figure>,
    figcaption: ({ children, ...props }: any) =>
      <figcaption className="mt-2 text-center text-sm text-neutral-500" {...props}>{children}</figcaption>,
    pre: ({ children, ...props }: any) =>
      <pre className="overflow-x-auto rounded border border-neutral-200 p-4" {...props}>{children}</pre>,
    code: ({ children, ...props }: any) => <code {...props}>{children}</code>,
    audio: (props: any) => <audio controls className="w-full" {...props} />,
    video: (props: any) => <video controls className="w-full" preload="metadata" {...props} />,
    iframe: (props: any) => (
      <div className="relative my-6" style={{ paddingTop: '56.25%' }}>
        <iframe
          className="absolute left-0 top-0 h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          {...props}
        />
      </div>
    ),
    ...components,
  }
}
```

**`app/page.tsx`**

```tsx
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <h1 className="text-3xl font-semibold tracking-tight">Aysajan Eziz</h1>
      <p className="mt-4 text-neutral-700">
        Professor of Operations Research & Analytics. I write about pricing, revenue management, and learning.
      </p>
      <p className="mt-6">
        <Link href="/blog" className="underline">Read the blog</Link> · <a href="/feed.xml" className="underline">RSS</a>
      </p>
    </>
  )
}
```

**`app/blog/page.tsx`**

```tsx
import Link from 'next/link'
import { getAllPosts, formatDate } from '@/lib/mdx'

export const metadata = {
  title: 'Blog',
  description: 'Notes on OR/MS, pricing, and learning.',
}

export default function BlogPage() {
  const posts = getAllPosts()

  if (posts.length === 0) {
    return (
      <>
        <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-4 text-neutral-700">No posts yet.</p>
      </>
    )
  }

  return (
    <>
      <h1 className="text-2xl font-semibold tracking-tight">Blog</h1>
      <ul className="mt-6 divide-y">
        {posts.map((post) => (
          <li key={post.slug} className="py-4">
            <time className="text-xs text-neutral-500" dateTime={post.metadata.date}>
              {formatDate(post.metadata.date)}
            </time>
            <h2 className="mt-1 text-lg font-medium">
              <Link href={`/blog/${post.slug}`} className="underline-offset-2 hover:underline">
                {post.metadata.title}
              </Link>
            </h2>
            {post.metadata.excerpt && (
              <p className="mt-1 text-sm text-neutral-600">{post.metadata.excerpt}</p>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}
```

**`app/blog/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getAllPosts, formatDate } from '@/lib/mdx'
import { useMDXComponents } from '@/components/MDXComponents'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) return { title: 'Not found' }
  return { title: post.metadata.title, description: post.metadata.excerpt || undefined }
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  return (
    <article>
      <div className="mb-8">
        <time className="text-xs text-neutral-500" dateTime={post.metadata.date}>
          {formatDate(post.metadata.date)}
        </time>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{post.metadata.title}</h1>
        {post.metadata.excerpt && <p className="mt-2 text-neutral-600">{post.metadata.excerpt}</p>}
      </div>

      <div className="prose prose-neutral">
        <MDXRemote
          source={post.content}
          components={useMDXComponents({})}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath, remarkGfm],
              rehypePlugins: [rehypeKatex, rehypeHighlight],
            },
          }}
        />
      </div>

      <div className="mt-12">
        <Link href="/blog" className="underline">← All posts</Link>
      </div>
    </article>
  )
}
```

**`lib/mdx.ts`**

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMetadata {
  title: string
  date: string
  excerpt?: string
  author?: string
  tags?: string[]
  published?: boolean
}

export interface Post {
  slug: string
  metadata: PostMetadata
  content: string
}

const postsDir = path.join(process.cwd(), 'content', 'posts')

export function getAllPosts(): Post[] {
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '')
      const raw = fs.readFileSync(path.join(postsDir, file), 'utf8')
      const { data, content } = matter(raw)
      return {
        slug,
        metadata: {
          ...(data as any),
          tags: Array.isArray((data as any).tags)
            ? (data as any).tags.filter((t: string) => t !== 'migrated')
            : undefined,
        } as PostMetadata,
        content,
      }
    })
    .filter((p) => p.metadata.published !== false)
    .sort((a, b) => +new Date(b.metadata.date) - +new Date(a.metadata.date))
}

export function getPostBySlug(slug: string): Post | null {
  const file = path.join(postsDir, `${slug}.mdx`)
  if (!fs.existsSync(file)) return null
  const raw = fs.readFileSync(file, 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    metadata: {
      ...(data as any),
      tags: Array.isArray((data as any).tags)
        ? (data as any).tags.filter((t: string) => t !== 'migrated')
        : undefined,
    } as PostMetadata,
    content,
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}
```

**`app/feed.xml/route.ts`**

```ts
import { getAllPosts } from '@/lib/mdx'

export function GET(): Response {
  const baseUrl = 'https://www.aysajaneziz.com'
  const posts = getAllPosts().slice(0, 20)

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Aysajan Eziz — Blog</title>
    <description>Notes on OR/MS, pricing, and learning.</description>
    <link>${baseUrl}/blog</link>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${posts.map(p => `
    <item>
      <title><![CDATA[${p.metadata.title}]]></title>
      <description><![CDATA[${p.metadata.excerpt || ''}]]></description>
      <link>${baseUrl}/blog/${p.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.metadata.date).toUTCString()}</pubDate>
      ${(p.metadata.tags || []).map(t => `<category><![CDATA[${t}]]></category>`).join('')}
    </item>`).join('')}
  </channel>
</rss>`.trim()

  return new Response(rss, { headers: { 'Content-Type': 'application/xml' } })
}
```

**`app/sitemap.xml/route.ts`**

```ts
import { getAllPosts } from '@/lib/mdx'

export function GET(): Response {
  const baseUrl = 'https://www.aysajaneziz.com'
  const staticPages = ['', '/blog']

  const posts = getAllPosts()
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(p => `
  <url>
    <loc>${baseUrl}${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  ${posts.map(p => `
  <url>
    <loc>${baseUrl}/blog/${p.slug}</loc>
    <lastmod>${new Date(p.metadata.date).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('')}
</urlset>`.trim()

  return new Response(sitemap, { headers: { 'Content-Type': 'application/xml' } })
}
```

**`tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx,mdx}', './content/**/*.mdx'],
  theme: { extend: {} },
  plugins: [require('@tailwindcss/typography')],
}
```

**`next.config.js`**

```js
/** @type {import('next').NextConfig} */
module.exports = {}
```

**`package.json`** (trimmed)

```json
{
  "name": "personal-portfolio-web-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "gray-matter": "^4.0.3",
    "highlight.js": "^11.11.1",
    "katex": "^0.16.22",
    "next": "^15.5.0",
    "next-mdx-remote": "^5.0.0",
    "react": "^19.1.1",
    "react-dom": "^19.1.1",
    "rehype-highlight": "^7.0.2",
    "rehype-katex": "^7.0.1",
    "remark-gfm": "^4.0.1",
    "remark-math": "^6.0.0"
  },
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.16",
    "@types/node": "^24.3.0",
    "@types/react": "^19.1.10",
    "@types/react-dom": "^19.1.7",
    "autoprefixer": "^10.4.21",
    "eslint": "^9.33.0",
    "eslint-config-next": "^15.5.0",
    "postcss": "^8.5.6",
    "tailwindcss": "^3.4.17",
    "typescript": "^5.9.2"
  }
}
```

**`tsconfig.json`** (modern target)

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "strict": true,
    "noEmit": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

---

## 7) How posts carry power (examples you can drop into any `.mdx`)

**Code**

````mdx
```python
def bellman(V, P, R, beta):
    return R + beta * P @ V
````

````

**Math**
```mdx
Inline: $V^\*(s) = \max_a \sum_{s'} P(s'|s,a)\,[R(s,a,s') + \gamma V^\*(s')]$

Block:
$$
\pi^\*(s) = \arg\max_a \sum_{s'} P(s'|s,a)\,[R(s,a,s') + \gamma V^\*(s')]
$$
````

**Images (with optional caption)**

```mdx
<figure>
  <img src="/og-image.png" alt="Value iteration sketch" />
  <figcaption>Value iteration intuition.</figcaption>
</figure>
```

**Audio/Video**

```mdx
<audio src="/media/lecture-intro.mp3" />
<video src="/media/demo.mp4" />
```

**Responsive embed (YouTube, etc.)**

```mdx
<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
```

---

## 8) Performance wins (what the deletions buy you)

* **Zero nav hydration** (server header).
* **No webfonts** (system stack).
* **Way less CSS** (typography plugin + tiny utilities).
* **Fewer routes, fewer components** (smaller JS/HTML).
* **Plain `<img>`** avoids 404s from blocked hosts and adds reliability.

---

## 9) Optional migrations (light touch)

* Move `content/research/*.mdx` and `content/projects/*.mdx` into `content/posts/` and add tags like:

  ```yaml
  tags: ["research", "hotel-rm"]  # or ["project"]
  ```
* Publish your favorite “About/Welcome” as a post pinned by date or a simple “/blog/welcome” link from Home.

---

## 10) Sanity checklist

* [ ] Delete the listed files/folders.
* [ ] Apply replacements as-is.
* [ ] Fix any post frontmatter name inconsistencies (use “Aysajan Eziz”).
* [ ] Keep `public/` assets as-is (icons, favicon).
* [ ] Run `npm i` (trimmed deps), then `npm run dev`.

---

If something feels “too bare,” good—that’s the point. If you add back \~10%, add it **only** where it increases comprehension (e.g., a tiny tag index on the blog, or a one-line tagline under titles).
