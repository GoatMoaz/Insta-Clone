import { Container, Flex, Box, Image, VStack } from "@chakra-ui/react";
import { AuthForm } from "@/components/auth/AuthForm";

export const AuthPage = () => {
  return (
    <Flex minH={"100vh"} justify={"center"} align={"center"} px={4} py={2}>
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
          </VStack>
        </Flex>
      </Container>
    </Flex>
  );
};
