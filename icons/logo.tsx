import { cn } from "@/lib/utils";

export default function Logo({
  className,
  width,
  height,
}: {
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg
      width={width || 191}
      height={height || 191}
      className={cn("h-10 w-10 text-primary-accent", className)}
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 26"
    >
      <rect
        id="_Transparent_Rectangle_"
        width={26}
        height={26}
        fill="none"
        strokeWidth={0}
      />
      <path
        d="M16.14081,2.88885h7.03163v10.45188c0,2.93652-1.49423,5.6895-3.95529,7.15773l-3.95529,2.47769-3.95529-2.47769c-2.46106-1.46824-3.95529-3.22121-3.95529-6.15773"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
      />
      <path
        d="M2.07756,2.88885h9.54744"
        fill="currentColor"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <path
        d="M2.07756,7.66149h9.54744"
        fill="currentColor"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={2}
      />
    </svg>
  );
}
