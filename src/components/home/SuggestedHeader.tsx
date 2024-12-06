import { Flex, Text } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { RouterLink } from "@/config/RouterLink";

export const SuggestedHeader = () => {
  return (
    <Flex justify={"space-between"} align={"center"} w={"full"}>
      <Flex align={"center"} gap={2}>
        <Avatar name="Jane Doe" size={"lg"} src="/profilepic.png" />
        <Text fontSize={12} fontWeight={"bold"}>
          Jane Doe
        </Text>
      </Flex>
      <RouterLink
        to={"/auth"}
        fontSize={14}
        p={2}
        fontWeight={"medium"}
        color={"blue.400"}
        style={{ textDecoration: "none" }}
      >
        Log out
      </RouterLink>
    </Flex>
  );
};
