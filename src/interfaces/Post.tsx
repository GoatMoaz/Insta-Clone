export interface Post {
  postId: string;
  userId: string;
  userName: string;
  time: string;
  media: string[];
  likesCount: number;
  commentsCount: number;
  content: string;
  profilePic?: string;
  isReacted: boolean;
}

export interface Comment {
  userId: string;
  commentId: string;
  userName: string;
  profileImage: string;
  content: string;
  time: string;
  isReacted: boolean;
  numberOfReactions: number;
  numberOfReplies: number;
}

export interface Reply {
  commentId: string;
  content: string;
  postId: string;
  parentCommentId: string;
  userId: string;
  userName: string;
  userProfilePic: string;
  isReacted: boolean;
  time: string;
  likesCount: number;
}
