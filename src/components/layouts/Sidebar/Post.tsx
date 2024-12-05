import { Box } from "@chakra-ui/react";
import { RouterLink } from "@/config/RouterLink";
import { CreatePostLogo } from "@/assets/constants";

export const Post = () => {
  return (
    <RouterLink
      display={"flex"}
      to={"/CreatePost"}
      alignItems={"center"}
      gap={4}
      _hover={{ bg: "whiteAlpha.300" }}
      borderRadius={6}
      p={2}
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      <CreatePostLogo />
      <Box display={{ base: "none", md: "block" }}>Create Post</Box>
    </RouterLink>
  );
};
