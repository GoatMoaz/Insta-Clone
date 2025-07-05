import { Box, VStack, Image, Text, Flex, Button } from "@chakra-ui/react";
import { MdEmail, MdCheckCircle } from "react-icons/md";

export const AuthVerification = ({
  userEmail,
  switchHandler,
}: {
  userEmail: string;
  switchHandler: () => void;
}) => {
  return (
    <Box border={"1px solid gray"} borderRadius={4} padding={8}>
      <VStack textAlign="center">
        <Box as={MdCheckCircle} boxSize="16" color="green.500" />
        <Image src="/logo.png" h={20} alt="Instagram" />

        <Text fontSize={20} fontWeight="bold">
          Check your email
        </Text>

        <VStack>
          <Text fontSize={14} color="gray.200">
            We've sent a verification link to:
          </Text>
          <Flex align="center" gap={2}>
            <Box as={MdEmail} color="blue.500" />
            <Text fontSize={14} fontWeight="semibold" color="blue.600">
              {userEmail}
            </Text>
          </Flex>
        </VStack>

        <Text fontSize={12} color="gray.200" maxW="300px">
          Please check your email and click the verification link to complete
          your registration.
        </Text>

        <Button variant="outline" size="sm" onClick={switchHandler} mt={4}>
          Back to Login
        </Button>
      </VStack>
    </Box>
  );
};
