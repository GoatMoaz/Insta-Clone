import { Box } from "@chakra-ui/react";
import { PostHeader } from "./PostHeader";
import { PostFooter } from "./PostFooter";
import { MediaCarousel } from "./MediaCarousel";
import { Post } from "@/interfaces/Post";

export const FeedPost = ({ post }: { post: Post }) => {
  return (
    <>
      <PostHeader
        username={post.userName}
        avatar={post.profilePic}
        time={post.time}
      />
      <Box
        my={2}
        border={"1px solid"}
        borderColor="#262626"
        overflow={"hidden"}
      >
        <MediaCarousel media={post.media} alt={post.userName} />
      </Box>
      <PostFooter isProfilePage={false} post={post} isModal={false} />
    </>
  );
};
