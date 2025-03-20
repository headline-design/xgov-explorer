"use client";

import {
  useParams,
  usePathname,
  useSelectedLayoutSegment,
} from "next/navigation";
import { cn } from "@/lib/utils";
import { HOME_DOMAIN } from "@/lib/constants";
import { useSession } from "next-auth/react";
import { Suspense, useContext, useState } from "react";
import NavMenu from "@/components/nav-menu/nav-menu";
import Link from "next/link";
import { GlobalModalContext } from "@/providers/global-modal-provider";
import { Button } from "./ui/rust-button";
import useScroll from "@/lib/hooks/use-scroll";
import MaxWidthWrapperV2 from "./ui/layout/max-width-wrapper-2";
import ButtonLink from "./ui/button-link";
import LogoType from "@/icons/brand-icons/logotype";
import { AlgorandIcon } from "./icons/algorand-icon";
//import Navigation from "@/components/nav-menu/navigation";

export const navItems = [
  {
    name: "Help",
    slug: "help",
  },
];

export default function Navbar({
  location,
  page,
}: {
  location: "home";
  page?: "login" | "register";
}) {

  const scrolled = useScroll(80);
  const selectedLayout = useSelectedLayoutSegment();
  const helpCenter = selectedLayout === "help";
  const rustCenter = selectedLayout === "rust";

  const pathname = usePathname();

  const { data: session, status } = useSession() || {
    status: "unauthenticated", // if `useSession` is undefined, we're on a non xgov.app domain
  };
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { showLoginModal, setShowLoginModal } = useContext(GlobalModalContext);

  const isHome = location === "home";

  const isRoot = pathname === "/";

  const isLoginOrRegister = page === "login" || page === "register";

  // rust-nav = nav w/ border
  // rust-mobile-bg = nav config for open mobile menu
  // if rust-nav befor scrolled = nav w/ border

  const scrollBorderNav = scrolled;

  const navClasses = cn("rust-nav-pre ", {
    "rust-mobile-bg": showMobileMenu,
    "rust-nav-background-200 header_noBorder": isHome,
    "rust-nav-shadow-variant": isLoginOrRegister,
    "rust-nav rust-nav-primary-bg": scrollBorderNav,
    "rust-nav-alt-scrolled":
      scrolled && (selectedLayout === "chains"),
  });

  // If we're on rust design layout, we don't want to show the main nav
  if (rustCenter) {
    return null;
  }

  return (
    <>
      <div className={navClasses}>
        <MaxWidthWrapperV2
          className="rust-nav-l1 flex w-full max-w-screen-xlview items-center justify-between"
          {...(helpCenter && {
            className:
              "rust-nav-l1 flex items-center justify-between mx-auto w-full max-w-screen-xl px-4 lg:px-6",
          })}
        >
          <div className="rust-nav-l2 flex h-14 w-full items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                prefetch={false}
                href={`${HOME_DOMAIN}/`}
              >
                <AlgorandIcon className="h-8 w-8 text-primary" />
              </Link>
              {helpCenter ? (
                <div className="flex items-center">
                  <div className="mr-3 h-5 border-l-2 " />
                  <Link
                    href={`${HOME_DOMAIN}/help`}
                    className="font-display text-lg font-bold text-primary"
                  >
                    Help Center
                  </Link>
                </div>
              ) : (
                <div className="hidden items-center lg:flex">
                  {/* Only show these links if the user is an admin */}
                  {navItems.map(({ name, slug }) => (
                    <Link
                      id={`nav-${slug}`}
                      key={slug}
                      href={`${HOME_DOMAIN}/${slug}`}

                      className={cn(
                        "rust-navlink z-10 transition-colors ease-out hover:text-foreground",
                        {
                          "rust-navlink-active": selectedLayout === slug,
                        },
                      )}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              )}
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
                              skinny
                              variant="link"
                              href={`${HOME_DOMAIN}/contact`}
                            >
                              Contact
                            </ButtonLink>
                            <Button
                              skinny
                              variant="outline"
                              onClick={() => {
                                setShowLoginModal(true);
                              }}
                            >
                              Log in
                            </Button>
                          </div>
                          <Button
                            skinny
                            className="ml-2"
                            variant="primary"
                            onClick={() => {
                              setShowLoginModal(true);
                            }}
                          >
                            Sign up
                          </Button>
                        </>
                      );
                    } else {
                      return null;
                    }
                  })()}
                </>
              ) : null}
            </div>
            {session ? (
              <div className="flex items-center lg:gap-3">
                {isRoot ? (
                  <ButtonLink
                    href={`${HOME_DOMAIN}/get-started`}

                    variant="outline"
                    slim
                    className="hidden lg:flex"
                  >
                    Get started
                  </ButtonLink>
                ) : (
                  <ButtonLink
                    href={HOME_DOMAIN}

                    variant="outline"
                    slim
                    className="hidden lg:flex"
                  >
                    Home
                  </ButtonLink>
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
  );
}
