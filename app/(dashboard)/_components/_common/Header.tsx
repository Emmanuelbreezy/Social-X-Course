"use client";
import React, { FC, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface PropsType {
  label: string;
  showBackArrow?: boolean;
}

const Header: FC<PropsType> = ({ label, showBackArrow }) => {
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <div className="border-b-[1px] border-[rgb(47,51,54)] p-5">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <ArrowLeft
            onClick={handleBack}
            color="white"
            size={20}
            className="cursor-pointer hover:opacity-70
            transition"
          />
        )}
        <h1 className="text-xl font-semibold">{label}</h1>
      </div>
    </div>
  );
};

export default Header;
