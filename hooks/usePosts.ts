import { BASE_URL } from "@/lib/base-url";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const usePosts = (userId?: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    userId ? `${BASE_URL}api/posts?userId=${userId}` : `${BASE_URL}api/posts`,
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
