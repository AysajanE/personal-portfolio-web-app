# Personal Portfolio Web App

An ultra-minimalist blog for Dr. Aysa Janez Iz, embracing radical minimalism with only essential features. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🌟 Features

### Core Functionality
- **Ultra-minimal Homepage** with essential introduction
- **Blog System** with full MDX support for rich content
- **Tag-based Organization** for content categorization
- **Search Functionality** for finding specific posts
- **Colophon Page** documenting the minimalist philosophy

### Technical Features
- **MDX Support** with mathematical notation (KaTeX) and syntax highlighting
- **Typography-focused Design** using system monospace fonts
- **SEO Optimized** with meta tags, Open Graph, and RSS feed
- **Static Generation** for maximum performance
- **Zero Client JavaScript** for basic functionality

### Performance & Modern Standards
- **Next.js 15** with App Router for optimal performance
- **Static Site Generation** with server components only
- **TypeScript** for type safety and better development experience
- **Tailwind CSS** with Typography plugin only
- **Minimal Bundle Size** - reduced by >50% through aggressive minimalism

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd personal-portfolio-web-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:3000`

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 📁 Project Structure

```
personal-portfolio-web-app/
├── app/                    # Next.js App Router (ultra-minimal)
│   ├── blog/              # Blog listing and [slug] dynamic routes
│   ├── search/            # Search functionality
│   ├── tags/              # Tag listing and [tag] dynamic routes
│   ├── colophon/          # Philosophy and design notes
│   ├── [feed.xml|sitemap.xml|robots.txt|manifest.json]/ # SEO routes
│   └── layout.tsx         # Root layout with minimal navigation
├── components/            # Minimal React components (server-only)
│   ├── MDXComponents.tsx  # Basic MDX component overrides
│   ├── Navigation.tsx     # Static navigation (no client JS)
│   └── Footer.tsx         # Simple footer with RSS link
├── content/               # MDX content files
│   └── posts/            # All blog posts (unified content type)
├── lib/                   # Utility functions
│   └── mdx.ts            # Simplified MDX processing utilities
└── public/               # Static assets
```

## ✍️ Content Management

### Adding Blog Posts

Create a new MDX file in `content/posts/` with this frontmatter schema:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
excerpt: "A brief description of your post"
author: "Dr. Aysa Janez Iz"
tags: ["operations research", "data science"]
category: "Research" # or "Project" for legacy content
published: true
featured: false
---

# Your Post Title

Your content here with full MDX support, including:

- Mathematical equations: $E = mc^2$
- Code blocks with syntax highlighting
- Images and media
- Basic React components
```

### Frontmatter Schema

**Required fields:**
- `title: string` - Post title
- `date: string` - Date in YYYY-MM-DD format

**Optional fields:**
- `excerpt: string` - Brief description for listings
- `author: string` - Author name
- `tags: string[]` - Array of tags for categorization
- `category: string` - Category (used for legacy research/project content)
- `published: boolean` - Whether to show the post (defaults to true)
- `featured: boolean` - Whether to feature the post

### Content Types

All content is unified as blog posts with different tags:
- **Regular blog posts**: General content with any tags
- **Research papers**: Use `tags: ["research"]` and `category: "Research"`
- **Projects**: Use `tags: ["project"]` and `category: "Project"`

## 🔄 Content Migration

Content has been migrated from the original v0 website. Research papers and projects are now unified as blog posts in `content/posts/` with appropriate tags and categories for organization.

## 🎨 Customization

### Ultra-Minimalist Styling

The site uses Tailwind CSS with radical minimalism:

- **Typography**: System monospace fonts only (`ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, monospace`)
- **Colors**: Minimal color palette focused on readability
- **Components**: Basic Tailwind classes only, no complex CSS
- **Layout**: Typography-first design prioritizing content over visuals

### Site Configuration

Key configuration files:

- **Metadata**: `app/layout.tsx` for SEO and minimal site metadata
- **Navigation**: `components/Navigation.tsx` for static navigation links
- **Content**: `lib/mdx.ts` for content processing utilities

### Mathematical Notation

The site supports LaTeX math notation via KaTeX:

```markdown
Inline math: $E = mc^2$

Block math:
$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$
```

### Code Highlighting

Syntax highlighting is provided by Highlight.js:

```python
def calculate_statistics(data):
    return {
        'mean': np.mean(data),
        'std': np.std(data)
    }
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically
4. Configure your custom domain (www.aysajaneziz.com)

See `DEPLOYMENT.md` for detailed deployment instructions.

### Other Platforms

The site can be deployed to:
- Netlify
- GitHub Pages
- Traditional web hosting (static export)

## 📊 SEO & Analytics

### Built-in SEO Features

- **Meta tags** for all pages
- **Open Graph** and Twitter Card support
- **Structured data** for better search engine understanding
- **Sitemap** generation (`/sitemap.xml`)
- **RSS feed** (`/feed.xml`)
- **robots.txt** configuration

### Analytics Setup

Add your analytics tracking codes to environment variables:

```bash
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=XXXXXXX
```

## 🔧 Development

### Key Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe JavaScript with ES2022 target
- **Tailwind CSS**: Utility-first CSS framework with Typography plugin
- **MDX**: Markdown with JSX components via next-mdx-remote
- **KaTeX**: Mathematical notation rendering
- **Highlight.js**: Code syntax highlighting

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Prettier**: Code formatting (configure as needed)

### Performance

- **Static Generation**: All pages are pre-rendered for maximum speed
- **Server Components**: Zero client JavaScript for basic functionality
- **System Fonts**: Uses system monospace fonts, no external font loading
- **Minimal Bundle**: Dramatically reduced JavaScript payload through aggressive minimalism

## 📝 Contributing

If you're customizing this portfolio template:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions about this ultra-minimalist blog system:

- Review the project philosophy in `CLAUDE.md`
- Check the deployment guide in `DEPLOYMENT.md` (if created)
- Understand the minimalist approach described in `/colophon`

## 📄 License

This project is Dr. Aysa Janez Iz's ultra-minimalist blog. Feel free to use it as inspiration for your own minimalist blog, but please replace all personal content with your own.

---

**Built with radical minimalism using Next.js 15, TypeScript, and Tailwind CSS**