import {
  Box,
  VStack,
  Image,
  Text,
  Flex,
  Container,
  Button,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";

export const EmailVerificationSuccess = ({
  handleBackToLogin,
}: {
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
              <Box as={MdCheckCircle} boxSize="16" color="green.500" />
              <Image src="/logo.png" h={20} alt="Instagram" />
              <Text fontSize={20} fontWeight="bold">
                Email Verified Successfully!
              </Text>
              <Text fontSize={14} color="gray.400" maxW="300px">
                Your account has been verified. You can now log in and start
                using Instagram.
              </Text>
              <Button
                colorScheme="blue"
                size="md"
                onClick={handleBackToLogin}
                mt={4}
              >
                Go to Login
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Container>
    </Flex>
  );
};
