"use client"

import { useState, useCallback, useMemo } from "react"
import { AVMWalletsScreen, ErrorScreen, LoadingScreen, SuccessScreen } from "./screens";
import AlgoCircle from "@/icons/brand-icons/algo-circle"
import { IconArrowLeft } from "@/icons/rust"
import BaseDialog from "@/components/ui/dialog/base-dialog"
import { Button } from "@/components/ui/rust-button"
import { useUser } from "@/providers/user-provider"
import { ALL_PROVIDERS, ICON_CLASS } from "./constants"
import { SharedConnectProvider, useSharedConnect } from "./shared-context"

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
        text="Connect Algorand Wallet"
        onClick={() => handleShowWallets("AVM-wallets")}
      />
    </>
  )
}

const ConnectWalletModalContent = ({ setShowConnectWalletModal, teamId }) => {
  const { state, dispatch } = useSharedConnect()
  const [connectedWalletAddress, setConnectedWalletAddress] = useState(null)
  const { fetchUser } = useUser()

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

  // This function would be called when a wallet is successfully connected
  const handleWalletConnected = async (address) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      // Next-Auth will handle the wallet connection automatically
      // We just need to refresh the user data to get the updated wallets
      await fetchUser(true)

      setConnectedWalletAddress(address)
      dispatch({ type: "SET_CURRENT_SCREEN", payload: "success" })
    } catch (error) {
      console.error("Error connecting wallet:", error)
      dispatch({ type: "SET_CURRENT_SCREEN", payload: "error" })
    } finally {
      dispatch({ type: "SET_LOADING", payload: false })
    }
  }

  const renderScreen = () => {
    switch (state.currentScreen) {
      case "default":
        return <DefaultScreen />
      case "AVM-wallets":
        return <AVMWalletsScreen onWalletConnected={handleWalletConnected} mode="connect" />
      case "loading":
        return <LoadingScreen provider={provider} />
      case "error":
        return <ErrorScreen />
      case "success":
        return <SuccessScreen walletAddress={connectedWalletAddress} mode="connect" />
      default:
        return <DefaultScreen />
    }
  }

  const handleBackOneScreen = () => {
    switch (state.currentScreen) {
      case "AVM-wallets":
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
    setShowConnectWalletModal(false)
    dispatch({ type: "RESET" })
    setConnectedWalletAddress(null)
  }

  return (
    <BaseDialog isOpen={true} onClose={onClose}>
      {state.currentScreen !== "success" && (
        <div className="relative flex flex-row items-start justify-center border-b bg-accents-1 px-6 py-5">
          <h3 className="text-center text-lg font-medium">
            {state.currentScreen === "default"
              ? "Connect Wallet"
              : state.currentScreen === "AVM-wallets"
                ? "Connect Algorand Wallet"
                : state.currentScreen === "loading"
                  ? "Connecting..."
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

export const ConnectWalletModalHelper = ({ showConnectWalletModal, setShowConnectWalletModal, teamId }) => {
  if (!showConnectWalletModal) return null

  return (
    <SharedConnectProvider>
      <ConnectWalletModalContent setShowConnectWalletModal={setShowConnectWalletModal} teamId={teamId} />
    </SharedConnectProvider>
  )
}

export function useConnectWalletModal() {
  const [showConnectWalletModal, setShowConnectWalletModal] = useState(false)
  const [teamId, setTeamId] = useState(null)

  const ConnectWalletModal = useCallback(
    () => (
      <ConnectWalletModalHelper
        showConnectWalletModal={showConnectWalletModal}
        setShowConnectWalletModal={setShowConnectWalletModal}
        teamId={teamId}
      />
    ),
    [showConnectWalletModal, teamId],
  )

  return {
    setShowConnectWalletModal,
    showConnectWalletModal,
    ConnectWalletModal,
    setTeamId,
  }
}

