import { SidebarItems } from "./SidebarItems";
import { Profile } from "./Profile";
import { Logout } from "./Logout";
import { Box, Flex } from "@chakra-ui/react";
import { RouterLink } from "@/config/RouterLink";
import { InstagramLogo, InstagramMobileLogo } from "@/assets/constants";

export const Sidebar = () => {
  return (
    <Box
      height={"100vh"}
      borderRight={"1px solid"}
      borderColor={"whiteAlpha.300"}
      py={8}
      px={{ base: 2, md: 4 }}
      position={"sticky"}
      top={0}
      left={0}
    >
      <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
        <RouterLink
          to="/"
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <InstagramLogo />
        </RouterLink>
        <RouterLink
          to="/"
          p={2}
          display={{ base: "flex", md: "none" }}
          cursor={"pointer"}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.200" }}
          justifyContent={"center"}
        >
          <InstagramMobileLogo />
        </RouterLink>
        <Flex direction={"column"} gap={5} cursor={"pointer"}>
          <SidebarItems />
        </Flex>
        <Flex direction={"column"} mt={"auto"} gap={4}>
          <Profile />
          <Logout />
        </Flex>
      </Flex>
    </Box>
  );
};
