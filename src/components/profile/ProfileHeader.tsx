import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import { Avatar, AvatarGroup } from "../ui/avatar";

export const ProfileHeader = () => {
  return (
    <Flex
      gap={{ base: 4, md: 10 }}
      py={10}
      direction={{ base: "column", md: "row" }}
    >
      <AvatarGroup
        size={"full"}
        maxW={{ base: "150px", md: "150px" }}
        justifySelf={"center"}
        alignSelf={"flex-start"}
        mx={"auto"}
      >
        <Avatar name="John Doe" src="/profilepic.png" />
      </AvatarGroup>
      <VStack
        align={{ base: "center", md: "start" }}
        gap={2}
        mx={"auto"}
        flex={1}
      >
        <Flex
          gap={4}
          direction={{ base: "column", md: "row" }}
          justify={{ base: "center", md: "flex-start" }}
          align={"center"}
          w={"full"}
        >
          <Text fontSize={{ base: "sm", md: "lg" }}>John Doe</Text>
          <Flex gap={4} align={"center"} justify={"center"}>
            <Button
              bg={"white"}
              color={"black"}
              _hover={{ bg: "whiteAlpha.200", color: "white" }}
              size={"sm"}
            >
              Edit Profile
            </Button>
          </Flex>
        </Flex>
        <Flex align={"center"} gap={{ base: 2, sm: 4 }} justify={"center"}>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              4
            </Text>
            Posts
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              149
            </Text>
            Followers
          </Text>
          <Text fontSize={{ base: "xs", md: "sm" }}>
            <Text as="span" fontWeight={"bold"} mr={1}>
              19
            </Text>
            Following
          </Text>
        </Flex>
        <Flex align={"center"} gap={4}>
          <Text fontSize={"sm"} fontWeight={"bold"}>
            John Doe Profile
          </Text>
        </Flex>
        <Text fontSize={"sm"} textAlign={{ base: "center", md: "left" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          venenatis, turpis vel
        </Text>
      </VStack>
    </Flex>
  );
};
