import { Box, Container, Flex } from "@chakra-ui/react";
import { FeedPosts } from "@/components/home/FeedPosts";
import { SuggestedUsers } from "@/components/home/SuggestedUsers";
import { useEffect, useState } from "react";
import { useFeed } from "@/hooks/useFeed";

export const HomePage = () => {
  const { fetchFeed, isLoading, error, posts } = useFeed();
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      await fetchFeed(pageNumber);
    }
    fetchData();
    
  }, [pageNumber]);

  return (
    <Container>
      <Flex gap={20}>
        <Box flex={2} py={10}>
          <FeedPosts posts={posts} isLoading={isLoading} error={error} />
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
