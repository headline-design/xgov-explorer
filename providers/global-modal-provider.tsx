"use client";

import { useConnectWalletModal } from "@/components/modals/vmkit-modal/connect-wallet-modal";
import { useLoginModal } from "@/components/modals/vmkit-modal/login-modal";
import { Dispatch, ReactNode, SetStateAction, createContext } from "react";

export const GlobalModalContext = createContext<{
  setShowLoginModal: Dispatch<SetStateAction<boolean>>;
  setAuthFlow: Dispatch<SetStateAction<any>>;
  showLoginModal: boolean;
  authFlow: any;
  setShowConnectWalletModal: Dispatch<SetStateAction<boolean>>;
  showConnectWalletModal: boolean;
  setTeamId: Dispatch<SetStateAction<any>>;
}>({
  setShowLoginModal: () => { },
  setAuthFlow: () => { },
  showLoginModal: false,
  authFlow: {},
  setShowConnectWalletModal: () => { },
  showConnectWalletModal: false,
  setTeamId: () => { },
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

  const {
    setShowConnectWalletModal,
    showConnectWalletModal,
    ConnectWalletModal,
    setTeamId,
  } = useConnectWalletModal();

  return (
    <GlobalModalContext.Provider
      value={{
        setShowLoginModal,
        setAuthFlow,
        showLoginModal,
        authFlow,
        setShowConnectWalletModal,
        showConnectWalletModal,
        setTeamId,
      }}
    >
      {showLoginModal && <LoginModal />}
      {showConnectWalletModal && <ConnectWalletModal />}
      {children}
    </GlobalModalContext.Provider>
  );
}
