import type { Proposal } from "@/types/proposal"
import { transformSession } from "./transform"
import session1Data from "./session1"
import session2Data from "./session2"
import session3Data from "./session3"
import session4Data from "./session4"

// Transform raw session data into Proposal arrays
export const session1Proposals: Proposal[] = transformSession(session1Data, 1)
export const session2Proposals: Proposal[] = transformSession(session2Data, 2)
export const session3Proposals: Proposal[] = transformSession(session3Data, 3)
export const session4Proposals: Proposal[] = transformSession(session4Data, 4)

// Combine all sessions into a single array
export const proposals: Proposal[] = [...session1Proposals, ...session2Proposals, ...session3Proposals, ...session4Proposals]

