"use client";

import { useState, useCallback, useMemo } from "react";
import { signOut, useSession } from "next-auth/react";
import { useSIWA } from "@vmkit/connect-avm";
import { debounce } from "lodash";
import { getCallbackRedirect, getCurrentCallbackUrl } from "../client-utils";
import { siwaConfig } from "@/providers/web3/avm-provider";

export const useLogout = () => {
  const [signingOut, setSigningOut] = useState(false);
  const [logoutError, setLogoutError] = useState(null);

  // Wrap pipeState initialization in its own useMemo
  const { data: session } = useSession();
  const { signOut: signOutWithSIWA, data: siwaData } = useSIWA();

  const urlCallback = getCurrentCallbackUrl();
  const callbackRedirect = getCallbackRedirect();

  // Create the debounced function using useMemo
  const debouncedDisconnect = useMemo(
    () =>
      debounce(async () => {
        try {
          setLogoutError(null); // Reset error state before attempting logout

          if (siwaData?.address) {
            await siwaConfig.signOut();

            await signOutWithSIWA();
            siwaData.address = null; // Reflect that the address is now null
          }

          if (!siwaData?.address) {
            setSigningOut(true);
            await signOut({
              callbackUrl: urlCallback ?? undefined,
              redirect: callbackRedirect,
            });
            setSigningOut(false);
          } else {
            console.log(
              "Either SIWA or Pipeline state address was found, not calling signOut",
              siwaData?.address,
            );
          }
        } catch (error) {
          console.error("Error during logout:", error);
          setLogoutError("Failed to log out. Please try again." as any);
          setSigningOut(false);
        }
      }, 300),
    [
      siwaData,
      signOutWithSIWA,
      session,
      urlCallback,
      callbackRedirect,
    ],
  );

  // Memoize the debounced function with useCallback
  const handleDisconnect = useCallback(() => {
    debouncedDisconnect();
  }, [debouncedDisconnect]);

  return { handleDisconnect, signingOut, logoutError };
};
