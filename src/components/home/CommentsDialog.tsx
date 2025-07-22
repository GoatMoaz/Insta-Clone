import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Box, Flex, VStack, Text, Separator, Image } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { useState } from "react";
import { getRelativeTime } from "@/utils/timeUtils";
import { Post } from "@/interfaces/Post";
import { PostFooter } from "./PostFooter";


interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  time: string;
  likes: number;
  isLiked: boolean;
}

interface CommentsDialogProps {
  post: Post;
  children: React.ReactNode;
}

export const CommentsDialog = ({ post, children }: CommentsDialogProps) => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      username: "jane_doe",
      avatar: "/img1.png",
      text: "Amazing post! Love it 🔥",
      time: "2024-07-20T10:30:00Z",
      likes: 12,
      isLiked: false,
    },
    {
      id: "2",
      username: "john_smith",
      avatar: "/img2.png",
      text: "This is so cool! How did you do this?",
      time: "2024-07-20T09:15:00Z",
      likes: 5,
      isLiked: true,
    },
    {
      id: "3",
      username: "sarah_wilson",
      avatar: "/img3.png",
      text: "Incredible work! Keep it up 👏",
      time: "2024-07-20T08:45:00Z",
      likes: 8,
      isLiked: false,
    },
  ]);

  const handleAddComment = (comment: string) => {
    if (comment.trim()) {
      const newCommentObj: Comment = {
        id: Date.now().toString(),
        username: "current_user", // Replace with actual username
        avatar: "/current_user_avatar.png", // Replace with actual avatar
        text: comment,
        time: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };
      setComments((prev) => [...prev, newCommentObj]);
    }
  };

  const handleLikeComment = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              isLiked: !comment.isLiked,
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            }
          : comment
      )
    );
  };

  return (
    <DialogRoot size="xl" placement="center">
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Flex gap={4} h="500px">
            {/* Post Image Section */}
            <Box flex={1} display={{ base: "none", md: "block" }}>
              <Box
                h="full"
                bg="black"
                borderRadius={8}
                overflow="hidden"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Image
                  src={post.media[0]}
                  alt={post.userName}
                  maxH="full"
                  maxW="full"
                  objectFit="contain"
                />
              </Box>
            </Box>

            {/* Comments Section */}
            <VStack flex={1} align="stretch" h="full">
              {/* Comments List */}
              <VStack
                flex={1}
                overflowY="auto"
                align="stretch"
                gap={3}
                p={2}
                maxH="300px"
              >
                {comments.map((comment) => (
                  <Flex key={comment.id} gap={3}>
                    <Avatar
                      src={comment.avatar}
                      name={comment.username}
                      size="sm"
                    />
                    <VStack align="start" gap={1} flex={1}>
                      <Flex gap={2} align="center" w="full">
                        <Text fontWeight="bold" fontSize="sm">
                          {comment.username}
                        </Text>
                        <Text fontSize="sm" flex={1}>
                          {comment.text}
                        </Text>
                        <Text
                          fontSize="xs"
                          color={comment.isLiked ? "red.500" : "gray.500"}
                          cursor="pointer"
                          onClick={() => handleLikeComment(comment.id)}
                          _hover={{ color: "red.300" }}
                        >
                          ♥
                        </Text>
                      </Flex>
                      <Flex gap={4} fontSize="xs" color="gray.500">
                        <Text>{getRelativeTime(comment.time)}</Text>
                        {comment.likes > 0 && (
                          <Text>{comment.likes} likes</Text>
                        )}
                      </Flex>
                    </VStack>
                  </Flex>
                ))}
              </VStack>

              <Separator />

              {/* Add Comment Section */}
              <PostFooter
                isProfilePage={false}
                post={post}
                handleAddComment={handleAddComment}
              />
            </VStack>
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};
