import { toc } from "mdast-util-toc"
import { remark } from "remark"
import { visit } from "unist-util-visit"

export interface TableOfContentsItem {
  children: any
  title: string
  url: string
  items?: TableOfContentsItem[]
}

export interface TableOfContents {
  items: TableOfContentsItem[]
}

function getItems(node: any, current: TableOfContentsItem): TableOfContentsItem {
  if (node.type === "paragraph") {
    visit(node, (item) => {
      if (item.type === "link") {
        current.url = item.url
        current.title = item.children[0].value
      }

      if (item.type === "text") {
        current.title = item.value
      }
    })

    return current
  }

  if (node.type === "list") {
    current.items = node.children.map((i: any) => getItems(i, {} as TableOfContentsItem))

    return current
  }

  if (node.type === "listItem") {
    const heading = getItems(node.children[0], {} as TableOfContentsItem)

    if (node.children.length > 1) {
      getItems(node.children[1], heading)
    }

    return heading
  }

  return current
}

export async function getTableOfContents(content: string): Promise<TableOfContents> {
  const mdast = await remark().parse(content)
  const tocNode = toc(mdast)

  if (!tocNode.map) {
    return { items: [] }
  }

  return {
    items: getItems(tocNode.map, {} as TableOfContentsItem).items || [],
  }
}

