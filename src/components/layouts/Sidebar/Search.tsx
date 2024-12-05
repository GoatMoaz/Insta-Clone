import { Box } from "@chakra-ui/react";
import { RouterLink } from "@/config/RouterLink";
import { SearchLogo } from "@/assets/constants";

export const Search = () => {
  return (
    <RouterLink
      display={"flex"}
      to={"/explore"}
      alignItems={"center"}
      gap={4}
      _hover={{ bg: "whiteAlpha.300" }}
      borderRadius={6}
      p={2}
      justifyContent={{ base: "center", md: "flex-start" }}
    >
      <SearchLogo />
      <Box display={{ base: "none", md: "block" }}>Explore</Box>
    </RouterLink>
  );
};
