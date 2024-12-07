import { RouterLink } from "@/config/RouterLink";
import { Flex, Text } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";

export const Caption = () => {
  return (
    <Flex gap={4}>
      <RouterLink to="/profile">
        <Avatar src={"/profilepic.png"} size={"sm"} />
      </RouterLink>
      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          <RouterLink to="/profile">
            <Text fontWeight={"bold"} fontSize={12}>
              As a Programmer
            </Text>
          </RouterLink>
          <Text fontSize={14}>Feeling Good</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          1d ago
        </Text>
      </Flex>
    </Flex>
  );
};
