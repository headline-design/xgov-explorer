import type { Project } from "@/types/project"
import { transformSession } from "./transform"
import session1Data from "./session1"
import session2Data from "./session2"
import session3Data from "./session3"
import session4Data from "./session4"

// Transform raw session data into Project arrays
export const session1Projects: Project[] = transformSession(session1Data, 1)
export const session2Projects: Project[] = transformSession(session2Data, 2)
export const session3Projects: Project[] = transformSession(session3Data, 3)
export const session4Projects: Project[] = transformSession(session4Data, 4)

// Combine all sessions into a single array
export const projects: Project[] = [...session1Projects, ...session2Projects, ...session3Projects, ...session4Projects]

