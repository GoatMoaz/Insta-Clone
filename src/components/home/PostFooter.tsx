import { CommentLogo, NotificationsLogo, UnlikeLogo } from "@/assets/constants";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { CommentsDialog } from "./CommentsDialog";
import { Post } from "@/interfaces/Post";

export const PostFooter = ({
  isProfilePage,
  post,
  handleAddComment,
}: {
  isProfilePage: boolean;
  post: Post;
  handleAddComment?: (comment: string) => void;
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, isSaved] = useState(false);

  const taggleLikeHandler = () => {
    setLiked((prev) => !prev);
  };

  return (
    <>
      <Flex direction={"column"} w={"full"} pt={0} my={4}>
        <Flex justify={"space-between"} align={"center"} mb={2}>
          <Flex gap={4}>
            <Box
              onClick={taggleLikeHandler}
              cursor={"pointer"}
              bg={"transparent"}
              fontSize={18}
            >
              {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
            </Box>
            <CommentsDialog post={post}>
              <Box bg={"transparent"} cursor={"pointer"} fontSize={18}>
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
            {post.likes} likes
          </Text>
          {!isProfilePage && (
            <>
              <Text fontWeight={600} fontSize={"sm"}>
                <Text as={"span"}>{post.userName} </Text>
                <Text as={"span"} fontWeight={400}>
                  Feeling good
                </Text>
              </Text>

              {!!post.comments && (
                <Text fontSize={"sm"} color={"gray"} cursor={"pointer"}>
                  View all {post.comments} comments
                </Text>
              )}
            </>
          )}
        </Flex>

        <Input
          variant={"flushed"}
          placeholder="Add a comment ..."
          fontSize={14}
          onKeyDown={(e) => {
            if (e.key === "Enter" && handleAddComment) {
              const comment = (e.target as HTMLInputElement).value;
              handleAddComment(comment);
              (e.target as HTMLInputElement).value = "";
            }
          }}
        />
      </Flex>
    </>
  );
};
