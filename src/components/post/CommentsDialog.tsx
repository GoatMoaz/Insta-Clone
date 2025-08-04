import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Flex, VStack, Text, Skeleton, Box } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import { Post, Comment } from "@/interfaces/Post";
import { PostFooter } from "./PostFooter";
import { useState, useCallback, useEffect, useRef } from "react";
import { useUser } from "@/store/useUserStore";
import { useFeed } from "@/hooks/useFeed";
import { MediaCarousel } from "./MediaCarousel";
import { CommentUI } from "./Comment";
import { ReplyUI } from "./Reply";

interface CommentsDialogProps {
  post: Post;
  children: React.ReactNode;
  isLoading?: boolean;
}

export const CommentsDialog = ({
  post,
  children,
  isLoading = false,
}: CommentsDialogProps) => {
  const [replyTo, setReplyTo] = useState<string>("");
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(
    null
  );
  const [expandedComments, setExpandedComments] = useState<Set<string>>(
    new Set()
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const user = useUser();
  const {
    comments,
    replies,
    addCommentToPost,
    fetchCommentsForPost,
    fetchRepliesForComment,
  } = useFeed();

  // State to store replies for each comment
  const [commentReplies, setCommentReplies] = useState<{
    [commentId: string]: Comment[];
  }>({});
  const [loadingReplies, setLoadingReplies] = useState<Set<string>>(new Set());

  // Create a stable reference to fetchCommentsForPost
  const fetchCommentsRef = useRef(fetchCommentsForPost);
  fetchCommentsRef.current = fetchCommentsForPost;

  // Fetch comments when dialog opens
  useEffect(() => {
    if (isDialogOpen && post.postId) {
      fetchCommentsRef.current(post.postId);
    }
  }, [isDialogOpen, post.postId]);

  const handleAddComment = useCallback(
    async (commentText: string) => {
      if (!commentText.trim() || !user) return;

      // Use the replyingToCommentId if this is a reply
      const parentCommentId = replyingToCommentId || undefined;

      // Add comment directly using useFeed hook
      const result = await addCommentToPost(
        post.postId,
        commentText,
        parentCommentId
      );

      if (result?.success && result.isReply && result.parentCommentId) {
        // If this was a reply, the backend returns all replies for that comment
        const repliesForComment = Array.isArray(result.replies)
          ? result.replies
          : [];

        console.log("Adding reply - parentCommentId:", result.parentCommentId);
        console.log("Replies received:", repliesForComment);

        // Update the replies for this comment
        setCommentReplies((prev) => ({
          ...prev,
          [result.parentCommentId]: repliesForComment,
        }));

        // Ensure the replies are expanded to show the new reply
        setExpandedComments((prev) => {
          const newSet = new Set(prev);
          newSet.add(result.parentCommentId);
          console.log(
            "Expanding comment:",
            result.parentCommentId,
            "New expanded set:",
            newSet
          );
          return newSet;
        });
      }

      // Clear reply state after successful comment
      setReplyTo("");
      setReplyingToCommentId(null);
    },
    [user, addCommentToPost, post.postId, replyingToCommentId]
  );

  const handleReply = useCallback((userName: string, commentId: string) => {
    setReplyTo(`@${userName} `);
    setReplyingToCommentId(commentId);
  }, []);

  const handleExpandReplies = useCallback((commentId: string) => {
    setExpandedComments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(commentId)) {
        newSet.delete(commentId);
      } else {
        newSet.add(commentId);
      }
      return newSet;
    });
  }, []);

  // Function to load replies for a specific comment
  const handleLoadReplies = useCallback(
    async (commentId: string) => {
      // If already loading, just return
      if (loadingReplies.has(commentId)) {
        return;
      }

      if (
        commentReplies[commentId] &&
        Array.isArray(commentReplies[commentId]) &&
        !expandedComments.has(commentId)
      ) {
        handleExpandReplies(commentId);
        return;
      }

      if (expandedComments.has(commentId) && commentReplies[commentId]) {
        handleExpandReplies(commentId);
        return;
      }

      setLoadingReplies((prev) => new Set(prev).add(commentId));

      try {
        await fetchRepliesForComment(commentId, post.postId);

        setExpandedComments((prev) => new Set(prev).add(commentId));
      } catch (error) {
        console.error("Error loading replies:", error);
      } finally {
        setLoadingReplies((prev) => {
          const newSet = new Set(prev);
          newSet.delete(commentId);
          return newSet;
        });
      }
    },
    [
      loadingReplies,
      commentReplies,
      expandedComments,
      fetchRepliesForComment,
      post.postId,
      handleExpandReplies,
    ]
  );

  const handleDialogClose = useCallback(() => {
    setReplyTo("");
    setReplyingToCommentId(null);
    setIsDialogOpen(false);
    setCommentReplies({});
    setExpandedComments(new Set());
  }, []);

  const handleDialogOpen = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  return (
    <DialogRoot
      size={"xl"}
      placement="center"
      onOpenChange={(details) => {
        if (details.open) {
          handleDialogOpen();
        } else {
          handleDialogClose();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody>
          <Flex direction={{ base: "column", md: "row" }} gap={4}>
            <Flex
              display={{ base: "flex", md: "none" }}
              bg={"black"}
              w={"full"}
              justify={"center"}
            >
              <MediaCarousel media={post.media} alt={post.content} />
            </Flex>
            <Box display={{ base: "none", md: "block" }} w={"full"}>
              <MediaCarousel media={post.media} alt={post.content} />
            </Box>

            {/* Comments Section */}
            {!isLoading ? (
              <VStack justifyContent={"space-between"} w={"full"}>
                {/* Comments List */}
                <VStack
                  overflowY="auto"
                  align="stretch"
                  _scrollbar={{
                    display: "none",
                  }}
                  gap={3}
                  p={3}
                  h={"400px"}
                  display={{ base: "none", sm: "flex" }}
                  w={"full"}
                >
                  {!comments || comments.length === 0 ? (
                    <Flex
                      justify="center"
                      align="center"
                      minH="300px"
                      direction="column"
                      gap={2}
                    >
                      <Text fontSize="lg" color="gray.500">
                        💬
                      </Text>
                      <Text fontSize="md" color="gray.500" fontWeight="medium">
                        No comments yet
                      </Text>
                      <Text fontSize="sm" color="gray.400" textAlign="center">
                        Be the first to comment on this post
                      </Text>
                    </Flex>
                  ) : (
                    comments?.map((comment) => (
                      <Flex key={comment.commentId} gap={3}>
                        <Avatar
                          src={comment.profileImage}
                          name={comment.userName}
                          size="sm"
                        />
                        <VStack align="start" gap={1} flex={1}>
                          <CommentUI
                            comment={comment}
                            handleReply={handleReply}
                            expandedComments={expandedComments}
                            handleLoadReplies={handleLoadReplies}
                            handleExpandReplies={handleExpandReplies}
                          />

                          {/* Replies Section - using separate replies state */}
                          <ReplyUI
                            expandedComments={expandedComments}
                            comment={comment}
                            loadingReplies={loadingReplies}
                            commentReplies={replies}
                          />
                        </VStack>
                      </Flex>
                    ))
                  )}
                </VStack>

                {/* Add Comment Section */}
                <PostFooter
                  isProfilePage={false}
                  post={post}
                  isModal={true}
                  onAddComment={handleAddComment}
                  replyTo={replyTo}
                  onReplyChange={setReplyTo}
                  replyingToCommentId={replyingToCommentId}
                  skipApiCall={true} // Prevent PostFooter from making its own API call
                />
              </VStack>
            ) : (
              <VStack justify={"space-between"} align={"flex-start"} w={"full"}>
                <VStack gap={4}>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Flex key={i}>
                      <Skeleton rounded={"full"} height={10} width={10} />
                      <VStack align="start" ml={4}>
                        <Skeleton height={3} width={200} />
                        <Skeleton height={3} width={150} />
                      </VStack>
                    </Flex>
                  ))}
                </VStack>
                <VStack gap={4} w={"full"}>
                  <Flex justify={"space-between"} w={"full"}>
                    <Skeleton height={7} width={100} />
                    <Skeleton height={7} width={50} />
                  </Flex>
                  <Skeleton height={10} width={"full"} />
                  <Skeleton height={10} width={"full"} />
                </VStack>
              </VStack>
            )}
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};
