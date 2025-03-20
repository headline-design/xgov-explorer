"use client";

import { useLoginModal } from "@/components/modals/login-modal/login-modal";
import { Dispatch, ReactNode, SetStateAction, createContext } from "react";

export const GlobalModalContext = createContext<{
  setShowLoginModal: Dispatch<SetStateAction<boolean>>;
  setAuthFlow: Dispatch<SetStateAction<any>>;
  showLoginModal: boolean;
  authFlow: any;
}>({
  setShowLoginModal: () => { },
  setAuthFlow: () => { },
  showLoginModal: false,
  authFlow: {},
});

export default function GlobalModalProvider({
  children,
}: {
  children: ReactNode;
}) {
  const {
    setShowLoginModal,
    showLoginModal,
    LoginModal,
    authFlow,
    setAuthFlow,
  } = useLoginModal();

  return (
    <GlobalModalContext.Provider
      value={{
        setShowLoginModal,
        setAuthFlow,
        showLoginModal,
        authFlow,
      }}
    >
      {showLoginModal && <LoginModal />}
      {children}
    </GlobalModalContext.Provider>
  );
}
