import { useEffect, useState } from "react";

export default function useTabletQuery() {
  const [device, setDevice] = useState<"desktop" | "tablet" | null>(null);
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      if (window.matchMedia("(max-width: 1024px)").matches) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial detection
    checkDevice();

    // Listener for windows resize
    window.addEventListener("resize", checkDevice);

    // Cleanup listener
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return {
    device,
    width: dimensions?.width,
    height: dimensions?.height,
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
}
