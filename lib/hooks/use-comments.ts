"use client";

import { toast } from "@/components/ui/toast/toast";
import { useState, useCallback } from "react";

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
  parentId: string | null;
  replies: Comment[];
  upvotes: number;
  downvotes: number;
  userVote: "UPVOTE" | "DOWNVOTE" | null;
}

interface UseCommentsProps {
  proposalId: string;
  initialComments?: Comment[];
}

export function useComments({
  proposalId,
  initialComments = [],
}: UseCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/proposals/${proposalId}/comments`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch comments");
      }

      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching comments"
      );
      console.error("Fetch comments error:", err);
      toast.error({
        title: "Error",
        description: "Failed to load comments. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [proposalId]);

  const addComment = async (content: string, parentId?: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/proposals/${proposalId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content,
          parentId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add comment");
      }

      const newComment = await response.json();

      // Update comments state
      if (parentId) {
        // Add reply to existing comment
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === parentId
              ? { ...comment, replies: [...comment.replies, newComment] }
              : comment
          )
        );
      } else {
        // Add new top-level comment
        setComments((prevComments) => [newComment, ...prevComments]);
      }

      toast({
        title: "Success",
        description: parentId
          ? "Reply added successfully"
          : "Comment added successfully",
      });

      return newComment;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while adding comment"
      );
      console.error("Add comment error:", err);
      toast.error({
        title: "Error",
        description: "Failed to add your comment. Please try again.",
      });
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteComment = async (commentId: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete comment");
      }

      // Remove comment from state
      setComments((prevComments) =>
        prevComments.filter((comment) => {
          // Remove the comment if it's the one we're deleting
          if (comment.id === commentId) return false;

          // For other comments, filter out the deleted comment from replies
          if (comment.replies.length > 0) {
            comment.replies = comment.replies.filter(
              (reply) => reply.id !== commentId
            );
          }

          return true;
        })
      );

      toast({
        title: "Success",
        description: "Comment deleted successfully",
      });

      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting comment"
      );
      console.error("Delete comment error:", err);
      toast.error({
        title: "Error",
        description: "Failed to delete your comment. Please try again.",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Function to update a comment's vote count
  const updateCommentVote = (
    commentId: string,
    voteType: "UPVOTE" | "DOWNVOTE" | null,
    previousVote: "UPVOTE" | "DOWNVOTE" | null
  ) => {
    setComments((prevComments) => {
      // Helper function to update a single comment
      const updateComment = (comment: Comment): Comment => {
        if (comment.id === commentId) {
          // Calculate new vote counts
          let upvotes = comment.upvotes;
          let downvotes = comment.downvotes;

          // Remove previous vote if it exists
          if (previousVote === "UPVOTE") upvotes--;
          if (previousVote === "DOWNVOTE") downvotes--;

          // Add new vote if it exists
          if (voteType === "UPVOTE") upvotes++;
          if (voteType === "DOWNVOTE") downvotes++;

          return {
            ...comment,
            upvotes,
            downvotes,
            userVote: voteType,
          };
        }

        // If this comment has replies, check them too
        if (comment.replies.length > 0) {
          return {
            ...comment,
            replies: comment.replies.map(updateComment),
          };
        }

        return comment;
      };

      return prevComments.map(updateComment);
    });
  };

  return {
    comments,
    fetchComments,
    addComment,
    deleteComment,
    updateCommentVote,
    isLoading,
    error,
  };
}
