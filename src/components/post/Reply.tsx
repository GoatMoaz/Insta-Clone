import { Box, Flex, Skeleton, Text, VStack } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Comment, Reply } from "@/interfaces/Post";
import { getRelativeTime } from "@/utils/timeUtils";

export const ReplyUI = ({
  expandedComments,
  comment,
  loadingReplies,
  commentReplies,
}: {
  expandedComments: Set<string>;
  comment: Comment;
  loadingReplies: Set<string>;
  commentReplies: Reply[];
}) => {
  return (
    <VStack
      align="stretch"
      display={expandedComments.has(comment.commentId) ? "flex" : "none"}
      mt={2}
      w="full"
    >
      {/* Loading Skeleton for Replies */}
      {loadingReplies.has(comment.commentId) && (
        <VStack align="start">
          {[1, 2, 3].map((i) => (
            <Flex key={i} width="full" gap={3}>
              <Skeleton rounded={"full"} height={8} width={8} />
              <VStack align="start">
                <Skeleton height={4} width={200} />
                <Skeleton height={4} width={150} />
              </VStack>
            </Flex>
          ))}
        </VStack>
      )}

      {/* Fetched Replies */}
      {!loadingReplies.has(comment.commentId) &&
        commentReplies.map((reply) => (
          <Flex key={reply.commentId} gap={3}>
            <Avatar
              src={reply.userProfilePic}
              name={reply.userName}
              size="sm"
            />
            <VStack align="start" gap={1} w="full">
              <Flex
                gap={2}
                justify={"space-between"}
                align="flex-start"
                w="full"
              >
                <Box>
                  <Text fontWeight="bold" fontSize="sm">
                    {reply.userName}
                  </Text>
                  <Text
                    fontSize="sm"
                    wordBreak="break-word"
                    whiteSpace="pre-wrap"
                  >
                    {reply.content}
                  </Text>
                </Box>
                <Text
                  fontSize="xs"
                  color={reply.isReacted ? "red.500" : "gray.500"}
                  cursor="pointer"
                  onClick={() => {}}
                  _hover={{ color: "red.300" }}
                  flexShrink={0}
                >
                  ♥
                </Text>
              </Flex>
              <Flex gap={4} fontSize="xs" color="gray.500">
                <Text>{getRelativeTime(reply.time)}</Text>
                {reply.likesCount > 0 && <Text>{reply.likesCount} likes</Text>}
              </Flex>
            </VStack>
          </Flex>
        ))}
    </VStack>
  );
};
