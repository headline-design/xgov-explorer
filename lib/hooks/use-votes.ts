"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "@/components/ui/toast/toast";

type VoteType = "UPVOTE" | "DOWNVOTE" | null;

type VotableType = "proposal" | "comment";

interface UseVotesProps {
  initialVoteCount?: {
    upvotes: number;
    downvotes: number;
  };
  initialUserVote?: VoteType;
  entityId: string;
  entityType: VotableType;
}

export function useVotes({
  initialVoteCount = { upvotes: 0, downvotes: 0 },
  initialUserVote = null,
  entityId,
  entityType,
}: UseVotesProps) {
  const { data: session } = useSession();
  const [voteCount, setVoteCount] = useState(initialVoteCount);
  const [userVote, setUserVote] = useState<VoteType>(initialUserVote);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch initial vote counts and user vote
  useEffect(() => {
    const fetchVotes = async () => {
      try {
        // Fetch vote counts
        const countResponse = await fetch(`/api/proposals/${entityId}/votes`);
        if (countResponse.ok) {
          const countData = await countResponse.json();
          setVoteCount({
            upvotes: countData.upvotes,
            downvotes: countData.downvotes,
          });
        }

        // Only fetch user vote if user is logged in
        if (session?.user) {
          const userVoteResponse = await fetch(
            `/api/votes/user?entityId=${entityId}&entityType=${entityType}`
          );
          if (userVoteResponse.ok) {
            const userData = await userVoteResponse.json();
            if (userData.vote) {
              setUserVote(userData.vote.voteType);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };

    fetchVotes();
  }, [entityId, entityType, session]);

  const vote = async (voteType: VoteType) => {
    if (!session?.user) {
      toast.error({
        title: "Authentication required",
        description: "Please sign in to vote",
      });
      return;
    }

    if (isLoading) return;

    try {
      setIsLoading(true);

      // If user is voting the same way, remove their vote
      const newVoteType = userVote === voteType ? null : voteType;

      // Optimistically update UI
      if (userVote === "UPVOTE" && newVoteType !== "UPVOTE") {
        setVoteCount((prev) => ({ ...prev, upvotes: prev.upvotes - 1 }));
      } else if (userVote === "DOWNVOTE" && newVoteType !== "DOWNVOTE") {
        setVoteCount((prev) => ({ ...prev, downvotes: prev.downvotes - 1 }));
      }

      if (newVoteType === "UPVOTE" && userVote !== "UPVOTE") {
        setVoteCount((prev) => ({ ...prev, upvotes: prev.upvotes + 1 }));
      } else if (newVoteType === "DOWNVOTE" && userVote !== "DOWNVOTE") {
        setVoteCount((prev) => ({ ...prev, downvotes: prev.downvotes + 1 }));
      }

      setUserVote(newVoteType);

      // Send request to API
      const response = await fetch("/api/votes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entityId,
          entityType,
          voteType: newVoteType,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to vote");
      }

      const data = await response.json();

      // Update with server data
      setVoteCount(data.voteCount);
      setUserVote(data.userVote);
    } catch (error) {
      console.error("Vote error:", error);
      toast.error({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while voting",
      });

      // Revert to initial state on error
      setVoteCount(initialVoteCount);
      setUserVote(initialUserVote);
    } finally {
      setIsLoading(false);
    }
  };

  const upvote = () => vote("UPVOTE");
  const downvote = () => vote("DOWNVOTE");

  return {
    voteCount,
    userVote,
    upvote,
    downvote,
    isLoading,
  };
}
