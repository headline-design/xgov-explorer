import { cn } from "@/lib/utils";

export const MobileMenu = ({
  children,
  showMenu,
  className,
}: {
  children: any;
  showMenu: any;
  className?: string;
}) => {
  return showMenu ? (
    <div
      className={cn(
        `transform ${
          showMenu
            ? "rust-mobile-menu translate-y-0"
            : "hidden -translate-y-full"
        } z-100 fixed flex w-full flex-col border-r  p-4 transition-all sm:w-full sm:translate-x-0`,
        className,
      )}
    >
      {children}
    </div>
  ) : null;
};
