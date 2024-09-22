import { PostType } from "./post.type";
import { UserType } from "./user.type";

export type CommentType = {
  id: number;
  body: string;
  userId: number;
  postId: number;
  createdAt: string;
  updatedAt: string;
  user: UserType;
  post: PostType;
};
