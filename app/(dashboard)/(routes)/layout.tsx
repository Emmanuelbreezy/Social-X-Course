"use client";
import React, { Fragment, ReactNode } from "react";
import { redirect } from "next/navigation";
//import { auth } from "@/lib/auth";
import Logo from "@/components/logo";
import { Spinner } from "@/components/spinner";
import useCurrentUser from "@/hooks/useCurrentUser";
import Sidebar from "../_components/Sidebar";
import Rightbar from "../_components/Rightbar";

function MainLayout({ children }: { children: ReactNode }) {
  // const session = await auth();
  const { data, isLoading } = useCurrentUser();
  const currentUser = data?.currentUser ?? {};

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen items-center w-full justify-center">
        <Logo width="70px" height="70px" />
        <Spinner size="icon" />
      </div>
    );
  }

  if (!currentUser?.email) {
    return redirect("/");
  }

  // useEffect(() => {
  //   // Check user state and open modals as needed
  //   if (!currentUser.dateOfBirth && !isBirthDateModalOpen) {
  //     openBirthDateModal();
  //   } else if (
  //     currentUser.dateOfBirth &&
  //     !currentUser.username &&
  //     !isUserNameModalOpen
  //   ) {
  //     openUserNameModal();
  //   }
  // }, [isBirthDateModalOpen, isBirthDateModalOpen]);

  return (
    <Fragment>
      {/* { newly registered user} */}
      {/* <BirthDateModal
        isOpen={isBirthDateModalOpen}
        onClose={() => {
          closeBirthDateModal();
          if (!currentUser.username) {
            openUserNameModal();
          }
        }}
      />
      {isUserNameModalOpen && <UsernameModal isOpen={isUserNameModalOpen} />} */}

      <div className="h-screen">
        <div className="container h-full mx-auto xl:px-30 max-w-7xl">
          <div className="flex h-full">
            <div className="flex-shrink-0">
              <Sidebar />
            </div>
            <div className="flex flex-row flex-1 gap-0 lg:gap-6">
              <main className="!bg-background h-full flex-1 border-x border-[rgb(47,51,54)]">
                {children}
              </main>
              <div className="flex-shrink-0">
                <Rightbar />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default MainLayout;
