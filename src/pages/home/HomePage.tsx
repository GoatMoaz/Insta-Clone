import { Box, Container, Flex } from "@chakra-ui/react";
import { FeedPosts } from "@/components/home/FeedPosts";
import { SuggestedUsers } from "@/components/home/SuggestedUsers";
import { useEffect } from "react";
import { useFeed } from "@/hooks/useFeed";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export const HomePage = () => {
  const {
    fetchFeed,
    isLoading,
    isLoadingMore,
    error,
    posts,
    loadMorePosts,
    hasMore,
  } = useFeed();

  // Set up infinite scrolling
  useInfiniteScroll({
    onLoadMore: loadMorePosts,
    hasMore,
    isLoading: isLoading || isLoadingMore,
    threshold: 300, // Load more when user is 300px from bottom
  });

  useEffect(() => {
    const fetchData = async () => {
      await fetchFeed(1);
    };
    fetchData();
  }, [fetchFeed]);

  return (
    <Container>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <FeedPosts
            posts={posts}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            error={error}
            hasMore={hasMore}
          />
        </Box>
        <Box
          flex={3}
          mr={20}
          display={{ base: "none", xl: "block" }}
          maxW={"300px"}
        >
          <SuggestedUsers />
        </Box>
      </Flex>
    </Container>
  );
};
