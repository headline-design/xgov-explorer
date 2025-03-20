import { cn } from "@/lib/utils";
import styles from "./loading-spinner.module.css";

export default function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("h-5 w-5", className)}>
      <div className={cn(styles.spinner, "h-5 w-5", className)}>
        {[...Array(12)].map((_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
}

export function SmallLoadingSpinner({ className }: { className?: string }) {
  return (
    <div className={cn("h-4 w-4", className)}>
      <div className={cn(styles.spinner, "h-4 w-4", className)}>
        {[...Array(12)].map((_, i) => (
          <div key={i} />
        ))}
      </div>
    </div>
  );
}

export function LoadingPageSpinner({ className }: { className?: string }) {
  return (
    <div className="flex h-screen-minus-nav">
      <div className="m-auto flex">
        <div className={cn("h-5 w-5", className)}>
          <div className={cn(styles.spinner, "h-5 w-5", className)}>
            {[...Array(12)].map((_, i) => (
              <div key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
