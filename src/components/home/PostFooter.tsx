import { CommentLogo, NotificationsLogo, UnlikeLogo } from "@/assets/constants";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";

export const PostFooter = ({
  username,
  isProfilePage,
}: {
  username: string;
  isProfilePage: boolean;
}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);
  const [saved, isSaved] = useState(false);

  const taggleLikeHandler = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (prev += liked ? -1 : 1));
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
            <Box bg={"transparent"} cursor={"pointer"} fontSize={18}>
              <CommentLogo />
            </Box>
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
            {likes} likes
          </Text>
          {!isProfilePage && (
            <>
              <Text fontWeight={600} fontSize={"sm"}>
                <Text as={"span"}>{username} </Text>
                <Text as={"span"} fontWeight={400}>
                  Feeling good
                </Text>
              </Text>

              <Text fontSize={"sm"} color={"gray"} cursor={"pointer"}>
                View all 100 comments
              </Text>
            </>
          )}
        </Flex>

        <Input
          variant={"flushed"}
          placeholder="Add a comment ..."
          fontSize={14}
        />
      </Flex>
    </>
  );
};
