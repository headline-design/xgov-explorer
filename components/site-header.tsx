import Link from "next/link"

const SiteHeader = () => {
  const items = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Explore",
      href: "/explore",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "About",
      href: "/about",
    },
  ]

  return (
    <header className="bg-gray-100 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          My Site
        </Link>
        <nav>
          <ul className="flex space-x-6">
            {items.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="hover:text-gray-500">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default SiteHeader

