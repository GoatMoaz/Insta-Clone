import { RouterLink } from "@/config/RouterLink";
import { Flex, Text } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { getRelativeTime } from "@/utils/timeUtils";

export const Comment = () => {
  return (
    <Flex gap={4}>
      <RouterLink to={"/profile"}>
        <Avatar src={"/img1.png"} size={"sm"} />
      </RouterLink>
      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>
          <RouterLink to={"/profile"}>
            <Text fontWeight={"bold"} fontSize={12}>
              Jane Doe
            </Text>
          </RouterLink>
          <Text fontSize={14}>
            Looking great
          </Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {getRelativeTime("2024-07-20T10:30:00Z")}
        </Text>
      </Flex>
    </Flex>
  );
};
