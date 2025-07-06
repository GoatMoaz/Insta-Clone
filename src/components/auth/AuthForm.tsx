import { useState } from "react";
import {
  Box,
  Image,
  Input,
  VStack,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "@/hooks/useAuth";
import { validateAuth } from "@/utils/authValidation";
import { useNavigate } from "react-router-dom";
import { AuthVerification } from "./AuthVerification";
import { AuthSignupFields } from "./AuthSignupFields";

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    userNameOrEmail: "",
    birthDay: "",
  });
  const [validationErrors, setValidationErrors] = useState<{
    [key: string]: string;
  }>({});

  const { login, register, isLoading, error, setError } = useAuth();
  const navigate = useNavigate();

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError(null);
    setValidationErrors({});
    setShowVerification(false);
    // Reset form data when switching
    setFormData({
      fullName: "",
      userName: "",
      email: "",
      password: "",
      userNameOrEmail: "",
      birthDay: "",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear validation error for this field when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async () => {
    // Validate form data
    const validation = validateAuth(formData, isLogin);

    if (!validation.isValid) {
      // Convert validation errors to object for easy lookup
      const errorMap: { [key: string]: string } = {};
      validation.errors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setValidationErrors(errorMap);
      return;
    }

    try {
      if (isLogin) {
        const response = await login({
          userNameOrEmail: formData.userNameOrEmail,
          password: formData.password,
        });

        if (response.success) {
          navigate("/home");
        }
      } else {
        const response = await register({
          fullName: formData.fullName,
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
          birthDay: formData.birthDay,
        });

        if (response.success) {
          setUserEmail(formData.email);
          setShowVerification(true);
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
    }
  };

  const getInputStyle = (fieldName: string) => ({
    borderColor: validationErrors[fieldName] ? "red.500" : "gray.300",
    _focus: {
      borderColor: validationErrors[fieldName] ? "red.500" : "blue.500",
    },
  });

  // Show verification message after successful registration
  if (showVerification && !isLogin) {
    return (
      <AuthVerification userEmail={userEmail} switchHandler={switchHandler} />
    );
  }

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spaceY={2}>
          {/* logo */}
          <Image src="/logo.png" h={24} alt="Instagram" />

          {/* Error message */}
          {error && (
            <Text color="red.500" fontSize={12} textAlign="center">
              {error}
            </Text>
          )}

          {/* Log in or Sign up */}
          {isLogin ? (
            <Box w="full">
              <Input
                placeholder="Email, or username"
                type="text"
                fontSize={14}
                value={formData.userNameOrEmail}
                onChange={(e) =>
                  handleInputChange("userNameOrEmail", e.target.value)
                }
                {...getInputStyle("userNameOrEmail")}
                outline={"none"}
                id="userNameOrEmail"
              />
              {validationErrors.userNameOrEmail && (
                <Text color="red.500" fontSize={12} mt={1}>
                  {validationErrors.userNameOrEmail}
                </Text>
              )}
            </Box>
          ) : (
            <AuthSignupFields
              formData={formData}
              validationErrors={validationErrors}
              handleInputChange={handleInputChange}
              getInputStyle={getInputStyle}
            />
          )}

          <Box w="full">
            <Input
              placeholder="Password"
              type="password"
              fontSize={14}
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              {...getInputStyle("password")}
              outline={"none"}
              id="password"
            />
            {validationErrors.password && (
              <Text color="red.500" fontSize={12} mt={1}>
                {validationErrors.password}
              </Text>
            )}
          </Box>
          {isLogin && (
            <Flex align={"center"} justify={"flex-start"} w="full" mt={1}>
              <Text
                fontSize={12}
                cursor="pointer"
                _hover={{ textDecoration: "underline" }}
                onClick={() => navigate("/auth/reset-password")}
              >
                Forget Password?
              </Text>
            </Flex>
          )}

          <Button
            w={"full"}
            colorPalette="blue"
            size={"sm"}
            fontSize={14}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLogin ? "Log in" : "Sign Up"}
          </Button>

          {/* ----------- OR ----------- */}
          <Flex align={"center"} justify={"center"} gap={1} w={"full"}>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
            <Text mx={1} color={"gray.400"}>
              OR
            </Text>
            <Box flex={2} h={"1px"} bg={"gray.400"} />
          </Flex>

          {/* Log in or Sign up with Google */}
          <Flex align={"flex-end"} justify={"center"} cursor={"pointer"}>
            <Image src="/google.png" w={5} alt="Google logo" />
            <Text mx={2} color={"blue.500"}>
              {isLogin ? "Log in " : "Sign up "}with Google
            </Text>
          </Flex>
        </VStack>
      </Box>

      {/* Do you have any account? */}
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <Flex align={"center"} justify={"center"}>
          <Box mx={2} fontSize={14}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </Box>
          <Box color={"blue.500"} cursor={"pointer"} onClick={switchHandler}>
            {isLogin ? "Sign up" : "Log in"}
          </Box>
        </Flex>
      </Box>
    </>
  );
};
