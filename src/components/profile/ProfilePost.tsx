import {
  Flex,
  GridItem,
  Image,
  Separator,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { MdDelete } from "react-icons/md";
import { PostFooter } from "../home/PostFooter";
import { Caption } from "./Caption";
import { Comment } from "./Comment";

export const ProfilePost = ({ img }: { img: string }) => {
  return (
    <DialogRoot size={"xl"} placement={"center"}>
      <DialogTrigger asChild>
        <GridItem
          cursor={"pointer"}
          borderRadius={4}
          overflow={"hidden"}
          border={"1px solid"}
          borderColor={"whiteAlpha.300"}
          position={"relative"}
          aspectRatio={1 / 1}
        >
          <Flex
            opacity={0}
            _hover={{ opacity: 1 }}
            position={"absolute"}
            top={0}
            right={0}
            left={0}
            bottom={0}
            bg={"blackAlpha.700"}
            transition={"all 0.3s ease"}
            zIndex={1}
            justify={"center"}
          >
            <Flex align={"center"} justify={"center"} gap={50}>
              <Flex>
                <AiFillHeart size={20} />
                <Text fontWeight={"bold"} ml={2}>
                  7
                </Text>
              </Flex>
              <Flex>
                <FaComment size={20} />
                <Text fontWeight={"bold"} ml={2}>
                  2
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Image
            src={img}
            alt={"post"}
            objectFit={"cover"}
            w={"full"}
            h={"full"}
          />
        </GridItem>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Flex gap="4" w={{ base: "90%", sm: "70%", md: "full" }} mx={"auto"}>
            <Flex
              borderRadius={4}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"whiteAlpha.300"}
              flex={1.5}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Image
                src={img}
                alt="profile post"
                objectFit={"cover"}
                h={"full"}
              />
            </Flex>
            <Flex
              flex={1}
              flexDir={"column"}
              px={10}
              display={{ base: "none", md: "flex" }}
            >
              <Flex alignItems={"center"} justifyContent={"space-between"}>
                <Flex alignItems={"center"} gap={4}>
                  <Avatar
                    src="/profilepic.png"
                    size={"sm"}
                    name="As a Programmer"
                  />
                  <Text fontWeight={"bold"} fontSize={12}>
                    As a Programmer
                  </Text>
                </Flex>

                <Button
                  size={"sm"}
                  bg={"transparent"}
                  _hover={{ bg: "whiteAlpha.300", color: "red.600" }}
                  color="white"
                  borderRadius={4}
                  p={1}
                >
                  <MdDelete size={20} cursor="pointer" />
                </Button>
              </Flex>
              <Separator my={4} bg={"gray.500"} />

              <VStack
                w="full"
                alignItems={"start"}
                maxH={"350px"}
                overflowY={"auto"}
                gap={4}
              >
                {/* CAPTION */}
                <Caption />
                {/* COMMENTS */}
                {[0, 1, 2, 3, 4].map((_, idx) => (
                  <Comment key={idx} />
                ))}
              </VStack>
              <Separator mt={"auto"} bg={"gray.8000"} />

              <PostFooter username="As a Programmer" isProfilePage={true} />
            </Flex>
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};
