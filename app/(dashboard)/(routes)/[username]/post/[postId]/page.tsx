"use client";
import React from "react";
import { Spinner } from "@/components/spinner";
import usePosts from "@/hooks/usePosts";
import { useParams } from "next/navigation";
import Header from "../../../../_components/_common/Header";

const Post = () => {
  const param = useParams();
  const postId = param?.postId as string;
  const { data, isLoading } = usePosts({ postId: +postId });

  if (isLoading) {
    return (
      <div className="flex flex-col h-[25vh] items-center w-full justify-center">
        <Spinner size="icon" />
      </div>
    );
  }
  return (
    <>
      <Header label="Post" showBackArrow />
    </>
  );
};

export default Post;
