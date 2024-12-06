import { CommentLogo, NotificationsLogo, UnlikeLogo } from "@/assets/constants";
import { Box, Flex, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { InputGroup } from "../ui/input-group";

export const PostFooter = ({ username }: { username: string }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);

  const taggleLikeHandler = () => {
    setLiked((prev) => !prev);
    setLikes((prev) => (prev += liked ? -1 : 1));
  };

  return (
    <>
      <Flex direction={"column"} w={"full"} pt={0} my={4}>
        <Flex gap={4} mb={4}>
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

        <Flex direction={"column"} mb={2}>
          <Text fontWeight={600} fontSize={"sm"}>
            {likes} likes
          </Text>
          <Text fontWeight={600} fontSize={"sm"}>
            <Text as={"span"}>{username} </Text>
            <Text as={"span"} fontWeight={400}>
              Feeling good
            </Text>
          </Text>
          <Text fontSize={"sm"} color={"gray"} cursor={"pointer"}>
            View all 100 comments
          </Text>
        </Flex>

        <InputGroup w={"full"}>
          <Input
            variant={"flushed"}
            placeholder="Add a comment ..."
            fontSize={14}
          />
        </InputGroup>
      </Flex>
    </>
  );
};
