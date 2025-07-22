import { useState } from "react";
import { useUserStore } from "@/store/useUserStore";
import apiClient from "@/config/apiClient";
import axios from "axios";
import { Post } from "@/interfaces/Post";

export const useFeed = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const user = useUserStore((state) => state.user);
  const isFeedAvailable = !!user;
  const fetchFeed = async (PageNumber: number) => {
    if (!user) {
      setError("User not authenticated");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(`/Home?PageNumber=${PageNumber}`);
      setIsLoading(false);
      setPosts(response.data.items);
    } catch (err: unknown) {
      setIsLoading(false);
      let errorMessage = "An error occurred while fetching the feed";
      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      setError(errorMessage);
      return null;
    }
  };

  return {
    isFeedAvailable,
    user,
    isLoading,
    error,
    fetchFeed,
    posts,
  };
};
