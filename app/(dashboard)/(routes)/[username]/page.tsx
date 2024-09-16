"use client";
import React, { Fragment } from "react";
import { useParams } from "next/navigation";
import useUser from "@/hooks/useUser";
import { Spinner } from "@/components/spinner";
import Header from "../../_components/_common/Header";
import UserHero from "../../_components/UserHero";
import UserBio from "../../_components/UserBio";

const SingleUser = () => {
  const param = useParams();
  const username = param?.username as string;
  const { data, isLoading } = useUser(username);
  const fetchedUser: UserType = data?.data;

  if (isLoading || !data) {
    return (
      <div className="flex h-full items-center justify-center">
        <Spinner size="icon" />
      </div>
    );
  }

  return (
    <Fragment>
      <Header label={fetchedUser?.name || ""} showBackArrow />
      <UserHero
        id={fetchedUser?.id}
        image={fetchedUser?.image}
        name={fetchedUser?.name}
        username={username}
        coverImage={fetchedUser?.coverImage}
      />
      <UserBio user={fetchedUser} />
    </Fragment>
  );
};

export default SingleUser;
