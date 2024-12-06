import { Box, Flex, Text, VStack } from "@chakra-ui/react";
import { SuggestedHeader } from "./SuggestedHeader";
import { SuggestedUser } from "./SuggestedUser";
import { RouterLink } from "@/config/RouterLink";
export const SuggestedUsers = () => {
  return (
    <VStack py={8} px={6} gap={4} position={"sticky"} top={0}>
      <SuggestedHeader />
      <Flex align={"center"} justify={"space-between"} w={"full"}>
        <Text fontSize={12} fontWeight={"bold"} color={"gray.500"}>
          Suggestions For You
        </Text>
        <Text
          fontSize={12}
          p={2}
          fontWeight={"bold"}
          _hover={{ color: "gray.400" }}
          cursor={"pointer"}
        >
          See All
        </Text>
      </Flex>
      <SuggestedUser name="Dan Snow" followers={122} avatar="/img4.png" />
      <SuggestedUser name="Dan" followers={122} avatar="/img4.png" />
      <SuggestedUser name="Dan" followers={122} avatar="/img4.png" />

      <Box fontSize={12} color={"gray.500"} mt={5}>
        © 2024 Built By{" "}
        <RouterLink
          to="https://github.com/GoatMoaz"
          target="_blank"
          color={"blue.500"}
          fontSize={14}
        >
          Moaz Ayman
        </RouterLink>
      </Box>
    </VStack>
  );
};
