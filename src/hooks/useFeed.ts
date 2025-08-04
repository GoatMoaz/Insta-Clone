import { useState, useCallback } from "react";
import { useUserStore } from "@/store/useUserStore";
import apiClient from "@/config/apiClient";
import axios from "axios";
import { Post, Comment, Reply } from "@/interfaces/Post";

export const useFeed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>();
  const [replies, setReplies] = useState<Reply[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useUserStore((state) => state.user);
  const isFeedAvailable = !!user;

  const fetchFeed = useCallback(
    async (pageNumber: number, isLoadMore = false) => {
      const currentUser = useUserStore.getState().user;

      if (!currentUser) {
        setError("User not authenticated");
        return;
      }

      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      try {
        const response = await apiClient.get(`/Home?PageNumber=${pageNumber}`);
        const newPosts = response.data.items || [];

        if (isLoadMore) {
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        } else {
          setPosts(newPosts);
        }

        const hasMorePosts = newPosts.length > 0 && newPosts.length >= 10;
        setHasMore(hasMorePosts);
        setCurrentPage(pageNumber);
      } catch (err: unknown) {
        setIsLoading(false);
        let errorMessage = "An error occurred while fetching the feed";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    []
  );

  const loadMorePosts = useCallback(async () => {
    if (!hasMore || isLoadingMore || isLoading) return;
    await fetchFeed(currentPage + 1, true);
  }, [hasMore, isLoadingMore, isLoading, currentPage, fetchFeed]);

  const refreshFeed = useCallback(async () => {
    setCurrentPage(1);
    setHasMore(true);
    await fetchFeed(1, false);
  }, [fetchFeed]);

  const addReactionToPost = useCallback(
    async (postId: string) => {
      if (!user) {
        setError("User not authenticated");
        return;
      }

      try {
        await apiClient.post(`/Reaction`, {
          postId,
        });
      } catch (err: unknown) {
        let errorMessage = "An error occurred while liking the post";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      }
    },
    [user]
  );

  const fetchCommentsForPost = useCallback(
    async (postId: string) => {
      if (!user) {
        setError("User not authenticated");
        return;
      }

      try {
        setIsLoading(true);
        const response = await apiClient.get(`/Comment/${postId}`);

        const comments = response.data.comments || [];
        setComments(comments);
      } catch (err: unknown) {
        let errorMessage = "An error occurred while fetching comments";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    },
    [user]
  );

  const addCommentToPost = useCallback(
    async (postId: string, content: string, parentCommentId?: string) => {
      if (!user) {
        setError("User not authenticated");
        return;
      }

      try {
        const payload: {
          postId: string;
          content: string;
          parentCommentId?: string;
        } = {
          postId,
          content,
        };

        if (parentCommentId) {
          payload.parentCommentId = parentCommentId;
        }

        const response = await apiClient.post(`/Comment`, payload);

        if (parentCommentId) {
          const replies = response.data.comments || [];
          setReplies(replies);

          return {
            success: true,
            replies: replies,
            isReply: true,
            parentCommentId,
          };
        } else {
          const updatedComments = response.data.comments || [];
          setComments(updatedComments);

          return { success: true, comments: updatedComments, isReply: false };
        }
      } catch (err: unknown) {
        let errorMessage = "An error occurred while adding a comment";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }
    },
    [user]
  );

  const fetchRepliesForComment = useCallback(
    async (commentId: string, postId: string) => {
      if (!user) {
        setError("User not authenticated");
        return [];
      }

      try {
        const response = await apiClient.get(
          `/Comment/${postId}/comment/${commentId}`
        );

        const replies = response.data.items || [];
        setReplies(replies);
        return {
          success: true,
          replies: replies,
          isReply: true,
          parentCommentId: commentId,
        };
      } catch (err: unknown) {
        let errorMessage = "An error occurred while fetching replies";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message || err.message;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
        setError(errorMessage);
        return [];
      }
    },
    [user]
  );

  return {
    isFeedAvailable,
    user,
    isLoading,
    isLoadingMore,
    error,
    fetchFeed,
    loadMorePosts,
    refreshFeed,
    addReactionToPost,
    fetchCommentsForPost,
    fetchRepliesForComment,
    addCommentToPost,
    comments,
    replies,
    posts,
    hasMore,
    currentPage,
  };
};
