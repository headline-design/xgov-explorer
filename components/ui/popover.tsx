"use client";

import { Dispatch, ReactNode, SetStateAction } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Drawer } from "vaul";
import useMediaQuery from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";

export default function Popover({
  children,
  content,
  align = "center",
  handle = true,
  openPopover,
  setOpenPopover,
  className,
  mobileClassName,
  side = "bottom",
  sideOffset,
  alignOffset,
  modal = false,
  onOpenAutoFocus = () => {},
  triggerClassName,
  avoidCollisions = true,
  collisionPadding,
  roundedXl,
  anchor,
  tabIndex,
  onWheel,
  container,
  onInteractOutside,
  onFocusOutside,
  onPointerDownOutside,
  style,
  unstyledPopover,
  unstyledDrawer,
  drawerYPadding = true,
  drawerStyle,
  slot,
}: {
  children: ReactNode;
  content: ReactNode | string;
  align?: "center" | "start" | "end";
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
  handle?: boolean;
  className?: string;
  mobileClassName?: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  alignOffset?: number;
  modal?: boolean;
  onOpenAutoFocus?: any;
  triggerClassName?: string;
  avoidCollisions?: boolean;
  collisionPadding?: any;
  roundedXl?: any;
  anchor?: any;
  tabIndex?: number;
  onWheel?: any;
  container?: any;
  onInteractOutside?: any;
  onFocusOutside?: any;
  onPointerDownOutside?: any;
  style?: any;
  unstyledPopover?: boolean;
  unstyledDrawer?: boolean;
  drawerYPadding?: boolean;
slot?: any;
drawerStyle?: any;
}) {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    return (
      <Drawer.Root open={openPopover} onOpenChange={setOpenPopover}>
        {anchor}
        {slot}
        {children}
        <Drawer.Portal container={container}>
          <Drawer.Overlay className="rust-backdrop" />
          <Drawer.Content
          style={drawerStyle}
            className={
              unstyledDrawer
                ? ""
                : cn(
                    ` ${mobileClassName} rust-dialog !rounded-t-[10px] !border-t overflow-hidden`,
                    drawerYPadding ? "py-2" : "",
                  )
            }
          >
            {handle && (
              <div className="sticky top-0 z-20 flex w-full items-center justify-center bg-inherit">
                <div className="my-3 h-1 w-12 rounded-full bg-gray-300" />
              </div>
            )}



            <div
              className="rust-dialog-inner" >
              {content}
            </div>
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <PopoverPrimitive.Root
      open={openPopover}
      onOpenChange={setOpenPopover}
      modal={modal}
    >
      {anchor && (
        <PopoverPrimitive.Anchor asChild>{anchor}</PopoverPrimitive.Anchor>
      )}
      {slot}
      <PopoverPrimitive.Trigger
        className={triggerClassName || "md:inline-flex group"}
        asChild
        onClick={(e: React.MouseEvent) => {
          e.stopPropagation();
        }}
      >
        <div>{children}</div>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal container={container}>
        <PopoverPrimitive.Content
          tabIndex={tabIndex}
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
          }}
          avoidCollisions={avoidCollisions}
          collisionPadding={collisionPadding}
          onOpenAutoFocus={onOpenAutoFocus}
          onPointerDownOutside={onPointerDownOutside}
          onFocusOutside={onFocusOutside}
          onInteractOutside={onInteractOutside}
          onWheel={onWheel}
          sideOffset={sideOffset || 8}
          alignOffset={alignOffset}
          align={align}
          side={side}
          style={style}
          className={
            unstyledPopover
              ? ""
              : cn(
                  roundedXl ? "rounded-xl" : "rounded-md",
                  `${className} shadow-menu z-50 hidden animate-slide-up-fade items-center bg-background sm:block`,
                )
          }
        >
          {content}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
