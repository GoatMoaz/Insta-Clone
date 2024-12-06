import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { Avatar } from "../ui/avatar";
import { useState } from "react";

export const SuggestedUser = ({
  name,
  followers,
  avatar,
}: {
  name: string;
  followers: number;
  avatar: string;
}) => {
  const [followed, setFollowed] = useState(false);
  return (
    <Flex align={"center"} justify={"space-between"} w={"full"}>
      <Flex align={"center"} gap={2}>
        <Avatar src={avatar} name={name} size={"md"} />
        <VStack align={"self-start"}>
          <Text fontSize={13} fontWeight={"bold"}>
            {name}
          </Text>
          <Text fontSize={12} color={"gray.500"}>
            {followers} followers
          </Text>
        </VStack>
      </Flex>
      <Button
        fontSize={14}
        variant={"ghost"}
        p={2}
        h={"max-content"}
        fontWeight={"md"}
        color={"blue.400"}
        _hover={{ color: "white" }}
        onClick={() => setFollowed((prev) => !prev)}
      >
        {followed ? "Unfollow" : "follow"}
      </Button>
    </Flex>
  );
};
