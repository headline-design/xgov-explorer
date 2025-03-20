import { cn } from "@/lib/utils";
import { MenuIcon } from "@/icons/menu-icon";

export const MobileMenuTrigger = ({
  setShowMobileMenu,
  showMobileMenu,
  className,
}: {
  setShowMobileMenu: any;
  showMobileMenu: any;
  className?: string;
}) => {
  const handleToggle = () => {
    setShowMobileMenu(!showMobileMenu);
    (document.body.style.position as any) = showMobileMenu ? null : "fixed";
    (document.body.style.width as any) = showMobileMenu ? null : "100%";
  };

  return (
    <button
      type="button"
      aria-label="Menu"
      className={cn("rust-hamburger rust-mobile-nav-btn lg:hidden", className)}
      onClick={handleToggle}
    >
      <MenuIcon className={cn({ open: showMobileMenu })} />
    </button>
  );
};
