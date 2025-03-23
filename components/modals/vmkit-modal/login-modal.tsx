"use client"

import { signIn, useSession } from "next-auth/react"
import { useState, useEffect, useCallback, useMemo } from "react"
import { AVMWalletsScreen, ErrorScreen, LoadingScreen, SuccessScreen } from "./screens"
import AlgoCircle from "@/icons/brand-icons/algo-circle"
import { IconArrowLeft } from "@/icons/rust"
import { useLogout } from "@/lib/hooks/use-logout"
import BaseDialog from "@/components/ui/dialog/base-dialog"
import { Button } from "@/components/ui/rust-button"
import IconGithub from "@/icons/brand-icons/github"
import { SharedConnectProvider, useSharedConnect } from "./shared-context"
import { ALL_PROVIDERS, ICON_CLASS, VM_NETWORKS } from "./constants"

const getScreenLeftButton = (screen, handleBackOneScreen) => {
  const showPreviousButton = screen !== "default"

  if (!showPreviousButton) return null

  return (
    <Button
      rounded
      variant="outline"
      onClick={handleBackOneScreen}
      className="ml-3"
      icon={<IconArrowLeft className="h-3 w-3" />}
      text="Previous"
    />
  )
}

const DefaultScreen = () => {
  const { dispatch } = useSharedConnect()

  const handleShowWallets = (screen) => {
    dispatch({ type: "SET_CURRENT_SCREEN", payload: screen })
  }

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
  )
}

const LoginModalContent = ({ showLoginModal, setShowLoginModal, authFlow, setAuthFlow }) => {
  const { data: session, status, update } = useSession()
  const { state, dispatch } = useSharedConnect()
  const [user, setUser] = useState(null)

  const provider = useMemo(() => {
    return (
      ALL_PROVIDERS.find((p) => p.id === state.activeProvider) || {
        id: "provider",
        name: "Default provider",
        icon: <AlgoCircle className={ICON_CLASS} />,
        type: "loading",
        connector: "loading",
      }
    )
  }, [state.activeProvider])

  useEffect(() => {
    if (status === "authenticated") {
      dispatch({ type: "SET_CURRENT_SCREEN", payload: "success" })
    } else if (status === "unauthenticated") {
      dispatch({ type: "RESET" })
    }
  }, [status, setShowLoginModal, dispatch])

  useEffect(() => {
    if (authFlow.vm !== "") {
      const network = authFlow.vm
      const networkProvider = VM_NETWORKS.find((n) => n.id === network)
      if (networkProvider) {
        dispatch({ type: "SET_CURRENT_SCREEN", payload: `${network}-wallets` })
      } else if (network === "socials") {
        dispatch({ type: "SET_CURRENT_SCREEN", payload: "socials" })
      }
    }
  }, [authFlow, dispatch])

  const { handleDisconnect, signingOut } = useLogout()

  const onDisconnect = async () => {
    if (session?.user) {
      dispatch({ type: "SET_CURRENT_SCREEN", payload: "default" })
      handleDisconnect()
    } else {
      dispatch({ type: "SET_CURRENT_SCREEN", payload: "default" })
      handleDisconnect()
    }
  }

  // Update the renderScreen function to properly pass props to the screens
  const renderScreen = () => {
    switch (state.currentScreen) {
      case "default":
        return <DefaultScreen />
      case "AVM-wallets":
        return <AVMWalletsScreen mode="login" onWalletConnected={undefined} />
      case "loading":
        return <LoadingScreen provider={provider} />
      case "error":
        return <ErrorScreen />
      case "success":
        return <SuccessScreen mode="login" walletAddress={undefined} />
      default:
        return <AVMWalletsScreen mode="login" onWalletConnected={undefined} />
    }
  }

  const handleBackOneScreen = () => {
    switch (state.currentScreen) {
      case "socials":
      case "AVM-wallets":
      case "siwaConnect":
      case "provider":
        dispatch({ type: "SET_CURRENT_SCREEN", payload: "default" })
        dispatch({ type: "SET_ACTIVE_PROVIDER", payload: null })
        break
      case "loading":
      case "error":
        dispatch({ type: "SET_CURRENT_SCREEN", payload: "default" })
        dispatch({ type: "SET_ACTIVE_PROVIDER", payload: null })
        break
      default:
        break
    }
    dispatch({ type: "SET_LOADING", payload: false })
  }

  const onClose = () => {
    setShowLoginModal(false)
    dispatch({ type: "RESET" })
    setAuthFlow({
      type: "login",
      vm: "",
    })
  }

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
      <div className="max-h-[300px] space-y-2 overflow-hidden overflow-y-auto p-4">{renderScreen()}</div>
      <div className="modal-actions sticky bottom-0 flex items-center justify-between rounded-b-lg border-t bg-accents-1 p-4 text-center">
        {state.currentScreen === "success" ? (
          <Button full variant="outline" onClick={onClose} text="Close" />
        ) : (
          <div className="inline-flex">
            <Button variant="outline" onClick={onClose} text="Cancel" />
            {getScreenLeftButton(state.currentScreen, handleBackOneScreen)}
          </div>
        )}
      </div>
    </BaseDialog>
  )
}

export const LoginModalHelper = ({ showLoginModal, setShowLoginModal, authFlow, setAuthFlow }) => {
  if (!showLoginModal) return null

  return (
    <SharedConnectProvider>
      <LoginModalContent
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        authFlow={authFlow}
        setAuthFlow={setAuthFlow}
      />
    </SharedConnectProvider>
  )
}

export function useLoginModal() {
  const [showLoginModal, setShowLoginModal] = useState(false)
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
  )

  return {
    setShowLoginModal,
    showLoginModal,
    LoginModal,
    authFlow,
    setAuthFlow,
  }
}

