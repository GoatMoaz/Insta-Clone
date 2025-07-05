import {
  Box,
  VStack,
  Image,
  Text,
  Flex,
  Container,
  Button,
} from "@chakra-ui/react";
import { MdError } from "react-icons/md";

export const EmailVerificationFailed = ({
  errorMessage,
  handleBackToLogin,
}: {
  errorMessage: string;
  handleBackToLogin: () => void;
}) => {
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
              <Box as={MdError} boxSize="16" color="red.500" />
              <Image src="/logo.png" h={20} alt="Instagram" />
              <Text fontSize={20} fontWeight="bold">
                Email Verification Failed
              </Text>
              <Text fontSize={14} color="gray.400" maxW="300px">
                {errorMessage}
              </Text>
              <Button
                variant="outline"
                size="md"
                onClick={handleBackToLogin}
                mt={4}
              >
                Back to Login
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};
