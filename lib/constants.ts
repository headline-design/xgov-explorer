
export const SWIPE_REVEAL_ANIMATION_SETTINGS = {
  initial: { height: 0 },
  animate: { height: "auto" },
  exit: { height: 0 },
  transition: { duration: 0.15, ease: "easeOut" },
};

export const FADE_IN_ANIMATION_SETTINGS = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

export const PAGINATION_LIMIT = 100;

export const HOME_HOSTNAMES = new Set([
  "localhost:3000",
  "localhost",
  "xgov.app",
]);

export const isHomeHostname = (domain: string) => {
  return HOME_HOSTNAMES.has(domain) || domain.endsWith("xgov.app");
};

export const ROOT_HTTP =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? "http://"
      : "http://";

export const LOCAL_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? "localhost:3000"
    : "192.168.1.160:3000";

export const LOCAL_DEPLOYMENT =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
    ? "localhost"
    : "192.168.1.160";

export const ROOT_DOMAIN =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "xgov.app"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? "localhost:3000"
      : "192.168.1.160:3000";

export const HOME_DOMAIN = process.env.NEXT_PUBLIC_DOMAIN || "https://xgov.app";

export const XGOV_HEADERS = {
  headers: {
    "x-powered-by": "xgov.app - Discover Web`",
  },
};

export const AVATAR_GRADIENT_API =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production"
    ? "https://xgov.app/api/www/avatar"
    : process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"
      ? "http://localhost:3000/api/www/avatar"
      : "http://192.168.1.160:3000/api/www/avatar";
