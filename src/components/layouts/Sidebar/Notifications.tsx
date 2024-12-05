import { Box } from "@chakra-ui/react";
import { RouterLink } from "@/config/RouterLink";
import { NotificationsLogo } from "@/assets/constants";

export const Notifications = () => {
  return (
    <RouterLink
      display={"flex"}
      to={"/Notifications"}
      alignItems={"center"}
      gap={4}
      _hover={{ bg: "whiteAlpha.300" }}
      borderRadius={6}
      p={2}
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      <NotificationsLogo />
      <Box display={{ base: "none", md: "block" }}>Notifications</Box>
    </RouterLink>
  );
};
