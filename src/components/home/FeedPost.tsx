import { Box, Image } from "@chakra-ui/react";
import { PostHeader } from "./PostHeader";
import { PostFooter } from "./PostFooter";

export const FeedPost = ({
  username,
  img,
  avatar,
}: {
  username: string;
  img: string;
  avatar: string;
}) => {
  return (
    <>
      <PostHeader username={username} avatar={avatar} />
      <Box my={2} borderRadius={4} overflow={"hidden"}>
        <Image src={img} alt={username} />
      </Box>
      <PostFooter username={username} isProfilePage={false} />
    </>
  );
};
