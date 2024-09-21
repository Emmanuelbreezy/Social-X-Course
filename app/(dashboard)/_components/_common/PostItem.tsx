"use client";
import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { PostType } from "@/types/post.type";
import { useSession } from "next-auth/react";
import { formatDistanceToNowStrict } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, Heart, MessageCircle } from "lucide-react";
import Badge from "@/components/badge";
import Image from "next/image";
interface PropsType {
  userId?: number;
  post: PostType;
}

const PostItem: React.FC<PropsType> = ({ post }) => {
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;
  console.log(session);

  const goToUser = useCallback(
    (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      router.push(`/${user?.username}`);
    },
    [router, user?.username]
  );

  const goToPost = useCallback(() => {
    router.push(`/${user?.username}/status/${post.id}`);
  }, [router, user?.username, post?.id]);

  const onLike = useCallback((event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  }, []);

  const createdAt = useMemo(() => {
    if (!post.createdAt) {
      return null;
    }

    const timeDifference = formatDistanceToNowStrict(
      new Date(post.createdAt),
      {}
    );

    console.log(timeDifference, "timeDifference");
    const timeParts = timeDifference.split(" ");
    let formattedTime;

    if (timeParts[1].startsWith("second")) {
      formattedTime = `${timeParts[0]}s`;
    } else if (timeParts[1].startsWith("minute")) {
      formattedTime = `${timeParts[0]}min`;
    } else if (timeParts[1].startsWith("hour")) {
      formattedTime = `${timeParts[0]}h`;
    } else if (timeParts[1].startsWith("day")) {
      formattedTime = `${timeParts[0]}d`;
    } else {
      formattedTime = timeDifference;
    }

    return formattedTime;
  }, [post.createdAt]);
  return (
    <article
      role="button"
      onClick={goToPost}
      className="
      border-b-[1px]
      dark:border-[rgb(47,51,54)]
        p-5
        transition
      "
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar role="button" onClick={goToUser}>
          <AvatarImage
            src={post?.user?.profileImage || post?.user?.image}
            alt={post?.user.username || ""}
            className="object-cover"
          />
          <AvatarFallback className="font-bold text-[60px]">
            {post?.user?.name}
          </AvatarFallback>
        </Avatar>
        <div className="w-full">
          <div className="flex flex-row items-center gap-[4px]">
            <div className="flex flex-row gap-[2px]">
              <h5 className="text-white font-bold cursor-pointer hover:underline">
                {post?.user?.name}
              </h5>
              {post?.user.isVerified && post?.user.plan === "PRO" && <Badge />}
            </div>
            <span className="!text-[#959fa8] text-sm inline-block truncate font-normal">
              @{post?.user?.username}
            </span>
            <div className="flex items-center">
              <span className="!text-[#959fa8] text-sm">
                <Dot size="15px" />
              </span>
              <span className="!text-[#959fa8] text-sm">{createdAt}</span>
            </div>
          </div>

          <div className="mt-1">
            <div dangerouslySetInnerHTML={{ __html: post.body }} />
          </div>
          {post?.postImage && (
            <div className="w-full my-3 h-80 rounded-md bg-[#eee] dark:bg-gray-600">
              <Image
                fill
                src={post?.postImage}
                alt={post?.user?.username || ""}
                className="w-full h-full object-cover rounded-md"
              />
            </div>
          )}
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="flex flex-row 
              items-center gap-1
            text-[#959fa8]
            cursor-pointer
            transition
            hover:text-primary
            "
            >
              <MessageCircle size={15} />
              <p>{post?.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row 
              items-center gap-1
            text-[#959fa8]
            cursor-pointer
            transition
            hover:text-red-500
            "
            >
              <Heart size={15} />
              <p>{post?.likedIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostItem;
