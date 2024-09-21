import React from "react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PostForm from "../../_components/_common/PostForm";
import PostFeed from "../../_components/PostFeed";

const Home = () => {
  return (
    <div className="w-full relative">
      <Tabs defaultValue="forYou" className="w-full">
        <TabsList className="w-full sticky-0 !h-16 !p-0 pb-1 bg-transparent !border-b-[1px] !rounded-none dark:border-[rgb(47,51,54)]">
          <TabsTrigger
            value="forYou"
            className="h-full  flex-1 !m-0 rounded-none !shadow-none"
          >
            <Link href="/home" className="w-full text-base font-medium">
              For you
            </Link>
          </TabsTrigger>
          <TabsTrigger
            value="following"
            className="h-full flex-1 !m-0 rounded-none !shadow-none"
          >
            <Link href="/home" className="w-full text-base font-medium">
              Following
            </Link>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="forYou">
          <PostForm placeholder="What is happening?!" />
          <PostFeed />
        </TabsContent>
        {/* <TabsContent value="following">
          <PostForm placeholder="What is happening?!" />
        </TabsContent> */}
      </Tabs>
    </div>
  );
};

export default Home;
