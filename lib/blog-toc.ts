import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { toString } from "mdast-util-to-string"
import { visit } from "unist-util-visit"

type Heading = {
  id: string
  text: string
  level: number
}

type TableOfContents = {
  items: {
    title: string
    url: string
    items?: {
      title: string
      url: string
    }[]
  }[]
}

/**
 * Extracts headings from markdown content and generates a table of contents
 */
export function generateTableOfContents(content: string): TableOfContents {
  const headings: Heading[] = []

  // Extract headings from markdown
  const processor = unified()
    .use(remarkParse)
    .use(() => (tree) => {
      visit(tree, "heading", (node: any) => {
        if (node.depth === 2 || node.depth === 3) {
          const text = toString(node)
          // Generate an ID from the heading text
          const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")

          headings.push({
            id,
            text,
            level: node.depth,
          })
        }
      })
    })
    .use(remarkRehype)
    .use(rehypeStringify as any)

  processor.processSync(content)

  // Convert flat headings array to nested structure
  const items = headings
    .filter((heading) => heading.level === 2)
    .map((h2) => ({
      title: h2.text,
      url: `#${h2.id}`,
      items: headings
        .filter(
          (h3) =>
            h3.level === 3 &&
            // Find h3s that are after this h2 and before the next h2
            headings.indexOf(h3) > headings.indexOf(h2) &&
            (headings.findIndex((next) => next.level === 2 && headings.indexOf(next) > headings.indexOf(h2)) === -1 ||
              headings.indexOf(h3) <
                headings.findIndex((next) => next.level === 2 && headings.indexOf(next) > headings.indexOf(h2))),
        )
        .map((h3) => ({
          title: h3.text,
          url: `#${h3.id}`,
        })),
    }))

  return { items }
}

