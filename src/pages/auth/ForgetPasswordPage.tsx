import { Box, Flex, VStack, Text, Input, Button } from "@chakra-ui/react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { CgLockUnlock } from "react-icons/cg";

export const ForgetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword, error, isLoading } = useAuth();

  const email = searchParams.get("email");
  const code = searchParams.get("code");
  const [newPassword, setNewPassword] = useState("");

  const resetPasswordHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !code || !newPassword) {
      return;
    }

    const result = await resetPassword(email, code, newPassword);
    if (result.success) {
      navigate("/");
    }
  };
  return (
    <Flex minH={"100vh"} justify={"center"} align={"center"} px={4} py={2}>
      <VStack
        spaceY={2}
        align={"center"}
        border={"1px solid gray"}
        borderRadius={4}
        padding={5}
        textAlign="center"
        maxW={400}
      >
        <Box
          as={CgLockUnlock}
          boxSize="24"
          rounded="full"
          border={"1px solid white"}
          px={5}
        />
        <Text fontSize={16} fontWeight="bold">
          Reset Your Password
        </Text>
        <Text fontSize={14} color="gray.400">
          Enter your new password to reset it.
        </Text>
        {/* Reset Password Form */}
        <Box as="form" onSubmit={resetPasswordHandler}>
          {/* Error message if exists */}
          {error && (
            <Box color="red.500" fontSize={12} textAlign="left" mb={2}>
              {error}
            </Box>
          )}
          <Input
            type="password"
            placeholder="Enter new password"
            bg={"gray.900"}
            onChange={(e) => setNewPassword(e.target.value)}
            value={newPassword}
            borderColor="gray.600"
            id="password"
            autoComplete="password"
            autoFocus={true}
            mb={4}
          />
          <Button type="submit" w={"full"} disabled={isLoading || !newPassword}>
            Reset Password
          </Button>
        </Box>
      </VStack>
    </Flex>
  );
};
