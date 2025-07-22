import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import { FeedPost } from "@/components/home/FeedPost";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";
import { Post } from "@/interfaces/Post";

export const FeedPosts = ({
  posts,
  isLoading,
  error,
}: {
  posts: Post[];
  isLoading: boolean;
  error: string | null;
}) => {
  return (
    <Container maxW={"lg"} px={2} pb={20}>
      {isLoading &&
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
      {!isLoading && (
        <>
          {error && <Box color="red.500">{error}</Box>}
          {posts.map((post) => (
            <FeedPost key={post.postId} post={post} />
          ))}
        </>
      )}
    </Container>
  );
};
