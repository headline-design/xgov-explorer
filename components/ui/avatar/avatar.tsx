"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import styles from "./avatar.module.css";

import { cn } from "@/lib/utils";
import { AVATAR_GRADIENT_API } from "@/lib/constants";

interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: string;
  className?: string;
}

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className = "h-8 w-8", size = "32px", ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    style={
      {
        width: size ? size : null,
        height: size ? size : null,
        minWidth: size ? size : null,
        maxWidth: size ? size : null,
        minHeight: size ? size : null,
        maxHeight: size ? size : null,
        "--size": size ? `${size}` : null,
      } as React.CSSProperties
    }
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      styles.entity_avatar,
      className,
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  size?: string;
  src?: string;
  className?: string;
}

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn(className, styles.avatar_intrinsic)}
    {...props}
  />
));
AvatarImage.displayName = "AvatarImage";

interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  fallback?: "text" | "gradient";
  fallbackSegment?: string;
  size?: string;
  className?: string;
}

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, fallbackSegment, fallback = "text", ...props }, ref) =>
  fallback === "gradient" ? (
    <AvatarPrimitive.Fallback
      ref={ref}
      style={
        {
          backgroundImage:
            fallback === "gradient"
              ? `url(${AVATAR_GRADIENT_API}/${fallbackSegment})`
              : null,
        } as React.CSSProperties
      }
      className={cn(
        fallback === "gradient" ? styles.entity_avatar : "",
        className,
      )}
    />
  ) : (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className,
      )}
      {...props}
    />
  ),
);
AvatarFallback.displayName = "AvatarFallback";

interface AvatarV2FallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  fallback?: "text" | "gradient";
  fallbackSegment?: string;
  size?: string;
  src?: any;
  name: string;
  className?: string;
}

const AvatarV2 = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Avatar>,
  AvatarV2FallbackProps
>(({ className, fallbackSegment, size, src, name, fallback }, ref) => {
  return <Avatar size={size || "36px"} className={className || ""} ref={ref}>
    <AvatarImage src={src} alt={name || "Avatar"} />
    <AvatarFallback
      fallback={fallback}
      fallbackSegment={fallbackSegment || `avatar-${name}`}
    >
      {fallback === "text" ? name : null}
    </AvatarFallback>
  </Avatar>

});
AvatarV2.displayName = "AvatarV2";

export { Avatar, AvatarV2, AvatarImage, AvatarFallback };
