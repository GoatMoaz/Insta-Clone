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
}: {
  isProfilePage: boolean;
  post: Post;
  isModal: boolean;
  onAddComment?: (comment: string) => void;
}) => {
  const [liked, setLiked] = useState(false);
  const [commented, setCommented] = useState(false);
  const [comment, setComment] = useState("");
  const [saved, isSaved] = useState(false);
  const user = useUser();

  const {
    addReactionToPost,
    fetchCommentsForPost,
    comments,
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
    } else {
      // Regular behavior for non-modal contexts
      setComment(comment);
      setCommented(true);
    }

    // Always call the API to persist the comment
    addCommentToPost(post.postId, comment);
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
            <CommentsDialog post={post} comments={comments}>
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
                <CommentsDialog post={post} comments={comments}>
                  <Text fontSize={"sm"} color={"gray"} cursor={"pointer"}>
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addCommentHandler((e.target as HTMLInputElement).value);
              (e.target as HTMLInputElement).value = "";
            }
          }}
        />
      </Flex>
    </>
  );
};
