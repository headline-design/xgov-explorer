"use client"

import type React from "react"
import { useMemo } from "react"

// Blockchain dominant colors (in HSL for easier manipulation)
const BLOCKCHAIN_COLORS = {
  ethereum: { h: 248, s: 77, l: 53 }, // Blue/Purple
  solana: { h: 270, s: 100, l: 63 }, // Purple/Magenta
  algorand: { h: 174, s: 100, l: 37 }, // Teal/Green
  polkadot: { h: 328, s: 100, l: 45 }, // Pink/Magenta
  unknown: { h: 210, s: 70, l: 50 }, // Default blue
}

type BlockchainType = keyof typeof BLOCKCHAIN_COLORS

// Detect blockchain type from wallet address
const detectBlockchainType = (address: string): BlockchainType => {
  if (!address) return "unknown"

  // Ethereum: 0x followed by 40 hex characters
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return "ethereum"
  }

  // Algorand: 58 character string, typically alphanumeric
  if (/^[A-Z2-7]{58}$/.test(address)) {
    return "algorand"
  }

  // Solana: Base58 encoded string, typically 32-44 characters
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
    return "solana"
  }

  // Polkadot/Substrate: SS58 format, typically starts with numbers 1-9 or letters
  // and is 45-49 characters long with mixed case
  if (/^[1-9A-HJ-NP-Za-km-z]{45,49}$/.test(address)) {
    return "polkadot"
  }

  return "unknown"
}

// Generate a deterministic color from a string (like a wallet address)
const stringToColor = (str: string, blockchain: BlockchainType, isSecondColor = false) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const baseColor = BLOCKCHAIN_COLORS[blockchain]

  // Use the hash to create a variation of the blockchain's color
  // For the second color, we shift the hue more to create a nice gradient
  const hueShift = isSecondColor ? 30 : 0
  const hueVariation = Math.abs(hash % 40) - 20
  const h = (baseColor.h + hueVariation + hueShift + 360) % 360

  const s = Math.min(Math.max(baseColor.s - 5 + Math.abs((hash >> 8) % 15), 65), 95)
  const l = Math.min(Math.max(baseColor.l - 5 + Math.abs((hash >> 16) % 15), 45), 65)

  return `hsl(${h}, ${s}%, ${l}%)`
}

// Generate a deterministic angle from a string
const stringToAngle = (str: string): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return Math.abs(hash % 360)
}

interface GradientAvatarProps {
  address: string
  size?: number
  className?: string
}

export const GradientAvatar: React.FC<GradientAvatarProps> = ({ address, size = 32, className = "" }) => {
  const avatarData = useMemo(() => {
    if (!address) return null

    const blockchain = detectBlockchainType(address)
    const firstHalf = address.substring(0, address.length / 2)
    const secondHalf = address.substring(address.length / 2)

    const color1 = stringToColor(firstHalf, blockchain, false)
    const color2 = stringToColor(secondHalf, blockchain, true)
    const angle = stringToAngle(address)

    return { color1, color2, angle }
  }, [address])

  if (!avatarData) {
    return <div className={`rounded-full bg-gray-200 ${className}`} style={{ width: size, height: size }} />
  }

  const { color1, color2, angle } = avatarData
  const gradient = `linear-gradient(${angle}deg, ${color1}, ${color2})`

  return (
    <div
      className={`rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: gradient,
      }}
    />
  )
}

