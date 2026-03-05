import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, User, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

async function getArticle(slug: string) {
  try {
    const { getBlogArticle } = await import("@/lib/shopify")
    // Try both blog handles
    const article = await getBlogArticle("news", slug) || await getBlogArticle("generators", slug)
    return article
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: "Article Not Found | PES Supply" }
  return {
    title: `${article.seo?.title || article.title} | PES Supply Blog`,
    description: article.seo?.description || article.excerpt,
    alternates: { canonical: `https://portlandiaelectric.supply/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.image ? [{ url: article.image.url }] : [],
    },
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    // Show a graceful fallback for articles that don't exist in Shopify yet
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-black text-foreground">Article Not Found</h1>
        <p className="mt-3 text-muted-foreground">This article may have been moved or is no longer available.</p>
        <Link href="/blog" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </main>
    )
  }

  const publishDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/blog" className="hover:text-primary">Blog</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-foreground">{article.title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-black leading-tight text-foreground sm:text-4xl text-balance">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {article.author && (
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {article.author.name}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> {publishDate}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      {article.image && (
        <div className="relative mb-8 aspect-video overflow-hidden rounded-xl">
          <Image
            src={article.image.url}
            alt={article.image.altText || article.title}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <article
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-black prose-a:text-primary prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* Back to blog */}
      <div className="mt-12 border-t border-border pt-8">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to all articles
        </Link>
      </div>
    </main>
  )
}
