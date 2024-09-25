/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Spinner } from "@/components/spinner";
import useNotifications from "@/hooks/useNotifications";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

const NotificationFeed = () => {
  const { data, isLoading } = useNotifications();
  const notifications = data?.data ?? [];

  console.log(notifications, "notifications");

  if (isLoading) {
    return (
      <div className="flex flex-col h-[25vh] items-center w-full justify-center">
        <Spinner size="icon" />
      </div>
    );
  }

  if (notifications?.length === 0) {
    return (
      <div className=" w-full   p-6">
        <h5 className="text-2xl text-center font-bold dark:text-white/80">
          No notifications
        </h5>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      {notifications?.map((notification: any) => (
        <div
          key={notification.id}
          className="flex flex-row w-full items-center
          p-6 gap-4 border-b-[1px]
          "
        >
          <Link href={`/${notification?.user?.username}`}>
            <Avatar role="button">
              <AvatarImage
                src={
                  notification?.user?.profileImage ||
                  notification?.user?.image ||
                  ""
                }
                alt={notification?.user.username || ""}
                className="object-cover"
              />
              <AvatarFallback className="font-bold text-[60px]">
                {notification?.user?.name}
              </AvatarFallback>
            </Avatar>
          </Link>
          <p className="dark:text-white">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationFeed;
