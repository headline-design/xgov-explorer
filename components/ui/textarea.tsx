import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const BaseTextarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <>
        <textarea
          className={cn(
            "rust-textarea text-base sm: text-md rust-block rust-w-full rust-appearance-none rust-rounded-lg rust-px-3 rust-py-2 rust-transition-colors rust-text-base rust-leading-tight md:rust-text-sm contrast-more:rust-border contrast-more:rust-border-current flex min-h-[80px] w-full border disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </>
    );
  },
);

BaseTextarea.displayName = "BaseTextarea";

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="rust-input-container">
        <textarea
          className={cn(
            "rust-textarea text-base sm: text-md rust-block rust-w-full rust-appearance-none rust-rounded-lg rust-px-3 rust-py-2 rust-transition-colors rust-text-base rust-leading-tight md:rust-text-sm contrast-more:rust-border contrast-more:rust-border-current flex min-h-[80px] w-full border disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea, BaseTextarea };
