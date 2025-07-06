import { Box, VStack, Flex, Input, Button } from "@chakra-ui/react";
import { FiLock } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { MdCheckCircle } from "react-icons/md";

export const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { forgetPassword, isLoading, error } = useAuth();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const forgetPasswordHandler = async () => {
    const result = await forgetPassword(email);

    if (result.success) {
      setIsSubmitted(true);
    }
    setEmail("");
  };
  return (
    <Flex minH={"100vh"} justify={"center"} align={"center"} px={4} py={2}>
      <Box border={"1px solid gray"} borderRadius={4} padding={5} maxW={400}>
        <VStack spaceY={2}>
          {/* Logo */}
          <Box
            as={isSubmitted ? MdCheckCircle : FiLock}
            color={isSubmitted ? "green.500" : ""}
            boxSize="24"
            rounded="full"
            border={isSubmitted ? "1px solid green" : "1px solid white"}
            px={5}
            mb={2}
          />
          {!isSubmitted ? (
            <>
              <Box textAlign="center" fontSize={18}>
                Trouble logging in?
              </Box>
              <Box textAlign="center" fontSize={14} color="gray.400">
                Enter your email and we'll send you a link to get back into your
                account.
              </Box>

              {/* Error message if exists */}
              {error && (
                <Box color="red.500" fontSize={12} textAlign="center" mt={2}>
                  {error}
                </Box>
              )}

              {/* Input field for email */}
              <Input
                type="email"
                placeholder="Enter your email"
                bg={"gray.900"}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                borderColor="gray.600"
                id="email"
                autoComplete="email"
                autoFocus={true}
              />

              <Button
                colorScheme="blue"
                size="md"
                width="full"
                mb={4}
                onClick={forgetPasswordHandler}
                disabled={isLoading || !email}
              >
                Send Reset Link
              </Button>
            </>
          ) : (
            <Box fontSize={18} color="green.500">
              A password reset link has been sent to your email. Please check
              your inbox and follow the instructions to reset your password.
            </Box>
          )}
        </VStack>
      </Box>
    </Flex>
  );
};
