import { SidebarItems } from "./SidebarItems";
import { Profile } from "./Profile";
import { Logout } from "./Logout";
import { Box, Flex } from "@chakra-ui/react";
import { RouterLink } from "@/config/RouterLink";
import { InstagramLogo, InstagramMobileLogo } from "@/assets/constants";

export const Sidebar = () => {
  return (
    <Box
      bg={"black"}
      borderTop={{ base: "1px solid gray", md: "none" }}
      borderRight={{ base: "none", md: "1px solid gray" }}
      py={8}
      px={{ base: 2, md: 4 }}
      zIndex={1000}
      position={{ base: "fixed", md: "sticky" }}
      top={{ base: "unset", md: 0 }}
      left={{ base: "unset", md: 0 }}
      bottom={0}
      w={"full"}
      height={{ base: "auto", md: "100vh" }}
    >
      <Flex
        direction={{ base: "row", md: "column" }}
        w={"full"}
        height={"full"}
        justifyContent={{ base: "center", md: "flex-start" }}
        gap={{ base: 0, md: 10 }}
        alignItems={{ base: "center", md: "flex-start" }}
      >
        <RouterLink
          to="/home"
          pl={2}
          display={{ base: "none", md: "block" }}
          cursor={"pointer"}
        >
          <InstagramLogo />
        </RouterLink>
        <RouterLink
          to="/home"
          pr={2}
          pt={1}
          display={{ base: "flex", md: "none" }}
          cursor={"pointer"}
          borderRadius={6}
          _hover={{ bg: "whiteAlpha.200" }}
          justifyContent={"center"}
        >
          <InstagramMobileLogo />
        </RouterLink>
        <Flex
          direction={{ base: "row", md: "column" }}
          gap={{ base: 2, md: 5 }}
          cursor={"pointer"}
        >
          <SidebarItems />
        </Flex>
        <Flex
          direction={{ base: "row", md: "column" }}
          mt={{ base: "0", md: "auto" }}
          gap={{ base: 2, md: 4 }}
        >
          <Profile />
          <Logout />
        </Flex>
      </Flex>
    </Box>
  );
};
