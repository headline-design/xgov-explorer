"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { useTheme } from "next-themes";

interface RobustImageProps extends Omit<ImageProps, "onError" | "onLoad"> {}

export default function ImageV2({
  alt,
  className = "",
  ...props
}: RobustImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const { theme } = useTheme();

  const isDarkMode = theme === "dark";

  const placeholderSVGLight = `
  <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#ebebeb"/>
    <circle cx="70" cy="30" r="15" fill="#c9c9c9"/>
    <polygon points="0,100 100,100 100,60 75,70 50,40 25,70" fill="#a8a8a8"/>
  </svg>
`;

  const placeholderSVGDark = `
    <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#242424"/>
        <circle cx="70" cy="30" r="15" fill="#828282"/>
        <polygon points="0,100 100,100 100,60 75,70 50,40 25,70" fill="#3d3d3d"/>
    </svg>
`;

  const placeholderSVG = isDarkMode ? placeholderSVGDark : placeholderSVGLight;

  const placeholderDataURL = `data:image/svg+xml,${encodeURIComponent(placeholderSVG)}`;

  if (hasError) {
    return (
      <div
        className={`relative overflow-hidden ${className}`}
        style={{ aspectRatio: `${props.width} / ${props.height}` }}
        role="img"
        aria-label={`Placeholder for: ${alt}`}
      >
        <Image
          src={placeholderDataURL}
          alt={`Placeholder for: ${alt}`}
          layout="fill"
          objectFit="cover"
        />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div
          className="rust-skeleton absolute inset-0 z-10"
          style={{ aspectRatio: `${props.width} / ${props.height}` }}
        />
      )}
      <Image
        {...props}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300 ease-in-out`}
      />
    </div>
  );
}
