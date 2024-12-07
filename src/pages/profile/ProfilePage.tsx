import { Container, Flex } from "@chakra-ui/react";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { ProfilePosts } from "@/components/profile/ProfilePosts";
import { ProfileTabs } from "@/components/profile/ProfileTabs";

export const ProfilePage = () => {
  return (
    <Container maxW={"3xl"} py={5}>
      <Flex py={10} px={2} w={"full"} direction={"column"}>
        <ProfileHeader />
      </Flex>
      <Flex
        px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}
      >
        <ProfileTabs />
        <ProfilePosts />
      </Flex>
    </Container>
  );
};
