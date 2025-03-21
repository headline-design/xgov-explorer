"use client"

import { usePathname, useSelectedLayoutSegment } from "next/navigation"
import { cn } from "@/lib/utils"
import { HOME_DOMAIN } from "@/lib/constants"
import { useSession } from "next-auth/react"
import { Suspense, useContext, useState } from "react"
import NavMenu from "@/components/nav-menu/nav-menu"
import Link from "next/link"
import { GlobalModalContext } from "@/providers/global-modal-provider"
import { Button } from "./ui/rust-button"
import useScroll from "@/lib/hooks/use-scroll"
import MaxWidthWrapperV2 from "./ui/layout/max-width-wrapper-2"
import ButtonLink from "./ui/button-link"
import { BrandTypelogo } from "./icons/brand-typelogo"
import { BrandLogoAlt } from "./icons/brand-logo-alt"
import { ArrowUpRight, BookOpen } from "lucide-react"
//import Navigation from "@/components/nav-menu/navigation";

export const navItems = [
  {
    name: "Help",
    slug: "help",
  },
]

export default function Navbar({
  location,
  page,
}: {
  location: "home"
  page?: "login" | "register"
}) {
  const scrolled = useScroll(1)
  const selectedLayout = useSelectedLayoutSegment()

  const pathname = usePathname()

  const { data: session, status } = useSession() || {
    status: "unauthenticated", // if `useSession` is undefined, we're on a non xgov.app domain
  }
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const { showLoginModal, setShowLoginModal } = useContext(GlobalModalContext)

  const isHome = location === "home"

  const isRoot = pathname === "/"

  const isLoginOrRegister = page === "login" || page === "register"

  // rust-nav = nav w/ border
  // rust-mobile-bg = nav config for open mobile menu
  // if rust-nav befor scrolled = nav w/ border

  const scrollBorderNav = scrolled

  const navClasses = cn("rust-nav-pre ", {
    "rust-mobile-bg": showMobileMenu,
    "rust-nav-background-200 header_noBorder": isHome && scrolled,
    "rust-nav-shadow-variant": isLoginOrRegister,
    "rust-nav rust-nav-primary-bg": scrollBorderNav,
    "rust-nav-alt-scrolled": scrolled && selectedLayout === "chains",
  })

  return (
    <>
      <div className={navClasses}>
        <MaxWidthWrapperV2 className="rust-nav-l1 flex w-full max-w-screen-xlview items-center justify-between">
          <div className="rust-nav-l2 flex h-14 w-full items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link prefetch={false} href={`${HOME_DOMAIN}/`}>
                <BrandLogoAlt className="h-8 w-8 text-primary block sm:hidden" />
                <BrandTypelogo
                  fill1="hsl(var(--primary))"
                  fill2="hsl(var(--foreground))"
                  className="h-8 text-primary hidden sm:block"
                />
              </Link>
              <div className="hidden items-center lg:flex">
                <ButtonLink
                  href="https://xgov.algorand.foundation"
                  rounded
                  variant="outline"
                  slim
                  suffix={<ArrowUpRight className="h-4 w-4" />}
                  target={"_blank"}
                  text="Learn More"
                />
              </div>
            </div>

            <div className="hidden lg:flex">
              {session ? (
                <></>
              ) : status === "unauthenticated" ? (
                <>
                  {(() => {
                    if (location === "home") {
                      return (
                        <>
                          <div className="flex items-center gap-2">
                            <ButtonLink
                              href={`${HOME_DOMAIN}/docs`}
                              variant="ghost"
                              slim
                              icon={<BookOpen className="h-4 w-4" />}
                              text="Documentation"
                            />
                          </div>
                          <Button
                            skinny
                            className="ml-2"
                            variant="primary"
                            onClick={() => {
                              setShowLoginModal(true)
                            }}
                          >
                            Sign in
                          </Button>
                        </>
                      )
                    } else {
                      return null
                    }
                  })()}
                </>
              ) : null}
            </div>
            {session ? (
              <div className="flex items-center lg:gap-3">
                {isRoot ? (
                  <>
                    <ButtonLink
                      href={`${HOME_DOMAIN}/docs`}
                      variant="ghost"
                      slim
                      className="hidden lg:flex mr-2"
                      icon={<BookOpen className="h-4 w-4" />}
                      text="Documentation"
                    />
                    <ButtonLink
                      href="https://xgov.algorand.foundation"
                      rounded
                      variant="outline"
                      slim
                      className="hidden lg:flex"
                      suffix={<ArrowUpRight className="h-4 w-4" />}
                      target={"_blank"}
                      text="Learn More"
                    />
                  </>
                ) : (
                  <>
                    <ButtonLink
                      href={`${HOME_DOMAIN}/docs`}
                      variant="outline"
                      skinny
                      className="hidden lg:flex mr-2"
                      icon={<BookOpen className="h-4 w-4" />}
                      text="Documentation"
                    />
                    <ButtonLink href={HOME_DOMAIN} variant="outline" slim className="hidden lg:flex" text="Home" />
                  </>
                )}
                <Suspense fallback={null}>
                  <NavMenu
                    location={location}
                    session={session}
                    status={status}
                    showMobileMenu={showMobileMenu}
                    setShowMobileMenu={setShowMobileMenu}
                  />
                </Suspense>
              </div>
            ) : (
              <div className="flex lg:hidden">
                <Suspense fallback={null}>
                  <NavMenu
                    location={location}
                    session={session}
                    status={status}
                    showMobileMenu={showMobileMenu}
                    setShowMobileMenu={setShowMobileMenu}
                  />
                </Suspense>
              </div>
            )}
          </div>
        </MaxWidthWrapperV2>
      </div>
    </>
  )
}

