import { Box, Flex } from "@chakra-ui/react";
import { Sidebar } from "@/components/layouts/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";

export const PageLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();

  return (
    <Flex>
      {/* Sidebar on the left */}
      {!pathname.startsWith("/auth") && pathname !== "/" && (
        <Box w={{ base: "70px", md: "240px" }}>
          <Sidebar />
        </Box>
      )}

      {/* The page content on the right */}
      <Box flex={1} w={{ base: "calc(100% - 70px)", md: "calc(100% - 240px)" }}>
        {children}
      </Box>
    </Flex>
  );
};
