"use client";
import React from "react";
import Modal from "@/components/modal";

const UsernameModal = (props: { isOpen: boolean; onClose?: () => void }) => {
  const { isOpen, onClose } = props;
  return (
    <Modal
      title="What should we call you?"
      subTitle="Your @username is unique. You can always change it later."
      isOpen={isOpen}
      onClose={onClose}
      body={
        <div className="w-full h-[400px]">
          <input />
        </div>
      }
    />
  );
};

export default UsernameModal;
