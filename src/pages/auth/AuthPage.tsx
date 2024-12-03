import { Container, Flex, Box, Image, VStack } from "@chakra-ui/react";
import { AuthForm } from "@/components/auth/AuthForm";

export const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justify={"center"} align={"center"} px={4}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"} gap={10}>
          {/* left hand-side */}
          <Box
            display={{
              base: "none",
              md: "block",
            }}
          >
            <Image src="/auth.png" h={650} alt="Phone img" />
          </Box>
          {/* right hand-side */}
          <VStack spaceY={4} align={"stretch"}>
            <AuthForm />
            <Box textAlign={"center"}>Get the app.</Box>
            <Flex gap={5} justify={"center"}>
              <Image src="/playstore.png" h={10} cursor={"pointer"} alt="Playstore Logo" />
              <Image src="/microsoft.png" h={10} cursor={"pointer"} alt="Microsoft Logo" />
            </Flex>
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};
