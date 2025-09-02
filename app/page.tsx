import Link from 'next/link'

export default function Home() {
  return (
    <div className="container py-16">
      <h1 className="text-2xl font-bold mb-4">
        Aysajan Eziz
      </h1>
      <p className="text-base mb-8 leading-relaxed">
        Assistant Professor of Management Science at Ivey Business School, Western University. 
        I write about optimization, machine learning, deep work, and academic life.
      </p>
      <Link href="/blog" className="underline hover:no-underline">
        Read the blog →
      </Link>
    </div>
  )
}