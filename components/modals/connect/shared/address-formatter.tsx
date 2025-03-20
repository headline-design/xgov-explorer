import IconCheck from "@/icons/check";
import { IconCopy } from "@/icons/copy";
import { toast } from "@/components/ui/toast";
import React, { JSX } from "react";

// Blockchain types
export type BlockchainType = "ethereum" | "solana" | "algorand" | "polkadot" | "unknown";

// Detect blockchain type from wallet address
export const detectBlockchainType = (address: string): BlockchainType => {
  if (!address) return "unknown";

  // Ethereum: 0x followed by 40 hex characters
  if (/^0x[a-fA-F0-9]{40}$/.test(address)) {
    return "ethereum";
  }

  // Algorand: 58 character string, typically alphanumeric
  if (/^[A-Z2-7]{58}$/.test(address)) {
    return "algorand";
  }

  // Solana: Base58 encoded string, typically 32-44 characters
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
    return "solana";
  }

  // Polkadot/Substrate: SS58 format, typically starts with numbers 1-9 or letters
  // and is 45-49 characters long with mixed case
  if (/^[1-9A-HJ-NP-Za-km-z]{45,49}$/.test(address)) {
    return "polkadot";
  }

  return "unknown";
};

// Get blockchain display name
export const getBlockchainName = (type: BlockchainType): string => {
  const names: Record<BlockchainType, string> = {
    ethereum: "Ethereum",
    solana: "Solana",
    algorand: "Algorand",
    polkadot: "Polkadot",
    unknown: "Unknown",
  };
  return names[type];
};

// Format address based on blockchain type
export const formatAddress = (
  address: string,
  options: {
    prefixLength?: number;
    suffixLength?: number;
    includeBlockchainName?: boolean;
    withCopyButton?: boolean;
    className?: string;
  } = {}
): string | JSX.Element => {
  const {
    prefixLength = 6,
    suffixLength = 4,
    includeBlockchainName = false,
    withCopyButton = false,
    className = "",
  } = options;

  if (!address) return "";

  const blockchainType = detectBlockchainType(address);
  const [isCopied, setIsCopied] = React.useState(false);

  // Special handling for Ethereum addresses to preserve the 0x prefix
  let prefix = address.substring(0, blockchainType === "ethereum" ? prefixLength + 2 : prefixLength);
  let suffix = address.substring(address.length - suffixLength);

  // For Ethereum, adjust the prefix to include 0x and the right number of characters
  if (blockchainType === "ethereum") {
    prefix = address.substring(0, prefixLength + 2);
  }

  const formattedAddress = `${prefix}...${suffix}`;

  // If we don't need a React component, return the string
  if (!includeBlockchainName && !withCopyButton) {
    return formattedAddress;
  }

  // Create a React component with optional blockchain name and copy button
  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    toast({
      title: "Address copied",
      description: "The address has been copied to your clipboard",
    });
  };

  return (
    <span className={`inline-flex items-center gap-1 ${className}`}>
      {includeBlockchainName && (
        <span className="text-xs text-muted-foreground mr-1">
          {getBlockchainName(blockchainType)}:
        </span>
      )}
      {withCopyButton ? (
        <span className="flex flex-row cursor-pointer hover:opacity-80 gap-1 text-sm" onClick={handleCopy}>{formattedAddress}
          <div className="inline-flex items-center justify-center ">
            {isCopied ? <IconCheck className="h-4 w-4 text-muted-foreground" /> : <IconCopy className="h-4 w-4 text-muted-foreground" />}
          </div>
        </span>
      ) : (
        <>
          <span>{formattedAddress}</span>

        </>
      )}
    </span>
  );
}

// Component version for more flexibility
interface AddressDisplayProps {
  address: string;
  prefixLength?: number;
  suffixLength?: number;
  includeBlockchainName?: boolean;
  withCopyButton?: boolean;
  className?: string;
}

export const AddressDisplay: React.FC<AddressDisplayProps> = ({
  address,
  prefixLength = 6,
  suffixLength = 4,
  includeBlockchainName = false,
  withCopyButton = true,
  className = "",
}) => {
  return formatAddress(address, {
    prefixLength,
    suffixLength,
    includeBlockchainName,
    withCopyButton,
    className,
  }) as JSX.Element;
};
