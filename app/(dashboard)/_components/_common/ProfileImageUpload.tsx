/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import React, { FC, useCallback, useState } from "react";
import Dropzone from "react-dropzone";

interface PropsType {
  value?: string;
  disabled?: boolean;
  name?: string;
  onChange: (image: string) => void;
}

const ProfileImageUpload: FC<PropsType> = ({ value, name, onChange }) => {
  const [base64, setBase64] = useState(value);
  //const [file, setFile] = useState();

  const handleChange = useCallback(
    (image: string) => {
      onChange(image);
    },
    [onChange]
  );

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = (event: any) => {
      setBase64(event.target.result);
      handleChange(event.target.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="cover--uploader">
      <Dropzone
        accept={{
          "image/png": [".png"],
          "image/jpg": [".jpg"],
          "image/jpeg": [".jpeg"],
        }}
        onDrop={(acceptedFiles) => {
          handleDrop(acceptedFiles);
        }}
      >
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()}>
            <input
              type="file"
              multiple
              style={{ display: "none" }}
              accept=".csv, .xls, .xlsx"
              {...getInputProps()}
            />
            <div className="bg-neutral-800 relative !w-[141px] !h-[141px] rounded-full p-[2px] border-2 border-inherit overflow-hidden">
              <Avatar className="transition cursor-pointer !w-full h-full hover:opacity-90">
                <AvatarImage
                  src={base64 || ""}
                  alt={name || ""}
                  className="w-full h-full object-cover"
                />
                <AvatarFallback className="font-bold text-[60px]">
                  {name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 w-full h-full bg-gray-950/10 flex items-center justify-start">
                <div className="w-full flex justify-center gap-3 items-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full shadow w-10 h-10 p-2 bg-black/50 transition-colors hover:bg-opacity-60"
                  >
                    <Camera size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ProfileImageUpload;
