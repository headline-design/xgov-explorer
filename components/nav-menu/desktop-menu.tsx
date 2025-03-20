import { AVATAR_GRADIENT_API } from "@/lib/constants";
import Popover from "@/components/ui/popover";

export const DesktopMenu = ({
  content,
  openPopover,
  setOpenPopover,
  showNotificationsMenu = false,
  user,
  unread,
  className,
}: {
  content: any;
  openPopover: any;
  setOpenPopover: any;
  showNotificationsMenu: any;
  user: any;
  unread: any;
  className?: string;
}) => {
  return (
    <Popover
      className={className}
      roundedXl
      content={
        showNotificationsMenu ? (
          <div className="overflow-hidden">{content}</div>
        ) : (
          <div className="rust-desktop-menu">{content}</div>
        )
      }
      align="end"
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
      <button
        onClick={() => setOpenPopover(!openPopover)}
        className="rust-hamburger rust-mobile-nav-btn group ml-1"
      >
        {user ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={user?.email || "Avatar for logged in user"}
            src={user?.image || `${AVATAR_GRADIENT_API}/${user?.email}`}
            className="group- avatar-class rounded-full border transition-all duration-75"
          />
        ) : (
          <div className="rust-skeleton avatar-class rounded-full border bg-accent-muted" />
        )}
      </button>
    </Popover>
  );
};
