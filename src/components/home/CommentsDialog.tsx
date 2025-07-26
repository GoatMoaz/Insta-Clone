import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Flex, VStack, Text, Image, Skeleton } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { getRelativeTime } from "@/utils/timeUtils";
import { Post, Comment } from "@/interfaces/Post";
import { PostFooter } from "./PostFooter";
import { useState, useCallback } from "react";
import { useUser } from "@/store/useUserStore";

interface CommentsDialogProps {
  post: Post;
  children: React.ReactNode;
  comments?: Comment[];
  isLoading?: boolean;
  onAddComment?: (comment: string) => void;
}

export const CommentsDialog = ({
  post,
  children,
  comments = [],
  isLoading,
  onAddComment,
}: CommentsDialogProps) => {
  const [optimisticComments, setOptimisticComments] = useState<Comment[]>([]);
  const user = useUser();

  // Combine server comments with optimistic comments, removing duplicates
  const displayComments = [
    ...comments,
    ...optimisticComments.filter(
      (optimistic) =>
        !comments.some((server) => server.commentId === optimistic.commentId)
    ),
  ];

  const handleAddComment = useCallback(
    (commentText: string) => {
      if (!commentText.trim() || !user) return;

      // Create a temporary comment for immediate UI update
      const tempComment: Comment = {
        userId: user.id,
        commentId: `temp-${Date.now()}`,
        userName: user.userName,
        profileImage: user.profilePic || "",
        content: commentText,
        time: new Date().toISOString(),
        isReacted: false,
        numberOfReactions: 0,
        numberOfReplies: 0,
      };

      // Add to optimistic comments for immediate UI update
      setOptimisticComments((prev) => [...prev, tempComment]);

      // Call the parent's add comment handler
      if (onAddComment) {
        onAddComment(commentText);
      }
    },
    [user, onAddComment]
  );

  const handleLikeComment = useCallback((commentId: string) => {
    setOptimisticComments((prev) =>
      prev.map((comment) =>
        comment.commentId === commentId
          ? {
              ...comment,
              isReacted: !comment.isReacted,
              numberOfReactions: comment.isReacted
                ? comment.numberOfReactions - 1
                : comment.numberOfReactions + 1,
            }
          : comment
      )
    );
  }, []);

  // Clear optimistic comments when dialog closes
  const handleDialogClose = useCallback(() => {
    setOptimisticComments([]);
  }, []);

  return (
    <DialogRoot
      size={"xl"}
      placement="center"
      onOpenChange={(details) => {
        if (!details.open) {
          handleDialogClose();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Flex direction={{ base: "column", md: "row" }} gap={4}>
            <Flex
              display={{ base: "flex", md: "none" }}
              bg={"black"}
              w={"full"}
              justify={"center"}
            >
              <Image src={post.media[0]} w={"320px"} />
            </Flex>

            <Image
              src={post.media[0]}
              w={"50%"}
              display={{ base: "none", md: "block" }}
            />

            {/* Comments Section */}
            {!isLoading ? (
              <VStack justifyContent={"space-between"} w={"full"}>
                {/* Comments List */}
                <VStack
                  overflowY="auto"
                  align="stretch"
                  _scrollbar={{
                    display: "none",
                  }}
                  gap={3}
                  p={3}
                  h={"400px"}
                  display={{ base: "none", sm: "flex" }}
                  w={"full"}
                >
                  {displayComments.length === 0 ? (
                    <Flex
                      justify="center"
                      align="center"
                      minH="300px"
                      direction="column"
                      gap={2}
                    >
                      <Text fontSize="lg" color="gray.500">
                        💬
                      </Text>
                      <Text fontSize="md" color="gray.500" fontWeight="medium">
                        No comments yet
                      </Text>
                      <Text fontSize="sm" color="gray.400" textAlign="center">
                        Be the first to comment on this post
                      </Text>
                    </Flex>
                  ) : (
                    displayComments.map((comment) => (
                      <Flex key={comment.commentId} gap={3}>
                        <Avatar
                          src={comment.profileImage}
                          name={comment.userName}
                          size="sm"
                        />
                        <VStack align="start" gap={1} flex={1}>
                          <Flex
                            gap={2}
                            justify={"space-between"}
                            align="flex-start"
                            w="full"
                          >
                            <Flex gap={2} flex={1} minW={0}>
                              <Text
                                fontWeight="bold"
                                fontSize="sm"
                                flexShrink={0}
                              >
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
                            </Flex>
                            <Text
                              fontSize="xs"
                              color={comment.isReacted ? "red.500" : "gray.500"}
                              cursor="pointer"
                              onClick={() =>
                                handleLikeComment(comment.commentId)
                              }
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
                          </Flex>
                        </VStack>
                      </Flex>
                    ))
                  )}
                </VStack>

                {/* Add Comment Section */}
                <PostFooter
                  isProfilePage={false}
                  post={post}
                  isModal={true}
                  onAddComment={handleAddComment}
                />
              </VStack>
            ) : (
              <VStack justify={"space-between"} align={"flex-start"} w={"full"}>
                <VStack gap={4}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Flex key={i}>
                      <Skeleton rounded={"full"} height={10} width={10} />
                      <VStack align="start" ml={4}>
                        <Skeleton height={3} width={200} />
                        <Skeleton height={3} width={150} />
                      </VStack>
                    </Flex>
                  ))}
                </VStack>
                <VStack gap={4} w={"full"}>
                  <Flex justify={"space-between"} w={"full"}>
                    <Skeleton height={7} width={100} />
                    <Skeleton height={7} width={50} />
                  </Flex>
                  <Skeleton height={10} width={"full"} />
                  <Skeleton height={10} width={"full"} />
                </VStack>
              </VStack>
            )}
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};
