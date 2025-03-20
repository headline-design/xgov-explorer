import { HOME_DOMAIN } from "./constants";

export const getCurrentCallbackUrl = () => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return null; // or return a default value
  }

  const currentUrl = window.location.href;

  // Check if the current URL starts with the home domain
  if (currentUrl.startsWith(HOME_DOMAIN)) {
    return currentUrl;
  }

  return null;
}

// get boolean for if redirect on callback

export const getCallbackRedirect = () => {
  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return false; // or return a default value
  }

  const currentUrl = window.location.href;

  // Check if the current URL starts with the home domain
  if (currentUrl.startsWith(HOME_DOMAIN)) {
    return false;
  } else
    return true;
};
