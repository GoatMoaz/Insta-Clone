import { CommentLogo, NotificationsLogo, UnlikeLogo } from "@/assets/constants";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { CommentsDialog } from "./CommentsDialog";
import { Post } from "@/interfaces/Post";
import { useFeed } from "@/hooks/useFeed";
import { useUser } from "@/store/useUserStore";
export const PostFooter = ({
  isProfilePage,
  post,
  isModal,
  onAddComment,
  replyTo = "",
  onReplyChange,
  replyingToCommentId,
  skipApiCall = false,
}: {
  isProfilePage: boolean;
  post: Post;
  isModal: boolean;
  onAddComment?: (comment: string) => void;
  replyTo?: string;
  onReplyChange?: (value: string) => void;
  replyingToCommentId?: string | null;
  skipApiCall?: boolean;
}) => {
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [comment, setComment] = useState("");
  const [localInputValue, setLocalInputValue] = useState(""); // Add local state for non-modal input
  const [saved, isSaved] = useState(false);
  const user = useUser();

  const {
    addReactionToPost,
    fetchCommentsForPost,
    addCommentToPost,
  } = useFeed();

  const addLikeHandler = () => {
    addReactionToPost(post.postId);

    setLiked((prev) => !prev);
  };

  const fetchCommentsHandler = () => {
    fetchCommentsForPost(post.postId);
  };

  const addCommentHandler = (comment: string) => {
    if (!comment.trim()) return;

    if (isModal && onAddComment) {
      // If we're in a modal, use the callback to update the modal's UI immediately
      onAddComment(comment);
      // Clear the reply after submitting
      if (onReplyChange) {
        onReplyChange("");
      }
    } else {
      // Regular behavior for non-modal contexts
      setComment(comment);
      setCommented(true);
    }

    // Only call the API if skipApiCall is false
    if (!skipApiCall) {
      // Use the replyingToCommentId if this is a reply
      const parentCommentId = replyingToCommentId || undefined;
      addCommentToPost(post.postId, comment, parentCommentId);
    }
  };

  const keyboardHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const inputValue = (e.target as HTMLInputElement).value;
      addCommentHandler(inputValue);
      if (isModal && onReplyChange) {
        onReplyChange("");
      } else {
        setLocalInputValue("");
      }
    } else if (e.key === "Backspace" && (isModal ? replyTo : localInputValue)) {
      // Handle backspace to remove @username as a single unit
      const input = e.target as HTMLInputElement;
      const cursorPosition = input.selectionStart || 0;
      const value = input.value;

      // Check if we're at the end of an @mention
      const mentionRegex = /@\w+\s/g;
      let match;
      let mentionEnd = -1;

      // Find all @mentions and check if cursor is at the end of one
      while ((match = mentionRegex.exec(value)) !== null) {
        const mentionStart = match.index;
        mentionEnd = match.index + match[0].length;

        // If cursor is right after a mention (including the space)
        if (cursorPosition === mentionEnd) {
          e.preventDefault();
          const newValue =
            value.substring(0, mentionStart) + value.substring(mentionEnd);
          if (isModal && onReplyChange) {
            onReplyChange(newValue);
          } else {
            setLocalInputValue(newValue);
          }
          // Set cursor position after the removal
          setTimeout(() => {
            input.setSelectionRange(mentionStart, mentionStart);
          }, 0);
          return;
        }

        // If cursor is within the mention (but not at the very start)
        if (cursorPosition > mentionStart && cursorPosition <= mentionEnd) {
          e.preventDefault();
          const newValue =
            value.substring(0, mentionStart) + value.substring(mentionEnd);
          if (isModal && onReplyChange) {
            onReplyChange(newValue);
          } else {
            setLocalInputValue(newValue);
          }
          // Set cursor position after the removal
          setTimeout(() => {
            input.setSelectionRange(mentionStart, mentionStart);
          }, 0);
          return;
        }
      }
    }
  };

  return (
    <>
      <Flex direction={"column"} w={"full"} pt={0} my={4}>
        <Flex justify={"space-between"} align={"center"} mb={2}>
          <Flex gap={4}>
            <Box
              onClick={addLikeHandler}
              cursor={"pointer"}
              bg={"transparent"}
              fontSize={18}
            >
              {post.isReacted || liked ? <UnlikeLogo /> : <NotificationsLogo />}
            </Box>
            <CommentsDialog
              post={post}
            >
              <Box
                bg={"transparent"}
                cursor={"pointer"}
                fontSize={18}
                onClick={fetchCommentsHandler}
              >
                <CommentLogo />
              </Box>
            </CommentsDialog>
          </Flex>
          <Box
            onClick={() => isSaved((prev) => !prev)}
            bg={"transparent"}
            cursor={"pointer"}
          >
            {saved ? <BsBookmarkFill size={23} /> : <BsBookmark size={23} />}
          </Box>
        </Flex>

        <Flex direction={"column"}>
          <Text fontWeight={600} fontSize={"sm"}>
            {liked ? post.likesCount + 1 : post.likesCount} likes
          </Text>
          {!isProfilePage && (
            <>
              <Text fontWeight={600} fontSize={"sm"}>
                <Text as={"span"}>{post.userName} </Text>
                <Text as={"span"} fontWeight={400}>
                  {post.content}
                </Text>
              </Text>

              {!!post.commentsCount && !isModal && (
                <CommentsDialog
                  post={post}
                >
                  <Text
                    fontSize={"sm"}
                    color={"gray"}
                    cursor={"pointer"}
                    onClick={fetchCommentsHandler}
                  >
                    View all {post.commentsCount} comments
                  </Text>
                </CommentsDialog>
              )}

              {commented && !isModal && (
                <Flex justify={"space-between"} align={"center"} mt={2}>
                  <Flex align={"center"} gap={1}>
                    <Text fontWeight="bold" fontSize={"sm"}>
                      {user?.userName}
                    </Text>
                    <Text fontSize="xs">{comment}</Text>
                  </Flex>
                  <Text
                    fontSize="xs"
                    color="gray.500"
                    cursor="pointer"
                    _hover={{ color: "red.300" }}
                  >
                    ♥
                  </Text>
                </Flex>
              )}
            </>
          )}
        </Flex>

        <Input
          variant={"flushed"}
          placeholder="Add a comment ..."
          fontSize={14}
          name="comment"
          value={isModal ? replyTo : localInputValue}
          onChange={(e) => {
            if (isModal && onReplyChange) {
              onReplyChange(e.target.value);
            } else {
              setLocalInputValue(e.target.value);
            }
          }}
          onKeyDown={keyboardHandler}
        />
      </Flex>
    </>
  );
};
