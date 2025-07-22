import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "@/components/layouts/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <Flex>
      {/* Sidebar on the left */}
      {!pathname.startsWith("/auth") && pathname !== "/" && (
        <Box w={{ md: "240px" }}>
          <Sidebar />
        </Box>
      )}

      {/* The page content on the right */}
      <Box flex={1} w={"full"}>{children}</Box>
    </Flex>
  );
};
