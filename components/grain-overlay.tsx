interface GrainOverlayProps {
  className?: string
  intensity?: "light" | "medium" | "strong"
}

export function GrainOverlay({ className = "", intensity = "medium" }: GrainOverlayProps) {
  // Different opacity values based on intensity
  const opacityMap = {
    light: "opacity-[0.15]",
    medium: "opacity-[0.25]",
    strong: "opacity-[0.35]",
  }

  const opacityClass = opacityMap[intensity]

  return (
    <div
      className={`absolute inset-0 pointer-events-none mix-blend-overlay ${opacityClass} ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "150px 150px",
      }}
      aria-hidden="true"
    />
  )
}

