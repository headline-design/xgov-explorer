import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allDocs } from "contentlayer/generated"
import { getDocFromParams } from "@/lib/docs"
import { Mdx } from "@/components/docs/mdx-components"

interface DocPageProps {
  params: {
    slug: string[]
  }
}

async function getDocFromSlug(slug: string[]) {
  const doc = getDocFromParams(slug)

  if (!doc) {
    return null
  }

  return doc
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const awaitedParams = await params
  const slug = awaitedParams.slug;
  const doc = await getDocFromSlug(slug)

  if (!doc) {
    return {}
  }

  return {
    title: `${doc.title} | xGov Explorer Documentation`,
    description: doc.description,
  }
}

export async function generateStaticParams() {
  return allDocs.map((doc) => ({
    // Remove 'blog/' prefix if it exists
    slug: doc.slug.replace(/^docs\//, ""),
  }))
}

export default async function DocPage({ params }) {
  const awaitedParams = await params
  const slug = awaitedParams.slug;
  const doc = await getDocFromSlug(slug)

  if (!doc) {
    notFound()
  }

  return (
    <article className="max-w-3xl py-6">
      <div className="mb-8">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{doc.title}</h1>
        <p className="text-lg text-muted-foreground mt-2">{doc.description}</p>
      </div>
      <Mdx code={doc.body.code} />
    </article>
  )
}

