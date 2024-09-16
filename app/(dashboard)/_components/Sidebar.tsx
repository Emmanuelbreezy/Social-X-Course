"use client";
import Logo from "@/components/logo";
import React from "react";
import SidebarItem from "./_common/SidebarItem";
import {
  Bell,
  Bot,
  Home,
  LucideIcon,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Spinner } from "@/components/spinner";
import { doLogout } from "@/app/actions/auth.action";
import SidebarTweetButton from "./_common/SidebarTweetButton";

interface MenuType {
  label: string;
  href?: string;
  icon: LucideIcon;
}

const Sidebar = () => {
  const session = useSession();
  const router = useRouter();

  const currentUser = session?.data?.user?.username;
  const MENUS_LIST: MenuType[] = [
    {
      label: "Home",
      href: "/home",
      icon: Home,
    },
    {
      label: "Explore",
      href: "/explore",
      icon: Search,
    },
    {
      label: "Notifications",
      href: "/notifications",
      icon: Bell,
    },
    {
      label: "X AI",
      href: "/i/x-ai",
      icon: Bot,
    },
    {
      label: "Premium",
      href: "/i/premium",
      icon: X,
    },
    {
      label: "Profile",
      href: `/${currentUser}`,
      icon: User,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];
  return (
    <aside className="w-full h-screen pr-0 lg:pr-6 overflow-y-auto overflow-x-hidden">
      <div className="flex flex-col h-full items-start">
        <div className="space-y-0 h-full pb-3 flex flex-col justify-between w-auto lg:w-[230px]">
          <div className="flex-1">
            <div className="my-2 pt-1 px-4">
              <Logo
                className="!h-8 !w-8 cursor-pointer"
                width="auto"
                height="auto"
                onClick={() => router.push("/home")}
              />
            </div>
            {MENUS_LIST.map((item) => {
              return (
                <SidebarItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                />
              );
            })}
            <div className="w-full pt-1">
              <SidebarTweetButton />
            </div>
          </div>
          <div className="flex-shrink-1">
            {session?.data ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="!outline-none">
                  <SidebarItem
                    isUser={true}
                    userInfo={{
                      username: session?.data?.user?.username ?? "",
                      fullname: session?.data?.user?.name ?? "",
                      profileImgUrl: session?.data?.user?.image ?? "",
                    }}
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-3 min-w-[260px] rounded-2xl max-w-[360px] min-h-[30px] mb-3">
                  <DropdownMenuItem
                    asChild
                    // onClick={() => signOut()}
                  >
                    <form action={doLogout}>
                      <button
                        type="submit"
                        className="w-full flex flex-row items-center gap-2 
                      px-4 text-base !cursor-pointer
                      "
                      >
                        Log out{" "}
                        <span className="block max-w-[120px] truncate ml-1">
                          {session?.data?.user?.name}
                        </span>
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center p-3 justify-center gap-2 w-full ">
                <Spinner size="lg" /> Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
