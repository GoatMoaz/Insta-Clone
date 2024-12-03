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

export const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <>
      <Box border={"1px solid gray"} borderRadius={4} padding={5}>
        <VStack spaceY={2}>
          {/* logo */}
          <Image src="/logo.png" h={24} alt="Instagram" />

          {/* Log in or Sign up */}
          <Input placeholder="Email" type="email" fontSize={14} />
          <Input placeholder="Passowrd" type="password" fontSize={14} />
          {!isLogin && (
            <Input
              placeholder="Confirm Password"
              type="password"
              fontSize={14}
            />
          )}
          <Button w={"full"} colorPalette="blue" size={"sm"} fontSize={14}>
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
