import { BASE_URL } from "@/lib/base-url";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const usePosts = (postId?: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    postId ? `${BASE_URL}api/posts?usersId=${postId}` : `${BASE_URL}api/posts`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePosts;
