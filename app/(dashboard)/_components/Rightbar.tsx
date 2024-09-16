import React from "react";
import FollowList from "./FollowList";

const Rightbar = () => {
  return (
    <aside className="px-0 py-4 hidden lg:flex min-w-[330px]">
      <div className="w-full flex flex-col gap-3">
        <FollowList />
      </div>
    </aside>
  );
};

export default Rightbar;
