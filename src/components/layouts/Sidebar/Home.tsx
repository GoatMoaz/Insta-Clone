import { Box } from "@chakra-ui/react";
import { RouterLink } from "@/config/RouterLink";
import { AiFillHome } from "react-icons/ai";

export const Home = () => {
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
    >
      <AiFillHome size={25} />
      <Box display={{ base: "none", md: "block" }}>Home</Box>
    </RouterLink>
  );
};
