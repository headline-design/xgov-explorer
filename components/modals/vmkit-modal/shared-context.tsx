"use client"

import type React from "react"
import { createContext, useContext, useReducer } from "react"

// Define the state and action types
export type ConnectState = {
  loading: boolean
  activeProvider: string | null
  currentScreen: string
  dialogStack: boolean
}

export type ConnectAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ACTIVE_PROVIDER"; payload: string | null }
  | { type: "SET_CURRENT_SCREEN"; payload: string }
  | { type: "SET_DIALOG_STACK"; payload: boolean }
  | { type: "RESET" }

// Initial state
export const initialState: ConnectState = {
  loading: false,
  activeProvider: null,
  currentScreen: "default",
  dialogStack: false,
}

// Reducer function
export function connectReducer(state: ConnectState, action: ConnectAction): ConnectState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload }
    case "SET_ACTIVE_PROVIDER":
      return { ...state, activeProvider: action.payload }
    case "SET_CURRENT_SCREEN":
      return { ...state, currentScreen: action.payload }
    case "SET_DIALOG_STACK":
      return { ...state, dialogStack: action.payload }
    case "RESET":
      return initialState
    default:
      return state
  }
}

// Create the context
type ConnectContextType = {
  state: ConnectState
  dispatch: React.Dispatch<ConnectAction>
}

const SharedConnectContext = createContext<ConnectContextType | undefined>(undefined)

// Provider component
export function SharedConnectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(connectReducer, initialState)

  return <SharedConnectContext.Provider value={{ state, dispatch }}>{children}</SharedConnectContext.Provider>
}

// Custom hook to use the context
export function useSharedConnect() {
  const context = useContext(SharedConnectContext)
  if (context === undefined) {
    throw new Error("useSharedConnect must be used within a SharedConnectProvider")
  }
  return context
}

