/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { Bell, ArrowLeft, Newspaper, Settings, ChevronDown, Users, X } from "lucide-react";
import { useParams, useSelectedLayoutSegments } from "next/navigation";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { MobileMenuTrigger } from "./mobile-menu-trigger";
import { MobileMenu } from "./mobile-menu";
import { DesktopMenu } from "./desktop-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  IconDashboard,
  IconLogout,
  IconTarget,
  IconInformation,
  IconClipboard,
  IconCodeBlock,
} from "@/icons/rust";
import {
  AVATAR_GRADIENT_API,
  HOME_DOMAIN,
} from "@/lib/constants";
import { cn, shorten } from "@/lib/utils";
import { Button } from "@/components/ui/rust-button";
import { GlobalModalContext } from "@/providers/global-modal-provider";
import Logo from "@/icons/logo";
import ThemeSwitcher from "@/components/ui/theme-switcher/theme-switcher";
import Link from "next/link";
import { useLogout } from "@/lib/hooks/use-logout";
import { IconChevronDown } from "@/icons/chevron-down";
import ButtonLink from "../ui/button-link";
import IconGithub from "@/icons/brand-icons/github";
import { IconX } from "@/icons/brand-icons/x";


export const NavMenu = React.memo(
  ({
    location,
    session,
    status,
    showMobileMenu,
    setShowMobileMenu,
  }: {
    location: string
    session: any
    status: string
    showMobileMenu: boolean
    setShowMobileMenu: (show: boolean) => void
  }) => {
    const user = session?.user
    const connectedUser = status === "authenticated"
    const hasTeams = user?.teams?.count > 0

    const [showDesktopMenu, setShowDesktopMenu] = useState(false);
    const [showNotificationsMenu, setShowNotificationsMenu] = useState(false);
    const { setShowLoginModal } = useContext(GlobalModalContext);
    const { isWidescreen } = useMediaQuery();
    const { handleDisconnect, signingOut } = useLogout();
    const segments = useSelectedLayoutSegments();
    const { id, slug } = useParams() as { id?: string; slug?: string };

    const handleToggle = useCallback(() => {
      if (isWidescreen) {
        setShowDesktopMenu(!showDesktopMenu);
      } else if (!isWidescreen) {
        setShowMobileMenu(!showMobileMenu);
        document.body.style.position = showMobileMenu ? "" : "fixed";
        document.body.style.width = showMobileMenu ? "" : "100%";
      } else {
        if (showMobileMenu && !isWidescreen) {
          document.body.style.position = showDesktopMenu ? "" : "fixed";
          document.body.style.width = showDesktopMenu ? "" : "100%";
        }
      }
    }, [isWidescreen, showDesktopMenu, showMobileMenu, setShowMobileMenu]);

    // cleanup

    useEffect(() => {
      if (isWidescreen) {
        document.body.style.position = ""
        document.body.style.width = ""
      }
    }, [showMobileMenu, isWidescreen])

    const handleNotifications = () => {
      setShowNotificationsMenu(!showNotificationsMenu)
    }

    const handleLogout = useCallback(() => {
      console.log("Logging out...")
      handleDisconnect()
    }, [handleDisconnect])

    const handleLogin = useCallback(() => {
      console.log("Logging in...")
      setShowLoginModal(true)
      handleToggle()
    }, [setShowLoginModal, handleToggle])

    const actionMobileHeader = useMemo(() => {
      if (connectedUser && location === "app") {
        return [
          {
            name: "Explore",
            href: `${HOME_DOMAIN}/teams`,
            buttonVariant: "primary",
          },
          {
            name: "Contact",
            href: `${HOME_DOMAIN}/contact`,
            buttonVariant: "outline",
          },
        ]
      } else if (connectedUser && location === "home") {
        return [
          {
            name: "Explore",
            href: `${HOME_DOMAIN}/teams`,
            buttonVariant: "primary",
          },
          {
            name: "Contact",
            href: `${HOME_DOMAIN}/contact`,
            buttonVariant: "outline",
          },
        ]
      } else if (!connectedUser) {
        return [
          {
            name: "Explore",
            href: `${HOME_DOMAIN}/teams`,
            buttonVariant: "primary",
          },
          {
            name: "Login",
            onConnect: handleLogin,
            buttonVariant: "outline",
          },
        ]
      }
      return []
    }, [connectedUser, handleLogin, location])

    const mainItems = useMemo(() => {
      if (segments[0] === "project" && id && connectedUser) {
        return [
          {
            name: "Back to All Projects",
            href: "/projects",
            icon: <ArrowLeft width={18} />,
          },
          {
            name: "Settings",
            href: `/project/${id}/settings`,
            isActive: segments.includes("settings"),
            icon: <Settings width={18} />,
          },
        ]
      } else if (connectedUser && (location === "app" || location === "home")) {
        const items = [
          {
            name: "Home",
            href: HOME_DOMAIN,
            isActive: segments.length === 0,
            icon: <IconDashboard size={16} className="flex wd:hidden" />,
          },
        ];

        // Add Team Dashboard link if user has teams
        if (hasTeams && user?.teams?.firstTeam) {
          items.push({
            name: "Team Dashboard",
            href: `/team`,
            isActive: segments[0] === "team",
            icon: <Users size={16} className="flex wd:hidden" />,
          })
        }

        return items
      } else if (!connectedUser && location === "home") {
        return [
          {
            name: "Docs",
            href: `${HOME_DOMAIN}/help`,
            isActive: segments[0] === "help",
          },
          {
            name: "Contact",
            href: `${HOME_DOMAIN}/contact`,
            isActive: segments[0] === "contact",
          },
        ];
      }
      return [];
    }, [segments, id, connectedUser, location, hasTeams, user?.teams.firstTeam]);

    const midItems = useMemo(() => {
      if (connectedUser && (location === "app" || location === "home")) {
        return [
          {
            name: "Theme",
            action: <ThemeSwitcher />,
            className: "no-hover",
          },
        ];
      } else if (connectedUser && location === "home") {
        return [
          { name: "Theme", action: <ThemeSwitcher />, className: "no-hover" },
          {
            name: "Log out",
            onDisconnect: handleLogout,
            icon: <IconLogout size={16} className="hidden lg:flex" />,
          },
        ];
      } else if (!connectedUser) {
        return [
          {
            name: "Theme",
            action: <ThemeSwitcher />,
            className: "no-hover",
          },
        ];
      }
      return [];
    }, [connectedUser, location, handleLogout]);

    const footerItems = useMemo(() => {
      if (connectedUser && location === "app") {
        return [
          {
            name: "Home Page",
            href: `${HOME_DOMAIN}/`,
            icon: (
              <Logo
                width={16}
                height={16}
                className=" !h-auto !w-auto !text-current "
              />
            ),
            className: "hidden wd:flex",
          },
          {
            name: "Log out",
            onDisconnect: handleLogout,
            icon: <IconLogout size={16} className="hidden lg:flex" />,
          },
        ];
      } else if (connectedUser && location === "home") {
        return [
          {
            name: "Log out",
            onDisconnect: handleLogout,
            icon: <IconLogout size={16} className="hidden lg:flex" />,
          },
        ];
      } else if (!connectedUser) {
        return [];
      }
      return [];
    }, [connectedUser, location, handleLogout]);

    const actionDesktopFooter = useMemo(() => {
      if (connectedUser && location === "home") {
        return [
          {
            name: "Explore",
            href: `${HOME_DOMAIN}/teams`,
            icon: <Settings width={18} />,
            buttonVariant: "primary",
            className: "rust-action-footer-menu-item",
          },
        ];
      } else if (!connectedUser) {
        return [];
      }
      return [];
    }, [connectedUser, location]);

    const renderUserItem = () => {
      if (connectedUser) {
        return (
          <li className="rust-menu-user-item ">
            <div className="flex w-full flex-row justify-between gap-0 p-0 align-middle">
              <div className="flex flex-col items-start gap-1 overflow-hidden text-start">
                {user?.name && (
                  <p className="user-item-l1 truncate text-sm font-medium text-primary">
                    {user?.name?.length > 36 ? shorten(user?.name) : user?.name}
                  </p>
                )}
                <p className="user-item-l2 truncate text-sm text-secondary">
                  {user?.email?.length > 36
                    ? shorten(user?.email)
                    : user?.email}
                </p>
              </div>

              <span className=" relative inline-flex flex-col justify-center overflow-hidden align-middle wd:hidden">
                <img
                  alt={user?.email || "Avatar for logged in user"}
                  src={user?.image || `${AVATAR_GRADIENT_API}/${user?.email}`}
                  className="avatar-class-small group rounded-full border transition-all duration-75"
                />
              </span>
            </div>
          </li>
        );
      }
      return null;
    };

    const renderMenuItems = (items, handleAction, section) =>
      items.map(
        ({
          name,
          href,
          icon,
          isActive,
          action,
          onDisconnect,
          onCommand,
          onConnect,
          onNotification,
          buttonVariant,
          className,
        }) => {
          const content = (
            <>
              {name}
              {icon}
              {action}
            </>
          );

          if (
            href &&
            section !== "actionHeader" &&
            section !== "actionFooter"
          ) {
            return (
              <Link
                data-id={`${location}`}
                key={name}
                href={`${href}`}
                onClick={handleToggle}
                prefetch={false}
                className={className}
              >
                <li
                  className={`rust-menu-item justify-between ${isActive ? "active" : ""}`}
                >
                  {content}
                </li>
              </Link>
            );
          }

          if (onNotification) {
            return (
              <li
                className="rust-menu-item justify-between"
                onClick={onNotification}
                key={name}
              >
                Notifications
                <Bell className="h-4 w-4" />

              </li>
            );
          }

          if (onDisconnect) {
            return (
              <li
                role="menuitem"
                key={name}
                onClick={handleDisconnect}
                className="rust-menu-item justify-between"
              >
                {signingOut ? "Logging out..." : name}
                <IconLogout size={16} className="hidden sm:flex" />
              </li>
            );
          }
          if (href && (section === "actionHeader" || section === "actionFooter")) {
            return (
              <ButtonLink
                key={name}
                onClick={handleAction}
                href={href}
                variant={buttonVariant}
                className={className}
                text={name}
              />
            );
          }
          if (!href && (section === "actionHeader" || section === "actionFooter")) {
            return (
              <Button
                key={name}
                onClick={onConnect}
                variant={buttonVariant}
                className={className}
                text={name}
              />
            );
          }

          return (
            <li
              key={name}
              className={cn("rust-menu-item justify-between", className)}
            >
              {content}
            </li>
          );
        },
      );

    const renderDivider = (items) => {
      if (items.length > 0) {
        return <li className="rust-menu-divider"></li>;
      }
      return null;
    };

    const collapseItems = useMemo(() => {
      if (!connectedUser && location === "home") {
        return [
          {
            name: "Explore",
            children: [
              {
                name: "Teams",
                icon: <IconTarget size={16} />,
                href: `${HOME_DOMAIN}/teams`,
              },
            ],
          },
          {
            name: "Resources",
            children: [
              {
                name: "Github",
                icon: <IconGithub />,
                href: "https://github.com/headline-design/xgov-explorer"
              },
              {
                name: "Twitter",
                icon: <IconX />,
                href: "https://twitter.com/headline_crypto"

              }
            ],
          },
        ]
      }
      return []
    }, [connectedUser, location])

    const renderCollapseItems = (items) =>
      items.map(({ name, children }) => (
        <Collapsible key={name} className="group overflow-hidden">
          <CollapsibleTrigger className="w-full">
            <li className="rust-menu-item  flex cursor-pointer items-center justify-between">
              {name}
              <ChevronDown className="h-4 w-4 transition-transform duration-200 ease-in-out group-data-[state=open]:-rotate-180" />
            </li>
          </CollapsibleTrigger>
          <CollapsibleContent className="overflow-hidden transition-all duration-200 ease-in-out">
            <ul>
              {children.map(({ name, href, icon }) => (
                <li key={name} className="">
                  <Link
                    data-id={`${location}`}
                    onClick={handleToggle}
                    href={`${href}`}
                    prefetch={false}
                    className="rust-menu-item cursor-pointer justify-start"
                  >
                    {icon}
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      ))

    const MenuContent = ({ handleToggle }) => (
      <section>
        <ul>
          {renderUserItem()}
          {renderCollapseItems(collapseItems)}
          {renderMenuItems(mainItems, handleToggle, "main")}
          {renderDivider(midItems)}
          {renderMenuItems(midItems, handleToggle, "mid")}
          {renderDivider(footerItems)}
          {renderMenuItems(footerItems, handleToggle, "footer")}
          {renderDivider(actionDesktopFooter)}
        </ul>
      </section>
    )

    return (
      <div className="relative inline-flex">
        {!isWidescreen ? (
          <>
            <MobileMenuTrigger setShowMobileMenu={setShowMobileMenu} showMobileMenu={showMobileMenu} />
            <MobileMenu showMenu={showMobileMenu}>
              <div className="mobile-menu-header-wrapper">
                {renderMenuItems(actionMobileHeader, handleToggle, "actionHeader")}
              </div>
              <MenuContent handleToggle={handleToggle} />
            </MobileMenu>
          </>
        ) : (
          <DesktopMenu
            content={
              showNotificationsMenu ? null : (
                <>
                  <MenuContent handleToggle={() => setShowDesktopMenu(false)} />
                  {renderMenuItems(actionDesktopFooter, handleToggle, "actionFooter")}
                </>
              )
            }
            openPopover={showDesktopMenu}
            setOpenPopover={() => {
              setShowNotificationsMenu(false)
              setShowDesktopMenu(!showDesktopMenu)
            }}
            user={user}
            unread={0}
            showNotificationsMenu={showNotificationsMenu}
          />
        )}
      </div>
    )
  },
)

NavMenu.displayName = "NavMenu"
export default NavMenu

