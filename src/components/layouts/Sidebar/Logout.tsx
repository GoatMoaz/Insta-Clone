import { Box } from "@chakra-ui/react";
import { RouterLink } from "@/config/RouterLink";
import { BiLogOut } from "react-icons/bi";
import { useUserStore } from "@/store/useUserStore";

export const Logout = () => {
  const logout = useUserStore((state) => state.logout);

  const handleLogout = () => {
    logout();
  };

  return (
    <RouterLink
      display={"flex"}
      to={"/"}
      alignItems={"center"}
      gap={4}
      _hover={{ bg: "whiteAlpha.300" }}
      borderRadius={6}
      p={2}
      justifyContent={{ base: "center", md: "flex-start" }}
      onClick={handleLogout}
    >
      <BiLogOut size={25} />
      <Box display={{ base: "none", md: "block" }}>Log out</Box>
    </RouterLink>
  );
};
