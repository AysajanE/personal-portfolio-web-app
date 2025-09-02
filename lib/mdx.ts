import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface PostMetadata {
  title: string
  date: string
  excerpt?: string
  author?: string
  tags?: string[]
  category?: string
  published?: boolean
  featured?: boolean
}

export interface Post {
  slug: string
  metadata: PostMetadata
  content: string
}

export function getAllPosts(): Post[] {
  const postsDir = path.join(process.cwd(), 'content', 'posts')
  
  if (!fs.existsSync(postsDir)) {
    return []
  }

  const files = fs.readdirSync(postsDir)
  const mdxFiles = files.filter(file => file.endsWith('.mdx'))

  const posts = mdxFiles.map(file => {
    const filePath = path.join(postsDir, file)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)
    
    const slug = file.replace('.mdx', '')
    
    return {
      slug,
      metadata: data as PostMetadata,
      content,
    }
  })

  return posts
    .filter(post => post.metadata.published !== false)
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
}

export function getPostBySlug(slug: string): Post | null {
  const postsDir = path.join(process.cwd(), 'content', 'posts')
  const filePath = path.join(postsDir, `${slug}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContent = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContent)
  
  return {
    slug,
    metadata: data as PostMetadata,
    content,
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

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

export function searchPosts(q: string): Post[] {
  const query = q.toLowerCase()
  return getAllPosts().filter(p => {
    const hay = `${p.metadata.title} ${p.metadata.excerpt ?? ''} ${p.content}`.toLowerCase()
    return hay.includes(query)
  })
}