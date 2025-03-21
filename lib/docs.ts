import { allDocs } from "contentlayer/generated"

export function getDocFromParams(params) {
  const slug = params?.slug?.join("/") || ""
  const doc = allDocs.find((doc) => doc.slugAsParams === slug)

  if (!doc) {
    return null
  }

  return doc
}

export function getDocsNavigation() {
  return allDocs
    .filter((doc) => doc.published)
    .sort((a, b) => {
      return a.title.localeCompare(b.title)
    })
    .map((doc) => ({
      title: doc.title,
      href: doc.slug === "" ? "/docs" : `/docs/${doc.slug}`,
      description: doc.description,
      icon: doc.icon || "FileText",
    }))
}

