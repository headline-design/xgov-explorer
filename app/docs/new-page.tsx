import { allDocs } from "contentlayer/generated"
import type { Metadata } from "next"
import { getTableOfContents } from "@/lib/toc"
import { DocsToc } from "@/components/docs/toc"
import { Mdx } from "@/components/docs/mdx-components"

export const metadata: Metadata = {
  title: "Documentation | xGov Explorer",
  description: "Learn how to use xGov Explorer to track and manage Algorand xGov projects",
}

export default async function DocsPage() {
  const doc = allDocs.find((doc) => doc.slugAsParams === "")

  if (!doc) {
    return null
  }

  const toc = await getTableOfContents(doc.body.raw)

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <article className="flex-1 max-w-3xl py-6">
        <div className="mb-8">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">{doc.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">{doc.description}</p>
        </div>
        <Mdx code={doc.body.code} />
      </article>
      {doc.toc !== false && (
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-16 overflow-y-auto pt-6 max-h-[calc(100vh-4rem)]">
            <DocsToc toc={toc} />
          </div>
        </div>
      )}
    </div>
  )
}

