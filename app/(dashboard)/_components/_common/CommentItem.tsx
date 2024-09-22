import React from "react";
import { CommentType } from "@/types/comment.type";

interface PropsType {
  comment: CommentType;
}
const CommentItem: React.FC<PropsType> = () => {
  return <div>CommentItem</div>;
};

export default CommentItem;
