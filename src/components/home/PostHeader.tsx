import { Box, Flex, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

export const PostHeader = ({
  username,
  avatar,
}: {
  username: string;
  avatar: string;
}) => {
  return (
    <Flex justify={"space-between"} align={"center"} w={"full"} my={2}>
      <Flex align={"center"} gap={2}>
        <Avatar src={avatar} name={username} size={"sm"} />
        <Flex fontSize={12} fontWeight={"bold"} gap={2}>
          <Text>{username}</Text>
          <Box color={"gray.500"}>• 1w</Box>
        </Flex>
      </Flex>
      <Box cursor={"pointer"}>
        <Text
          fontSize={12}
          color={"blue.500"}
          fontWeight={"bold"}
          _hover={{
            color: "white",
          }}
          transition={"0.2s ease-in-out"}
        >
          Unfollow
        </Text>
      </Box>
    </Flex>
  );
};
