"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";
import { AVATAR_GRADIENT_API } from "@/lib/constants";
import { cn } from "@/lib/utils";
import styles from "./styles.module.css";

const sizeClassMap = {
  16: "h-4 w-4",
  22: "h-5 w-5",
  24: "h-6 w-6",
  32: "h-8 w-8",
  48: "h-12 w-12",
  64: "h-16 w-16",
  80: "h-20 w-20",
};

type ImageType = "avatar" | "card";

export const BlurImage = ({
  size,
  className,
  type,
  ...props
}: ImageProps & { size?: number; type: ImageType }) => {
  const avatar = type === "avatar";
  const card = type === "card";
  const [isLoading, setIsLoading] = useState(true);

  // Compute size-based class names
  const sizeClasses = size ? sizeClassMap[size] || "" : "";

  const handleLoadingComplete = () => setIsLoading(false);
  const handleError = () => setIsLoading(false); // Or set to an error state if needed

  const minWidth = `${size || props.width}px`;
  const minHeight = `${size || props.height}px`;

  return (
    <span
      className={cn(
        styles.blurImageContainer,
        avatar && styles.avatarContainer,
        card && styles.cardContainer,
        sizeClasses,
        "relative",
        className,
      )}
      style={{
        minWidth: `${avatar && minWidth}`,
        minHeight: `${avatar && minHeight}`,
      }}
    >
      {isLoading && (
        <span className={cn(styles.blurImage, "rust-skeleton absolute")} />
      )}
      <Image
        {...props}
        src={props.src || `${AVATAR_GRADIENT_API}/${props.alt}.png`}
        alt={props.alt || "siwa_image"}
        height={size || props.height}
        width={size || props.width}
        onLoad={handleLoadingComplete}
        onError={handleError}
        className={cn(
          avatar && styles.avatarImage,
          card && styles.cardImage,
          styles.blurImage,
          "transition-opacity duration-500",
          {
            "opacity-0": isLoading,
            "opacity-100": !isLoading,
          },
        )}
      />
    </span>
  );
};

export default BlurImage;
