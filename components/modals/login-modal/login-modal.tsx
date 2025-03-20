"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect, useCallback, useMemo, useReducer } from "react";
import {
  ICON_CLASS,
  ALL_PROVIDERS,
  VM_NETWORKS,
} from "../connect/constants";

import { AVMWalletsScreen, ErrorScreen, LoadingScreen } from "../connect/connect-screens";
import AlgoCircle from "@/icons/brand-icons/algo-circle";
import { IconArrowLeft } from "@/icons/rust";
import { IconCheckCircleFill } from "@/icons/rust/check-circle-fill";
import { useLogout } from "@/lib/hooks/use-logout";
import BaseDialog from "@/components/ui/dialog/base-dialog";
import { Button } from "@/components/ui/rust-button";
import IconGithub from "@/icons/brand-icons/github";

const initialState = {
  loading: false,
  activeProvider: null,
  currentScreen: "default",
  dialogStack: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ACTIVE_PROVIDER":
      return { ...state, activeProvider: action.payload };
    case "SET_CURRENT_SCREEN":
      return { ...state, currentScreen: action.payload };
    case "SET_DIALOG_STACK":
      return { ...state, dialogStack: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

const getScreenLeftButton = (screen, handleBackOneScreen) => {
  const showPreviousButton = screen !== "default";

  if (!showPreviousButton) return null;

  return (
    <Button
      rounded
      variant="outline"
      onClick={handleBackOneScreen}
      className="ml-3"
      icon={<IconArrowLeft className="h-3 w-3" />}
      text="Previous"
    />
  );
};

const DefaultScreen = ({
  handleShowWallets,
}) => {

  return (
    <>
      <Button
        variant="outline"
        rounded
        full
        icon={<AlgoCircle className="h-5 w-5" />}
        text="Algorand"
        onClick={() => handleShowWallets("AVM-wallets")}
      />
       <Button
        variant="outline"
        rounded
        full
        icon={<IconGithub className="h-5 w-5" />}
        text="Github"
        onClick={() => signIn("github")}
      />
    </>
  );
};


const SuccessScreen = () => (
  <div className="flex flex-col items-center justify-center p-4 gap-2">
    <h2 className="text-xl font-semibold text-success-link">Sign in Successful!</h2>
    <p className="text-sm text-gray-500">You are now connected to xGov Explorer</p>
    <IconCheckCircleFill className="h-16 w-16 fill-success-link mt-2" />
  </div>
);


export const LoginModalHelper = ({
  showLoginModal,
  setShowLoginModal,
  authFlow,
  setAuthFlow,
}) => {
  const { data: session, status, update } = useSession();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [user, setUser] = useState(null);

  const provider = useMemo(() => {
    return (
      ALL_PROVIDERS.find((p) => p.id === state.activeProvider) || {
        id: "provider",
        name: "Default provider",
        icon: <AlgoCircle className={ICON_CLASS} />,
        type: "loading",
        connector: "loading",
      }
    );
  }, [state.activeProvider]);

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "SET_CURRENT_SCREEN", payload: "success" });
    } else if (status === "unauthenticated") {
      dispatch({ type: "RESET" });
    }
  }, [status, setShowLoginModal]);

  useEffect(() => {
    if (authFlow.vm !== "") {
      const network = authFlow.vm;
      const networkProvider = VM_NETWORKS.find((n) => n.id === network);
      if (networkProvider) {
        dispatch({ type: "SET_CURRENT_SCREEN", payload: `${network}-wallets` });
      }
      else if (network === "socials") {
        dispatch({ type: "SET_CURRENT_SCREEN", payload: "socials" });
      }
    }
  }, [authFlow]);

  const { handleDisconnect, signingOut } = useLogout();

  const onDisconnect = async () => {
    if (session?.user) {
      dispatch({ type: "SET_CURRENT_SCREEN", payload: "default" });
      handleDisconnect();
    } else {
      dispatch({ type: "SET_CURRENT_SCREEN", payload: "default" });
      handleDisconnect();
    }
  };

  const handleShowWallets = (payload) => {
    dispatch({ type: "SET_CURRENT_SCREEN", payload: payload });
  };

  const renderScreen = () => {
    switch (state.currentScreen) {
      case "default":
        return (
          <DefaultScreen
            handleShowWallets={handleShowWallets}
          />
        );
      case "AVM-wallets":
        return <AVMWalletsScreen />;
      case "loading":
        return (
          <LoadingScreen
            provider={provider}
          />
        );
      case "error":
        return <ErrorScreen />
      case "success": // New success case
        return <SuccessScreen />
      default:
        return <AVMWalletsScreen />;
    }
  };

  const handleResetScreen = () => {
    dispatch({ type: "RESET" });
  };

  const handleBackOneScreen = () => {
    switch (state.currentScreen) {
      case "socials":
      case "AVM-wallets":
      case "SVM-wallets":
      case "EVM-wallets":
      case "Substrate-wallets":
      case "siwaConnect":
      case "provider":
        dispatch({ type: "SET_CURRENT_SCREEN", payload: "default" });
        dispatch({ type: "SET_ACTIVE_PROVIDER", payload: null });
        break;
      case "loading":
      case "error":
        dispatch({ type: "SET_CURRENT_SCREEN", payload: "default" });
        dispatch({ type: "SET_ACTIVE_PROVIDER", payload: null });
        break;
      default:
        break;
    }
    dispatch({ type: "SET_LOADING", payload: false });
  };

  const onClose = () => {
    setShowLoginModal(false);
    dispatch({ type: "RESET" });
    setAuthFlow({
      type: "login",
      vm: '',
    });
  };

  return (
    <BaseDialog isOpen={showLoginModal} onClose={onClose}>
      {state.currentScreen !== "success" && (
        <div className="relative flex flex-row items-start justify-center border-b bg-accents-1 px-6 py-5">
          <h3 className="text-center text-lg font-medium">
            {state.currentScreen === "default"
              ? authFlow.type === "connect"
                ? "Connect"
                : "Login"
              : state.currentScreen === "socials"
                ? "Connect Socials"
                : state.currentScreen === "AVM-wallets"
                  ? "Connect AVM Wallet"
                  : state.currentScreen === "loading"
                    ? "Loading"
                    : state.currentScreen === "siwaConnect"
                      ? "Connected"
                      : "Error"}
          </h3>
        </div>
      )}
      <div className="max-h-[300px] space-y-2 overflow-hidden overflow-y-auto p-4">
        {renderScreen()}
      </div>
      <div className="modal-actions sticky bottom-0 flex items-center justify-between rounded-b-lg border-t bg-accents-1 p-4 text-center">

        {state.currentScreen === "success" ? (
          <Button full variant="outline" onClick={onClose} text="Close" />
        ) : (
          <div className="inline-flex">
            <Button variant="outline" onClick={onClose} text="Cancel" />
            {getScreenLeftButton(state.currentScreen, handleBackOneScreen)}
          </div>
        )
        }
      </div>
    </BaseDialog>
  );
};

export function useLoginModal() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [authFlow, setAuthFlow] = useState({
    type: "login",
    vm: "",
  })

  const LoginModal = useCallback(
    () => (
      <LoginModalHelper
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        authFlow={authFlow}
        setAuthFlow={setAuthFlow}
      />
    ),
    [showLoginModal, authFlow],
  );

  return {
    setShowLoginModal,
    showLoginModal,
    LoginModal,
    authFlow,
    setAuthFlow,
  };
}
