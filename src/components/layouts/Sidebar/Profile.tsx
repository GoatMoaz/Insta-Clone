import { Box } from "@chakra-ui/react";
import { RouterLink } from "@/config/RouterLink";
import { Avatar } from "@/components/ui/avatar";
import { useUserStore } from "@/store/useUserStore";

export const Profile = () => {
  const { user } = useUserStore();
  return (
    <RouterLink
      display={"flex"}
      to={"/profile"}
      alignItems={"center"}
      gap={4}
      _hover={{ bg: "whiteAlpha.300" }}
      borderRadius={6}
      p={2}
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      <Avatar size={"sm"} name={user?.userName} />
      <Box display={{ base: "none", md: "block" }}>My Profile</Box>
    </RouterLink>
  );
};
