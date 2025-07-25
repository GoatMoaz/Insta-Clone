import { Box, Container, Flex, VStack, Text } from "@chakra-ui/react";
import { FeedPost } from "@/components/home/FeedPost";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import { Post } from "@/interfaces/Post";

export const FeedPosts = ({
  posts,
  isLoading,
  isLoadingMore,
  error,
  hasMore,
}: {
  posts: Post[];
  isLoading: boolean;
  isLoadingMore?: boolean;
  error: string | null;
  hasMore?: boolean;
}) => {
  return (
    <Container maxW={"lg"} px={2} pb={20}>
      {/* Initial loading skeleton */}
      {isLoading && posts.length === 0 &&
        [0, 1, 2, 3].map((_, i) => (
          <VStack key={i} gap={4} align={"flex-start"} mb={10}>
            <Flex gap={2}>
              <SkeletonCircle size={10} />
              <VStack gap={2} align={"flex-start"}>
                <Skeleton height={3} w={200} />
                <Skeleton height={3} w={200} />
              </VStack>
            </Flex>
            <Skeleton w={"full"}>
              <Box h={500}>Content Wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {/* Posts */}
      {!isLoading && (
        <>
          {error && <Box color="red.500" mb={4}>{error}</Box>}
          {posts.map((post) => (
            <FeedPost key={post.postId} post={post} />
          ))}
        </>
      )}

      {/* Show posts even while loading more */}
      {isLoading && posts.length > 0 && (
        <>
          {posts.map((post) => (
            <FeedPost key={post.postId} post={post} />
          ))}
        </>
      )}

      {/* Loading more indicator */}
      {isLoadingMore && (
        <VStack gap={4} align={"flex-start"} mb={10}>
          <Flex gap={2}>
            <SkeletonCircle size={10} />
            <VStack gap={2} align={"flex-start"}>
              <Skeleton height={3} w={200} />
              <Skeleton height={3} w={200} />
            </VStack>
          </Flex>
          <Skeleton w={"full"}>
            <Box h={500}>Loading more posts...</Box>
          </Skeleton>
        </VStack>
      )}

      {/* No more posts indicator */}
      {!isLoading && !isLoadingMore && posts.length > 0 && !hasMore && (
        <Box textAlign="center" py={8}>
          <Text color="gray.500" fontSize="sm">
            You've reached the end! No more posts to load.
          </Text>
        </Box>
      )}
     
    </Container>
  );
};
