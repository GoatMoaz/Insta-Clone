import { useEffect, useCallback, useRef } from "react";

interface UseInfiniteScrollOptions {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  threshold?: number; // Distance from bottom to trigger load (in pixels)
}

export const useInfiniteScroll = ({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 200,
}: UseInfiniteScrollOptions) => {
  const isLoadingRef = useRef(isLoading);
  const hasMoreRef = useRef(hasMore);

  // Update refs when props change
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  const handleScroll = useCallback(() => {
    // Check if we're near the bottom of the page
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;

    // If we're close to the bottom and conditions are met, load more
    if (
      distanceFromBottom < threshold &&
      hasMoreRef.current &&
      !isLoadingRef.current
    ) {
      onLoadMore();
    }
  }, [onLoadMore, threshold]);

  useEffect(() => {
    const throttledHandleScroll = throttle(handleScroll, 200);

    window.addEventListener("scroll", throttledHandleScroll);

    return () => {
      window.removeEventListener("scroll", throttledHandleScroll);
    };
  }, [handleScroll]);
};

// Throttle function to limit how often scroll handler runs
const throttle = <T extends (...args: unknown[]) => void>(func: T, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return (...args: Parameters<T>) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};
