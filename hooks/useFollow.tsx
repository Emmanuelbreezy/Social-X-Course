"use client";
import { followUser } from "@/app/actions/follow.action";
import { useCallback, useMemo, useState } from "react";
import { toast } from "./use-toast";
import useUser from "./useUser";
import useCurrentUser from "./useCurrentUser";

const useFollow = (userId: number, username: string) => {
  const { data, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchUser } = useUser(username);

  const [loading, setLoading] = useState<boolean>(false);

  const isFollowing = useMemo(() => {
    const following = data?.currentUser?.followingIds || [];
    return following.includes(userId);
  }, [data?.currentUser?.followingIds, userId]);

  const toggleFollow = useCallback(async () => {
    try {
      setLoading(true);
      const response = await followUser(userId);
      console.log(response);
      mutateCurrentUser();
      mutateFetchUser();
      toast({
        title: "Sucess",
        description: `${
          response.isFollowing ? "Followed" : "Unfollowed"
        } User successfully`,
        variant: "default",
      });
    } catch (e) {
      toast({
        title: "Error",
        description: e instanceof Error ? e.message : "Failed to follow",
        variant: "destructive",
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [mutateCurrentUser, mutateFetchUser, userId]);
  return {
    loading,
    isFollowing,
    toggleFollow,
  };
};

export default useFollow;
