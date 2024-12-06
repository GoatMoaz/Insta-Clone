import { useEffect, useState } from "react";
import { Box, Container, Flex, VStack } from "@chakra-ui/react";
import { FeedPost } from "@/components/home/FeedPost";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";

export const FeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Container maxW={"xl"} px={2}>
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
          <FeedPost username="jane Doe" img="/img1.png" avatar="/img1.png" />
          <FeedPost username="Josh" img="/img2.png" avatar="/img2.png" />
          <FeedPost username="Mary" img="/img3.png" avatar="/img3.png" />
          <FeedPost username="John Doe" img="/img4.png" avatar="/img4.png" />
        </>
      )}
    </Container>
  );
};
