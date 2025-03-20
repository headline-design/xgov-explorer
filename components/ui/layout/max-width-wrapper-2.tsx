import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export const MaxWidthWrapperV2 = ({
  className,
  children,
  preClassName,
}: {
  className?: string;
  children: ReactNode;
  preClassName?: any;
}) => {
  return (
    <div
      className={cn(
        className,
        `mx-auto w-full max-w-screen-view px-4 lg:px-6`,
        preClassName
      )}
    >
      {children}
    </div>
  );
}

export default MaxWidthWrapperV2;