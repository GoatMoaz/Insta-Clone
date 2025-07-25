import { useState, useCallback } from "react";
import { useUserStore } from "@/store/useUserStore";
import apiClient from "@/config/apiClient";
import axios from "axios";
import { Post, Comment } from "@/interfaces/Post";

export const useFeed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>();
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const user = useUserStore((state) => state.user);
  const isFeedAvailable = !!user;

  const fetchFeed = useCallback(
    async (pageNumber: number, isLoadMore = false) => {
      if (!user) {
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
          // Append new posts to existing ones
          setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        } else {
          // Replace posts (initial load)
          setPosts(newPosts);
        }

        // Check if there are more posts to load
        // Assuming your API returns hasMore or you can check if returned posts < expected page size
        const hasMorePosts = newPosts.length > 0 && newPosts.length >= 10; // Adjust based on your page size
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
    [user]
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
        const response = await apiClient.get(`/Comment/${postId}`);
        setComments(response.data.comments || []);
      } catch (err: unknown) {
        let errorMessage = "An error occurred while fetching comments";
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

  const addCommentToPost = useCallback(
    async (postId: string, content: string) => {
      if (!user) {
        setError("User not authenticated");
        return;
      }

      try {
        await apiClient.post(`/Comment`, {
          postId,
          content,
        });
      } catch (err: unknown) {
        let errorMessage = "An error occurred while adding a comment";
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
    addCommentToPost,
    comments,
    posts,
    hasMore,
    currentPage,
  };
};
