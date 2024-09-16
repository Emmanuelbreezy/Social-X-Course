import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Image from "next/image";
import React from "react";

interface PropsType {
  id: number;
  name: string;
  image: string | null;
  username: string;
  coverImage: string | null;
}
const UserHero: React.FC<PropsType> = ({
  username,
  coverImage,
  name,
  image,
}) => {
  return (
    <div>
      <div className="bg-neutral-700 h-44 relative">
        {coverImage && (
          <Image
            src={coverImage}
            fill
            alt="cover image"
            style={{ objectFit: "cover" }}
          />
        )}

        <div className="absolute -bottom-16 left-4">
          <div className="bg-neutral-800 !w-[141px] !h-[141px] rounded-full p-[2px] border-2 border-inherit">
            <Avatar className="transition cursor-pointer !w-full h-full hover:opacity-90">
              <AvatarImage src={image || ""} alt={username} />
              <AvatarFallback className="font-bold text-[60px]">
                {name?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHero;
