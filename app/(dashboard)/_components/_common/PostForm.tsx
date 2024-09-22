"use client";
import React, { FC, useCallback, useState } from "react";
import { z } from "zod";
import axios from "axios";
import { FormProvider, useForm } from "react-hook-form";
import usePosts from "@/hooks/usePosts";
import useCurrentUser from "@/hooks/useCurrentUser";
import { zodResolver } from "@hookform/resolvers/zod";

import { UserType } from "@/types/user.type";
import { toast } from "@/hooks/use-toast";
import { BASE_URL } from "@/lib/base-url";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DraftEditor } from "@/components/draft-editor";
import { Button } from "@/components/ui/button";
import { ImageIcon } from "lucide-react";
import { Spinner } from "@/components/spinner";
import { EditorState } from "draft-js";
import Image from "next/image";
import useUploadcare from "@/hooks/useUploadcare";

interface PropsType {
  placeholder: string;
  isComment?: boolean;
  postId?: number;
}
const PostForm: FC<PropsType> = ({ placeholder, postId }) => {
  const { base64, uploading } = useUploadcare();
  const { data, isLoading } = useCurrentUser();
  const { username, name, profileImage, image }: UserType =
    data?.currentUser ?? {};
  const { mutate } = usePosts({ postId });

  const [loading, setLoading] = useState(false);
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );

  const formSchema = z.object({
    body: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: "",
    },
  });

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      try {
        setLoading(true);
        await axios.post(`${BASE_URL}api/posts`, {
          body: values.body,
        });
        setEditorState(EditorState.createEmpty());
        form.reset();
        mutate();
        toast({
          title: "Sucess",
          description: "Post created successfully",
          variant: "default",
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to create post",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    },
    [form, mutate]
  );

  return (
    <div className="border-b-[1px] dark:border-[rgb(47,51,54)] py-2">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex h-full w-full flex-col items-center justify-center px-3"
        >
          {isLoading ? (
            <Spinner size="lg" />
          ) : (
            <div className="w-full px-4 flex flex-row pb-1 gap-4">
              <div className="shrink-0">
                <Avatar>
                  <AvatarImage
                    src={profileImage || image || ""}
                    alt={username || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="font-bold text-[60px]">
                    {name?.[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <div className="min-h-6 peer !max-h-80 overflow-auto overflow-x-hidden mb-3">
                  <DraftEditor
                    placeholder={placeholder}
                    wrapperClassName="!min-h-6 !max-h-80 !border-none w-full"
                    editorClassName="placeholder:text-muted-foreground peer outline-0 px-0 focus-visible:outline-none text-[18px] resize-none !py-0 w-full focus:border-0 !border-none "
                    editorState={editorState}
                    setEditorState={setEditorState}
                    onChange={(html) => {
                      form.setValue("body", html);
                    }}
                  />
                </div>
                <div className="flex items-center">
                  {base64 && (
                    <div className="w-14 h-14 relative rounded-md border overflow-hidden">
                      <Image
                        src={base64 || ""}
                        width={44}
                        height={44}
                        alt=""
                        className="w-full h-full rounded-md object-cover"
                      />
                      {!uploading && (
                        <div className="absolute inset-0 w-full h-full bg-gray-950/30 flex items-center justify-center">
                          <Spinner size="lg" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <hr
                  className="px-3  h-[0px] w-full opacity-0
               dark:border-[rgb(34,37,40)] mb-1 transition
              "
                />
                <div className="w-full flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <Button
                      type="button"
                      variant="ghost"
                      className="!text-[rgb(29,155,240)] !p-0 gap-1 !bg-transparent"
                    >
                      <ImageIcon
                        color="rgb(29,155,240)"
                        size="16px"
                        className="shrink-0"
                      />
                      <span className="font-semibold text-sm">
                        Upload photo
                      </span>
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    variant="brandPrimary"
                    size="brandsm"
                    disabled={loading || !form?.getValues()?.body}
                    className="
                        !h-auto
                        !text-white
                        cursor-pointer
                        font-semibold
                        text-base"
                  >
                    {loading ? <Spinner size="default" /> : "Post"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default PostForm;
