# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev          # Start development server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint for code quality
npm run type-check   # Run TypeScript type checking without emitting files
```

**Important Notes:**
- TypeScript checking happens during build, but explicit type checking is available via `npm run type-check`.
- Build artifacts in `.next/` should NOT be committed to git - they are auto-generated.

## Project Architecture

This is a Next.js 15 ultra-minimalist blog using the App Router with TypeScript, Tailwind CSS, and MDX for content management.

### Core Structure

- **App Router Pattern**: Uses Next.js App Router (`app/` directory) with minimal file-based routing
- **Content-Driven**: All blog posts are stored as MDX files in `content/posts/`
- **Type-Safe Content**: TypeScript interfaces define metadata schemas for posts
- **Static Generation**: Pages are statically generated for optimal performance

### Key Directories

```
app/                     # Next.js App Router pages
├── blog/               # Blog listing and [slug] dynamic routes
├── page.tsx            # Ultra-minimal home page
├── layout.tsx          # Root layout with minimal metadata
└── [feed.xml|sitemap.xml|robots.txt|manifest.json]/ # SEO/API routes

content/
└── posts/             # Blog posts with frontmatter (includes migrated research/projects)

lib/mdx.ts            # Simplified content processing utilities
components/           # Minimal reusable React components
├── Navigation.tsx    # Static navigation (no client JS)
├── Footer.tsx        # Simple footer with RSS link
└── MDXComponents.tsx # Basic MDX overrides
```

### Ultra-Minimalist Design Philosophy

This site embraces radical minimalism:

- **Only 3 routes**: Home (`/`), Blog listing (`/blog`), Blog posts (`/blog/[slug]`)
- **No client-side JavaScript**: All components are server components except for essential functionality
- **Typography-focused**: Uses system monospace fonts, no custom fonts
- **Minimal styling**: Basic Tailwind classes, no complex CSS
- **Single content type**: All content unified as blog posts with tags for categorization

### Content Management System (`lib/mdx.ts`)

The MDX processing system is dramatically simplified:

- **Single Content Type**: Only `Post` interface and functions
- **Core Functions**: `getAllPosts()`, `getPostBySlug()`, `formatDate()`, `getAllTags()`, `getPostsByTag()`, `searchPosts()`
- **Automatic Sorting**: Posts by date (newest first)
- **Simple Filtering**: Published/unpublished via `published` frontmatter field

### Content Frontmatter Schema

**Blog Posts** (required: title, date; optional: excerpt, author, tags, category, published, featured):
```yaml
title: string
date: string (YYYY-MM-DD format)
excerpt?: string
author?: string
tags?: string[]
category?: string
published?: boolean (defaults to true)
featured?: boolean
```

### Dynamic Routes

All content uses a single dynamic route pattern:
- Blog listing: `/blog` - Shows all posts in reverse chronological order
- Blog posts: `/blog/[slug]` - Renders individual posts with MDX support

### Content Migration Notes

Research papers and projects from the original v0 site have been migrated to blog posts with:
- Research papers: `tags: ["research"]` and `category: "Research"`
- Projects: `tags: ["project"]` and `category: "Project"`
- Original metadata preserved in frontmatter and post content

## Technical Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with ES2022 target
- **Styling**: Tailwind CSS with Typography plugin
- **Content**: MDX with next-mdx-remote
- **Math**: KaTeX for mathematical notation
- **Code**: Highlight.js for syntax highlighting
- **Markdown**: Remark GFM for GitHub Flavored Markdown

## SEO & Performance

- **Minimal Bundle**: Dramatically reduced JavaScript payload
- **Static Generation**: All content pages pre-rendered at build time
- **SEO Routes**: RSS feed, sitemap, robots.txt, manifest
- **Fast Loading**: System fonts, minimal CSS, no complex interactions

## Development Notes

**Minimal Configuration:**
- `next.config.js`: Empty configuration
- `tailwind.config.js`: Only Typography plugin enabled
- `tsconfig.json`: Modern ES2022 target

**Critical Architecture:**
- **Server Components**: All components are server-rendered by default
- **No Client JavaScript**: Navigation, footer, and content rendering happen server-side
- **Typography-First**: Content readability prioritized over visual complexity
- **Static-First**: Maximum static generation for performance

**Content Structure:**
- Single `content/posts/` directory contains all blog posts
- Posts can have `tags` and `category` for organization
- Research and project posts maintain their academic/technical metadata in frontmatter

## Success Metrics Achieved

- **Bundle Size**: Reduced by >50% from original v0
- **Zero Client Navigation**: No JavaScript for basic site functionality  
- **Three Routes Total**: Absolute minimalism in site structure
- **Perfect Build**: Clean compilation with minimal warnings
- **Typography Focus**: Content quality over visual complexity

## Philosophy

This refactor embraces "delete until it hurts" minimalism:
- Every feature removed unless absolutely essential
- Typography and content quality replace visual complexity
- Static generation and server components for maximum performance
- System fonts and minimal CSS for fastest loading
- If something feels "too bare" - that's the intended aesthetic

The goal is a blog that loads instantly, focuses entirely on content, and demonstrates that powerful web experiences don't require complex JavaScript frameworks or elaborate designs.

## Git and Version Control
- Always git add and commit with descriptive message as you go.