import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Flex, VStack, Text, Image } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { getRelativeTime } from "@/utils/timeUtils";
import { Post, Comment } from "@/interfaces/Post";
import { PostFooter } from "./PostFooter";
import { useState, useEffect } from "react";
import { useUser } from "@/store/useUserStore";

interface CommentsDialogProps {
  post: Post;
  children: React.ReactNode;
  comments?: Comment[];
  onAddComment?: (comment: string) => void;
}

export const CommentsDialog = ({
  post,
  children,
  comments = [],
  onAddComment,
}: CommentsDialogProps) => {
  const [localComments, setLocalComments] = useState<Comment[]>(comments);
  const user = useUser();

  // Update local comments when props change
  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  const handleAddComment = (commentText: string) => {
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

    // Update local state immediately for optimistic UI
    setLocalComments((prev) => [...prev, tempComment]);

    // Call the parent's add comment handler
    if (onAddComment) {
      onAddComment(commentText);
    }
  };

  const handleLikeComment = (commentId: string) => {
    setLocalComments((prev) =>
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
  };

  return (
    <DialogRoot size={"xl"} placement="center">
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
                maxH={"300px"}
                display={{ base: "none", sm: "flex" }}
                w={"full"}
              >
                {localComments.map((comment) => (
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
                        </Flex>
                        <Text
                          fontSize="xs"
                          color={comment.isReacted ? "red.500" : "gray.500"}
                          cursor="pointer"
                          onClick={() => handleLikeComment(comment.commentId)}
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
                ))}
              </VStack>

              {/* Add Comment Section */}
              <PostFooter
                isProfilePage={false}
                post={post}
                isModal={true}
                onAddComment={handleAddComment}
              />
            </VStack>
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};
