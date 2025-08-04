import { Box, Flex, Text } from "@chakra-ui/react";
import { Comment } from "@/interfaces/Post";
import { getRelativeTime } from "@/utils/timeUtils";

export const CommentUI = ({
  comment,
  handleReply,
  expandedComments,
  handleLoadReplies,
  handleExpandReplies,
}: {
  comment: Comment;
  handleReply: (username: string, commentId: string) => void;
  handleLoadReplies: (commentId: string) => void;
  expandedComments: Set<string>;
  handleExpandReplies: (commentId: string) => void;
}) => {
  return (
    <>
      <Flex gap={2} justify={"space-between"} align="flex-start" w="full">
        <Box>
          <Text fontWeight="bold" fontSize="sm" flexShrink={0}>
            {comment.userName}
          </Text>
          <Text
            fontSize="sm"
            wordBreak="break-word"
            whiteSpace="pre-wrap"
            flex={1}
          >
            {comment.content}
          </Text>
        </Box>
        <Text
          fontSize="xs"
          color={comment.isReacted ? "red.500" : "gray.500"}
          cursor="pointer"
          onClick={() => {}}
          _hover={{ color: "red.300" }}
          flexShrink={0}
        >
          ♥
        </Text>
      </Flex>
      <Flex gap={4} fontSize="xs" color="gray.500">
        <Text>{getRelativeTime(comment.time)}</Text>
        {comment.numberOfReactions > 0 && (
          <Text>{comment.numberOfReactions} likes</Text>
        )}

        <Text
          _hover={{
            color: "white",
          }}
          cursor={"pointer"}
          transition={"color 0.2s"}
          onClick={() => handleReply(comment.userName, comment.commentId)}
        >
          Reply
        </Text>
      </Flex>
      {comment.numberOfReplies > 0 && (
        <Text
          fontSize="xs"
          cursor="pointer"
          color="gray.500"
          transition={"color 0.2s"}
          onClick={() => {
            if (expandedComments.has(comment.commentId)) {
              // If already expanded, just collapse
              handleExpandReplies(comment.commentId);
            } else {
              // If not expanded, load replies and expand
              handleLoadReplies(comment.commentId);
            }
          }}
          _hover={{ color: "white" }}
        >
          {expandedComments.has(comment.commentId)
            ? "Hide Replies"
            : `View ${comment.numberOfReplies} Replies`}
        </Text>
      )}
    </>
  );
};
