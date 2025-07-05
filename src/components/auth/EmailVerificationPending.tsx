import {
  Box,
  VStack,
  Image,
  Text,
  Flex,
  Container,
  Spinner,
} from "@chakra-ui/react";

export const EmailVerificationPending = () => {
  return (
    <Flex minH={"100vh"} justify={"center"} align={"center"} px={4} py={2}>
      <Container maxW={"container.md"} padding={0}>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Box
            border={"1px solid gray"}
            borderRadius={4}
            padding={8}
            textAlign="center"
          >
            <VStack>
              <Image src="/logo.png" h={20} alt="Instagram" />
              <Spinner size="xl" color="blue.500" />
              <Text fontSize={18} fontWeight="bold">
                Confirming your email...
              </Text>
              <Text fontSize={14} color="gray.400">
                Please wait while we verify your account.
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};
