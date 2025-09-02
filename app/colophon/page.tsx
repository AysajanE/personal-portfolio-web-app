import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Colophon',
  description: 'The philosophy and technical choices behind this ultra-minimalist website',
}

export default function ColophonPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-2xl">
      <header className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Colophon</h1>
        <p className="text-gray-600 dark:text-gray-400">
          The philosophy and technical choices behind this website
        </p>
      </header>

      <article className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert max-w-none">
        <section className="mb-8">
          <h2>Delete Until It Hurts</h2>
          <p>
            This website embodies the philosophy of radical minimalism—a deliberate practice of removing everything that isn't absolutely essential. Every feature, every line of code, every design element has been questioned and stripped away unless it serves a fundamental purpose.
          </p>
          <p>
            The result is not emptiness, but clarity. By eliminating distractions, what remains carries more weight. Each word matters more. Each interaction is more intentional.
          </p>
        </section>

        <section className="mb-8">
          <h2>Technical Manifesto</h2>
          <h3>Zero-JavaScript Philosophy</h3>
          <p>
            This site delivers zero client-side JavaScript for basic functionality. Navigation, content rendering, and core interactions happen entirely server-side. This choice prioritizes:
          </p>
          <ul>
            <li><strong>Speed</strong>: Instant page loads with no JavaScript parsing overhead</li>
            <li><strong>Accessibility</strong>: Universal compatibility across all devices and abilities</li>
            <li><strong>Sustainability</strong>: Reduced energy consumption and carbon footprint</li>
            <li><strong>Resilience</strong>: Works even when JavaScript fails or is disabled</li>
          </ul>

          <h3>Typography as Interface</h3>
          <p>
            Instead of custom fonts that add bloat, this site uses system monospace fonts. This choice reflects a belief that content structure and hierarchy matter more than aesthetic ornamentation. Good typography serves the message, not the designer's ego.
          </p>

          <h3>Static-First Architecture</h3>
          <p>
            Every page is statically generated at build time using Next.js App Router. This ensures maximum performance while maintaining the simplicity of server-side rendering. Dynamic features like search are implemented as server-rendered forms, not client-side JavaScript applications.
          </p>
        </section>

        <section className="mb-8">
          <h2>Technical Implementation</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-semibold">Framework</dt>
              <dd>Next.js 15 with App Router</dd>
            </div>
            <div>
              <dt className="font-semibold">Language</dt>
              <dd>TypeScript</dd>
            </div>
            <div>
              <dt className="font-semibold">Styling</dt>
              <dd>Tailwind CSS + Typography</dd>
            </div>
            <div>
              <dt className="font-semibold">Content</dt>
              <dd>MDX with next-mdx-remote</dd>
            </div>
            <div>
              <dt className="font-semibold">Mathematics</dt>
              <dd>KaTeX (server-rendered)</dd>
            </div>
            <div>
              <dt className="font-semibold">Code Highlighting</dt>
              <dd>Highlight.js (server-rendered)</dd>
            </div>
            <div>
              <dt className="font-semibold">Deployment</dt>
              <dd>Vercel with static generation</dd>
            </div>
            <div>
              <dt className="font-semibold">Bundle Size</dt>
              <dd>&lt;50KB JavaScript (framework only)</dd>
            </div>
          </dl>
        </section>

        <section className="mb-8">
          <h2>Content Strategy</h2>
          <p>
            All content is unified under a single "blog post" model with tags for organization. This eliminates complex taxonomies and content types that add cognitive overhead. Research papers, projects, and personal essays all share the same structure, democratizing different types of thinking.
          </p>
          <p>
            The site intentionally has only three core routes:
          </p>
          <ul>
            <li><strong>/</strong> — Home page with essential information</li>
            <li><strong>/blog</strong> — All content, reverse chronological</li>
            <li><strong>/blog/[slug]</strong> — Individual posts</li>
          </ul>
          <p>
            Additional features like tags and search are additive enhancements that don't break this fundamental simplicity.
          </p>
        </section>

        <section className="mb-8">
          <h2>Constraints as Creativity</h2>
          <p>
            These technical constraints aren't limitations—they're creative opportunities. When you can't rely on JavaScript frameworks, animations, or complex interactions, you must focus on what truly matters: clear thinking, effective communication, and meaningful content.
          </p>
          <p>
            This approach mirrors the constraint-based thinking that drives operations research and optimization: given limited resources, what is the most effective solution?
          </p>
        </section>

        <section className="mb-8">
          <h2>Metrics of Success</h2>
          <p>Rather than measuring success through engagement metrics or time-on-site, this website optimizes for:</p>
          <ul>
            <li><strong>Clarity</strong>: Can readers quickly find and understand what they're looking for?</li>
            <li><strong>Speed</strong>: Does the site load instantly and work everywhere?</li>
            <li><strong>Focus</strong>: Does the design disappear and let content shine?</li>
            <li><strong>Sustainability</strong>: Does the site minimize resource consumption?</li>
          </ul>
        </section>

        <section>
          <h2>Inspiration</h2>
          <p>
            This approach draws inspiration from the Unix philosophy, Bauhaus design principles, and the academic paper format—systems that prioritize function over form and achieve elegance through reduction, not addition.
          </p>
          <p>
            It's also influenced by the constraint-based thinking central to operations research: given limitations on resources, time, and attention, what is the optimal solution?
          </p>
        </section>
      </article>

      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: August 2025
        </p>
      </footer>
    </main>
  )
}