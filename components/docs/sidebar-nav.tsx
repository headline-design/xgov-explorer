"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, FileText, Users, Wallet } from "lucide-react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

interface DocNavItem {
  title: string
  href: string
  icon: string
}

interface SidebarNavProps {
  items: DocNavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <SidebarMenu>
      {items.map((item) => {
        // Check if this item is active
        const isActive = pathname === item.href

        // Determine the icon component based on the icon name
        let IconComponent = FileText
        if (item.icon === "BookOpen") IconComponent = BookOpen
        if (item.icon === "Users") IconComponent = Users
        if (item.icon === "Wallet") IconComponent = Wallet

        return (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild isActive={isActive}>
              <Link href={item.href}>
                <IconComponent className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

